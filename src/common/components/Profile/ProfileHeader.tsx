import React, { useEffect, useState } from "react";
import makeBlockie from "ethereum-blockies-base64"; // Ethereum avatar
import Image from "next/image";
import { toTrimmedAddress } from "@/utils/index";
import ProfileFormModal from "@/components/Profile/ProfileFormModal";
import { IProfile } from "@/mongodb/models/ProfileModel";
import { IUser } from "@/mongodb/models/UserModel";

export const ProfileHeader = ({
  user,
  profileDetails,
  linkAddress,
  ownAccount,
}: {
  user: IUser;
  profileDetails: IProfile;
  linkAddress: string;
  ownAccount: boolean;
}): JSX.Element => {
  /*
   * https://stackoverflow.com/questions/55271855/react-material-ui-ssr-warning-prop-d-did-not-match-server-m-0-0-h-24-v-2
   *
   */
  const [loading, setLoading] = useState(true);
  useEffect(() => setLoading(false), []);

  const [showModal, setShowModal] = useState(false);

  return (
    <div
      id="userheader"
      className="flex flex-col place-content-center place-items-center py-6 w-full bg-dark-background"
    >
      <div id="nameAndPic" className="flex flex-col justify-center text-xs text-center">
        <div
          id="avatar"
          className="block mx-auto mb-4 w-20 h-20 rounded-full border border-dark-accent"
        >
          {(linkAddress || user.ethAddress) && !loading && (
            <Image
              src={makeBlockie(linkAddress || user.ethAddress)}
              alt="Avatar"
              width={80}
              height={80}
              className="rounded-full"
              href={`https://etherscan.io/address/${linkAddress || user.ethAddress}`}
            />
          )}
        </div>
        {ownAccount ? (
          <button
            className="w-auto px-2 py-0.5 mx-auto mainButton border-2 my-2 text-base border-dark-border text-dark-primary"
            onClick={() => setShowModal({ showModal: true })}
            type="button"
          >
            {user?.username ? "Edit Profile" : "Create Profile"}
          </button>
        ) : (
          <p className="text-xs text-dark-primary">
            (
            <a
              href={`https://etherscan.io/address/${linkAddress || user.ethAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline cursor-poiner"
            >
              {`${toTrimmedAddress(linkAddress)}`}
            </a>
            )
          </p>
        )}
        {profileDetails?.name && !loading && (
          <h1 className="my-2 text-xl text-center text-dark-primary">{`${profileDetails.name}`}</h1>
        )}
      </div>
      <div id="names" className="flex flex-col self-end mx-auto w-max space-evenly">
        <div id="username" className="-mt-1 mb-2 w-full text-sm text-center text-dark-primary">
          {/* @username (addressLinkEtherscan) */}
          <h3>{user?.username && `@${user.username}`}</h3>
        </div>
        {showModal && (
          <ProfileFormModal
            modalType={user?.username ? "editProfile" : "signUp"}
            User={user}
            profileDetails={profileDetails}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>

      {profileDetails?.bio && (
        <div id="bio" className="italic text-center text-dark-primary max-w-1/3">
          {`${profileDetails.bio}`}
        </div>
      )}
      <div className="my-3 w-1/3 h-0 border border-dark-background" />
      {profileDetails?.social ? (
        <div id="social" className="flex mt-1">
          <ol className="flex gap-2">
            {profileDetails.social.website && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a href={`https://${profileDetails.social.website}`}>Website</a>
              </li>
            )}
            {profileDetails.social.twitter && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a href={`https://www.twitter.com/${profileDetails.social.twitter}`}>Twitter</a>
              </li>
            )}
            {profileDetails.social.instagram && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a href={`https://www.instagram.com/${profileDetails.social.instagram}`}>
                  instagram
                </a>
              </li>
            )}
            {profileDetails.social.discord && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a href={`https://www.discord.com/${profileDetails.social.discord}`}>discord</a>
              </li>
            )}
            {profileDetails.social.github && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a href={`https://www.github.com/${profileDetails.social.github}`}>github</a>
              </li>
            )}
            {profileDetails.social.linktree && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a href={`https://www.linktree.com/${profileDetails.social.linktree}`}>linktree</a>
              </li>
            )}
            {profileDetails.social.yat && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a href={`https://www.yat.com/${profileDetails.social.yat}`}>yat</a>
              </li>
            )}
            {profileDetails.social.galleryso && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a href={`https://www.gallery.so/${profileDetails.social.galleryso}`}>galleryso</a>
              </li>
            )}
            {profileDetails.social.lazy && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a href={`https://www.lazy.com/${profileDetails.social.lazy}`}>lazy</a>
              </li>
            )}
            {profileDetails.social.showtime && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a href={`https://www.try.showtime.com/${profileDetails.social.showtime}`}>
                  showtime
                </a>
              </li>
            )}
            {profileDetails.social.tiktok && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a href={`https://www.tiktok.com/${profileDetails.social.tiktok}`}>tiktok</a>
              </li>
            )}
            {profileDetails.social.twitch && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a href={`https://www.twitch.tv/${profileDetails.social.twitch}`}>twitch</a>
              </li>
            )}
            {profileDetails.social.youtube && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a href={`https://www.youtube.com/${profileDetails.social.youtube}`}>youtube</a>
              </li>
            )}
          </ol>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileHeader;
