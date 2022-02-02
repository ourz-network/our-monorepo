import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FetchStaticData, MediaFetchAgent, NetworkIDs } from "@zoralabs/nft-hooks";
import NFTMasonry from "./NFTMasonry";
import { SubdomainContext } from "../context/SubdomainContext";

export const NFTList = () => {
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState([]);
  const router = useRouter();
  const { userConfig } = useContext(SubdomainContext);
  const fetchAgent = new MediaFetchAgent(userConfig?.networkId ?? 1);

  useEffect(() => {
    async function getTokens() {
      try {
        // const res = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
        //   curatorAddress: CURATOR_ID,
        //   collectionAddresses: [CONTRACT_ADDRESSES, "0x12c8630369977ee708c8e727d8e838f74d9420c5"],
        //   limit: 25,
        //   offset: 0,
        // });
        const res = await FetchStaticData.fetchUserOwnedNFTs(fetchAgent, {
          userAddress: userConfig.curator,
          collectionAddresses: [
            "0x677cE7d51eAad3a63890529A4cBeB74DEC218FE1", // Villains
            "0xCa21d4228cDCc68D4e23807E5e370C07577Dd152", // Zorbs
            "0x12C8630369977eE708C8E727d8e838f74D9420C5", // GM
          ],
          limit: 5000,
          offset: 0,
        });
        if (res) {
          setTokens(res);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (userConfig?.curator) {
      getTokens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userConfig?.curator]);

  return (
    <div className="flex justify-center w-full text-center">
      {!loading ? (
        <div
          className="flex flex-col justify-center content-center px-12 mx-4 space-x-4 space-y-4 w-full h-full timeline xl:grid"
          // className="flex flex-wrap gap-3 justify-center items-center my-auto"
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
