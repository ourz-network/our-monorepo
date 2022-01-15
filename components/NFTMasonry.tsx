/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react"; // React state management
import { ReserveAuctionPartialFragment } from "@zoralabs/nft-hooks/dist/graph-queries/zora-graph-types";
import { IndexerTokenWithAuctionFragment } from "@zoralabs/nft-hooks/dist/graph-queries/zora-indexer-types";
import { useZNFT } from "@zoralabs/nft-hooks";

interface Token {
  nft: {
    tokenData: IndexerTokenWithAuctionFragment;
    auctionData: ReserveAuctionPartialFragment;
  };
}

interface TokenInfo {
  tokenId: string;
  tokenContract: string;
  metadata: any;
  image: any;
}

const NFTMasonry = ({
  token,
  tokenInfo,
  onClick,
}: {
  token: Token;
  tokenInfo: TokenInfo;
  onClick: () => void;
}) => {
  const { media, metadata } = token.nft.tokenData;
  const [contentURI, setContentURI] = useState<string | undefined>();
  const [json, setJSON] = useState<any | undefined>();

  const [isHover, setIsHover] = useState<boolean | boolean>(false);

  useEffect(() => {
    function setState() {
      if (contentURI !== media?.contentURI) {
        setContentURI(media.contentURI);
      }
      if (json !== metadata?.json) {
        setJSON(metadata.json);
        console.log(json?.mimeType);
      }
    }
    setState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media, metadata]);

  const zNFTData = useZNFT(`${tokenInfo.tokenId}`);
  console.log(zNFTData);

  /**       ---  Dual-axis Masonry Layout  ---
   * For Landing Page: hide posts until they are loaded
   * and then set classname of "`orientation`-`ratio`"
   */

  const [aspectRatio, setAspectRatio] = useState<string | string>("");

  const calcAspectRatio = (loadedMedia) => {
    let ratio;
    let width;
    let height;

    if (loadedMedia.target.naturalWidth) {
      // Photo
      console.log("RATIO-PHOTO: ", loadedMedia);
      width = loadedMedia.target.naturalWidth;
      height = loadedMedia.target.naturalHeight;
      ratio = width / height;
      console.log(width, height, ratio);
    } else if (loadedMedia.target.videoWidth) {
      // Video
      // console.log("RATIO-VIDEO ", loadedMedia);
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

  const container = (child) => (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={`m-auto transition-shadow ${aspectRatio} landingPage-item shadow-deep cursor-hover`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => onClick()}
    >
      {child}

      {/* <NFTPreview
        initialData={token}
        id={tokenInfo.tokenId}
        contract={tokenInfo.tokenContract}
        onClick={onClick}
        useBetaIndexer
      >
        
        <PreviewComponents.PricingComponent />
      </NFTPreview> */}
    </div>
  );

  function toTrimmedAddress(value: string) {
    if (!value) return "";
    return `${value.substr(0, 5)}…${value.substr(value.length - 3, value.length)}`;
  }

  if (json?.mimeType?.includes("video")) {
    console.log("VIDEO", tokenInfo.tokenId);
    const child = (
      <div className="flex flex-col w-full max-w-lg h-full cursor-pointer xl:h-full">
        <div className="object-cover relative w-full h-full bg-transparent">
          {isHover && (
            <div className="flex absolute bottom-0 z-20 justify-between items-center w-full text-white bg-black bg-opacity-75">
              <div className="w-1/2 text-xl text-center overflow-ellipsis">
                {tokenInfo.metadata.name}
              </div>
              <div className="flex-col items-center my-2 space-y-1 w-1/2 text-center">
                <div className="">#{tokenInfo.tokenId}</div>
                {zNFTData?.data?.nft?.owner && (
                  <div className="text-xs">{toTrimmedAddress(zNFTData.data.nft.owner)}</div>
                )}
              </div>
            </div>
          )}
          <video
            muted
            autoPlay
            controls={false}
            loop
            playsInline
            onLoadedMetadata={(metadata) => calcAspectRatio(metadata)}
          >
            <source src={media.contentURI} />
          </video>
        </div>
      </div>
    );
    return container(child);
  }

  if (json?.mimeType?.includes("image")) {
    const child = (
      <div className="flex flex-col justify-center cursor-pointer">
        <div className="object-cover relative bg-transparent">
          {isHover && (
            <div className="flex absolute bottom-0 z-20 justify-between items-center w-full text-white bg-black bg-opacity-75">
              <div className="w-1/2 text-xl text-center overflow-ellipsis">
                {tokenInfo.metadata.name}
              </div>
              <div className="flex-col items-center my-2 space-y-1 w-1/2 text-center">
                <div className="">#{tokenInfo.tokenId}</div>
                {zNFTData?.data?.nft?.owner && (
                  <div className="text-xs">{toTrimmedAddress(zNFTData.data.nft.owner)}</div>
                )}
              </div>
            </div>
          )}
          <img
            alt={tokenInfo.metadata.name}
            src={media?.contentURI || null}
            className="w-full h-full"
            onLoad={(loadedMedia) => {
              calcAspectRatio(loadedMedia);
            }}
          />
        </div>
      </div>
    );
    return container(child);
  }
  return <> </>;
  // return container();
};

export default NFTMasonry;
