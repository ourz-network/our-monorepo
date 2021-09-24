import { useEffect, useState } from "react";
import { NFTPreview } from "@zoralabs/nft-components";
import { useRouter } from "next/router";
import { FetchStaticData, MediaFetchAgent, NetworkIDs } from "@zoralabs/nft-hooks";

export const AuctionsList = () => {
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState([]);
  const router = useRouter();

  const fetchAgent = new MediaFetchAgent(process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs);

  useEffect(() => {
    async function getTokens() {
      try {
        const res = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
          curatorAddress: process.env.NEXT_PUBLIC_CURATORS_ID as string,
          collectionAddress: process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS as string,
          limit: 100,
          offset: 0,
        });
        if (res) {
          console.log(res);
          setTokens(res);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div css={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {!loading ? (
        <>
          {tokens &&
            tokens.map((token) => {
              const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);
              return (
                <NFTPreview
                  initialData={token}
                  key={tokenInfo.tokenId}
                  id={tokenInfo.tokenId}
                  contract={tokenInfo.tokenContract}
                  onClick={() =>
                    router.push(`/token/${tokenInfo.tokenContract}/${tokenInfo.tokenId}`)
                  }
                  useBetaIndexer
                />
              );
            })}
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};
