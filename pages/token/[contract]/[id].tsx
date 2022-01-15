/* eslint-disable react/jsx-filename-extension */
import { useEffect, useState } from "react";
import { NFTFullPage, MediaConfiguration } from "@zoralabs/nft-components";
import { useRouter } from "next/router";
import {
  MediaFetchAgent,
  NetworkIDs,
  FetchStaticData,
} from "@zoralabs/nft-hooks";
import { GetServerSideProps } from "next";
import { NETWORK_ID, APP_TITLE } from './../../../utils/env-vars'
import { PageWrapper } from "../../../styles/components";
import Head from "../../../components/head";

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

export default function Piece({
  name,
  description,
  image,
  initialData,
}: PieceProps) {
  const { query } = useRouter();
  const { contract, id } = query;

  useEffect(() => {
    async function getMetadata() {
      try {
        if (!id || !contract) {
          console.log("Not Found");
        } else {
          const fetchAgent = new MediaFetchAgent(process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs);
          const data = await FetchStaticData.fetchZoraIndexerItem(fetchAgent, {
            // @ts-ignore
            tokenId: id,
            // @ts-ignore
            collectionAddress: contract,
          });

          const tokenInfo = await FetchStaticData.getIndexerServerTokenInfo(data);

          if (tokenInfo) {
            setFound(true);
            setMeta({
              name: tokenInfo.metadata?.name || null,
              description: tokenInfo.metadata?.description || null,
              image: tokenInfo.image || null,
              initialData: data,
            });
            setLoading(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    getMetadata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head
        title={`${meta?.name || "Loading..."} | ${APP_TITLE}`}
        description={meta?.description || "One moment, please"}
        ogImage={meta?.image || ""}
      />
      <MediaConfiguration
        networkId={NETWORK_ID as NetworkIDs}
        style={styles}
      >
        <PageWrapper>
          {!loading && found && (
            <NFTFullPage
              useBetaIndexer
              contract={contract as string}
              id={id as string}
              initialData={meta?.initialData}
            />
          )}
        </PageWrapper>
      </MediaConfiguration>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.id || Array.isArray(params.id)) {
    return { notFound: true };
  }
  if (!params?.contract || Array.isArray(params.contract)) {
    return { notFound: true };
  }

  const id = params.id as string;
  const contract = params.contract as string;

  const fetchAgent = new MediaFetchAgent(
    NETWORK_ID as NetworkIDs
  );
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
    },
  };
};
