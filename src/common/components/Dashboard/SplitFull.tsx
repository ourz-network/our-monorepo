import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAuctions } from "@zoralabs/nft-hooks";
import web3 from "@/app/web3";
import ActionDialog from "@/components/Dashboard/ActionDialog";
import AuctionForm from "@/components/Dashboard/AuctionForm";
import NFTPreviewCard from "@/components/Cards/NFTPreviewCard";
import { OurProxy, SplitRecipient } from "@/utils/OurzSubgraph";
import { claimFunds } from "@/modules/ethereum/OurPylon";
import Sidebar from "./Sidebar";
import { formatEditionPost, NFTCard } from "@/modules/subgraphs/utils";
import { getPostByID } from "@/modules/subgraphs/zora/functions";

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

  const [creationPosts, setCreationPosts] = useState<(NFTCard | null)[] | null>();

  const clickClaim = async () => {
    await claimFunds({
      signer,
      address,
      splits: split.splitRecipients,
      needsIncremented: split.needsIncremented,
      proxyAddress: split.id,
    });
  };

  useEffect(() => {
    async function collectPosts(): Promise<void> {
      const posts: (NFTCard | null)[] = [];
      await Promise.all(
        split.creations.map(async (creation) => {
          const post = await getPostByID(Number(creation.id));
          posts.push(post);
        })
      );
      setCreationPosts(posts);
    }

    if (split.creations)
      collectPosts().then(
        () => {},
        () => {}
      );
  }, [split]);

  // const startAnAuction = (tokenId) => {
  //   setSelectedId(tokenId);
  //   setDialog("auction");
  //   setShowDialog(true);
  // };

  return (
    <div className="flex overflow-hidden w-full">
      <div className="hidden md:inline-block">
        <Sidebar split={split} userInfo={userInfo} clickClaim={clickClaim} isOwned={isOwned} />
      </div>
      <div className="flex w-full min-h-screen text-base">
        <div className="flex flex-col w-full">
          <div
            ref={refDiv}
            className="flex items-center px-4 pb-4 w-full h-full shadow-2xl bg-dark-background sm:px-6 md:px-6 lg:px-8"
          >
            <button
              type="button"
              // href="#"
              tabIndex={0}
              className="hidden absolute right-4 top-16 text-dark-primary hover:text-dark-secondary md:top-24 md:right-6 lg:top-24 lg:right-8"
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
          </div>
          {split?.editions?.length > 0 ? (
            <>
              <h1 className="mx-auto my-2 text-4xl italic text-center font-hero text-dark-primary">
                Editions
              </h1>
              <div className="flex">
                <div
                  id="editions"
                  className="grid grid-flow-row auto-cols-fr gap-4 m-auto xl:grid-cols-3 lg:grid-cols-2"
                >
                  {split.editions.map((edition) => {
                    const post = formatEditionPost(edition);
                    return (
                      <div key={post?.editionAddress} className="flex justify-center w-full h-full">
                        <NFTPreviewCard post={post} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <h1 className="mx-auto my-2 text-4xl italic text-center font-hero text-dark-primary">
              No Editions
            </h1>
          )}
          {split?.creations?.length > 0 ? (
            <>
              <h1 className="mx-auto my-2 text-4xl italic text-center font-hero text-dark-primary">
                1/1 Creations
              </h1>
              <div className="flex w-full">
                <div
                  id="medias"
                  className="grid grid-flow-row auto-cols-fr gap-4 m-auto xl:grid-cols-3 lg:grid-cols-2"
                >
                  {creationPosts &&
                    creationPosts.map((post) => (
                      <div key={post.tokenId} className="flex justify-center w-full h-full">
                        <NFTPreviewCard post={post} />
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

          {data &&
            data
              .filter(
                (auction) =>
                  parseInt(auction.expectedEndTimestamp, 10) >= new Date().getTime() / 1000
              )
              .map((auction) => (
                <React.Fragment key={auction.id}>
                  <NFTPreviewCard
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
