import { useState, useEffect } from "react";
import { getOwnedSplits, getClaimableSplits } from "@/modules/subgraphs/ourz/functions";
import { OurProxy, SplitRecipient } from "@/utils/OurzSubgraph";

const useSplits = ({ address }: { address: string | undefined }) => {
  // all user's splits
  const [ownedSplits, setOwnedSplits] = useState<OurProxy[] | null>([]);
  const [claimableSplits, setClaimableSplits] = useState<SplitRecipient[] | null>([]);

  useEffect(() => {
    async function getAllSplits() {
      if (address) {
        setOwnedSplits(await getOwnedSplits(address));
        setClaimableSplits(await getClaimableSplits(address));
      }
      // const owned = await getOwnedSplits(address);
      // if (owned) {
      //   setOwnedSplits(owned);
      // }
      // const claimable = await getClaimableSplits(address);
      // if (claimable) {
      //   setClaimableSplits(claimable);
      // }
    }

    getAllSplits().then(
      () => {},
      () => {}
    );
  }, [address]);

  // selected split
  const [selectedSplit, setSelectedSplit] = useState<OurProxy | null>();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [userSplitInfo, setUserSplitInfo] = useState<SplitRecipient | null>();

  useEffect(() => {
    setIsOwner(false);
    selectedSplit?.splitRecipients.forEach((recipient) => {
      if (recipient.user.id === address?.toLowerCase()) setUserSplitInfo(recipient);
    });
    selectedSplit?.proxyOwners.forEach((owner) => {
      if (owner.id === address?.toLowerCase()) setIsOwner(true);
    });
  }, [selectedSplit, address]);

  return { ownedSplits, claimableSplits, selectedSplit, setSelectedSplit, userSplitInfo, isOwner };
};

export default useSplits;
