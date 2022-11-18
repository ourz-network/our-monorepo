"use client";

import { FetchStaticData } from "@zoralabs/nft-hooks";
import { NFTPreview } from "@ourz/our-components";
import { useRouter } from "next/router";

export const NFTList = ({ tokens }: { tokens: any[] }) => {
  const router = useRouter();

  return (
    <div
    // css={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {tokens &&
        tokens.map((token) => {
          const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);
          return (
            <NFTPreview
              initialData={token}
              key={tokenInfo.tokenId}
              id={tokenInfo.tokenId}
              contract={tokenInfo.tokenContract}
              onClick={(evt) =>
                router.push(`/token/${tokenInfo.tokenContract}/${tokenInfo.tokenId}`)
              }
              useBetaIndexer={true}
            />
          );
        })}
    </div>
  );
};
