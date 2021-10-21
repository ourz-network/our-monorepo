/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable consistent-return */
import Link from "next/link"; // Dynamic routing
import Image from "next/image"; // Dynamic routing
import React, { useEffect, useState } from "react"; // React state management
import { ethers } from "ethers";
import { NFTPreview, PreviewComponents } from "@zoralabs/nft-components";
import editionJSON from "@/ethereum/abis/SingleEditionMintable.json";
import { NFTCard } from "@/modules/subgraphs/utils";
import { toTrimmedAddress } from "@/utils/index";

const NFTPreviewCard = ({ post }: { post: NFTCard }): JSX.Element => {
  const [supply, setSupply] = useState<number | undefined>(undefined);

  const MediaThumb = () => (
    <Link
      href={
        post.editionAddress
          ? `/nft/edition/${post.editionAddress}`
          : `/nft/${post?.tokenId as string}`
      }
      passHref
    >
      <div className="content-center p-2 bg-opacity-0 cursor-pointer w-preview h-preview">
        {post.mimeType.startsWith("video") && (
          <video muted autoPlay controls playsInline>
            <source src={post.contentURI} />
          </video>
        )}
        {post.mimeType.startsWith("image") && (
          <Image
            alt={`An image of the NFT: ${post.name}`}
            height={330}
            width={330}
            objectFit="scale-down"
            src={post.contentURI}
          />
        )}
      </div>
    </Link>
  );

  const Title = () => (
    <div className="flex flex-col px-2 py-1 rounded-b-xl border-t bg-dark-accent border-dark-border">
      <div className="mx-auto mb-2 text-xl tracking-wider font-hero text-dark-primary">
        {!post.name ? `Untitled` : post.name}
      </div>
      {supply !== undefined ? (
        <div className="self-end mr-1 text-xs italic text-dark-primary">
          {supply}/{post.editionSize} Minted
        </div>
      ) : (
        <div className="self-end mr-1 text-xs italic text-dark-primary">
          by:{` `}
          <Link href={`/profile/${post.creator}`}>{toTrimmedAddress(post.creator)}</Link>
        </div>
      )}
    </div>
  );

  useEffect(() => {
    async function getEditionSupply(): Promise<void> {
      const queryProvider = ethers.providers.getDefaultProvider("rinkeby", {
        infura: process.env.NEXT_PUBLIC_INFURA_ID,
        alchemy: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
        pocket: process.env.NEXT_PUBLIC_POKT_ID,
        etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_KEY,
      });
      const editionContract = new ethers.Contract(
        post?.editionAddress as string,
        editionJSON.abi,
        queryProvider
      );
      const totalSupply = await editionContract.totalSupply();
      setSupply(Number(totalSupply.toString()));
    }
    if (post.editionAddress) {
      getEditionSupply().then(
        () => {},
        () => {}
      );
    }
  }, [post]);

  if (!post) return <></>;
  return (
    <>
      {post.nftKind === "Edition" && (
        <div className="m-auto">
          <div className="m-2 rounded-xl border border-dark-border">
            <MediaThumb />
            <Title />
          </div>
        </div>
      )}
      {post.nftKind === "1/1" && (
        <div className="m-auto">
          <NFTPreview id={post.tokenId}>
            <MediaThumb />
            <Title />
            <PreviewComponents.PricingComponent />
          </NFTPreview>
        </div>
      )}
    </>
  );
};

export default NFTPreviewCard;
