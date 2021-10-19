/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable consistent-return */
import Link from "next/link"; // Dynamic routing
import Image from "next/image"; // Dynamic routing
import React, { useEffect, useState } from "react"; // React state management
import { ethers } from "ethers";
import { SplitEdition } from "@/utils/OurzSubgraph";
import editionJSON from "@/ethereum/abis/SingleEditionMintable.json";

const editionABI = editionJSON.abi;

const EditionThumb = ({ edition }: { edition: SplitEdition }): JSX.Element => {
  const [supply, setSupply] = useState<number | undefined>(undefined);
  useEffect(() => {
    async function getTotalSupply(): Promise<void> {
      const queryProvider = ethers.providers.getDefaultProvider("rinkeby", {
        infura: process.env.NEXT_PUBLIC_INFURA_ID,
        alchemy: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
        pocket: process.env.NEXT_PUBLIC_POKT_ID,
        etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_KEY,
      });
      const editionContract = new ethers.Contract(edition.id, editionABI, queryProvider);
      const totalSupply = await editionContract.totalSupply();
      setSupply(Number(totalSupply.toString()));
    }
    if (edition.id) {
      getTotalSupply().then(
        () => {},
        () => {}
      );
    }
  }, [edition]);

  const MediaThumb = () => {
    let contentURI;
    if (edition.animationUrl !== " ") {
      contentURI = edition.animationUrl;
    } else {
      contentURI = edition.imageUrl;
    }
    const regexIPFS = /https:\/\/(?<IPFShash>\w+).ipfs.dweb.link/g;

    if (contentURI.match(regexIPFS)) {
      const { IPFShash } = regexIPFS.exec(contentURI).groups;

      contentURI = `https://ipfs.io/ipfs/${IPFShash as string}`;
    }

    return (
      <Link href={`/nft/edition/${edition.id}`} passHref>
        <div className="flex justify-center p-2 m-auto bg-opacity-0 cursor-pointer">
          <Image
            alt={`An image of the NFT: ${edition.name}`}
            height={330}
            width={330}
            objectFit="scale-down"
            src={contentURI}
          />
        </div>
      </Link>
    );
  };

  const Title = () => (
    <div className="flex flex-col px-2 py-1 border-t bg-dark-accent border-dark-border">
      <div className="mx-auto mb-2 text-xl tracking-wider text-bold font-hero text-dark-primary">
        {edition.name}
      </div>
      {supply !== undefined && (
        <div className="self-end mr-1 text-xs italic text-dark-primary">
          {supply}/{edition.editionSize} Minted
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="m-auto w-full h-full">
        <div className="m-2 border border-dark-border">
          <MediaThumb />
          <Title />
        </div>
      </div>
    </>
  );
};

export default EditionThumb;
