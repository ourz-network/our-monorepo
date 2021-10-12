/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link"; // Dynamic routing
import Image from "next/image";
import React, { useState, useEffect } from "react"; // React state management
import { ethers } from "ethers";
import { Zora } from "@zoralabs/zdk";
import axios from "axios";
import { useNFTMetadata } from "@zoralabs/nft-hooks";
import { Ourz20210928 } from "@/Create/types/20210928";
import { Media } from "@/utils/ZoraSubgraph";

interface NextImageOnLoad {
  naturalWidth: number;
  naturalHeight: number;
}

const HomeNFT = ({ post }: { post: Media & { metadata: Ourz20210928 } }): JSX.Element => {
  const tokenId = post.id;

  /**       ---  Dual-axis Masonry Layout  ---
   * For Landing Page: hide posts until they are loaded
   * and then set classname of "`orientation`-`ratio`"
   */
  const [aspectRatio, setAspectRatio] = useState("");

  const calcAspectRatio = (
    loadedMedia: NextImageOnLoad | React.SyntheticEvent<HTMLVideoElement, Event>
  ): void => {
    let ratio;
    let width;
    let height;

    if (loadedMedia?.naturalWidth) {
      // Photo
      width = loadedMedia.naturalWidth;
      height = loadedMedia.naturalHeight;
      ratio = width / height;
    } else if (loadedMedia?.target) {
      // Video
      width = Number(loadedMedia.target.videoWidth);
      height = Number(loadedMedia.target.videoHeight);
      ratio = width / height;
    } else {
      setAspectRatio("hidden");
    }

    if (ratio > 0.8 && ratio < 1.24) {
      // Mostly Square
      setAspectRatio("square");
    }

    if (ratio > 1.21) {
      // landscape
      if (ratio < 1.3) {
        setAspectRatio("landscape-4x5");
      } else if (ratio < 1.385) {
        setAspectRatio("landscape-3x4");
      } else if (ratio < 1.5) {
        setAspectRatio("landscape-5x7");
      } else if (ratio < 1.68) {
        setAspectRatio("landscape-2x3");
      } else if (ratio < 1.9) {
        setAspectRatio("landscape-9x16");
      } else if (ratio < 2.5) {
        setAspectRatio("landscape-2x1");
      } else {
        setAspectRatio("landscape-widest");
      }
    }

    if (ratio <= 0.83) {
      // portrait
      if (ratio >= 0.765) {
        setAspectRatio("portrait-4x5");
      } else if (ratio >= 0.735) {
        setAspectRatio("portrait-3x4");
      } else if (ratio >= 0.685) {
        setAspectRatio("portrait-5x7");
      } else if (ratio >= 0.605) {
        setAspectRatio("portrait-2x3");
      } else if (ratio >= 0.53) {
        setAspectRatio("portrait-9x16");
      } else if (ratio > 0.41) {
        setAspectRatio("portrait-2x1");
      } else {
        setAspectRatio("portrait-tallest");
      }
    }
  };

  if (post?.metadata?.mimeType?.includes("video")) {
    return (
      <div
        key={tokenId}
        className={`transition-shadow cursor-pointer ${aspectRatio} landingPage-item shadow-deep`}
      >
        <div className="flex flex-col w-full h-full cursor-pointer xl:h-full">
          <Link
            href={{
              pathname: "/nft/[tokenId]",
              query: { tokenId },
            }}
            passHref
          >
            <div className="object-cover relative w-full h-full bg-transparent">
              {post.contentURI && (
                <video
                  muted
                  autoPlay
                  controls={false}
                  loop
                  playsInline
                  onLoadedMetadata={(loadedMedia) => calcAspectRatio(loadedMedia)}
                >
                  <source src={post.contentURI} />
                </video>
              )}
            </div>
          </Link>
        </div>
      </div>
    );
  }
  if (post?.metadata?.mimeType?.includes("image")) {
    return (
      <div
        className={`border transition-shadow cursor-pointer ${aspectRatio} landingPage-item shadow-deep border-dark-accent`}
      >
        <div className="flex flex-col w-full h-full xl:h-full">
          <Link
            href={{
              pathname: "/nft/[tokenId]",
              query: { tokenId },
            }}
            passHref
          >
            <div className="object-cover relative w-full h-full bg-transparent">
              {post.contentURI && (
                <Image
                  alt={`NFT #${tokenId} Thumbnail`}
                  layout="fill"
                  objectFit="contain"
                  quality={60}
                  src={post.contentURI}
                  placeholder="empty"
                  className="w-full h-full"
                  sizes="50vw"
                  onLoadingComplete={(loadedMedia) => calcAspectRatio(loadedMedia)}
                />
              )}
            </div>
          </Link>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line no-console
  console.log("Error Displaying Post.\n", post);
  return <></>;
};

export default HomeNFT;
