import { useRouter } from "next/router";
import { useState, useEffect } from "react"; // State management
import web3 from "@/app/web3";
import PageLayout from "@/components/Layout/PageLayout"; // Layout wrapper
import SinglePageViewNFT from "@/components/Cards/SinglePageViewNFT";
import { ethers } from "ethers";
import { Zora } from "@zoralabs/zdk";
import { getOwnedSplits, getClaimableSplits } from "@/modules/subgraphs/ourz/functions"; // Post retrieval function
import DashboardSplit from "@/components/Cards/DashboardSplit";
import SplitQuickview from "../../common/components/Cards/SplitQuickview";
import CurationDashboard from "../../common/components/CurationDashboard";

const SplitDashboard = () => {
  const { address, network } = web3.useContainer();
  const [loading, setLoading] = useState(true)
  const [ownedSplits, setOwnedSplits] = useState([]);
  const [claimableSplits, setClaimableSplits] = useState([]);

  const [showQuickview, setShowQuickview] = useState(false)
  const [viewedSplit, setViewedSplit] = useState();
  const [viewOwned, setViewOwned] = useState();

  const [showDashboard, setShowDashboard] = useState(false)
  const [activeDashboard, setActiveDashboard] = useState('')

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
    setViewOwned(isOwned);
    setViewedSplit(split);
    setShowQuickview(true);
    console.log(`owned ${isOwned}, split ${split.id}, modal vis ${showQuickview}`);
  };

  const handleClickManageSplit = (split, isOwned) => {
    
  }

  return (
    <PageLayout>
      {showDashboard && activeDashboard == "curation" &&
        <CurationDashboard />
      }
      <div className="flex flex-col w-full min-h-screen h-min bg-dark-background">
        {showQuickview && (
          <SplitQuickview split={viewedSplit} isOwned={viewOwned} showQuickview={showQuickview} setShowQuickview={setShowQuickview} setShowDashboard={setShowDashboard}
          setActiveDashboard={setActiveDashboard} />
        )}
        {loading || network.name != "rinkeby" ? (
          <p className="px-4 py-2 mx-auto mt-16 border border-dark-border animate-pulse text-dark-primary">
            Loading... Please connect your wallet to Rinkeby if you
            haven&rsquo;t already.
          </p>
        ) : (
          <>
            {ownedSplits ? (
              <>
                <h1 className="mx-auto mt-8 text-center text-dark-primary">
                  Splits that you manage:
                </h1>
                <div className="grid w-full h-full grid-cols-1 gap-8 mx-auto mt-4 min-w-screen lg:grid-cols-3 auto-rows-auto">
                  {ownedSplits.map((OurProxy, i) => {
                    return (
                      <DashboardSplit
                        key={`own-${i}`}
                        ownedSplit={OurProxy}
                        Router={Router}
                        handleClick={() => handleClickThumbnail(OurProxy, true)}
                      />
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="mx-auto text-center text-dark-primary">
                You will need to create a new Split first.
              </p>
            )}
            {claimableSplits ? (
              <>
                <h1 className="mx-auto mt-8 text-center text-dark-primary">
                  Splits that you are a recipient of:
                </h1>
                <div className="grid w-full h-full grid-cols-1 gap-8 mx-auto mt-4 lg:grid-cols-3 auto-rows-min">
                  {claimableSplits.map((OurProxy, i) => {
                    return (
                      <DashboardSplit
                        key={`rec-${i}`}
                        claimableSplit={OurProxy}
                        Router={Router}
                        handleClick={() => handleClickThumbnail(OurProxy, false)}
                      />
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="mx-auto text-center text-dark-primary">
                You are not the recipient of any Splits.
              </p>
            )}
          </>
        )}
      </div>
    </PageLayout>
  )
};

export default SplitDashboard;