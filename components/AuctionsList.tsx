import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FetchStaticData, MediaFetchAgent, NetworkIDs } from "@zoralabs/nft-hooks";
import NFTMasonry from "./NFTMasonry";

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
          limit: 25,
          offset: 75,
        });
        if (res) {
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
    <div className="text-center flex w-full justify-center">
      {!loading ? (
        <div
          className="space-x-4 space-y-4 w-full h-full px-12 mx-4 flex flex-col timeline justify-center content-center xl:grid"
          // className="flex flex-wrap justify-center items-center gap-3 my-auto"
          // css={{ display: "flex", flexWrap: "wrap", justifyContent: "center"}}
        >
          {tokens &&
            tokens.map((token) => {
              const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);

              return (
                <NFTMasonry
                  token={token}
                  tokenInfo={tokenInfo}
                  key={tokenInfo.tokenId}
                  onClick={() =>
                    router.push(`/token/${tokenInfo.tokenContract}/${tokenInfo.tokenId}`)
                  }
                />
              );
            })}
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};
