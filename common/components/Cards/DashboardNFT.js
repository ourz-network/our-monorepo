import Link from "next/link"; // Dynamic routing
import Image from "next/image"; // Dynamic routing
import React, { useContext, useState } from "react"; // React state management
import { useNFTMetadata } from "@zoralabs/nft-hooks";
import { toTrimmedAddress } from "@/ethereum/utils";
import {
  NFTPreview,
  NFTDataContext,
} from "@zoralabs/nft-components";

const DashboardNFT = ({
  split,
  tokenId,
  onClick
}) => {
  let name;

  const [hidden, setHidden] = useState(false)

  const ProfileThumb = () => {
    const { nft } = useContext(NFTDataContext);
    console.log(nft);
    if (!nft.data?.nft) {
      return null;
    }
    if (nft.data?.owner != split.id) {
      setHidden(true)
    }
    console.log(`DashboardNFT.js\n   - ProfileThumb\n   - nft:\n${JSON.stringify(nft)}`);
    let contentURI = nft.data.zoraNFT.contentURI;
    const regexIPFS = /https\:\/\/(?<IPFShash>\w+).ipfs.dweb.link/g;

    if (contentURI.match(regexIPFS)) {
      const IPFShash = regexIPFS.exec(contentURI).groups.IPFShash;
      console.log(`DashboardNFT.js\n   - ProfileThumb\n   - IPFShash:\n${IPFShash}`);

      contentURI = `https://ipfs.io/ipfs/` + `${IPFShash}`;
      console.log(`DashboardNFT.js\n   - ProfileThumb\n   - contentURI:\n${JSON.stringify(contentURI)}`);

      return (
        <Link href={`/nft/${tokenId}`} passHref>
          <div className="w-full h-full p-2 bg-opacity-0 cursor-pointer">
            <Image
              alt={`An image of the NFT: ${name}`}
              height={330}
              width={330}
              objectFit="scale-down"
              src={`${contentURI}`}
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
    } else if (metadata.attributes) {
      const creatorAddress = nft.data.nft.creator;
      name = metadata.name;
      console.log(`metadata: `, metadata);
      console.log(`DashboardNFT.js\n   - TitleAuthor\n   - nft.data:\n${JSON.stringify(nft.data.nft.creator)}`);

      return (
        <div className="flex flex-col p-2 border-t bg-dark-accent border-dark-border">
          <div className="text-bold">{metadata.name}</div>
          <div className="text-right">
            by:{" "}
            <Link href={`/${creatorAddress}`}>
              {toTrimmedAddress(creatorAddress)}
            </Link>
          </div>
        </div>
      );
    } else return null;
  };

  return (
    <>
      {!hidden &&
        <div className="w-full h-full m-auto">
          <NFTPreview id={tokenId} onClick={onClick}>
            {/* <PreviewComponents.MediaThumbnail /> */}
            <ProfileThumb />
            <TitleAuthor />
          </NFTPreview>
        </div>
      }
    </>
  );
};

export default DashboardNFT;
