/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable consistent-return */
import Link from "next/link"; // Dynamic routing
import Image from "next/image"; // Dynamic routing
import React, { useContext } from "react"; // React state management
import { NFTPreview, NFTDataContext, PreviewComponents } from "@zoralabs/nft-components";
import { useNFTMetadata } from "@zoralabs/nft-hooks";

const DashboardNFT = ({
  tokenId,
  onClick,
}: {
  tokenId: string;
  onClick: () => void;
}): JSX.Element => {
  const ProfileThumb = () => {
    const { nft } = useContext(NFTDataContext);
    if (!nft.data?.nft) {
      return null;
    }
    let { contentURI }: { contentURI: string } = nft.data.zoraNFT;
    const regexIPFS = /https:\/\/(?<IPFShash>\w+).ipfs.dweb.link/g;

    if (contentURI.match(regexIPFS)) {
      const { IPFShash } = regexIPFS.exec(contentURI).groups;

      contentURI = `https://ipfs.io/ipfs/${IPFShash as string}`;
    }

    return (
      <Link href={`/nft/${tokenId}`} passHref>
        <div className="p-2 w-full h-full bg-opacity-0 cursor-pointer">
          <Image
            alt="An image of the NFT"
            height={330}
            width={330}
            objectFit="scale-down"
            src={contentURI}
          />
        </div>
      </Link>
    );
  };

  const Title = () => {
    const { nft } = useContext(NFTDataContext);
    const { metadata } = useNFTMetadata(nft.data?.nft?.metadataURI, {
      allowInvalid: true,
    });
    if (!nft.data?.nft?.metadataURI) {
      return null;
    }
    if (metadata.attributes) {
      return (
        <div className="flex p-2 border-t bg-dark-accent border-dark-border">
          <div className="mx-auto text-bold">{metadata.name}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="m-auto w-full h-full">
        <NFTPreview id={tokenId} onClick={onClick}>
          <ProfileThumb />
          <Title />
          <PreviewComponents.PricingComponent />
        </NFTPreview>
      </div>
    </>
  );
};

export default DashboardNFT;
