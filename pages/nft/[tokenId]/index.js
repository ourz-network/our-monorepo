import { useRouter } from "next/router";
import { useState, useEffect } from "react"; // State management
import web3 from "@/app/web3";
import PageLayout from "@/components/Layout/PageLayout"; // Layout wrapper
import SinglePageViewNFT from "@/components/Cards/SinglePageViewNFT";
import { ethers } from "ethers";
import { Zora } from "@zoralabs/zdk";
import { getSplitRecipients } from "@/modules/subgraphs/ourz/functions"; // GraphQL client

const NFTView = ({ tokenId, creator, recipients }) => {
  console.log(`tokenId: ${tokenId}\nrecipients: ${recipients}`);
  // const [loading, setLoading] = useState(true); // Global loading state
  const { address } = web3.useContainer();
  const [firstSale, setFirstSale] = useState();
  const [secondarySales, setSecondarySales] = useState();

  useEffect(() => {
    function formatChartData(recipients) {
      // create first sale chart data
      let newChartData = recipients.flatMap((recipient) => ({
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
  //     console.log(`creator0x: `, creator0x);
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
  //     console.log(recipients);
  //     setOwnAccount(address == recipients);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [address]);

  return (
    <PageLayout>
      <div
        id="pagecontainer"
        className="flex flex-col w-full h-auto min-h-screen overflow-y-hidden bg-dark-background"
      >
        {/* {loading && 
          <p className="mx-auto text-center text-dark-primary"> 
            one moment please...
          </p>} */}
        <SinglePageViewNFT
          tokenId={tokenId}
          ownAccount={true}
          chartData={firstSale}
          recipients={recipients}
          creator={creator}
        />
      </div>
    </PageLayout>
  );
};

// Run on server build
export async function getStaticPaths() {
  const queryProvider = ethers.providers.getDefaultProvider("rinkeby", {
    infura: process.env.NEXT_PUBLIC_INFURA_ID,
    alchemy: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    pocket: process.env.NEXT_PUBLIC_POKT_ID,
    etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_KEY,
  });
  const zoraQuery = new Zora(queryProvider, 4);
  const unburned = await zoraQuery.fetchTotalMedia();
  const maxSupply = await zoraQuery.fetchMediaByIndex(unburned - 1);
  let paths = [];
  if (maxSupply) {
    for (let i = maxSupply; i >= maxSupply - 2; i--) {
      paths.push({ params: { tokenId: `${i}` } });
    }

    console.log(paths);
    return { paths, fallback: true };
  }
}

// Run on page load
export async function getStaticProps(context) {
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
    console.log(`resdata: `, recipients);
    return {
      props: {
        tokenId: tokenId,
        creator: creatorAddress,
        recipients: recipients,
      },
      revalidate: 45,
    };
  } else {
    return {
      props: { tokenId: tokenId, creator: creatorAddress },
      revalidate: 45,
    };
  }
}

export default NFTView;
