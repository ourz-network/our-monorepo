import { useEffect, useState } from "react"; // State management
import { ethers } from "ethers";
import { Zora } from "@zoralabs/zdk";
import { GetStaticPaths, GetStaticProps } from "next";
import PageLayout from "@/components/Layout/PageLayout"; // Layout wrapper
import FullPageNFT from "@/components/Cards/FullPageNFT";
import { getAllOurzTokens, getSplitOwners, getSplitRecipients } from "@/subgraphs/ourz/functions"; // GraphQL client
import { SplitRecipient, SplitZNFT } from "@/utils/OurzSubgraph";
import { getPostByID } from "@/modules/subgraphs/zora/functions";
import { NFTCard } from "@/modules/subgraphs/utils";
import web3 from "@/app/web3";

const ViewERC721 = ({
  tokenId,
  recipients,
  post,
  proxyOwners,
}: {
  tokenId: string;
  recipients: SplitRecipient[];
  post: NFTCard;
  proxyOwners: string[];
  // creator: string;
}): JSX.Element => {
  const { signer, address } = web3.useContainer();
  const [isOwner, setIsOwner] = useState(false);
  const [firstSale, setFirstSale] = useState<{ name: string; shares: number }[] | undefined>();

  useEffect(() => {
    function formatChartData(Recipients: SplitRecipient[]) {
      // create first sale chart data
      const newChartData = Recipients.flatMap((recipient) => ({
        name: `${recipient.name || recipient.user.id}`,
        shares: Number(recipient.shares),
      }));

      setFirstSale(newChartData);
    }

    if (recipients) {
      formatChartData(recipients);
    }
  }, [recipients]);

  useEffect(() => {
    function checkOwners(ethAddress: string) {
      const found = proxyOwners.find((owner) => owner === ethAddress.toString().toLowerCase());

      if (found) {
        setIsOwner(true);
      }
    }
    if (address && proxyOwners) {
      checkOwners(address);
    }
  }, [address, proxyOwners]);

  return (
    <PageLayout>
      <div
        id="pagecontainer"
        className="flex overflow-y-hidden flex-col w-full h-auto min-h-screen bg-dark-background"
      >
        <FullPageNFT
          post={post}
          tokenId={tokenId}
          isOwner={isOwner}
          signer={signer}
          chartData={firstSale}
          recipients={recipients || null}
        />
      </div>
    </PageLayout>
  );
};

// Run on server build

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

  const recipients = await getSplitRecipients(creatorAddress);
  const proxyOwners = await getSplitOwners(creatorAddress);
  return {
    props: {
      tokenId,
      recipients,
      post,
      proxyOwners,
    },
    revalidate: 5,
  };
};

export default ViewERC721;
