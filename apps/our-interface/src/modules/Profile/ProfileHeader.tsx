import React, { useState } from "react";
import makeBlockie from "ethereum-blockies-base64"; // Ethereum avatar
import Image from "next/image";
import { toTrimmedAddress } from "@/utils/index";
import ProfileFormModal from "@/modules/Profile/ProfileFormModal";
import { IProfile } from "@/mongodb/models/ProfileModel";
import { IUser } from "@/mongodb/models/UserModel";

const ProfileHeader = ({
  linkAddress,
  user,
  profileDetails,
  isOwner,
}: {
  linkAddress: string;
  user: IUser;
  profileDetails: IProfile;
  isOwner: boolean;
}): JSX.Element => {
  const [showModal, setShowModal] = useState(false);

  const Blockie = () => (
    <>
      <div className="block mx-auto w-20 h-20 rounded-full border border-dark-accent">
        <a href={`https://etherscan.io/address/${linkAddress}`}>
          <Image
            src={makeBlockie(linkAddress)}
            alt="Avatar"
            width={80}
            height={80}
            className="rounded-full"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </a>
      </div>
      <p className="text-xs text-dark-primary">
        <a
          href={`https://etherscan.io/address/${linkAddress || user.ethAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline cursor-poiner"
        >
          {`${toTrimmedAddress(linkAddress)}`}
        </a>
      </p>
    </>
  );

  const Biography = () => (
    <div className="m-auto text-base italic text-center text-dark-primary max-w-1/3">
      {`${profileDetails.bio}`}
    </div>
  );

  const Socials = () => (
    <ol className="flex gap-2 m-auto">
      {profileDetails.social.website && (
        <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
          <a href={`https://${profileDetails.social.website}`}>Website</a>
        </li>
      )}

      {Object.keys(profileDetails.social).map((keyName: ProfileKeys["keyName"]) => {
        if (keyName !== "website" && profileDetails.social[keyName]) {
          return (
            <li
              key={keyName}
              className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min"
            >
              <a href={`https://www.${keyName}.com/${profileDetails.social.keyName}`}>{keyName}</a>
            </li>
          );
        }
        return null;
      })}
    </ol>
  );

  return (
    <>
      {showModal && (
        <ProfileFormModal
          modalType={user?.username ? "editProfile" : "signUp"}
          User={user}
          profileDetails={profileDetails}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <div className="flex flex-col justify-center w-full bg-dark-background">
        <div className="flex flex-col justify-center p-4 space-y-4 text-xs text-center border-b border-dark-border">
          <Blockie />
          {isOwner && (
            <button
              className="mx-auto w-auto text-base border-2 mainButton border-dark-border text-dark-primary"
              onClick={() => setShowModal({ showModal: true })}
              type="button"
            >
              {user?.username ? "Edit Profile" : "Create Profile"}
            </button>
          )}
          <div className="flex flex-col self-end mx-auto w-full space-evenly">
            {profileDetails?.name && (
              <>
                <h1 className="text-xl text-center text-dark-primary">{profileDetails.name}</h1>
                <div className="w-full text-sm text-center text-dark-primary">
                  <h3>{user?.username && `@${user.username}`}</h3>
                </div>
              </>
            )}

            {profileDetails?.bio && <Biography />}
          </div>

          {profileDetails?.social && <Socials />}
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
