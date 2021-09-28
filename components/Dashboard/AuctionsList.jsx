import { FetchStaticData } from "@zoralabs/nft-hooks";
import { NFTPreview } from "@zoralabs/nft-components";
import { useRouter } from "next/router";

const AuctionsList = ({ tokens }) => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap justify-center">
      {tokens &&
        tokens.map((token, i) => {
          const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);
          return (
            <NFTPreview
              key={tokenInfo.tokenId}
              initialData={token}
              id={tokenInfo.tokenId}
              contract={tokenInfo.tokenContract}
              onClick={(evt) => router.push(`/nft/${tokenInfo.tokenId}`)}
              useBetaIndexer
            />
          );
        })}
    </div>
  );
};

export default AuctionsList;
