import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import NewMintMultistepForm from "@/Create/NFT/MultistepForm";
import { getSplitRecipients } from "@/subgraphs/ourz/functions";
import { SplitRecipient } from "@/utils/OurzSubgraph";

const MintNFTFromExistingSplit = (): JSX.Element => {
  const [loading, setLoading] = useState(true); // Global loading state
  const { query } = useRouter();
  const { proxyAddress } = query;
  const [splitRecipients, setSplitRecipients] = useState<SplitRecipient[] | undefined>([]);

  useEffect(() => {
    async function collectSplitRecipients(address: string) {
      const recipients = await getSplitRecipients(address);
      if (recipients) {
        setSplitRecipients(recipients);
        setLoading(false);
      }
    }
    if (proxyAddress) {
      collectSplitRecipients(proxyAddress as string).then(
        () => {},
        () => {}
      );
    }
  }, [proxyAddress]);

  return !loading ? (
    <NewMintMultistepForm proxyAddress={proxyAddress as string} splitRecipients={splitRecipients} />
  ) : (
    <div className="w-screen h-screen bg-dark-background" />
  );
};

export default MintNFTFromExistingSplit;
