/* eslint-disable consistent-return */
import Link from "next/link"; // Dynamic routing
import Image from "next/image"; // Dynamic routing
import React, { useContext } from "react"; // React state management
import { useNFTMetadata } from "@zoralabs/nft-hooks";
import { NFTPreview, NFTDataContext } from "@zoralabs/nft-components";
import { toTrimmedAddress } from "@/ethereum/utils";

const ProfileNFT = ({
  tokenId,
  username,
  address,
}: {
  tokenId: string;
  username: string;
  address: string;
}): JSX.Element => {
  let name;
  const ProfileThumb = () => {
    const { nft } = useContext(NFTDataContext);
    if (!nft.data?.nft) {
      return null;
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
              src={`${contentURI as string}`}
            />
          </div>
        </Link>
      );
    }
  };

  const TitleAuthor = () => {
    const { nft } = useContext(NFTDataContext);
    const { error, metadata } = useNFTMetadata(nft.data?.nft?.metadataURI, {
      allowInvalid: true,
    });
    if (!nft.data?.nft?.metadataURI) {
      return null;
    }
    if (metadata.attributes) {
      const creatorAddress = nft.data.nft.creator;
      name = metadata.name;

      return (
        <div className="flex flex-col p-2 border-t bg-dark-accent border-dark-border">
          <div className="text-bold">{metadata.name}</div>
          <div className="text-right">
            by: <Link href={`/profile/${creatorAddress}`}>{toTrimmedAddress(creatorAddress)}</Link>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <NFTPreview id={tokenId}>
        {/* <PreviewComponents.MediaThumbnail /> */}
        <ProfileThumb />
        <TitleAuthor />
      </NFTPreview>
    </div>
  );
};

export default ProfileNFT;
