import { useEffect, useState } from "react"; // State management
import { ethers } from "ethers";
import { Zora } from "@zoralabs/zdk";
import { GetStaticPaths, GetStaticProps } from "next";
import PageLayout from "@/components/Layout/PageLayout"; // Layout wrapper
import FullPageNFT from "@/components/Cards/FullPageNFT";
import { getAllOurzTokens, getSplitRecipients } from "@/subgraphs/ourz/functions"; // GraphQL client
import { SplitRecipient, SplitZNFT } from "@/utils/OurzSubgraph";
import { getPostByID } from "@/modules/subgraphs/zora/functions";
import { Ourz20210928 } from "@/utils/20210928";
import { Media } from "@/utils/ZoraSubgraph";

const NFTView = ({
  tokenId,
  recipients,
  post,
}: {
  tokenId: string;
  recipients: SplitRecipient[];
  post: Media & { metadata: Ourz20210928 };
  // creator: string;
}): JSX.Element => {
  const [loading, setLoading] = useState(true); // Global loading state
  const [firstSale, setFirstSale] = useState<{ name: string; shares: number }[] | undefined>();

  useEffect(() => {
    function formatChartData(Recipients: SplitRecipient[]) {
      // create first sale chart data
      const newChartData = Recipients.flatMap((recipient) => ({
        name: `${recipient.name || recipient.user.id}`,
        shares: Number(recipient.shares),
      }));

      setFirstSale(newChartData);
      setLoading(false);
    }

    if (recipients) {
      formatChartData(recipients);
    }
  }, [recipients]);

  return (
    <PageLayout>
      <div
        id="pagecontainer"
        className="flex overflow-y-hidden flex-col w-full h-auto min-h-screen bg-dark-background"
      >
        <FullPageNFT
          tokenId={tokenId}
          ownAccount
          chartData={firstSale}
          recipients={recipients || null}
          post={post}
        />
      </div>
    </PageLayout>
  );
};

// Run on server build
// eslint-disable-next-line consistent-return
export const getStaticPaths: GetStaticPaths = async () => {
  /*
   * const queryProvider = ethers.providers.getDefaultProvider("rinkeby", {
   *   infura: process.env.NEXT_PUBLIC_INFURA_ID,
   *   alchemy: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
   *   pocket: process.env.NEXT_PUBLIC_POKT_ID,
   *   etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_KEY,
   * });
   * const zoraQuery = new Zora(queryProvider, 4);
   * const unburned = await zoraQuery.fetchTotalMedia();
   * const maxSupply = await zoraQuery.fetchMediaByIndex(unburned - 1);
   */
  const ourTokens: SplitZNFT[] = await getAllOurzTokens();
  const extras = [3689, 3699, 3733, 3741, 3759, 3772, 3773, 3774, 3829, 3831, 3858];
  const paths = [];
  for (let i = ourTokens.length - 1; i >= 0; i -= 1) {
    paths.push({ params: { tokenId: `${ourTokens[i].id}` } });
  }
  for (let i = extras.length - 1; i >= 0; i -= 1) {
    paths.push({ params: { tokenId: `${extras[i]}` } });
  }
  return { paths, fallback: true };
};

// Run on page load
export const getStaticProps: GetStaticProps = async (context) => {
  const queryProvider = ethers.providers.getDefaultProvider("rinkeby", {
    infura: process.env.NEXT_PUBLIC_INFURA_ID,
    alchemy: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    pocket: process.env.NEXT_PUBLIC_POKT_ID,
    etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_KEY,
  });
  const zoraQuery = new Zora(queryProvider, 4);

  const { tokenId } = context.params;

  const post = await getPostByID(Number(tokenId));
  const creatorAddress = await zoraQuery.fetchCreator(tokenId as string);

  const res = await getSplitRecipients(creatorAddress);
  if (res && post) {
    // console.log(post);
    const recipients = res;
    return {
      props: {
        tokenId,
        recipients,
        post,
      },
      revalidate: 45,
    };
  }
  return {
    props: { tokenId, recipients: null, post },
    revalidate: 45,
  };
};

export default NFTView;
