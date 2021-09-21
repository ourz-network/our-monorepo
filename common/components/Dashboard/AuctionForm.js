import web3 from "@/app/web3";
import Button from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/router";

const AuctionForm = ({ tokenId, split, onClick }) => {
  const { createZoraAuction } = web3.useContainer();
  const Router = useRouter();

  const [formData, setFormData] = useState({
    proxyAddress: split.id,
    tokenId: tokenId,
    tokenContract: "0x7C2668BD0D3c050703CEcC956C11Bd520c26f7d4",
    duration: 0,
    reservePrice: 1,
    curator: split.id,
    curatorFeePercentage: 0,
    auctionCurrency: "0x0000000000000000000000000000000000000000",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const auctionId = await createZoraAuction(formData);
    if (auctionId) {
      onClick();
      Router.push(`/nft/${tokenId}`);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="w-48 h-48 m-auto overflow-hidden bg-center bg-cover rounded-lg bg-zorb aspect-w-2 aspect-h-3 sm:col-span-4 lg:col-span-5"></div>
        <div className="sm:col-span-8 lg:col-span-7 text-dark-primary">
          Auction for {tokenId}
        </div>
        <form className="flex flex-col space-y-6" onSubmit={(e) => onSubmit(e)}>
          <label
            htmlFor="reservePrice"
            className="text-sm font-medium text-dark-primary"
          >
            Reserve Price in ETH
          </label>
          <input type="text" placeholder={formData.reservePrice} />
          <label
            htmlFor="duration"
            className="text-sm font-medium text-dark-primary"
          >
            Duration in Seconds
          </label>
          <input type="text" placeholder={formData.duration} />

          <div className="flex justify-between w-full">
            <Button text="Cancel" onClick={onClick} />
            <button
              type="submit"
              className="inline-flex items-center justify-center px-4 py-1 text-base font-light transition-all text-dark-accent bg-dark-primary whitespace-nowrap"
            >
              Create Auction
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AuctionForm;
