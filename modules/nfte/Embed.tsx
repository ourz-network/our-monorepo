import React from "react";

import NFTIcon from "./NFTIcon";
import Media from "./Media";
import Loading from "./Loading";
import useStyleSheet from "./useStyleSheet";
import { toTrimmedAddress, isAddress, tsFormat, cx } from "./utils";

import { NFTEProps, NFTData, Override } from "./types";

import styles from "./nfteStyles.module.css";

function NFT({
  data: {
    contract,
    tokenId,
    metadata,
    name,
    description,
    ownerOf,
    ownerOfUrl,
    creatorOf,
    creatorOfUrl,
    platform,
    platformUrl,
    mediaUrl,
    mediaPageUrl,
    mediaMimeType,
    blockNumber,
    timestamp,
  },
  className,
  style,
  darkMode,
  autoPlay,
  calcAspectRatio,
  galleryType,
}: NFTEProps) {
  // console.log("gallerytype embed", galleryType);
  // console.log("NFTEProps embed", NFTEProps);
  // let landingPage = false;

  // if (NFTEProps.galleryType == "landingPage") {
  //   landingPage = true;
  // }
  // console.log("landingPage:", landingPage);
  return (
    <div
      className={cx([
        "nfte",
        "nfte--loaded",
        darkMode && "nfte--dark-mode",
        className,
      ])}
      style={style}
    >
      <section
        className={cx([
          // "pr1",
          // "pl1",
          // "pt0",
          // "pb0",
          // "nfte__header",
          galleryType == "landingPage" ? "hidden" : "",
        ])}
      >
        <div
          className={cx([
            "pr0",
            galleryType == "landingPage" ? "hidden" : "nfte__creator",
          ])}
        >
          <p className="nfte__label">Created by</p>
          <a
            target="_blank"
            rel="noreferrer"
            href={creatorOfUrl}
            className="nfte__creator-id"
          >
            {isAddress(creatorOf) ? toTrimmedAddress(creatorOf) : creatorOf}
          </a>
        </div>

        <div className={cx([galleryType == "landingPage" ? "hidden" : ""])}>
          <a href={`/nft/${tokenId}`} target="_self">
            <NFTIcon />
          </a>
        </div>
      </section>

      {mediaUrl && mediaMimeType && (
        <section className="nfte__media">
          <a className="w-full" href={`/nft/${tokenId}`}>
            <Media
              media={mediaUrl}
              mediaMimeType={mediaMimeType}
              autoPlay={autoPlay}
              calcAspectRatio={calcAspectRatio}
            />
          </a>
        </section>
      )}
      {galleryType !== "landingPage" ? (
        <>
          <p className="pr1 pl1 nfte__name">{name}</p>
          <p className="pr1 pl1 pb1 nfte__description">{description}</p>

          <section className="nfte__meta">
            <div className="pl1 pr1 nfte__single-meta">
              <p className="nfte__label">Owner</p>
              <a
                target="_blank"
                rel="noreferrer"
                href={ownerOfUrl}
                className="nfte__meta-content"
              >
                {isAddress(ownerOf) ? toTrimmedAddress(ownerOf) : ownerOf}
              </a>
            </div>

            <div className="pl1 pr1 nfte__single-meta">
              <p className="nfte__label">Minted by</p>
              <a
                target="_blank"
                rel="noreferrer"
                href={platformUrl}
                className="nfte__meta-content"
              >
                {isAddress(platform) ? toTrimmedAddress(platform) : platform}
              </a>
            </div>

            <div className="pl1 pr1 nfte__single-meta">
              <p className="nfte__label">Minted on</p>
              <p
                title={`Block number: ${blockNumber}`}
                className="nfte__meta-content"
              >
                {tsFormat(timestamp)}
              </p>
            </div>
          </section>

          <a
            target="_blank"
            href={mediaPageUrl}
            rel="noreferrer"
            className="pr1 pl1 pt1 pb1 nfte__view-buy"
          >
            {mediaPageUrl?.includes("etherscan.io") ? "View" : "Buy / Bid"}
          </a>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default function Embed({
  data,
  style,
  className,
  darkMode,
  autoPlay,
  galleryType,
  calcAspectRatio,
}: Override<NFTEProps, { data?: NFTData }>) {
  useStyleSheet(styles);
  // console.log("galleryType embed lower", galleryType);
  if (!data) return <Loading style={style} />;
  return (
    <NFT
      data={data}
      className={className}
      style={style}
      darkMode={darkMode}
      autoPlay={autoPlay}
      galleryType={galleryType}
      calcAspectRatio={calcAspectRatio}
    />
  );
}
