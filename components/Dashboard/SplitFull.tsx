import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

import { utils } from "ethers";
import { useAuctions } from "@zoralabs/nft-hooks";
import Button from "@/components/Button";
import ActionDialog from "@/components/Dashboard/ActionDialog";
import AuctionForm from "@/components/Dashboard/AuctionForm";
import DashboardNFT from "@/components/Cards/DashboardNFT";
import Table from "@/components/Charts/Table";
import web3 from "@/app/web3";

const SplitFull = ({
  split,
  isOwned,
  showFull,
  setShowFull,
}: {
  split: any;
  isOwned: boolean;
  showFull: boolean;
  setShowFull: () => void;
}): JSX.Element => {
  const Router = useRouter();
  const { claimFunds } = web3.useContainer();
  const { data, loading, error } = useAuctions(split.id);
  const [dialog, setDialog] = useState();
  const [showDialog, setShowDialog] = useState();
  const [selectedId, setSelectedId] = useState();

  const refDiv = useRef(null);

  const hide = () => {
    setShowFull(false);
  };

  const handleClickClose = () => {
    hide();
  };

  const clickClaim = async () => {
    const didClaim = await claimFunds({
      splits: split.splitRecipients,
      proxyAddress: split.id,
    });
  };

  const startAnAuction = (tokenId) => {
    setSelectedId(tokenId);
    setDialog("auction");
    setShowDialog(true);
  };

  return (
    <>
      <div className="flex mx-auto w-full min-h-screen text-base text-left transition transform md:inline-block md:align-middle">
        <div className="flex flex-col w-full">
          <div
            ref={refDiv}
            className="flex relative items-center px-4 pt-14 pb-8 w-full h-full shadow-2xl bg-dark-background sm:px-6 sm:pt-8 md:p-6 lg:p-8"
          >
            <button
              type="button"
              href="#"
              tabIndex="0"
              className="absolute top-4 right-4 text-dark-primary hover:text-dark-secondary sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-12 lg:right-10"
              onClick={() => setShowFull(false)}
            >
              <span className="p-2 border text-ourange-400 border-dark-border">Go Back</span>
            </button>
            {showDialog && dialog === "auction" && (
              <ActionDialog showDialog={showDialog} setShowDialog={setShowDialog}>
                <AuctionForm
                  tokenId={selectedId}
                  setShowDialog={setShowDialog}
                  split={split}
                  onClick={() => setShowDialog(false)}
                />
              </ActionDialog>
            )}
            <div className="p-4 w-full text-center border h-min border-dark-border">
              <h1 className="text-xl font-bold tracking-widest text-dark-primary">
                {split.nickname}
              </h1>
              <h2 className="text-sm font-extrabold text-dark-secondary">{split.id}</h2>
              <h4 className="mt-2 text-lg font-medium whitespace-pre-wrap text-dark-primary">
                {split.ETH ? utils.formatEther(split.ETH) : 0} ETH unclaimed in Split.
              </h4>
              {split.ETH > 0 && <Button text="Claim" onClick={() => clickClaim()} />}
              {isOwned && (
                <div className="flex gap-4 items-baseline p-4 mx-auto my-4 w-min border border-dark-border">
                  <Button text="Mint" onClick={() => Router.push(`/create/mint/${split.id}`)} />
                  {/* <Button 
                      text="Curate"
                      onClick={''}
                    />
                    <Button 
                      text="Crowdfund"
                      onClick={''}
                    />
                    <Button 
                      text="PartyBid"
                      onClick={''}
                    /> */}
                </div>
              )}
            </div>
          </div>
          <p className="mt-4 text-2xl text-center text-dark-primary">
            {split?.creations ? split.creations?.length : 0} NFT(s) minted
          </p>
          <h1 className="mx-auto mt-2 text-center text-dark-primary">
            If any NFTs are currently owned by the split, they will be shown below. <br /> Click to
            start an Auction
          </h1>
          <div className="flex w-full">
            {isOwned && (
              <>
                {split?.creations?.length > 0 ? (
                  <div
                    id="medias"
                    className="flex gap-4 justify-center justify-items-center content-evenly mx-auto space-x-4 md:grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 max-w-auto"
                  >
                    {split.creations.map((creation, i) => (
                      <div key={creation.id} className="flex justify-center w-full h-full">
                        <DashboardNFT
                          tokenId={creation.id}
                          onClick={() => startAnAuction(creation.id)}
                          split={split}
                          isCreation
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
            {data &&
              data
                .filter(
                  (auction) =>
                    parseInt(auction.expectedEndTimestamp, 10) >= new Date().getTime() / 1000
                )
                .map((auction) => (
                  <React.Fragment key={auction.id}>
                    <DashboardNFT
                      key={auction.id}
                      tokenId={auction.tokenId}
                      onClick={(evt) =>
                        Router.push(`/nft/${auction.tokenContract}/${auction.tokenId}`)
                      }
                      split={split}
                      isCreation={false}
                    />
                  </React.Fragment>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SplitFull;
