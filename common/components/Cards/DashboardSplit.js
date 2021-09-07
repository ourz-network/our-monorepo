const DashboardSplit = ({
  key,
  proxyAddress,
  ownerAddresses,
  ethAvailable,
  createdNFTs,
  recipients,
  Router,
}) => {
  const ownersLength = ownerAddresses.length;
  const creationsLength = createdNFTs.length;

  const handleClick = () => {
    Router.push(`/create/new-mint/${proxyAddress}`);
  };

  return (
    <div
      role={"button"}
      onClick={handleClick}
      label={`Split #${key}`}
      className="flex flex-col items-baseline w-full h-full px-2 py-4 border rounded-xl justify-evenly bg-dark-accent border-dark-border text-dark-primary"
    >
      <p className="mx-auto text-center">{proxyAddress}</p>
      <p className="mx-auto text-justify">
        Split for {recipients.length} Recipients.
        <br />
        Owned by you{ownersLength > 1 && ` and ${ownersLength - 1} other(s)`}.
        <br />
        Minted {creationsLength} NFTs.
      </p>
    </div>
  );
};

export default DashboardSplit;
