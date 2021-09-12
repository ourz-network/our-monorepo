import Button from "@/components/Button";
import { AuctionsList } from "@/components/Dashboard/AuctionsList";
import {
  FetchStaticData,
  MediaFetchAgent,
  NetworkIDs,
} from "@zoralabs/nft-hooks";
import { useState } from "react";

const Dashboard = ({ split }) => {
  console.log(split);


  const creations = split.creations
  const [auctions, setAuctions] = useState()


  

  const handleCreateAuction = async (tokenId) => {
    const { auctionId } = await createZoraAuction({
      proxyAddress: split.id,
      tokenId: 3742,
    });

    if (auctionId) {
      Router.push(`/auction-house/${auctionId}`);
    }
  };

  useEffect(() => {
    async function collectSplitAuctions(splitAddress) {
      //rinkeby
      const fetchAgent = new MediaFetchAgent(
        "4"
      );

      const auctions = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
        curatorAddress: split.id,
        limit: 100,
        offset: 0
      })

      if (auctions) {
        console.log(`Split ${split.id} - Auctions:\n`, auctions);
        setAuctions(auctions);
      }
    }
    if (split) {
      collectSplitAuctions(split.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [split]);

  return (
    <>
      <div className="w-full h-full">
        coming soon
        {auctions && 
          <AuctionsList tokens={auctions} />
          }
        {/* <Button onClick={() => handleCreateAuction()} /> */}
      </div>
    </>
  );
};

export default Dashboard;
