import Link from "next/link"; // Dynamic routing
import Image from "next/image";
import React, { useState, useEffect } from "react"; // React state management
import { ethers } from "ethers";
import { Zora } from "@zoralabs/zdk";
import axios from "axios";

const HomeNFT = (props) => {
  const queryProvider = ethers.providers.getDefaultProvider("rinkeby", {
    infura: process.env.NEXT_PUBLIC_INFURA_ID,
    alchemy: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    pocket: process.env.NEXT_PUBLIC_POKT_ID,
    etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_KEY,
  });
  const zoraQuery = new Zora(queryProvider, 4);
  const [loading, setLoading] = useState(true);
  const { tokenId } = props;
  const [metadata, setMetadata] = useState("0x00");
  const [contentURI, setContentURI] = useState();
  console.log(metadata);
  useEffect(() => {
    async function getTokenInfo(tokenId) {
      const metadataURI = await zoraQuery.fetchMetadataURI(tokenId);
      const res = await axios.get(`${metadataURI}`);
      setMetadata(res.data);
      const dirtyContentURI = await zoraQuery.fetchContentURI(tokenId);
      const regexIPFS = /https:\/\/(?<IPFShash>\w+).ipfs.dweb.link/g;
      if (dirtyContentURI.match(regexIPFS)) {
        // console.log(dirtyContentURI);
        const { IPFShash } = regexIPFS.exec(dirtyContentURI).groups;
        // console.log(`HomeNFT.js\n   - HomeThumb\n   - IPFShash:\n${IPFShash}`);
        setContentURI(`https://ipfs.io/ipfs/${IPFShash}`);
      } else {
        setContentURI(dirtyContentURI);
      }
      // console.log(contentURI);
    }
    if (tokenId) {
      getTokenInfo(tokenId);
      if (contentURI) {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenId]);

  /**       ---  Dual-axis Masonry Layout  ---
   * For Landing Page: hide posts until they are loaded
   * and then set classname of "`orientation`-`ratio`"
   */
  const [aspectRatio, setAspectRatio] = useState();

  const calcAspectRatio = (loadedMedia) => {
    // console.log(`HomeNFT.js - loadedMedia:\n`, loadedMedia);
    let ratio;
    let width;
    let height;

    if (loadedMedia.naturalWidth) {
      // Photo
      width = loadedMedia.naturalWidth;
      height = loadedMedia.naturalHeight;
      ratio = width / height;
    } else if (loadedMedia.target) {
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
    // console.log(`#${tokenId} \n ratio :${aspectRatio}`);
  };

  if (metadata?.mimeType?.includes("video")) {
    return (
      <div className={`transition-shadow ${aspectRatio} landingPage-item shadow-deep cursor-hover`}>
        <div className="flex flex-col w-full h-full cursor-pointer xl:h-full">
          <Link
            href={{
              pathname: "/nft/[tokenId]",
              query: { tokenId },
            }}
            passHref
          >
            <div className="object-cover relative w-full h-full bg-transparent">
              {contentURI && (
                <video
                  muted
                  autoPlay
                  controls={false}
                  loop
                  playsInline
                  onLoadedMetadata={calcAspectRatio}
                  alt={`NFT ${tokenId} Thumbnail`}
                >
                  <source src={contentURI} />
                </video>
              )}
            </div>
          </Link>
        </div>
      </div>
    );
  }
  if (metadata?.mimeType?.includes("image")) {
    return (
      <div
        className={`border transition-shadow ${aspectRatio} landingPage-item shadow-deep border-dark-accent cursor-hover`}
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
              {contentURI && (
                <Image
                  alt={`NFT ${tokenId} Thumbnail`}
                  layout="fill"
                  objectFit="contain"
                  quality={65}
                  src={contentURI}
                  placeholder="empty"
                  className="w-full h-full"
                  onLoadingComplete={(loadedMedia) => calcAspectRatio(loadedMedia)}
                />
              )}
            </div>
          </Link>
        </div>
      </div>
    );
  }
  return null;
};

export default HomeNFT;
