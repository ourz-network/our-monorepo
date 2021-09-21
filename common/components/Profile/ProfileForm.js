// tailwindUI modal that asks user if they would like to
// create an account and set up their information like bio and social links.
// if they decline just use server side rendering that way create is off limits.

import React, { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import web3 from "@/app/web3";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import catchErrors from "@/modules/mongodb/utils/catchErrors";
// import userUpdate from "@/modules/mongodb/utils/userActions";
import { useRouter } from "next/router";

let cancel;

// This modal allows connected wallets to sign up/edit their profile
const ProfileForm = ({
  modalType,
  User,
  linkAddress,
  profileDetails,
  showModal,
  setShowModal,
}) => {
  const Router = useRouter();

  // Global State. Connected wallet.
  const { address, verifyAPIpost } = web3.useContainer();
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const cancelButtonRef = useRef(null); // TailwindUI

  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  // Modal/Prompt State for TailwindUI in this component
  const [open, setOpen] = useState(showModal ? true : false);
  const hide = () => {
    setOpen(false);
    setShowModal({ showModal: false });
  };

  // UserProfile stored to state. This collects the MongoDB document and web3 address
  const [user, setUser] = useState({
    ethAddress: User?.ethAddress || linkAddress || address,
    userId: User?._id || null,
    username: User?.username || "",
    name: profileDetails?.name || "",
    bio: profileDetails?.bio || "",
    website: (profileDetails?.social && profileDetails?.social?.website) || "",
    twitter: (profileDetails?.social && profileDetails?.social?.twitter) || "",
    instagram:
      (profileDetails?.social && profileDetails?.social?.instagram) || "",
    discord: (profileDetails?.social && profileDetails?.social?.discord) || "",
    github: (profileDetails?.social && profileDetails?.social?.github) || "",
    linktree:
      (profileDetails?.social && profileDetails?.social?.linktree) || "",
    yat: (profileDetails?.social && profileDetails?.social?.yat) || "",
    galleryso:
      (profileDetails?.social && profileDetails?.social?.galleryso) || "",
    lazy: (profileDetails?.social && profileDetails?.social?.lazy) || "",
    showtime:
      (profileDetails?.social && profileDetails?.social?.showtime) || "",
    tiktok: (profileDetails?.social && profileDetails?.social?.tiktok) || "",
    twitch: (profileDetails?.social && profileDetails?.social?.twitch) || "",
    youtube: (profileDetails?.social && profileDetails?.social?.youtube) || "",
  });

  //
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ethAddress: User?.ethAddress || linkAddress || address,
      userId: User?._id || null,
      desiredUsername: User?.username || "",
      name: profileDetails?.name || "",
      bio: profileDetails?.bio || "",
      website:
        (profileDetails?.social && profileDetails?.social?.website) || "",
      twitter:
        (profileDetails?.social && profileDetails?.social?.twitter) || "",
      instagram:
        (profileDetails?.social && profileDetails?.social?.instagram) || "",
      discord:
        (profileDetails?.social && profileDetails?.social?.discord) || "",
      github: (profileDetails?.social && profileDetails?.social?.github) || "",
      linktree:
        (profileDetails?.social && profileDetails?.social?.linktree) || "",
      yat: (profileDetails?.social && profileDetails?.social?.yat) || "",
      galleryso:
        (profileDetails?.social && profileDetails?.social?.galleryso) || "",
      lazy: (profileDetails?.social && profileDetails?.social?.lazy) || "",
      showtime:
        (profileDetails?.social && profileDetails?.social?.showtime) || "",
      tiktok: (profileDetails?.social && profileDetails?.social?.tiktok) || "",
      twitch: (profileDetails?.social && profileDetails?.social?.twitch) || "",
      youtube:
        (profileDetails?.social && profileDetails?.social?.youtube) || "",
    },
    mode: "all",
  });

  const onSubmit = async (formData) => {
    // console.log("formData :", formData);

    // If no account is found for the address...
    if (!profileDetails) {
      // console.log("Creating New Profile... \nformData :", formData);
      try {
        if (!usernameAvailable) {
          throw new Error("Username Unavailable");
        }
        const { username, ethAddress } = formData;
        // console.log(`username, address:\n`, username, address);

        // Request signed message
        const verifiedSignature = await verifyAPIpost(
          `${JSON.stringify(formData)}`
        );

        if (verifiedSignature) {
          const res = await axios.post("/api/users", { username, ethAddress });

          if (res.data) {
            // Push to new account page
            Router.push(`/profile/${username}`);
            hide();
          } else {
            // Throw error with status code in case Fetch API req failed
            throw new Error(res.status);
          }
        }
      } catch (error) {
        const errorMsg = catchErrors(error);
        setErrorMsg(errorMsg);
      }

      // Else edit account details
    } else {
      // console.log("Updating Profile... \nformData :", formData);
      try {
        // Request signed message
        const verifiedSignature = await verifyAPIpost(
          `${JSON.stringify(formData)}`
        );

        if (verifiedSignature) {
          const res = await axios.put(`/api/users/${username}`, formData);

          // console.log(`ProfileForm update profile -  \nres :\n`, res);
          // Throw error with status code in case Fetch API req failed
          if (res.data != "Success") {
            throw new Error(res.status);
          }

          hide(); // calls hide() if successful
          Router.reload();
        }
      } catch (error) {
        const errorMsg = catchErrors(error);
        setErrorMsg(errorMsg);
      }
    }
  };

  const checkUsername = async (desiredUsername) => {
    setUsernameLoading(true);
    // console.log("desiredUsername:", desiredUsername)
    try {
      cancel && cancel();

      const CancelToken = axios.CancelToken;

      const res = await axios.get(`/api/users/${desiredUsername}`, {
        cancelToken: new CancelToken((canceler) => {
          cancel = canceler;
        }),
      });
      // console.log(`checkUsername res: `, res);
      if (errorMsg == null) {
        setErrorMsg("Username Not Available");
        setUsernameAvailable(false);
        return;
      }
      // console.log(`ProfileForm.js\n   - CheckUsername\n   - res:\n`, res);
      setErrorMsg(null);
    } catch (error) {
      setUsernameAvailable(true);
      // console.log("user before:", user);
      setUser((prev) => ({ ...prev, username: desiredUsername }));
      // console.log("user after:", user);
    }
    setUsernameLoading(false);
  };

  const checkAvailibility = useEffect(() => {
    username === "" ? setUsernameAvailable(false) : checkUsername();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const registerUser = async () => {
    try {
      // console.log("ProfileForm registerUser", address, user.username);
      const username = user.username;
      const res = await axios.post(`/api/signup`, { address, username });
      // console.log(res.data);
      hide();
    } catch (error) {
      const errorMsg = catchErrors(error);
      setError(errorMsg);
    }
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          open={open}
          onClose={setOpen}
        >
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 transition-opacity bg-opacity-100 bg-dark-background" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block overflow-hidden text-left align-bottom transition-all transform shadow-xl bg-dark-background sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="px-4 pt-5 pb-4 border rounded-sm bg-dark-background border-dark-border sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {/* Dialog Container */}
                    {/* <div className="flex items-center justify-center flex-shrink w-full mx-auto bg-ourange-500 ll flex-shrin h-1/2 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationIcon className="w-6 h-6 text-ourange-500" aria-hidden="true" />
                    </div> */}
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h2"
                        className="mx-2 text-2xl font-extrabold text-center text-dark-primary "
                      >
                        {!profileDetails ? "Create Profile" : "Edit Profile"}
                      </Dialog.Title>
                      <div className="mt-2">
                        {/* <p className="text-sm text-dark-secondary ">
                          Are you sure you want to deactivate your account? All of your data will be permanently removed.
                          This action cannot be undone.
                        </p> */}
                        <p className="mx-2 text-sm text-center text-dark-secondary ">
                          {!profileDetails
                            ? "Choose a username to create an account. This is completely optional. Anyone can mint an NFT without a user profile."
                            : "Click Submit or hit Enter on your keyboard."}
                        </p>
                      </div>
                      <div className="py-1">
                        <div className="border-t border-dark-border"></div>
                      </div>
                      <div className="mx-1 md:mx-0">
                        <form
                          className="space-y-6"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className="overflow-hidden shadow sm:">
                            <div className="p-4 sm:p-6">
                              <div className="flex flex-col items-center content-center justify-items-center">
                                {!profileDetails && (
                                  <>
                                    <label
                                      htmlFor="username"
                                      className="hidden text-sm font-medium"
                                      aria-hidden="true"
                                    >
                                      Username
                                    </label>
                                    <div className="flex shadow-sm max-w-1/2">
                                      <span className="inline-flex items-center px-3 text-sm border border-r-0 text-dark-primary border-dark-border md bg-dark-background">
                                        @
                                      </span>
                                      <input
                                        type="text"
                                        placeholder="username"
                                        className="flex-1 block w-full border border-dark-border ne focus:ring-indigo-500 focus:border-indigo-500 md sm:text-sm"
                                        {...register("username", {
                                          required: true, // JS only: <p>error message</p>
                                          minLength: {
                                            value: 3,
                                          },
                                          maxLength: {
                                            value: 24,
                                          },
                                          pattern:
                                            /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,24}$/,
                                          validate: {
                                            available: async (v) => {
                                              console.log("validate", v);
                                              checkUsername(v);
                                            },
                                          },
                                        })}
                                      />
                                    </div>
                                  </>
                                )}
                                {profileDetails && (
                                  <>
                                    <label
                                      htmlFor="newUsername"
                                      className="hidden text-sm font-medium"
                                      aria-hidden="true"
                                    >
                                      New Username
                                    </label>
                                    <div className="flex mb-4 shadow-sm max-w-1/2">
                                      <span className="inline-flex items-center px-3 text-sm border border-r-0 bg-dark-accent text-dark-primary border-dark-border bg-dark-background">
                                        @
                                      </span>
                                      <input
                                        type="text"
                                        placeholder={`${user.username}`}
                                        className="flex-1 block w-full text-dark-primary bg-dark-accent border-dark-border focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        {...register("desiredUsername", {
                                          required: "error message", // JS only: <p>error message</p>
                                          minLength: {
                                            value: 3,
                                            message: "error message", // JS only: <p>error message</p> TS only support string
                                          },
                                          maxLength: {
                                            value: 24,
                                            message: "error message", // JS only: <p>error message</p> TS only support string
                                          },
                                          validate: {
                                            available: async (v) => {
                                              console.log("validate", v);
                                              setUser((prev) => ({
                                                ...prev,
                                                username: v,
                                              }));
                                              checkUsername(v);
                                            },
                                          },
                                        })}
                                      />
                                    </div>
                                    <div className="grid w-full grid-flow-row-dense grid-cols-3 gap-4">
                                      {Object.keys(user).map(
                                        (keyName, keyIndex) => {
                                          if (
                                            keyName != "username" &&
                                            keyName != "ethAddress" &&
                                            keyName != "userId"
                                          ) {
                                            return (
                                              <div
                                                key={`${keyIndex}`}
                                                className={
                                                  keyName == "name" ||
                                                  keyName == "bio" ||
                                                  keyName == "website"
                                                    ? `col-span-full w-1/2 mx-auto`
                                                    : `col-span-1 `
                                                }
                                              >
                                                <label
                                                  key={`label-${keyIndex}`}
                                                  htmlFor={`${keyName}`}
                                                  className="hidden text-sm font-medium"
                                                  aria-hidden="true"
                                                >
                                                  {`${keyName}`}
                                                </label>
                                                <input
                                                  key={`input-${keyIndex}`}
                                                  type="text"
                                                  placeholder={
                                                    user[keyName]
                                                      ? `${user[keyName]}`
                                                      : `${keyName}`
                                                  }
                                                  className="flex-1 block w-full text-dark-primary bg-dark-accent border-dark-border ne focus:ring-indigo-500 focus:border-indigo-500 md sm:text-sm"
                                                  {...register(`${keyName}`)}
                                                />
                                              </div>
                                            );
                                          }
                                        }
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                              {errors.username && (
                                <p className="justify-center w-2/3 mx-auto text-center text-ourange-500 place-items-center text-small">
                                  3-24 alphanumeric characters
                                  <br />
                                  No spaces
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="px-4 py-3 bg-dark-background sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                              type="submit"
                              className="inline-flex justify-center w-1/2 px-4 py-2 text-base font-medium text-white border border-transparent shadow-sm bg-ourange-500 hover:bg-ourange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ourange-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              Submit
                            </button>
                            <button
                              type="button"
                              className="inline-flex justify-center w-1/2 px-4 py-2 mt-3 text-base font-medium bg-white border shadow-sm text-dark-secondary border-dark-border hover:bg-dark-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                              onClick={() => hide()}
                              ref={cancelButtonRef}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileForm;
