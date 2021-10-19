import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { useRouter } from "next/router";
import { utils } from "ethers";
import { useAuctions } from "@zoralabs/nft-hooks";
import web3 from "@/app/web3";
import Button from "@/components/Button";
import ActionDialog from "@/components/Dashboard/ActionDialog";
import AuctionForm from "@/components/Dashboard/AuctionForm";
import DashboardNFT from "@/components/Cards/DashboardNFT";
import { OurProxy, SplitRecipient } from "@/utils/OurzSubgraph";
import { claimFunds } from "@/modules/ethereum/OurPylon";
import Sidebar from "./Sidebar";
import { toTrimmedAddress } from "@/utils/index";
import EditionThumb from "@/components/Cards/EditionThumb";

const SplitFull = ({
  split,
  isOwned,
  userInfo,
  setShowFull,
}: {
  split: OurProxy;
  isOwned: boolean;
  userInfo: SplitRecipient;
  setShowFull: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const Router = useRouter();
  const { signer, address } = web3.useContainer();
  const { data } = useAuctions(split.id);
  const [dialog, setDialog] = useState<string | undefined>();
  const [showDialog, setShowDialog] = useState<boolean | undefined>();
  const [selectedId, setSelectedId] = useState<number | undefined>();

  const refDiv = useRef(null);

  /*
   * const hide = () => {
   *   setShowFull(false);
   * };
   */

  /*
   * const handleClickClose = () => {
   *   hide();
   * };
   */

  const clickClaim = async () => {
    await claimFunds({
      signer,
      address,
      splits: split.splitRecipients,
      needsIncremented: split.needsIncremented,
      proxyAddress: split.id,
    });
  };

  // const startAnAuction = (tokenId) => {
  //   setSelectedId(tokenId);
  //   setDialog("auction");
  //   setShowDialog(true);
  // };

  return (
    <div className="flex overflow-hidden w-full">
      <div className="hidden lg:block">
        <Sidebar split={split} />
      </div>
      <div className="flex mx-auto w-full min-h-screen text-base text-left transition transform md:inline-block md:align-middle">
        <div className="flex flex-col w-full">
          <div
            ref={refDiv}
            className="flex items-center px-4 pt-8 pb-4 w-full h-full shadow-2xl bg-dark-background sm:px-6 md:px-6 lg:px-8"
          >
            <button
              type="button"
              // href="#"
              tabIndex={0}
              className="absolute right-4 top-16 text-dark-primary hover:text-dark-secondary sm:top-10 sm:right-6 md:top-8 md:right-6 lg:top-10 lg:right-8"
              onClick={() => setShowFull(false)}
            >
              <span className="p-2 border text-ourange-400 border-dark-border">Go Back</span>
            </button>
            {showDialog && dialog === "auction" && (
              <ActionDialog showDialog={showDialog} setShowDialog={setShowDialog}>
                <AuctionForm
                  tokenId={selectedId}
                  split={split}
                  onClick={() => setShowDialog(false)}
                />
              </ActionDialog>
            )}
            <div className="p-2 w-full text-center border h-min border-dark-border">
              <h1 className="p-2 text-2xl tracking-widest font-hero text-dark-primary">
                {split.nickname}
              </h1>
              <h2 className="text-sm font-extrabold text-dark-secondary">
                {toTrimmedAddress(split.id)}
              </h2>
              <h4 className="mt-2 whitespace-pre-wrap text-dark-primary">
                {utils.formatEther(split.ETH.toString()) || 0} Ξ unclaimed in Split.
              </h4>
              {Number(userInfo?.claimableETH ? userInfo?.claimableETH.toString() : "0") > 0 && (
                <Button
                  isMain={false}
                  text={`Claim ${utils.formatEther(userInfo.claimableETH.toString())} Ξ`}
                  onClick={() => clickClaim()}
                />
              )}
              {isOwned && (
                <div className="flex gap-4 items-baseline p-4 mx-auto my-4 w-min border border-dark-border">
                  <Button
                    isMain={false}
                    text="Mint"
                    onClick={() => Router.push(`/create/mint/${split.id}`)}
                  />
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
          {split?.creations?.length > 0 ? (
            <>
              <h1 className="mx-auto my-2 text-4xl italic text-center font-hero text-dark-primary">
                Creations
              </h1>
              <div className="flex w-full">
                <div
                  id="medias"
                  className="flex flex-col gap-4 justify-center justify-items-center content-evenly mx-auto md:flex-none md:space-x-4 md:grid md:grid-flow-col md:auto-cols-max max-w-auto"
                >
                  {split.creations.map((creation) => (
                    <div key={creation.id} className="flex justify-center w-full h-full">
                      <DashboardNFT
                        tokenId={creation.id}
                        onClick={() => Router.push(`/nft/${creation.id}`)}
                        split={split}
                        isCreation
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <h1 className="mx-auto my-2 text-4xl italic text-center font-hero text-dark-primary">
              No Creations
            </h1>
          )}
          {split?.editions?.length > 0 ? (
            <>
              <h1 className="mx-auto my-2 text-4xl italic text-center font-hero text-dark-primary">
                Editions
              </h1>
              <div className="flex w-full">
                <div
                  id="editions"
                  className="flex flex-col gap-4 justify-center justify-items-center content-evenly mx-auto mb-4 md:flex-none md:space-x-4 md:grid md:grid-flow-col md:auto-cols-max max-w-auto"
                >
                  {split.editions.map((edition) => (
                    <div key={edition.id} className="flex justify-center w-full h-full">
                      <EditionThumb edition={edition} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <h1 className="mx-auto my-2 text-4xl italic text-center font-hero text-dark-primary">
              No Editions
            </h1>
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
                    tokenId={auction.tokenId as string}
                    onClick={() =>
                      Router.push(`/nft/${auction.tokenContract}/${auction.tokenId as string}`)
                    }
                    split={split}
                    isCreation={false}
                  />
                </React.Fragment>
              ))}
        </div>
      </div>
    </div>
  );
};

export default SplitFull;
