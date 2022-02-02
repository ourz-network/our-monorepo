import { NFTFullPage } from "@ourz/our-components";
import { useRouter } from "next/router";
import { MediaFetchAgent, FetchStaticData } from "@zoralabs/nft-hooks";
import { GetServerSideProps } from "next";
import { PageWrapper } from "../../../styles/components";
import Head from "../../../components/head";
import { useContext, useLayoutEffect } from "react";
import { SubdomainContext } from "../../../context/SubdomainContext";
import clientPromise from "../../../mongodb/client";
import { useTheme } from "degene-sais-quoi";

const styles = {
  theme: {
    lineSpacing: 24,
    linkColor: "var(--black)",
  },
};

type PieceProps = {
  name: string;
  description: string;
  image: string;
  initialData: any;
};

export default function Piece({ name, description, image, initialData }: PieceProps) {
  const { query } = useRouter();
  const { userConfig } = useContext(SubdomainContext);
  const { setMode, setAccent } = useTheme();
  useLayoutEffect(() => {
    if (userConfig?.mode) {
      setMode(userConfig?.mode);
      setAccent(userConfig?.accent);
    }
  }, [userConfig]);

  return (
    <>
      <Head
        title={`
          ${name}${userConfig?.title ? ` | ${userConfig?.title}` : ``}`}
        description={description}
        ogImage={image}
      />
      <PageWrapper>
        <NFTFullPage
          useBetaIndexer={true}
          contract={query.contract as string}
          id={query.id as string}
          initialData={initialData}
        />
      </PageWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const hostname = req.headers.host;
  const subdomain = hostname.slice(0, hostname.indexOf("."));

  const client = await clientPromise;
  const collection = await client.db().collection("ourGallery");
  const config = await collection.findOne({ _id: `${subdomain}` });

  if (!params?.id || Array.isArray(params.id)) {
    return { notFound: true };
  }
  if (!params?.contract || Array.isArray(params.contract)) {
    return { notFound: true };
  }

  const id = params.id as string;
  const contract = params.contract as string;

  const fetchAgent = new MediaFetchAgent(config?.networkId ?? 1);
  const data = await FetchStaticData.fetchZoraIndexerItem(fetchAgent, {
    tokenId: id,
    collectionAddress: contract,
  });

  const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(data);

  return {
    props: {
      id,
      name: tokenInfo.metadata?.name || null,
      description: tokenInfo.metadata?.description || null,
      image: tokenInfo.image || null,
      initialData: data,
      config,
    },
  };
};
