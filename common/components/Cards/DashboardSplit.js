import { Networks, NFTFetchConfiguration } from "@zoralabs/nft-hooks";
import { useAuctions } from "@zoralabs/nft-hooks";

const DashboardSplit = ({ key, ownedSplit, claimableSplit, handleClick }) => {
  const auctions = useAuctions(ownedSplit?.id);

  if (claimableSplit) {
    const recipientsLength = claimableSplit.splitProxy.splitRecipients.length;
    const creationsLength = claimableSplit.splitProxy.creations.length;

    const yourName = claimableSplit.name;
    const yourRole = claimableSplit.role;
    const yourShares = claimableSplit.shares;
    const ethClaimed = claimableSplit.ethClaimed;
    const ethAvailableToClaim = claimableSplit.splitProxy.ETH;

    return (
      <NFTFetchConfiguration network={Networks.RINKEBY}>
        <div className="flex justify-center m-auto bg-opacity-75 bg-center bg-no-repeat bg-contain w-80 h-80 lg:w-96 lg:h-96 h bg-clip-border bg-zorb rounded-xl">
          <div
            role={"button"}
            onClick={handleClick}
            label={`Owned Split #${key}`}
            className="z-10 flex flex-col items-baseline justify-center w-3/5 p-2 m-auto border h-1/2 lg:h-52 lg:w-60 border-dark-border rounded-xl text-dark-accent bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60"
          >
            <p className="mx-auto mb-2 text-center">
              {claimableSplit.splitProxy.nickname}
            </p>
            <p className="mx-auto text-center">
              You,
              {recipientsLength > 1 &&
                ` and ${recipientsLength - 1} other recipient(s)`}
              .
              <br />
              {/* Your name in this split: {yourName}
              <br /> */}
              Role: {yourRole}
              {/* <br />
              Up to {ethAvailableToClaim} ETH available to claim.
              <br />
              You have claimed {ethClaimed} ETH so far. */}
              <br />
              {/* {JSON.stringify(auctions.data)} */}
            </p>
          </div>
        </div>
      </NFTFetchConfiguration>
    );
  } else if (ownedSplit) {
    const ownersLength = ownedSplit.proxyOwners.length;
    const creationsLength = ownedSplit.creations.length;

    return (
      <NFTFetchConfiguration network={Networks.RINKEBY}>
        <div className="flex justify-center m-auto bg-opacity-75 bg-center bg-no-repeat bg-contain w-80 h-80 lg:w-96 lg:h-96 h bg-clip-border bg-zorb rounded-xl">
          <div
            role={"button"}
            onClick={handleClick}
            label={`Owned Split #${key}`}
            className="z-10 flex flex-col items-baseline justify-center w-3/5 p-2 m-auto border h-1/2 lg:h-52 lg:w-60 border-dark-border rounded-xl text-dark-accent bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60"
          >
            <p className="mx-auto mb-2 text-center">{ownedSplit.nickname}</p>
            <p className="mx-auto text-center">
              Split for {ownedSplit.splitRecipients.length} Recipients.
              <br />
              Owned by you
              {ownersLength > 1 && ` and ${ownersLength - 1} other(s)`}.
              <br />
              Minted {creationsLength} NFTs.
              <br />
              {/* {JSON.stringify(auctions.data)} */}
            </p>
          </div>
        </div>
      </NFTFetchConfiguration>
    );
  } else {
    return null;
  }
};

export default DashboardSplit;
