import { useRouter } from "next/router";
import PageLayout from "@/components/Layout/PageLayout";
import { useState, useEffect } from "react"; // State management
import web3 from "@/app/web3";
import { getOwnedSplits } from "@/modules/graphProtocol/ourz/functions"; // Post retrieval function
import DashboardSplit from "@/components/Cards/DashboardSplit";
import Button from "@/components/Button";

const CreateDashboard = () => {
  const [loading, setLoading] = useState(true); // Global loading state
  const [ownedSplits, setOwnedSplits] = useState([]);
  const { address, network } = web3.useContainer();
  const Router = useRouter();

  useEffect(() => {
    async function collectOwnedSplits(ethAddress) {
      const splits = await getOwnedSplits(ethAddress);
      if (splits) {
        setOwnedSplits(splits);
        console.log(`User ${address} - OwnedSplits:\n`, ownedSplits);
      }
      setLoading(false);
    }
    if (address) {
      collectOwnedSplits(address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <PageLayout>
      <div className="flex flex-col w-full h-full bg-dark-background">
        {loading || network.name != "rinkeby" ? (
          <p className="px-4 py-2 mx-auto mt-16 border border-dark-border animate-pulse text-dark-primary">
            Loading... Please connect your wallet to Rinkeby if you
            haven&rsquo;t already.
          </p>
        ) : (
          <>
            <div className="p-2 mx-auto my-4 w-min h-min">
              <Button
                isMain={true}
                text="Create New Split"
                onClick={() => Router.push(`/create/new-split`)}
              />
            </div>
            {ownedSplits ? (
              <>
                <h1 className="mx-auto mt-8 text-center text-dark-primary">
                  Splits You Manage:
                </h1>
                <div className="grid w-5/6 h-full grid-cols-3 gap-8 mx-auto mt-4 auto-rows-min">
                  {ownedSplits.map((OurProxy, i) => {
                    return (
                      <DashboardSplit
                        key={i}
                        proxyAddress={OurProxy.id}
                        ownerAddresses={OurProxy.proxyOwners}
                        ethAvailable={OurProxy.ETH}
                        createdNFTs={OurProxy.creations}
                        recipients={OurProxy.splitRecipients}
                        Router={Router}
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
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default CreateDashboard;
