/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
// tailwindUI modal that asks user if they would like to
// create an account and set up their information like bio and social links.
// if they decline just use server side rendering that way create is off limits.

import React, { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import catchErrors from "@/modules/mongodb/utils/catchErrors";
// import userUpdate from "@/modules/mongodb/utils/userActions";
import web3 from "@/app/web3";
import { IProfile, IUser } from "@/modules/mongodb/models/types";

let cancel;

// This modal allows connected wallets to sign up/edit their profile
const ProfileForm = ({
  User,
  linkAddress,
  profileDetails,
  showModal,
  setShowModal,
}: {
  User: IUser;
  linkAddress: string;
  profileDetails: IProfile;
  showModal: boolean;
  setShowModal;
}): JSX.Element => {
  const Router = useRouter();

  // Global State. Connected wallet.
  const { address, verifyAPIpost } = web3.useContainer();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const cancelButtonRef = useRef(null); // TailwindUI

  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  // Modal/Prompt State for TailwindUI in this component
  const [open, setOpen] = useState(!!showModal);
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
    instagram: (profileDetails?.social && profileDetails?.social?.instagram) || "",
    discord: (profileDetails?.social && profileDetails?.social?.discord) || "",
    github: (profileDetails?.social && profileDetails?.social?.github) || "",
    linktree: (profileDetails?.social && profileDetails?.social?.linktree) || "",
    yat: (profileDetails?.social && profileDetails?.social?.yat) || "",
    galleryso: (profileDetails?.social && profileDetails?.social?.galleryso) || "",
    lazy: (profileDetails?.social && profileDetails?.social?.lazy) || "",
    showtime: (profileDetails?.social && profileDetails?.social?.showtime) || "",
    tiktok: (profileDetails?.social && profileDetails?.social?.tiktok) || "",
    twitch: (profileDetails?.social && profileDetails?.social?.twitch) || "",
    youtube: (profileDetails?.social && profileDetails?.social?.youtube) || "",
  });

  //
  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm({
    defaultValues: {
      ethAddress: User?.ethAddress || linkAddress || address,
      userId: User?._id || null,
      desiredUsername: User?.username || "",
      name: profileDetails?.name || "",
      bio: profileDetails?.bio || "",
      website: (profileDetails?.social && profileDetails?.social?.website) || "",
      twitter: (profileDetails?.social && profileDetails?.social?.twitter) || "",
      instagram: (profileDetails?.social && profileDetails?.social?.instagram) || "",
      discord: (profileDetails?.social && profileDetails?.social?.discord) || "",
      github: (profileDetails?.social && profileDetails?.social?.github) || "",
      linktree: (profileDetails?.social && profileDetails?.social?.linktree) || "",
      yat: (profileDetails?.social && profileDetails?.social?.yat) || "",
      galleryso: (profileDetails?.social && profileDetails?.social?.galleryso) || "",
      lazy: (profileDetails?.social && profileDetails?.social?.lazy) || "",
      showtime: (profileDetails?.social && profileDetails?.social?.showtime) || "",
      tiktok: (profileDetails?.social && profileDetails?.social?.tiktok) || "",
      twitch: (profileDetails?.social && profileDetails?.social?.twitch) || "",
      youtube: (profileDetails?.social && profileDetails?.social?.youtube) || "",
    },
    mode: "all",
  });

  const onSubmit = async (formData) => {
    // If no account is found for the address...
    if (!profileDetails) {
      try {
        if (!usernameAvailable) {
          throw new Error("Username Unavailable");
        }
        const { desiredUsername, ethAddress }: { desiredUsername: string; ethAddress: string } =
          formData;

        // Request signed message
        const verifiedSignature = await verifyAPIpost(`${JSON.stringify(formData)}`);

        if (verifiedSignature) {
          const res = await axios.post("/api/users", { desiredUsername, ethAddress });

          if (res.data) {
            // Push to new account page
            Router.push(`/profile/${desiredUsername}`).then(
              () => {},
              () => {}
            );
            hide();
          } else {
            // Throw error with status code in case Fetch API req failed
            throw new Error(res.status.toString());
          }
        }
      } catch (error) {
        const ErrorMsg = catchErrors(error);
        setErrorMsg(ErrorMsg);
      }

      // Else edit account details
    } else {
      const { username }: { username: string } = formData;
      try {
        // Request signed message
        const verifiedSignature = await verifyAPIpost(`${JSON.stringify(formData)}`);

        if (verifiedSignature) {
          const res = await axios.put(`/api/users/${username}`, formData);

          // Throw error with status code in case Fetch API req failed
          if (res.data !== "Success") {
            throw new Error(res.status.toString());
          }

          hide(); // calls hide() if successful
          Router.reload();
        }
      } catch (error) {
        const ErrorMsg = catchErrors(error);
        setErrorMsg(ErrorMsg);
      }
    }
  };

  const checkUsername = async (desiredUsername: string) => {
    setUsernameLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      cancel && cancel();

      const { CancelToken } = axios;

      const res = await axios.get(`/api/users/${desiredUsername}`, {
        cancelToken: new CancelToken((canceler) => {
          cancel = canceler;
        }),
      });
      if (errorMsg == null) {
        setErrorMsg("Username Not Available");
        setUsernameAvailable(false);
        return;
      }
      setErrorMsg(null);
    } catch (error) {
      setUsernameAvailable(true);
      setUser((prev) => ({ ...prev, username: desiredUsername }));
    }
    setUsernameLoading(false);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const checkAvailibility = useEffect(() => {
  //   user.username === ""
  //     ? setUsernameAvailable(false)
  //     : checkUsername(user.username).then(
  //         () => {},
  //         () => {}
  //       );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user.username]);

  // const registerUser = async () => {
  //   try {
  //     const { username } = user;
  //     const res = await axios.post(`/api/signup`, { address, username });
  //     hide();
  //   } catch (error) {
  //     const errorMsg = catchErrors(error);
  //   }
  // };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="overflow-y-auto fixed inset-0 z-10"
          initialFocus={cancelButtonRef}
          open={open}
          onClose={setOpen}
        >
          <div className="flex justify-center items-center px-4 pt-4 pb-20 min-h-screen text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-opacity-100 transition-opacity bg-dark-background" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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
              <div className="inline-block overflow-hidden text-left align-bottom shadow-xl transition-all transform bg-dark-background sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="px-4 pt-5 pb-4 rounded-sm border bg-dark-background border-dark-border sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {/* Dialog Container */}
                    {/* <div className="flex flex-shrink justify-center items-center mx-auto w-full h-1/2 bg-ourange-500 ll flex-shrin sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationIcon className="w-6 h-6 text-ourange-500" aria-hidden="true" />
                    </div> */}
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h2"
                        className="mx-2 text-2xl font-extrabold text-center text-dark-primary"
                      >
                        {!profileDetails ? "Create Profile" : "Edit Profile"}
                      </Dialog.Title>
                      <div className="mt-2">
                        {/* <p className="text-sm text-dark-secondary">
                          Are you sure you want to deactivate your account? All of your data will be permanently removed.
                          This action cannot be undone.
                        </p> */}
                        <p className="mx-2 text-sm text-center text-dark-secondary">
                          {!profileDetails
                            ? "Choose a username to create an account. This is completely optional. Anyone can mint an NFT without a user profile."
                            : "Click Submit or hit Enter on your keyboard."}
                        </p>
                      </div>
                      <div className="py-1">
                        <div className="border-t border-dark-border" />
                      </div>
                      <div className="mx-1 md:mx-0">
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                          <div className="overflow-hidden shadow sm:">
                            <div className="p-4 sm:p-6">
                              <div className="flex flex-col justify-items-center content-center items-center">
                                {!profileDetails && (
                                  <>
                                    <div className="flex shadow-sm max-w-1/2">
                                      <span className="inline-flex items-center px-3 text-sm border border-r-0 text-dark-primary border-dark-border md bg-dark-background">
                                        @
                                      </span>
                                      <input
                                        type="text"
                                        placeholder="username"
                                        aria-label="username"
                                        className="block flex-1 w-full border border-dark-border ne focus:ring-indigo-500 focus:border-indigo-500 md sm:text-sm"
                                        {...register("desiredUsername", {
                                          required: true, // JS only: <p>error message</p>
                                          minLength: 3,
                                          maxLength: 24,

                                          pattern: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,24}$/,
                                          validate: {
                                            available: async (v) => {
                                              await checkUsername(v).then(
                                                () => {},
                                                () => {}
                                              );
                                            },
                                          },
                                        })}
                                      />
                                    </div>
                                  </>
                                )}
                                {profileDetails && (
                                  <>
                                    <div className="flex mb-4 shadow-sm max-w-1/2">
                                      <span className="inline-flex items-center px-3 text-sm border border-r-0 bg-dark-accent text-dark-primary border-dark-border">
                                        @
                                      </span>
                                      <input
                                        type="text"
                                        aria-label="username"
                                        placeholder={`${user.username}`}
                                        className="block flex-1 w-full text-dark-primary bg-dark-accent border-dark-border focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                              setUser((prev) => ({
                                                ...prev,
                                                username: v,
                                              }));
                                              await checkUsername(v).then(
                                                () => {},
                                                () => {}
                                              );
                                            },
                                          },
                                        })}
                                      />
                                    </div>
                                    <div className="grid grid-cols-3 grid-flow-row-dense gap-4 w-full">
                                      {Object.keys(user).map((keyName, keyIndex) => {
                                        if (
                                          keyName !== "username" &&
                                          keyName !== "ethAddress" &&
                                          keyName !== "userId"
                                        ) {
                                          return (
                                            <div
                                              key={`${keyName}`}
                                              className={
                                                keyName === "name" ||
                                                keyName === "bio" ||
                                                keyName === "website"
                                                  ? `col-span-full w-1/2 mx-auto`
                                                  : `col-span-1 `
                                              }
                                            >
                                              <label
                                                htmlFor={`${keyName}`}
                                                className="hidden text-sm font-medium"
                                                aria-hidden="true"
                                              >
                                                {`${keyName}`}
                                              </label>
                                              <input
                                                type="text"
                                                placeholder={
                                                  user[keyName] ? `${user[keyName]}` : `${keyName}`
                                                }
                                                className="block flex-1 w-full text-dark-primary bg-dark-accent border-dark-border ne focus:ring-indigo-500 focus:border-indigo-500 md sm:text-sm"
                                                {...register(`${keyName}`)}
                                              />
                                            </div>
                                          );
                                        }
                                      })}
                                    </div>
                                  </>
                                )}
                              </div>
                              {errors.username && (
                                <p className="justify-center place-items-center mx-auto w-2/3 text-center text-ourange-500 text-small">
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
                              className="inline-flex justify-center px-4 py-2 w-1/2 text-base font-medium text-white border border-transparent shadow-sm bg-ourange-500 hover:bg-ourange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ourange-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              Submit
                            </button>
                            <button
                              type="button"
                              className="inline-flex justify-center px-4 py-2 mt-3 w-1/2 text-base font-medium bg-white border shadow-sm text-dark-secondary border-dark-border hover:bg-dark-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
