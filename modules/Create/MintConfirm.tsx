import React from "react";
import DetailedPie from "@/components/Charts/DetailedPie";
import Button from "@/components/Button";

const MintConfirm = ({
  address,
  formData,
  firstSale,
  secondarySales,
  proxyAddress,
  thumbs,
  back,
  onSubmit,
}: {
  address: string;
  formData: Record<string, unknown>;
  firstSale: string;
  secondarySales: string;
  proxyAddress: string;
  thumbs: JSX.Element;
  back: () => void;
  onSubmit: () => void;
}): JSX.Element => (
  <>
    <div className="flex flex-col content-center place-content-stretch w-full h-auto bg-dark-background">
      <div className="flex flex-col justify-center w-full">
        <p className="py-4 text-lg text-center border-b border-dark-border text-dark-primary">
          Minting Zora NFT &lsquo;{`${formData.title}`}&rsquo; for{" "}
          {proxyAddress ? `Split Contract @ ${proxyAddress}` : `${address}`}
        </p>
        <div
          className="flex flex-col justify-evenly self-center px-4 pt-8 pb-4 my-auto w-full h-auto border-b xl:flex-row border-dark-border"
          id="splits"
        >
          <div className="flex flex-col w-1/2">
            <p className="m-auto font-semibold text-center text-dark-primary">First Sale:</p>
            <div className="z-10 mx-auto -my-32 w-full max-w-500px">
              <DetailedPie chartData={firstSale} secondaryBool={false} />
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <p className="m-auto font-semibold text-center text-dark-primary">Secondary Sales:</p>
            <div className="z-10 mx-auto -my-32 w-full max-w-500px">
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
            Media Kind: {formData.mediaKind}
            <br />
            Title: {formData.title}
            <br />
            Description: {formData.description}
            <br />
            {formData.creatorBidShare}% Royalty on Future Sales.
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
