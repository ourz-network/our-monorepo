import { useRouter } from "next/router";
import { useState, useEffect } from "react"; // State management
import { ethers } from "ethers";
import { Zora } from "@zoralabs/zdk";
import web3 from "@/app/web3";
import PageLayout from "@/components/Layout/PageLayout"; // Layout wrapper
import FullPageNFT from "@/components/Cards/FullPageNFT";
import { getSplitRecipients, getAllOurzTokens } from "@/modules/subgraphs/ourz/functions"; // GraphQL client
import { SplitRecipient, SplitZNFT } from "@/modules/subgraphs/ourz/types";
import ourzSubgraph from "@/modules/subgraphs/ourz";

const NFTView = ({
  tokenId,
  creator,
  recipients,
}: {
  tokenId: string;
  creator: string;
  recipients: string;
}): JSX.Element => {
  // const [loading, setLoading] = useState(true); // Global loading state
  const { address } = web3.useContainer();
  const [firstSale, setFirstSale] = useState();
  const [secondarySales, setSecondarySales] = useState();

  useEffect(() => {
    function formatChartData(Recipients) {
      // create first sale chart data
      const newChartData = Recipients.flatMap((recipient) => ({
        name: `${recipient.name || recipient.user.id}`,
        shares: Number(recipient.shares),
      }));

      setFirstSale(newChartData);

      // // edit for secondary sales chart data
      // newChartData = newChartData.map((recipient) => ({
      //   name: recipient.name,
      //   shares:
      //     Number(recipient.shares) *
      //     (Number(formData.creatorBidShare) / 100).toFixed(4),
      // }));

      // newChartData.push({
      //   name: "Owner",
      //   shares: 100 - Number(formData.creatorBidShare),
      // });

      // setSecondarySales(newChartData);
    }

    if (recipients) {
      formatChartData(recipients);
    }
  }, [recipients]);

  // const [ownAccount, setOwnAccount] = useState(false);
  // useEffect(() => {
  //   async function fetchCreatorAddress(tokenId) {
  //     const creator0x = await zoraQuery.fetchCreator(tokenId)
  //     setCreatorAddress(creator0x)
  //     return creator0x
  //   }
  //   if (tokenId) {
  //     setCreatorAddress(fetchCreatorAddress(tokenId))
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (address) {
  //     setOwnAccount(address == recipients);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [address]);

  return (
    <PageLayout>
      <div
        id="pagecontainer"
        className="flex overflow-y-hidden flex-col w-full h-auto min-h-screen bg-dark-background"
      >
        {/* {loading && 
          <p className="mx-auto text-center text-dark-primary"> 
            one moment please...
          </p>} */}
        <FullPageNFT
          tokenId={tokenId}
          ownAccount
          chartData={firstSale}
          recipients={recipients}
          creator={creator}
        />
      </div>
    </PageLayout>
  );
};

// Run on server build
// eslint-disable-next-line consistent-return
export async function getStaticPaths(): Promise<{ paths: any[]; fallback: boolean }> {
  // const queryProvider = ethers.providers.getDefaultProvider("rinkeby", {
  //   infura: process.env.NEXT_PUBLIC_INFURA_ID,
  //   alchemy: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
  //   pocket: process.env.NEXT_PUBLIC_POKT_ID,
  //   etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_KEY,
  // });
  // const zoraQuery = new Zora(queryProvider, 4);
  // const unburned = await zoraQuery.fetchTotalMedia();
  // const maxSupply = await zoraQuery.fetchMediaByIndex(unburned - 1);
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
}

// Run on page load
export async function getStaticProps(
  context
): Promise<
  | { props: { tokenId: any; creator: string; recipients: SplitRecipient[] }; revalidate: number }
  | { props: { tokenId: any; creator: string; recipients?: undefined }; revalidate: number }
> {
  const queryProvider = ethers.providers.getDefaultProvider("rinkeby", {
    infura: process.env.NEXT_PUBLIC_INFURA_ID,
    alchemy: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    pocket: process.env.NEXT_PUBLIC_POKT_ID,
    etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_KEY,
  });
  const zoraQuery = new Zora(queryProvider, 4);

  const { tokenId } = context.params;
  const creatorAddress = await zoraQuery.fetchCreator(tokenId);

  const res = await getSplitRecipients(creatorAddress);
  if (res) {
    const recipients = res;
    return {
      props: {
        tokenId,
        creator: creatorAddress,
        recipients,
      },
      revalidate: 45,
    };
  }
  return {
    props: { tokenId, creator: creatorAddress },
    revalidate: 45,
  };
}

export default NFTView;
