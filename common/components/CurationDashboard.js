import Button from "@/components/Button";

const CurationDashboard = ({ split, auctions }) => {
  console.log(split);
  const handleCreateAuction = async (tokenId) => {
    const { auctionId } = await createZoraAuction({
      proxyAddress: split.id,
      tokenId: 3742,
    });

    if (auctionId) {
      Router.push(`/auction-house/${auctionId}`);
    }
  };
  return (
    <>
      <div className="w-full h-full">
        coming soon
        <Button onClick={() => handleCreateAuction()} />
      </div>
    </>
  );
};

export default CurationDashboard;
