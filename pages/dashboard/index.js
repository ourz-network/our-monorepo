import { useRouter } from "next/router";
import { useState, useEffect } from "react"; // State management
import web3 from "@/app/web3";
import PageLayout from "@/components/Layout/PageLayout"; // Layout wrapper
import FullPageNFT from "@/components/Cards/FullPageNFT";
import { ethers } from "ethers";
import { Zora } from "@zoralabs/zdk";
import {
  getOwnedSplits,
  getClaimableSplits,
} from "@/modules/subgraphs/ourz/functions"; // Post retrieval function
import SplitThumb from "@/components/Dashboard/SplitThumb";
import Button from "@/components/Button"
import Dashboard from "@/components/Dashboard/Dashboard";
import SplitFull from "@/components/Dashboard/SplitFull"

const UserDashboard = () => {
  const { address, network } = web3.useContainer();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("owned")
  const [ownedSplits, setOwnedSplits] = useState([]);
  const [claimableSplits, setClaimableSplits] = useState([]);

  const [showFull, setShowFull] = useState();
  const [showQuickview, setShowQuickview] = useState();
  const [selectedSplit, setSelectedSplit] = useState();
  const [selectedIsOwned, setSelectedIsOwned] = useState();

  console.log(`showquick? ${showQuickview}`);
  console.log(`showfull? ${showFull}`);


  const [showDashboard, setShowDashboard] = useState(false);
  const [activeDashboard, setActiveDashboard] = useState("");

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
      collectSplits(address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const handleClickThumbnail = (split, isOwned) => {
    setSelectedSplit(split);
    setSelectedIsOwned(isOwned);
    setShowFull(true);
    console.log(
      `owned ${isOwned}, split ${split.id}, modal vis ${showQuickview}`
    );
  };

  const handleTabs = (clickedTab) => {
    setActiveTab(clickedTab);
  };

  return (
    <PageLayout>
      {showDashboard && activeDashboard == "curation" && <Dashboard />}

      <div className="flex flex-col w-full min-h-screen h-min bg-dark-background">
        
        {/* {showQuickview && (
          <ActionDialog
            split={selectedSplit}
            isOwned={selectedIsOwned}
            showQuickview={showQuickview}
            setShowQuickview={setShowQuickview}
            setShowFull={setShowFull}
            handleClick={() => handleClickManageSplit()}
          />
        )} */}

        {showFull && (
          <SplitFull
            split={selectedSplit} 
            isOwned={selectedIsOwned}
            showFull={showFull}
            setShowFull={setShowFull}
          />
        )}
  
        {(loading || network.name != "rinkeby") && (
          <p className="px-4 py-2 mx-auto mt-16 border border-dark-border animate-pulse text-dark-primary">
            Loading... Please connect your wallet to Rinkeby if you
            haven&rsquo;t already.
          </p>
        )}
        {!loading && network.name == "rinkeby" && (
          <>
            {!showFull && (
              <div className="flex justify-around w-full mx-auto space-x-2 border-b border-dark-border bg-dark-accent text-dark-secondary">
                <Button text="Show Owned Splits" onClick={() => handleTabs("owned")} />
                <Button text="Show Claimable Splits" onClick={() => handleTabs("recipient")} />
              </div>
            )}
            {activeTab == 'owned' && !showFull && (
              <>
                <h1 className="mx-auto mt-8 text-center text-dark-primary">
                  Owned Splits:
                </h1>
                <div className="grid w-full h-full grid-cols-1 gap-8 mx-auto mt-4 min-w-screen lg:grid-cols-3 auto-rows-auto">
                  {ownedSplits.map((OurProxy, i) => {
                    return (
                      <SplitThumb
                        key={`own-${i}`}
                        ownedSplit={OurProxy}
                        Router={Router}
                        handleClick={() => handleClickThumbnail(OurProxy, true)}
                      />
                    );
                  })}
                </div>
              </>
            )}
            {!ownedSplits && ( 
              <p className={`mx-auto text-center text-dark-primary ${showFull && `hidden`}`}>
                You will need to create a new Split first.
              </p>
            )}

            {activeTab == 'recipient' && !showFull && (
              <>
                <h1 className="mx-auto mt-8 text-center text-dark-primary">
                  Recipient of:
                </h1>
                <div className="grid w-full h-full grid-cols-1 gap-8 mx-auto mt-4 lg:grid-cols-3 auto-rows-min">
                  {claimableSplits.map((OurProxy, i) => {
                    return (
                      <SplitThumb
                        key={`rec-${i}`}
                        claimableSplit={OurProxy}
                        Router={Router}
                        handleClick={() =>
                          handleClickThumbnail(OurProxy.splitProxy, false)
                        }
                      />
                    );
                  })}
                </div>
              </>
            )}
            {!claimableSplits && ( 
              <p className={`mx-auto text-center text-dark-primary ${showFull && `hidden`}`}>
                You are not the recipient of any Splits.
              </p>
            )}
            
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default UserDashboard;
