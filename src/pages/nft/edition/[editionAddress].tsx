import { useEffect, useState } from "react"; // State management
import { BigNumber, ethers } from "ethers";
import { GetStaticPaths, GetStaticProps } from "next";
import PageLayout from "@/components/Layout/PageLayout"; // Layout wrapper
import FullPageEdition from "@/components/Cards/FullPageEdition";
import { getAllOurzEditions, getEditionMetadata } from "@/subgraphs/ourz/functions"; // GraphQL client
import { SplitRecipient, SplitEdition } from "@/utils/OurzSubgraph";
import editionJSON from "@/ethereum/abis/SingleEditionMintable.json";
import web3 from "@/app/web3";

const editionABI = editionJSON.abi;

const ViewEdition = ({
  metadata,
  saleInfo,
}: {
  metadata: SplitEdition;
  saleInfo: { maxSupply: number; currentSupply: number; salePrice: number; whitelistOnly: boolean };
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

    if (metadata?.creator?.splitRecipients) {
      formatChartData(metadata?.creator?.splitRecipients);
    }
  }, [metadata?.creator?.splitRecipients]);

  useEffect(() => {
    function checkOwners(ethAddress: string) {
      const found = metadata.creator.proxyOwners.find(
        (owner) => owner.id === ethAddress.toString().toLowerCase()
      );

      if (found) {
        setIsOwner(true);
      }
    }
    if (address && metadata?.creator?.proxyOwners) {
      checkOwners(address);
    }
  }, [address, metadata?.creator?.proxyOwners]);

  return (
    <PageLayout>
      <div
        id="pagecontainer"
        className="flex overflow-y-hidden flex-col w-full h-auto min-h-screen bg-dark-background"
      >
        {metadata && saleInfo && (
          <FullPageEdition
            metadata={metadata}
            saleInfo={saleInfo}
            isOwner={isOwner}
            chartData={firstSale}
            signer={signer}
          />
        )}
      </div>
    </PageLayout>
  );
};

// Run on server build
// eslint-disable-next-line consistent-return
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

  const res = await getEditionMetadata(editionAddress);

  if (res) {
    const metadata = res;
    const editionSize: BigNumber = await editionContract.editionSize();
    let totalSupply = BigNumber.from(0);
    try {
      totalSupply = await editionContract.totalSupply();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
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
        editionAddress,
        metadata,
        saleInfo,
      },
      revalidate: 1,
    };
  }

  return {
    props: { editionAddress, metadata: undefined },
    revalidate: 1,
  };
};

export default ViewEdition;
