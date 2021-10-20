import { useEffect, useState } from "react"; // State management
import { BigNumber, ethers } from "ethers";
import { GetStaticPaths, GetStaticProps } from "next";
import PageLayout from "@/components/Layout/PageLayout"; // Layout wrapper
import FullPageNFT from "@/components/Cards/FullPageNFT";
import {
  getAllOurzEditions,
  getPostByEditionAddress,
  getSplitOwners,
  getSplitRecipients,
} from "@/subgraphs/ourz/functions"; // GraphQL client
import { SplitRecipient } from "@/utils/OurzSubgraph";
import editionJSON from "@/ethereum/abis/SingleEditionMintable.json";
import web3 from "@/app/web3";
import { NFTCard } from "@/modules/subgraphs/utils";

const editionABI = editionJSON.abi;

const ViewEdition = ({
  post,
  saleInfo,
  recipients,
  proxyOwners,
}: {
  post: NFTCard;
  saleInfo: { maxSupply: number; currentSupply: number; salePrice: number; whitelistOnly: boolean };
  recipients: SplitRecipient[];
  proxyOwners: string[];
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
        {post && saleInfo && (
          <FullPageNFT
            post={post}
            isOwner={isOwner}
            saleInfo={saleInfo}
            chartData={firstSale}
            signer={signer}
          />
        )}
      </div>
    </PageLayout>
  );
};

// Run on server build

export const getStaticPaths: GetStaticPaths = async () => {
  const ourEditions = await getAllOurzEditions();

  const paths = [];
  for (let i = ourEditions?.length - 1; i >= 0; i -= 1) {
    paths.push({ params: { editionAddress: `${ourEditions[i].id}` } });
  }
  return { paths, fallback: true };
};

// Run on page load
export const getStaticProps: GetStaticProps = async (context) => {
  const { editionAddress } = context.params;
  const queryProvider = ethers.providers.getDefaultProvider("rinkeby", {
    infura: process.env.NEXT_PUBLIC_INFURA_ID,
    alchemy: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    pocket: process.env.NEXT_PUBLIC_POKT_ID,
    etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_KEY,
  });
  const editionContract = new ethers.Contract(editionAddress, editionABI, queryProvider);

  const post = await getPostByEditionAddress(editionAddress);

  const recipients = await getSplitRecipients(post.creator);

  const proxyOwners = await getSplitOwners(post.creator);

  const editionSize: BigNumber = await editionContract.editionSize();
  let totalSupply = BigNumber.from(0);
  try {
    totalSupply = await editionContract.totalSupply();
  } catch (error) {
    // console.log(error);
  }
  const salePrice = await editionContract.salePrice();
  // const whitelistOnly = await editionContract.allowedMinters(zeroAddress);
  const saleInfo = {
    maxSupply: Number(editionSize.toString()),
    currentSupply: Number(totalSupply.toString()),
    salePrice: Number(ethers.utils.formatUnits(salePrice)),
    // whitelistOnly,
  };

  return {
    props: {
      post,
      saleInfo,
      recipients,
      proxyOwners,
    },
    revalidate: 1,
  };
};

export default ViewEdition;
