import React from "react";
import DetailedPie from "@/components/Charts/DetailedPie";
import Button from "@/components/Button";
import { MintForm } from "@/utils/CreateModule";

const MintConfirm = ({
  address,
  mintForm,
  firstSale,
  secondarySales,
  proxyAddress,
  setMintKind,
  setAuctionInfo,
  thumbs,
  back,
  onSubmit,
}: {
  address: string;
  mintForm: MintForm;
  firstSale: string;
  secondarySales: string;
  proxyAddress: string;
  setMintKind: (Kind: MintForm["mintKind"]) => void;
  setAuctionInfo: (event: React.ChangeEvent<HTMLInputElement>) => void;
  thumbs: JSX.Element[];
  back: () => void;
  onSubmit: () => void;
}): JSX.Element => {
  const handleClick = () => {
    if (mintForm.mintKind === "1/1") {
      setMintKind("1/1 Auction");
    } else if (mintForm.mintKind === "1/1 Auction") {
      setMintKind("1/1");
    }
  };

  return (
    <>
      <div className="flex flex-col content-center place-content-stretch w-full min-h-full bg-dark-background">
        <div className="flex flex-col justify-center w-full h-full">
          <p className="py-4 text-lg text-center border-b border-dark-border text-dark-primary">
            Minting Zora NFT &lsquo;{`${mintForm.metadata.name}`}&rsquo; for{" "}
            {proxyAddress ? `Split Contract @ ${proxyAddress}` : `${address}`}
          </p>
          <div
            className="flex flex-col justify-center self-center py-8 my-auto w-full h-auto border-b lg:px-28 md:flex-col min-h-3/4 lg:min-h-33vh lg:flex-row border-dark-border"
            id="splits"
          >
            <div className="flex flex-col md:flex-row lg:w-1/2 lg:flex-col">
              <p className="my-auto font-semibold text-center md:ml-12 min-w-1/3 lg:m-auto lg:w-auto text-dark-primary">
                First Sale
              </p>
              <div className="z-10 mx-auto -my-32 w-full min-h-500px lg:-my-32 max-w-500px">
                <DetailedPie chartData={firstSale} isSecondaryChart={false} />
              </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse lg:w-1/2 lg:flex-col">
              <p className="my-auto font-semibold text-center md:mr-12 min-w-1/3 lg:m-auto lg:w-auto text-dark-primary">
                Secondary Sales
              </p>
              <div className="z-10 mx-auto -my-32 w-full min-h-500px lg:-my-32 max-w-500px">
                <DetailedPie chartData={secondarySales} isSecondaryChart />
              </div>
            </div>
          </div>
          <div
            className="flex flex-col self-center p-4 w-full h-auto border-b border-dark-border"
            id="details"
          >
            <div className="flex flex-row justify-center mx-auto mt-5 wrap">{thumbs}</div>
            <p className="m-auto mb-2 h-auto text-lg italic text-center text-dark-secondary">
              Media Kind: {mintForm.media.mimeType}
              <br />
              Title: {mintForm.metadata.name}
              <br />
              Description: {mintForm.metadata.description}
              <br />
              {mintForm.creatorBidShare}% Royalty on Future Sales.
            </p>
            {(mintForm.mintKind === "1/1 Auction" || mintForm.mintKind === "1/1") && (
              <div className="flex flex-col mx-auto my-4">
                <Button
                  isMain={false}
                  text={
                    mintForm.mintKind === "1/1"
                      ? "I'd like to Auction this NFT, too."
                      : "Nevermind, just mint."
                  }
                  onClick={() => handleClick()}
                />
                {mintForm.mintKind === "1/1 Auction" && (
                  <>
                    <label className="flex flex-col mt-4 text-dark-primary" htmlFor="reservePrice">
                      Reserve Price in ETH
                      <input
                        className="visible mb-8 outline-none bg-dark-background focus:outline-none focus:border-dark-secondary focus:ring-transparent"
                        type="number"
                        placeholder="%"
                        id="reservePrice"
                        name="reservePrice"
                        value={mintForm.auctionInfo?.reservePrice}
                        onChange={(e) => setAuctionInfo(e)}
                      />
                    </label>
                    <label className="flex flex-col text-dark-primary" htmlFor="duration">
                      Length of Auction in Hours
                      <input
                        className="visible outline-none bg-dark-background focus:outline-none focus:border-dark-secondary focus:ring-transparent"
                        type="number"
                        placeholder="%"
                        id="duration"
                        name="duration"
                        value={mintForm.auctionInfo?.duration}
                        onChange={(e) => setAuctionInfo(e)}
                      />
                    </label>
                    {/* <input
                      className="w-14 outline-none bg-dark-background focus:outline-none focus:border-transparent"
                      type="number"
                      placeholder="%"
                      id="auctionCurrency"
                      name="auctionCurrency"
                      value={mintForm.auctionInfo?.auctionCurrency}
                      onChange={(e) => setAuctionInfo(e)}
                    /> */}
                  </>
                )}
              </div>
            )}

            <div className="flex justify-center p-4 mx-auto space-x-6 w-auto border border-dark-border">
              <Button isMain={false} text="Back" onClick={back} />
              <Button
                isMain={false}
                text={
                  (mintForm.mintKind === "1/1" && `Mint NFT`) ||
                  (mintForm.mintKind === "1/1 Auction" && `Mint & Auction NFT`) ||
                  (mintForm.mintKind === "Edition" && `Create Edition`)
                }
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MintConfirm;
