import { NFTE } from "@nfte/react";
import { FullComponents, NFTFullPage } from "@zoralabs/nft-components";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DetailedPie from "@/components/Charts/DetailedPie";
import Table from "@/components/Charts/Table";
import { SplitEdition } from "@/utils/OurzSubgraph";
import Button from "@/components/Button";
import web3 from "@/app/web3";

const FullPageEdition = ({
  metadata,
  ownAccount,
  chartData,
  saleInfo,
}: {
  metadata: SplitEdition;
  ownAccount: boolean;
  chartData: {
    name: string;
    shares: number;
  }[];
  saleInfo: { maxSupply: number; currentSupply: number; salePrice: number; whitelistOnly: boolean };
}): JSX.Element => {
  const { signer } = web3.useContainer();
  const [loading, setLoading] = useState(true); // Global loading state
  const [videoError, setVideoError] = useState(false); // Global loading state
  const recipients = metadata?.creator.splitRecipients;

  const setSalePrice = async () => {
    // console.log(`hi`);
  };
  const setEditionMinter = async () => {
    // console.log(`hi`);
  };
  const mintEditions = async () => {
    // console.log(`hi`);
  };

  return (
    <>
      <div className="flex object-contain justify-center p-8 border-b max-h-75vh text-dark-primary border-dark-border bg-dark-accent min-h-33vh">
        {loading && <p>loading...</p>}
        {metadata.animationUrl !== " " && !videoError ? (
          <video
            muted
            autoPlay
            controls={false}
            loop
            playsInline
            onLoadedData={() => setLoading(false)}
            onError={() => setVideoError(true)}
          >
            <source src={metadata.animationUrl} />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="object-contain max-w-full max-h-full cont"
            alt={`${metadata.name}`}
            src={metadata.imageUrl}
            onLoad={() => setLoading(false)}
          />
        )}
      </div>
      {metadata && (
        <div className="p-6 mx-auto mb-16 text-dark-primary max-w-11/12 xl:max-w-5/6">
          <div className="flex flex-col content-center mb-6 w-full xl:flex-row">
            <div className="flex flex-col xl:w-7/12">
              <div className="flex flex-col justify-between md:flex-row">
                <div className="flex flex-col justify-between h-full">
                  <p className="text-2xl text-dark-primary">{`${metadata.name}`}</p>
                  <p className="text-xl text-dark-primary">{`(${metadata.symbol})`}</p>
                  <p className="whitespace-pre-wrap break-words text-dark-primary">{`${metadata.description}`}</p>
                </div>
              </div>
              <div className="flex justify-between w-full h-auto">
                <div className="mx-4 my-auto w-full text-center border h-min border-dark-border">
                  <ol>
                    <li>MINT HISTORY HERE </li>
                  </ol>
                </div>
                <div className="self-end p-1 m-2 text-center">
                  <p className="mb-1">
                    {saleInfo.maxSupply > 0
                      ? `${saleInfo.currentSupply}/${saleInfo.maxSupply}`
                      : `${saleInfo.currentSupply}/∞`}
                    <br />
                    Minted
                  </p>

                  <div className="p-1 border border-dark-border">
                    {saleInfo.salePrice > 0 ? (
                      <Button
                        onClick={() => mintEditions()}
                        text={`Purchase for ${saleInfo.salePrice}Ξ`}
                        isMain={false}
                      />
                    ) : (
                      `Minting Paused`
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col mx-4 my-2 border border-dark-border">
                <p className="p-4 w-full text-xs border-b h-min tracking-2-wide border-dark-border">
                  PROOF OF AUTHENTICITY
                </p>
                <a
                  className="hover:underline hover:cursor"
                  href={`https://etherscan.io/address/${metadata.id}#code`}
                >
                  <p className="p-4 w-full text-base font-semibold border-b h-min border-dark-border">
                    View on Etherscan.io
                  </p>
                </a>
                <a
                  className="hover:underline hover:cursor"
                  href={
                    metadata.animationUrl !== " "
                      ? `${metadata.animationUrl}`
                      : `${metadata.imageUrl}`
                  }
                >
                  <p className="p-4 w-full text-base font-semibold border-b h-min border-dark-border">
                    View on IPFS
                  </p>
                </a>
                {/* <a
                  className="hover:underline hover:cursor"
                  href={`https://zora.co/?contracts%5B0%5D%5BtokenAddress%5D=/${metadata.id}`}
                > */}
                <p className="p-4 w-full text-base font-semibold border-b h-min border-dark-border hover:cursor-not-allowed">
                  <s>View on Zora</s> <i>Coming Soon!</i>
                </p>
                {/* </a> */}
              </div>
            </div>
            <div className="flex flex-col justify-between xl:mt-0 xl:w-5/12 xl:ml-6">
              <div className="flex flex-col p-4 my-2 text-center border border-dark-border">
                <p className="mb-4 text-sm tracking-wide">EIP-2981 Creator Royalty:</p>
                <p className="text-2xl font-semibold font-hero">{`${
                  metadata.royaltyBPS / 100
                }%`}</p>
              </div>
              {recipients?.length > 1 && <Table recipients={recipients} />}
              {chartData?.length > 1 && (
                <div className="h-96 border border-dark-border">
                  <div className="mx-auto -mt-8 -mb-12 w-96 h-96">
                    <DetailedPie chartData={chartData} secondaryBool={false} />
                  </div>
                </div>
              )}
            </div>
          </div>
          {!ownAccount ? (
            ""
          ) : (
            <>
              Placeholders {`->`}
              <Button text="Set Sale Price" isMain={false} onClick={() => setSalePrice()} />
              <Button
                text="Set Approved Minter"
                isMain={false}
                onClick={() => setEditionMinter()}
              />
              <Button text="Mint To Recipients" isMain={false} onClick={() => mintEditions()} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default FullPageEdition;
