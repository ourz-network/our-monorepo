import { useState, useEffect } from "react";
import {
  getOwnedSplits,
  getClaimableSplits,
  getPostByEditionAddress,
} from "@/modules/subgraphs/ourz/functions";
import { OurProxy, SplitRecipient } from "@/utils/OurzSubgraph";
import { getPostByID } from "@/modules/subgraphs/zora/functions";
import { claimFunds } from "@/modules/ethereum/OurPylon";

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
    }

    getAllSplits().then(
      () => {},
      () => {}
    );
  }, [address]);

  // selected split
  const [selectedSplit, setSelectedSplit] = useState<OurProxy | null>();
  const [creations, setCreations] = useState<OurProxy | null>();
  const [editions, setEditions] = useState<OurProxy | null>();
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

  useEffect(() => {
    async function getAllPosts() {
      const Editions: (NFTCard | null)[] = [];
      await Promise.all(
        (selectedSplit as OurProxy).editions.map(async (edition) => {
          const post = await getPostByEditionAddress(edition.id);
          Editions.push(post);
        })
      );
      setEditions(Editions);

      const Creations: (NFTCard | null)[] = [];
      await Promise.all(
        (selectedSplit as OurProxy).creations.map(async (creation) => {
          const post = await getPostByID(Number(creation.id));
          Creations.push(post);
        })
      );
      setCreations(Creations);
    }

    getAllPosts().then(
      () => {},
      () => {}
    );
  }, [selectedSplit]);

  const clickClaim = async () => {
    await claimFunds({
      signer,
      address,
      splits: selectedSplit.splitRecipients,
      needsIncremented: selectedSplit.needsIncremented,
      proxyAddress: selectedSplit.id,
    });
  };

  return {
    ownedSplits,
    claimableSplits,
    selectedSplit,
    setSelectedSplit,
    userSplitInfo,
    isOwner,
    creations,
    editions,
    clickClaim,
  };
};

export default useSplits;
