import { Fragment, useState, useEffect } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import web3 from "@/app/web3";
import { useRouter } from "next/router";
import { useRef } from "react";
import Button from "@/components/Button";
import ActionDialog from "@/components/Dashboard/ActionDialog";
import AuctionForm from "@/components/Dashboard/AuctionForm";
import { utils } from "ethers";
import DashboardNFT from "../Cards/DashboardNFT";

const SplitFull = ({
  split,
  isOwned,
  showFull,
  setShowFull
}) => {
  const Router = useRouter();


  const [dialog, setDialog] = useState()
  const [showDialog, setShowDialog] = useState()
  const [selectedId, setSelectedId] = useState()

  let refDiv = useRef(null)

  const handleClickClose = () => {
    hide();
  };

  const startAnAuction = (tokenId) => {
    setSelectedId(tokenId);
    setDialog('auction');
    setShowDialog(true)
  };

  const hide = () => {
    setShowFull(false);
  };

  return (
   <>
      <div className="flex w-full min-h-screen mx-auto text-base text-left transition transform md:inline-block md:max-w-screen md:px-4 md:my-8 md:align-middle lg:max-w-90vw">
        <div className="flex flex-col w-full">
          <div ref={refDiv} className="relative flex items-center w-full px-4 pb-8 overflow-hidden border shadow-2xl bg-dark-background border-dark-border pt-14 sm:px-6 sm:pt-8 md:p-6 lg:p-8">
            <button
              type="button"
              href="#"
              tabIndex="0"
              className="absolute text-dark-primary top-4 right-4 hover:text-dark-secondary sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
              onClick={() => setShowFull(false)}
            >
              <span className="">Back to Splits</span>
              {/* <XIcon className="w-6 h-6" aria-hidden="true" /> */}
            </button>
            {showDialog && dialog == 'auction' &&
              <ActionDialog
                showDialog={showDialog}
                setShowDialog={setShowDialog}
              >
                <AuctionForm 
                  tokenId={selectedId}
                  setShowDialog={setShowDialog}
                  split={split}
                  onClick={() => setShowDialog(false)}
                />
              </ActionDialog>
            }
            <div className="grid items-start w-full grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
              <div className="w-48 h-48 m-auto overflow-hidden bg-center bg-cover rounded-lg bg-zorb aspect-w-2 aspect-h-3 sm:col-span-4 lg:col-span-5" />
              <div className="sm:col-span-8 lg:col-span-7">
                <h1 className="text-lg font-bold text-dark-primary">
                  {split.nickname}
                </h1>
                <h2 className="text-sm font-extrabold text-dark-secondary sm:pr-12">
                  {split.id}
                </h2>
                <div className="flex items-baseline gap-4 mt-4">
                  <h4 className="text-sm font-medium whitespace-pre-wrap text-dark-primary">
                    {split.ETH ? utils.formatEther(split.ETH) : 0} ETH unclaimed in Split.
                  </h4>
                  {split.ETH > 0 &&
                    <Button
                      text="Claim"
                      onClick={''}
                    />
                  }
                </div>
                {isOwned &&
                  <div className="flex items-baseline gap-4 p-4 mx-auto mt-8 border border-dark-border w-min">
                    <Button 
                      text="Mint"
                      onClick={() => Router.push(`/create/mint/${split.id}`)}
                    />
                    <Button 
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
                    />
                  </div>
                }
              </div>
            </div>
          </div>
          <p className="mt-4 text-2xl text-center text-dark-primary">
            {split?.creations ? split.creations?.length : 0 } NFT(s) minted
          </p>
          {isOwned &&
            <>
              <h1 className="mx-auto mt-2 text-center text-dark-primary">If any NFTs are currently owned by the split, they will be shown below. <br /> Click to start an Auction</h1>
              <div className="flex flex-col gap-4 mx-4 justify-items-center content-evenly justify-evenly md:grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 max-w-auto">
                {split?.creations?.length > 0 ? (
                  <div
                    id="medias"
                    className="w-full h-auto mx-auto"
                  >
                  {split.creations.map((creation, i) => {
                    return (
                      <div key={i} className="flex justify-center w-full h-full">
                        <DashboardNFT 
                          key={i}
                          tokenId={creation.tokenId}
                          onClick={() => startAnAuction(creation.tokenId)}
                          split={split}
                        />
                      </div>  
                    )
                  })}
                  </div> ) : (
                    ''
                  )
                }
              </div>
            </>
          }
          </div>
      </div>
    </>
  );
};

export default SplitFull;
