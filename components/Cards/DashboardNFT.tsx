/* eslint-disable consistent-return */
import Link from "next/link"; // Dynamic routing
import Image from "next/image"; // Dynamic routing
import React, { useContext } from "react"; // React state management
import { NFTPreview, NFTDataContext, PreviewComponents } from "@zoralabs/nft-components";

const DashboardNFT = ({
  split,
  tokenId,
  onClick,
  isCreation,
}: {
  split: OurProxy;
  tokenId: number;
  onClick: () => void;
  isCreation: boolean;
}): JSX.Element => {
  let name;

  // const [hidden, setHidden] = useState(false);

  const ProfileThumb = () => {
    const { nft } = useContext(NFTDataContext);
    if (!nft.data?.nft) {
      return null;
    }
    if (nft.data?.owner !== split.id && isCreation) {
      // setHidden(true);
    }
    let { contentURI } = nft.data.zoraNFT;
    const regexIPFS = /https:\/\/(?<IPFShash>\w+).ipfs.dweb.link/g;

    if (contentURI.match(regexIPFS)) {
      const { IPFShash } = regexIPFS.exec(contentURI).groups;

      contentURI = `https://ipfs.io/ipfs/${IPFShash}`;

      return (
        <Link href={`/nft/${tokenId}`} passHref>
          <div className="p-2 w-full h-full bg-opacity-0 cursor-pointer">
            <Image
              alt={`An image of the NFT: ${name as string}`}
              height={330}
              width={330}
              objectFit="scale-down"
              src={contentURI as string}
            />
          </div>
        </Link>
      );
    }
  };

  // const TitleAuthor = () => {
  //   const { nft } = useContext(NFTDataContext);
  //   const { error, metadata } = useNFTMetadata(nft.data?.nft?.metadataURI, {
  //     allowInvalid: true,
  //   });
  //   if (!nft.data?.nft?.metadataURI) {
  //     return null;
  //   }
  //   if (metadata.attributes) {
  //     const creatorAddress = nft.data.nft.creator;
  //     name = metadata.name;

  //     return (
  //       <div className="flex flex-col p-2 border-t bg-dark-accent border-dark-border">
  //         <div className="text-bold">{metadata.name}</div>
  //         <div className="text-right">
  //           by: <Link href={`/profile/${creatorAddress}`}>{toTrimmedAddress(creatorAddress)}</Link>
  //         </div>
  //       </div>
  //     );
  //   }
  //   return null;
  // };

  return (
    <>
      {/* {!hidden && */}
      <div className="m-auto w-full h-full">
        <NFTPreview id={tokenId} onClick={onClick}>
          {/* <PreviewComponents.MediaThumbnail /> */}
          <ProfileThumb />
          <PreviewComponents.PricingComponent />
        </NFTPreview>
      </div>
      {/* } */}
    </>
  );
};

export default DashboardNFT;
