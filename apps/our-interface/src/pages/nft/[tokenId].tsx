import { ethers } from "ethers";
import { Zora } from "@zoralabs/zdk";
import { GetStaticPaths, GetStaticProps } from "next";
import PageLayout from "@/components/Layout/PageLayout"; // Layout wrapper
import FullPageNFT from "@/components/NFTs/FullPage/FullPageNFT";
import { getAllOurzTokens, getSplitOwners, getSplitRecipients } from "@/subgraphs/ourz/functions"; // GraphQL client
import { Recipient } from "@/utils/OurzSubgraph";
import { getPostByID } from "@/modules/subgraphs/zora/functions";
import { NFTCard } from "@/modules/subgraphs/utils";
import web3 from "@/app/web3";
import useOwners from "@/common/hooks/useOwners";
import useRecipients from "@/common/hooks/useRecipients";

const FullPageZNFT = ({
  post,
  recipients,
  splitOwners,
}: {
  post: NFTCard;
  recipients: Recipient[];
  splitOwners: string[];
}): JSX.Element => {
  const { signer, address } = web3.useContainer();
  const { isOwner } = useOwners({ address, splitOwners });
  const { firstSale } = useRecipients({ recipients, secondaryRoyalty: undefined });

  return (
    <PageLayout>
      <div className="flex overflow-y-hidden flex-col w-full h-auto min-h-screen bg-dark-background">
        <FullPageNFT
          post={post}
          isOwner={isOwner}
          signer={signer}
          chartData={firstSale}
          recipients={recipients}
        />
      </div>
    </PageLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ourTokens = await getAllOurzTokens();

  const paths = [];
  if (ourTokens) {
    for (let i = ourTokens?.length - 1; i >= 0; i -= 1) {
      paths.push({ params: { tokenId: `${ourTokens[i].id}` } });
    }
  }

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const tokenId = context.params?.tokenId;
  const post = await getPostByID(Number(tokenId));

  const queryProvider = ethers.providers.getDefaultProvider("homestead", {
    infura: process.env.NEXT_PUBLIC_INFURA_ID,
    alchemy: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    pocket: process.env.NEXT_PUBLIC_POKT_ID,
    etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_KEY,
  });
  const zoraQuery = new Zora(queryProvider, 1);

  const creatorAddress = await zoraQuery.fetchCreator(tokenId as string);
  let recipients;
  let splitOwners;
  try {
    recipients = await getSplitRecipients(creatorAddress);
    splitOwners = await getSplitOwners(creatorAddress);
  } catch (error) {
    //
  }

  return {
    props: {
      post,
      recipients,
      splitOwners,
    },
    revalidate: 5,
  };
};

export default FullPageZNFT;
