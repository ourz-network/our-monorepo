import { useRouter } from "next/router";
import { useState } from "react"; // State management
import PageLayout from "@/components/Layout/PageLayout";
import web3 from "@/app/web3";
import SplitThumb from "@/components/Dashboard/SplitThumb";
import Button from "@/components/Button";
import NewSplit from "@/Create/Split/NewSplit";
import WrongNetworkAlert from "@/components/Layout/WrongNetworkAlert";
import useSplits from "@/common/hooks/useSplits";

const CreateDashboard = (): JSX.Element => {
  const { address, network } = web3.useContainer();
  const { ownedSplits } = useSplits({ address });
  const Router = useRouter();

  const [newSplit, setNewSplit] = useState(false);

  const handleClick = (id: string) => {
    Router.push(`/create/mint/${id}`).then(
      () => {},
      () => {}
    );
  };

  return (
    <PageLayout>
      {newSplit ? (
        <NewSplit />
      ) : (
        <div className="flex flex-col w-full min-h-screen h-min bg-dark-background">
          {network?.name !== "homestead" ? (
            <WrongNetworkAlert />
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
              <p className="mx-auto text-dark-primary">OR</p>
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
