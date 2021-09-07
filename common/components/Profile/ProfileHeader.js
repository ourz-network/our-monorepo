import React, { useState, useEffect } from "react";
import makeBlockie from "ethereum-blockies-base64"; // Ethereum avatar
import { toTrimmedAddress } from "@/ethereum/utils";
import axios from "axios";
import FormModal from "../FormModal";
import Image from "next/image";

export const ProfileHeader = ({
  user,
  profileDetails,
  linkAddress,
  ownAccount,
  loggedUserFollowStats,
  setUserFollowStats,
}) => {
  // https://stackoverflow.com/questions/55271855/react-material-ui-ssr-warning-prop-d-did-not-match-server-m-0-0-h-24-v-2
  //
  const [loading, setLoading] = useState(true);
  useEffect(() => setLoading(false), []);

  const [showModal, setShowModal] = useState(false);

  return (
    <div
      id="userheader"
      className="flex flex-col w-full pt-8 pb-16 bg-dark-background place-items-center place-content-center"
    >
      <div
        id="nameAndPic"
        className="flex flex-col justify-center text-xs text-center"
      >
        <div
          id="avatar"
          className="block w-20 h-20 mx-auto mb-4 border rounded-full border-dark-accent"
        >
          {(linkAddress ? linkAddress : user.ethAddress) && !loading && (
            <Image
              src={makeBlockie(linkAddress ? linkAddress : user.ethAddress)}
              alt="Avatar"
              width={80}
              height={80}
              className="rounded-full"
              href={`https://etherscan.io/address/${
                linkAddress ? linkAddress : user.ethAddress
              }`}
            />
          )}
        </div>
        {profileDetails?.name && !loading && (
          <h1 className="mb-2 text-xl text-center text-dark-primary">{`${profileDetails.name}`}</h1>
        )}
      </div>
      <div
        id="names"
        className="flex flex-col self-end mx-auto w-max space-evenly"
      >
        <div
          id="username"
          className="w-full mb-2 -mt-1 text-sm text-center text-dark-primary"
        >
          {/* @username (addressLinkEtherscan) */}
          <h3>{user?.username && `@${user.username}`}</h3>
        </div>
        {showModal && (
          <FormModal
            modalType={user?.username ? "editProfile" : "signUp"}
            User={user}
            profileDetails={profileDetails}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
      {ownAccount ? (
        <button
          className="w-auto px-2 py-0.5 mx-auto mainButton border-2 my-2 text-base border-dark-border text-dark-primary"
          onClick={() => setShowModal({ showModal: true })}
        >
          {user?.username ? "Edit Profile" : "Create Profile"}
        </button>
      ) : (
        <p className="text-xs text-dark-primary">
          (
          <a
            href={`https://etherscan.io/address/${
              linkAddress ? linkAddress : user.ethAddress
            }`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline cursor-poiner"
          >
            {`${toTrimmedAddress(linkAddress)}`}
          </a>
          )
        </p>
      )}
      {profileDetails?.bio && (
        <div
          id="bio"
          className="italic text-center text-dark-primary max-w-1/3"
        >
          {`${profileDetails.bio}`}
        </div>
      )}
      <div className="w-1/3 h-0 my-3 border border-dark-background" />
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
                <a
                  href={`https://www.twitter.com/${profileDetails.social.twitter}`}
                >
                  Twitter
                </a>
              </li>
            )}
            {profileDetails.social.instagram && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a
                  href={`https://www.instagram.com/${profileDetails.social.instagram}`}
                >
                  instagram
                </a>
              </li>
            )}
            {profileDetails.social.discord && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a
                  href={`https://www.discord.com/${profileDetails.social.discord}`}
                >
                  discord
                </a>
              </li>
            )}
            {profileDetails.social.github && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a
                  href={`https://www.github.com/${profileDetails.social.github}`}
                >
                  github
                </a>
              </li>
            )}
            {profileDetails.social.linktree && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a
                  href={`https://www.linktree.com/${profileDetails.social.linktree}`}
                >
                  linktree
                </a>
              </li>
            )}
            {profileDetails.social.yat && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a href={`https://www.yat.com/${profileDetails.social.yat}`}>
                  yat
                </a>
              </li>
            )}
            {profileDetails.social.galleryso && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a
                  href={`https://www.gallery.so/${profileDetails.social.galleryso}`}
                >
                  galleryso
                </a>
              </li>
            )}
            {profileDetails.social.lazy && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a href={`https://www.lazy.com/${profileDetails.social.lazy}`}>
                  lazy
                </a>
              </li>
            )}
            {profileDetails.social.showtime && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a
                  href={`https://www.try.showtime.com/${profileDetails.social.showtime}`}
                >
                  showtime
                </a>
              </li>
            )}
            {profileDetails.social.tiktok && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a
                  href={`https://www.tiktok.com/${profileDetails.social.tiktok}`}
                >
                  tiktok
                </a>
              </li>
            )}
            {profileDetails.social.twitch && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a
                  href={`https://www.twitch.tv/${profileDetails.social.twitch}`}
                >
                  twitch
                </a>
              </li>
            )}
            {profileDetails.social.youtube && (
              <li className="px-1 py-0.5 mx-auto text-sm capitalize border text-dark-primary border-dark-border w-min">
                <a
                  href={`https://www.youtube.com/${profileDetails.social.youtube}`}
                >
                  youtube
                </a>
              </li>
            )}
          </ol>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileHeader;
