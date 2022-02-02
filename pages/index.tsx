import { FetchStaticData, MediaFetchAgent } from "@zoralabs/nft-hooks";
import { useContext, useLayoutEffect } from "react";
import { GetServerSideProps } from "next";
import styled from "@emotion/styled";
import { Box, Spinner, useTheme } from "degene-sais-quoi";
import Head from "../components/head";
import { PageWrapper } from "../styles/components";
import { NFTList } from "../components/NFTList";
import { SubdomainContext } from "../context/SubdomainContext";
import clientPromise from "../mongodb/client";
import { getAddressFromENS } from "../utils/ethers";

export default function Home({
  tokens,
  config,
  noSubdomain,
}: {
  tokens?: any;
  config?: any;
  noSubdomain?: boolean;
}) {
  const { userConfig } = useContext(SubdomainContext);
  const { setMode, setAccent } = useTheme();
  useLayoutEffect(() => {
    if (userConfig?.mode) {
      setMode(userConfig?.mode);
      setAccent(userConfig?.accent);
    }
  }, [userConfig]);

  // eslint-disable-next-line react/jsx-filename-extension
  return (
    <IndexWrapper>
      {noSubdomain || userConfig?.subdomain === "www" ? (
        //TODO make homepage for subdomain-less url
        <Box
          display="flex"
          flexDirection="column"
          width="full"
          height="full"
          justifyContent="center"
          alignItems="center"
        >
          HomePage still needs work... <Spinner />
        </Box>
      ) : (
        <>
          <Head config={userConfig ?? config} />
          <h1>{userConfig?.title ? userConfig.title : config?.title ?? ""}</h1>
          <h2>{userConfig?.desc ? userConfig.desc : config?.desc ?? ""}</h2>
          <NFTList tokens={tokens} />
        </>
      )}
    </IndexWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const hostname = context.req.headers?.host;
  const subdomain = hostname?.slice(0, hostname.indexOf("."));

  // sorry www.eth
  if (subdomain !== ("localhost:300" && "www" && "")) {
    try {
      const client = await clientPromise;
      const collection = await client.db().collection("ourGallery");
      const config = await collection.findOne({ _id: `${subdomain}` });

      const fetchAgent = new MediaFetchAgent(config?.networkId ?? 1);
      const contractAddresses: string[] =
        config?.contracts.split(",") ?? JSON.parse(process.env.NEXT_PUBLIC_MAINNET_CONTRACTS);

      const tokens = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
        curatorAddress: config?.curator ?? (await getAddressFromENS(subdomain)),
        collectionAddresses: [
          ...contractAddresses,
          // "0xCa21d4228cDCc68D4e23807E5e370C07577Dd152", // Zorbs
          // "0x12C8630369977eE708C8E727d8e838f74D9420C5", // GM
          // "0xb80fBF6cdb49c33dC6aE4cA11aF8Ac47b0b4C0f3", // EthBlockArt
        ],
        limit: 25,
        offset: 0,
      });

      return {
        props: {
          tokens,
          config,
          noSubdomain: false,
          revalidate: 10,
        },
      };
    } catch (error) {
      return {
        props: {
          config: {},
          noSubdomain: false,
          revalidate: 10,
        },
      };
    }
  }
  return {
    props: {
      noSubdomain: true,
      revalidate: 60,
    },
  };
};

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;
