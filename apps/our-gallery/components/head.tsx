import NextHead from "next/head";
import { UserConfig } from "../context/SubdomainContext";
import { BASE_URL, FAVICON, DEFAULT_OG_CARD } from "../utils/env-vars";

const Head = ({
  title,
  description,
  url,
  ogImage,
  config,
}: {
  title?: string;
  description?: string;
  url?: string;
  ogImage?: string;
  config?: UserConfig;
}) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{config?.title ?? `Our Gallery`}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={config?.desc ?? `An ENS Based NFT Gallery`} />
    <link rel="icon" type="image/png" sizes="24x24" href={FAVICON} />
    <meta property="og:url" content={url || BASE_URL} />
    <meta property="og:title" content={title || ""} />
    <meta property="og:description" content={config?.desc ?? `An ENS Based NFT Gallery`} />
    <meta name="twitter:site" content={url || BASE_URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={ogImage || DEFAULT_OG_CARD} />
    <meta property="og:image" content={ogImage || DEFAULT_OG_CARD} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </NextHead>
);

export default Head;
