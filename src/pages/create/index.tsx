import { useRouter } from "next/router";
import { useEffect, useState } from "react"; // State management
import { providers } from "ethers";
import PageLayout from "@/components/Layout/PageLayout";
import web3 from "@/app/web3";
import { getOwnedSplits } from "@/subgraphs/ourz/functions"; // Post retrieval function
import SplitThumb from "@/components/Dashboard/SplitThumb";
import Button from "@/components/Button";
import NewSplit from "@/Create/Split/NewSplit";
import { OurProxy } from "@/utils/OurzSubgraph";

const CreateDashboard = (): JSX.Element => {
  const [loading, setLoading] = useState(true); // Global loading state
  const [ownedSplits, setOwnedSplits] = useState<OurProxy[] | undefined>([]);
  const [newSplit, setNewSplit] = useState(false);
  const { address, network }: { address: string; network: providers.Network } = web3.useContainer();

  const Router = useRouter();

  const handleClick = (id: string) => {
    Router.push(`/create/mint/${id}`).then(
      () => {},
      () => {}
    );
  };

  useEffect(() => {
    async function collectOwnedSplits(ethAddress) {
      const splits = await getOwnedSplits(ethAddress);
      if (splits) {
        setOwnedSplits(splits);
      }
      setLoading(false);
    }
    if (address) {
      collectOwnedSplits(address).then(
        () => {},
        () => {}
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <PageLayout>
      {newSplit ? (
        <NewSplit />
      ) : (
        <div className="flex flex-col w-full min-h-screen h-min bg-dark-background">
          {loading || network?.name !== "rinkeby" ? (
            <p className="px-4 py-2 mx-auto mt-16 border animate-pulse border-dark-border text-dark-primary">
              Loading... Please connect your wallet to Rinkeby if you haven&rsquo;t already.
            </p>
          ) : (
            <>
              {ownedSplits ? (
                <>
                  <h1 className="mx-auto mt-8 text-center text-dark-primary">
                    Splits that you can mint an NFT for:
                  </h1>
                  <div className="flex flex-col gap-4 justify-center justify-items-center content-evenly mx-auto mb-4 md:flex-none md:space-x-4 md:grid md:grid-flow-col md:auto-cols-max max-w-auto">
                    {ownedSplits.map((ourProxy) => (
                      <SplitThumb
                        key={ourProxy.id}
                        ownedSplit={ourProxy}
                        handleClick={() => handleClick(ourProxy.id)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <p className="mx-auto text-center text-dark-primary">
                  You will need to create a new Split first.
                </p>
              )}
              <div className="p-2 mx-auto my-4 w-min h-min">
                <Button isMain text="Create New Split" onClick={() => setNewSplit(true)} />
              </div>
            </>
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default CreateDashboard;
