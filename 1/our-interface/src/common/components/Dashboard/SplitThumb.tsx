import { ethers } from "ethers";
import { Recipient, Split } from "@/utils/OurzSubgraph";
import { keyDownA11y } from "@/utils/index";

const SplitThumb = ({
  ownedSplit,
  claimableSplit,
  handleClick,
}: {
  ownedSplit: Split;
  claimableSplit: Recipient;
  handleClick: () => void;
}): JSX.Element => {
  if (claimableSplit) {
    const recipientsLength = claimableSplit.split.recipients.length;
    const yourRole = claimableSplit.role;

    return (
      <div className="flex justify-center m-auto w-80 h-80 bg-clip-border bg-opacity-75 bg-center bg-no-repeat bg-contain rounded-xl lg:w-96 lg:h-96 h bg-zorb">
        <div
          role="button"
          onClick={handleClick}
          onKeyDown={keyDownA11y(handleClick)}
          tabIndex={0}
          className="flex z-10 flex-col justify-center items-baseline p-2 m-auto w-3/5 h-1/2 bg-clip-padding bg-opacity-60 rounded-xl border backdrop-filter backdrop-blur-sm lg:h-52 lg:w-60 border-dark-border text-dark-accent"
        >
          <p className="mx-auto mb-2 text-center">{claimableSplit.split.nickname}</p>
          <p className="mx-auto text-center">
            You,
            {recipientsLength > 1 && ` and ${recipientsLength - 1} other recipient(s)`}
            .
            <br />
            Role: {yourRole}
            <br />
            {claimableSplit?.claimableETH
              ? ethers.utils.formatEther(claimableSplit.claimableETH.toString())
              : "0"}
            ETH unclaimed.
          </p>
        </div>
      </div>
    );
  }
  if (ownedSplit) {
    const ownersLength = ownedSplit.owners.length;
    const creationsLength = ownedSplit.creations.length;

    return (
      <div className="flex justify-center m-auto w-80 h-80 bg-clip-border bg-opacity-75 bg-center bg-no-repeat bg-contain rounded-xl lg:w-96 lg:h-96 h bg-zorb">
        <div
          role="button"
          onClick={handleClick}
          onKeyDown={keyDownA11y(handleClick)}
          tabIndex={0}
          className="flex z-10 flex-col justify-center items-baseline p-2 m-auto w-3/5 h-1/2 bg-clip-padding bg-opacity-60 rounded-xl border backdrop-filter backdrop-blur-sm lg:h-52 lg:w-60 border-dark-border text-dark-accent"
        >
          <p className="mx-auto mb-2 text-center">{ownedSplit.nickname}</p>
          <p className="mx-auto text-center">
            Split for {ownedSplit.recipients.length} Recipients.
            <br />
            Owned by you
            {ownersLength > 1 && ` and ${ownersLength - 1} other(s)`}.
            <br />
            Minted {creationsLength} NFTs.
            <br />
          </p>
        </div>
      </div>
    );
  }
  return <></>;
};

export default SplitThumb;
