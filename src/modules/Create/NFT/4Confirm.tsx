import React from "react";
import DetailedPie from "@/components/Charts/DetailedPie";
import Button from "@/components/Button";
import { MintForm } from "@/types/CreateModule";

const MintConfirm = ({
  address,
  mintForm,
  firstSale,
  secondarySales,
  proxyAddress,
  thumbs,
  back,
  onSubmit,
}: {
  address: string;
  mintForm: MintForm;
  firstSale: string;
  secondarySales: string;
  proxyAddress: string;
  thumbs: JSX.Element[];
  back: () => void;
  onSubmit: () => void;
}): JSX.Element => (
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
              <DetailedPie chartData={firstSale} secondaryBool={false} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row-reverse lg:w-1/2 lg:flex-col">
            <p className="my-auto font-semibold text-center md:mr-12 min-w-1/3 lg:m-auto lg:w-auto text-dark-primary">
              Secondary Sales
            </p>
            <div className="z-10 mx-auto -my-32 w-full min-h-500px lg:-my-32 max-w-500px">
              <DetailedPie chartData={secondarySales} secondaryBool />
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
          <div className="flex justify-center p-4 mx-auto space-x-6 w-auto border border-dark-border">
            <Button isMain={false} text="Back" onClick={back} />
            <Button isMain={false} text="Next" onClick={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default MintConfirm;
