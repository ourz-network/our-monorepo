import { GetServerSideProps } from "next";
import styled from "@emotion/styled";
import Head from "../components/head";
import { PageWrapper } from "../styles/components";
import { NFTList } from "../components/NFTList";
import { FetchStaticData, MediaFetchAgent } from "@zoralabs/nft-hooks";
import { useContext, useLayoutEffect } from "react";
import { SubdomainContext } from "../context/SubdomainContext";
import clientPromise from "../mongodb/client";
import { getAddressFromENS } from "../utils/ethers";
import { useTheme } from "degene-sais-quoi";
import { Accent, Mode } from "degene-sais-quoi/dist/types/tokens";

export default function Home({
  tokens,
  config,
  noSubdomain,
}: {
  tokens: any;
  config: any;
  noSubdomain: boolean;
}) {
  const { userConfig } = useContext(SubdomainContext);
  const { setMode, setAccent } = useTheme();
  useLayoutEffect(() => {
    if (userConfig?.mode) {
      setMode(userConfig?.mode as Mode);
      setAccent(userConfig?.accent as Accent);
    }
  }, [userConfig]);

  // eslint-disable-next-line react/jsx-filename-extension
  return (
    <IndexWrapper>
      {noSubdomain ? (
        <div className="">HomePage</div>
      ) : (
        <>
          <Head config={config ?? userConfig} />
          {userConfig?.title?.length > 0 && <h1>{userConfig.title}</h1>}
          {userConfig?.desc?.length > 0 && <h2>{userConfig.desc}</h2>}
          <NFTList tokens={tokens} />
        </>
      )}
    </IndexWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const hostname = context.req.headers.host;
  const subdomain = hostname.slice(0, hostname.indexOf("."));

  if (subdomain !== "localhost:300") {
    const client = await clientPromise;
    const collection = await client.db().collection("ourGallery");
    const config = await collection.findOne({ _id: `${subdomain}` });

    const fetchAgent = new MediaFetchAgent(config?.networkId ?? 1);
    const contractAddresses = config?.contracts ?? [
      process.env.NEXT_PUBLIC_MAINNET_CONTRACTS as string,
    ];

    const tokens = await FetchStaticData.fetchUserOwnedNFTs(
      fetchAgent,
      {
        userAddress: await getAddressFromENS(subdomain),
        collectionAddresses: [
          ...contractAddresses,
          "0xCa21d4228cDCc68D4e23807E5e370C07577Dd152", // Zorbs
          "0x12C8630369977eE708C8E727d8e838f74D9420C5", // GM
          "0xb80fBF6cdb49c33dC6aE4cA11aF8Ac47b0b4C0f3", // EthBlockArt
        ],
        limit: 25,
        offset: 0,
      },
      true
    );

    return {
      props: {
        tokens,
        config,
        noSubdomain: false,
      },
    };
  }
  return {
    props: {
      noSubdomain: true,
    },
  };
};

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;
