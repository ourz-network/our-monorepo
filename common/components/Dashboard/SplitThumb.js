import { Networks, NFTFetchConfiguration } from "@zoralabs/nft-hooks";

const SplitThumb = ({ ownedSplit, claimableSplit, handleClick }) => {
  if (claimableSplit) {
    const recipientsLength = claimableSplit.splitProxy.splitRecipients.length;
    const yourRole = claimableSplit.role;

    return (
      <NFTFetchConfiguration network={Networks.RINKEBY}>
        <div className="flex justify-center m-auto bg-opacity-75 bg-center bg-no-repeat bg-contain w-80 h-80 lg:w-96 lg:h-96 h bg-clip-border bg-zorb rounded-xl">
          <div
            role={"button"}
            onClick={handleClick}
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
              Role: {yourRole}
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
            </p>
          </div>
        </div>
      </NFTFetchConfiguration>
    );
  } else {
    return null;
  }
};

export default SplitThumb;
