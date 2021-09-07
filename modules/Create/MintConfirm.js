import React from "react";
import PieChartPreview from "@/components/PieChartPreview";
import Button from "@/components/Button";

const MintConfirm = (props) => {
  const {
    address,
    formData,
    firstSale,
    secondarySales,
    proxyAddress,
    thumbs,
    back,
    onSubmit,
  } = props;

  return (
    <>
      <div className="flex flex-col content-center w-full h-auto place-content-stretch bg-dark-background">
        <div className="flex flex-col justify-center w-full">
          <p className="py-4 text-lg text-center border-b border-dark-border text-dark-primary">
            Minting Zora NFT &lsquo;{`${formData.title}`}&rsquo; for{" "}
            {proxyAddress ? `Split Contract @ ${proxyAddress}` : `${address}`}
          </p>
          <div
            className="flex flex-col self-center w-full h-auto px-4 pt-8 pb-4 my-auto border-b justify-evenly xl:flex-row border-dark-border "
            id="splits"
          >
            <div className="flex flex-col w-1/2">
              <p className="m-auto font-semibold text-center text-dark-primary">
                First Sale:
              </p>
              <div className="z-10 w-full mx-auto -my-32 max-w-500px">
                <PieChartPreview chartData={firstSale} secondaryBool={false} />
              </div>
            </div>
            <div className="flex flex-col w-1/2">
              <p className="m-auto font-semibold text-center text-dark-primary">
                Secondary Sales:
              </p>
              <div className="z-10 w-full mx-auto -my-32 max-w-500px">
                <PieChartPreview
                  chartData={secondarySales}
                  secondaryBool={true}
                />
              </div>
            </div>
          </div>
          <div
            className="flex flex-col self-center w-full h-auto p-4 border-b border-dark-border"
            id="details"
          >
            <div className="flex flex-row justify-center mx-auto mt-5 wrap">
              {thumbs}
            </div>
            <p className="h-auto m-auto mb-2 text-lg italic text-center text-dark-secondary">
              Media Kind: {formData.mediaKind}
              <br />
              Title: {formData.title}
              <br />
              Description: {formData.description}
              <br />
              {formData.creatorBidShare}% Royalty on Future Sales.
            </p>
            <div className="flex justify-center w-auto p-4 mx-auto space-x-6 border border-dark-border">
              <Button isMain={false} text={"Back"} onClick={back} />
              <Button isMain={false} text={"Next"} onClick={onSubmit} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MintConfirm;
