import { useRouter } from "next/router";
import { useState, useEffect } from "react"; // State management
import web3 from "@/app/web3";
import PageLayout from "@/components/Layout/PageLayout"; // Layout wrapper
import { getOwnedSplits, getClaimableSplits } from "@/modules/subgraphs/ourz/functions"; // Post retrieval function
import SplitThumb from "@/components/Dashboard/SplitThumb";
import Button from "@/components/Button";
import SplitFull from "@/components/Dashboard/SplitFull";
import Sidebar from "@/components/Dashboard/Sidebar";

const UserDashboard = (): JSX.Element => {
  const { address, network } = web3.useContainer();
  const [loading, setLoading] = useState(true);
  const [ownedSplits, setOwnedSplits] = useState([]);
  const [claimableSplits, setClaimableSplits] = useState([]);

  const [showFull, setShowFull] = useState();
  const [selectedSplit, setSelectedSplit] = useState();
  const [userSplitDetails, setUserSplitDetails] = useState();
  const [selectedIsOwned, setSelectedIsOwned] = useState();

  const Router = useRouter();

  useEffect(() => {
    async function collectSplits(ethAddress) {
      const owned = await getOwnedSplits(ethAddress);
      if (owned) {
        setOwnedSplits(owned);
      }

      const claimable = await getClaimableSplits(ethAddress);
      if (claimable) {
        setClaimableSplits(claimable);
      }

      setLoading(false);
    }
    if (address) {
      collectSplits(address).then(
        () => {},
        () => {}
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const handleClickThumbnail = (split, isOwned) => {
    setSelectedSplit(split);
    let userInfo;

    split.splitRecipients.forEach((recipient, i) => {
      if (recipient.user.id === address.toLowerCase()) {
        userInfo = recipient;
      }
    });
    setUserSplitDetails(userInfo);
    setSelectedIsOwned(isOwned);
    setShowFull(true);
  };

  return (
    <PageLayout>
      <div className="flex w-full min-h-screen">
        <Sidebar split={selectedSplit} showFull={showFull} />
        <div
          id="OLD_CONTENT"
          className="flex flex-col w-full min-h-screen h-min bg-dark-background"
        >
          {showFull && (
            <SplitFull
              split={selectedSplit}
              userInfo={userSplitDetails}
              isOwned={selectedIsOwned}
              showFull={showFull}
              setShowFull={setShowFull}
            />
          )}

          {(loading || network.name !== "rinkeby") && (
            <p className="px-4 py-2 mx-auto mt-16 border animate-pulse border-dark-border text-dark-primary">
              Loading... Please connect your wallet to Rinkeby if you haven&rsquo;t already.
            </p>
          )}
          {!loading && network.name === "rinkeby" && (
            <>
              {/* {!showFull && (
                <div className="flex justify-center mx-auto space-x-2 w-full border-b border-dark-border bg-dark-accent text-dark-secondary">
                  <Button
                    text={`${activeTab === "recipient" ? "Show" : ""} Owned Splits`}
                    onClick={() => handleTabs("owned")}
                    isMain={undefined}
                  />
                  <Button
                    text={`${activeTab === "owned" ? "Show" : ""} Claimable Splits`}
                    onClick={() => handleTabs("recipient")}
                    isMain={undefined}
                  />
                </div>
              )} */}
              {ownedSplits.length > 0 && !showFull && (
                <>
                  <h1 className="mx-auto mt-8 text-center text-dark-primary">
                    You are a whitelisted manager of:
                  </h1>
                  <div className="grid grid-cols-1 auto-rows-auto gap-8 mx-auto mt-4 w-full h-full min-w-screen lg:grid-cols-3">
                    {ownedSplits.map((OurProxy, i) => (
                      <SplitThumb
                        key={`own-${OurProxy.id}`}
                        ownedSplit={OurProxy}
                        Router={Router}
                        userInfo={userSplitDetails}
                        handleClick={() => handleClickThumbnail(OurProxy, true)}
                      />
                    ))}
                  </div>
                </>
              )}
              {ownedSplits.length === 0 && !showFull && (
                <p className={`mx-auto text-center text-dark-primary ${showFull && `hidden`}`}>
                  You will need to create a new Split first.
                </p>
              )}

              {claimableSplits.length > 0 && !showFull && (
                <>
                  <h1 className="mx-auto mt-8 text-center text-dark-primary">
                    You are a recipient of:
                  </h1>
                  <div className="grid grid-cols-1 auto-rows-min gap-8 mx-auto mt-4 w-full h-full lg:grid-cols-3">
                    {claimableSplits.map((OurProxy, i) => (
                      <SplitThumb
                        key={`rec-${OurProxy.id}`}
                        claimableSplit={OurProxy}
                        Router={Router}
                        userInfo={userSplitDetails}
                        handleClick={() => handleClickThumbnail(OurProxy.splitProxy, false)}
                      />
                    ))}
                  </div>
                </>
              )}
              {claimableSplits.length === 0 && !showFull && (
                <p className={`mx-auto text-center text-dark-primary ${showFull && `hidden`}`}>
                  You are not the recipient of any Splits.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default UserDashboard;
