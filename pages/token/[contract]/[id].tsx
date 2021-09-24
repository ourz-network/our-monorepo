/* eslint-disable react/jsx-filename-extension */
import { useEffect, useState } from "react";
import { NFTFullPage, MediaConfiguration } from "@zoralabs/nft-components";
import { useRouter } from "next/router";
import { MediaFetchAgent, NetworkIDs, FetchStaticData } from "@zoralabs/nft-hooks";

import { PageWrapper } from "../../../styles/components";
import Head from "../../../components/head";

const styles = {
  theme: {
    lineSpacing: 24,
    linkColor: "var(--black)",
  },
};

const APP_TITLE = process.env.NEXT_PUBLIC_APP_TITLE;

export default function Piece() {
  const [loading, setLoading] = useState(true);
  const [found, setFound] = useState(false);
  const [meta, setMeta] = useState({
    name: "",
    description: "",
    image: "",
    initialData: {},
  });

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
        networkId={process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs}
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
