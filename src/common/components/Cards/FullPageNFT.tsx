import { NFTE } from "@nfte/react";
import { FullComponents, NFTFullPage } from "@zoralabs/nft-components";
import DetailedPie from "@/components/Charts/DetailedPie";
import Table from "@/components/Charts/Table";
import { SplitRecipient } from "@/utils/OurzSubgraph";
import { Ourz20210928 } from "@/utils/20210928";
import { Media } from "@/utils/ZoraSubgraph";

const FullPageNFT = ({
  tokenId,
  ownAccount,
  chartData,
  recipients,
  post,
}: {
  tokenId: string;
  ownAccount: boolean;
  chartData: {
    name: string;
    shares: number;
  }[];
  recipients: SplitRecipient[];
  post: Media & { metadata: Ourz20210928 };
}): JSX.Element => {
  const jsCodeSnippet = `<div className='nft-embed'></div>
  <script
        async
        src='https://nfte.app/api/embed.js?contract=0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7&tokenId=${tokenId}'>
  </script>`; // mainnet REPLACE
  const reactCodeSnippet = `import { NFTE } from '@nfte/react';
import Link from 'next/link';
        
  <NFTE contract="0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7" tokenId="${tokenId}"/>`;

  return (
    <NFTFullPage id={tokenId}>
      <div className="flex object-contain justify-center p-2 border-b md:p-8 max-h-75vh border-dark-border bg-dark-accent md:min-h-33vh">
        {/* <FullComponents.MediaFull /> */}

        {post?.metadata?.mimeType?.includes("image") && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={`NFT #${post.id} Thumbnail`}
            src={post.contentURI}
            className="object-contain max-w-full max-h-full"
          />
        )}
        {post?.metadata?.mimeType?.includes("video") && (
          <video muted autoPlay controls={false} loop playsInline>
            <source src={post.contentURI} />
          </video>
        )}
      </div>
      <div className="p-6 mx-auto mb-6 max-w-11/12 xl:max-w-5/6">
        {" "}
        {/* border-b border-l border-r shadow-xl */}
        <div className="flex flex-col content-center mb-6 w-full lg:space-x-4 lg:flex-row">
          <div className="flex flex-col space-y-2 lg:w-7/12">
            {/* <FullComponents.MediaInfo /> */}
            <div className="flex flex-col justify-between mb-4 md:flex-row">
              {post?.metadata && (
                <div className="flex flex-col justify-between space-y-2 h-full">
                  <p className="text-xl tracking-wider lg:text-4xl font-hero text-dark-primary">{`${post.metadata.name}`}</p>
                  <p className="whitespace-pre-wrap break-words text-dark-primary">{`${post.metadata.description}`}</p>
                </div>
              )}

              <div className="hidden my-auto md:block">
                <FullComponents.PlaceOfferButton />
              </div>
            </div>
            <FullComponents.AuctionInfo />

            <div className="my-2">
              <FullComponents.ProofAuthenticity />
            </div>
          </div>
          <div className="flex flex-col space-y-2 xl:mt-0 xl:w-5/12 xl:ml-6">
            <FullComponents.CreatorEquity />
            <FullComponents.BidHistory />
            {recipients?.length > 1 && <Table recipients={recipients} />}
            {chartData?.length > 1 && (
              <div className="h-96 border border-dark-border">
                <div className="m-auto w-96 h-96">
                  <DetailedPie chartData={chartData} secondaryBool={false} />
                </div>
              </div>
            )}
          </div>
        </div>
        {ownAccount && (
          <div className="hidden p-4 mx-auto my-2 w-full h-auto border min-w-nfte border-dark-border md:flex-col md:flex">
            <h1 className="mx-auto mb-2 text-xl text-center">Share</h1>
            <h1 className="mx-auto mb-4 text-sm italic text-center">
              Display on your own website thanks to NFTE!
            </h1>
            <div className="flex flex-col justify-center mt-2 w-full">
              <div className="flex flex-col justify-center">
                <div className="mx-auto">
                  <h2 className="font-bold">HTML/JS snippet</h2>
                  <h4>Copy/paste into your site:</h4>
                  <div className="overflow-visible p-1 mt-1 mb-4 h-auto font-mono text-sm whitespace-pre-wrap break-all border border-solid resize-none text-ourange-300 border-dark-border bg-code-snippet">
                    {jsCodeSnippet}
                  </div>
                </div>
                <div className="mx-auto">
                  <h2 className="font-bold">React</h2>
                  <h4>Install with npm i @nfte/react or yarn add @nfte/react</h4>
                  <div className="overflow-visible p-1 mt-1 mb-2 h-auto font-mono text-sm whitespace-pre-wrap break-all border border-solid resize-none text-ourange-300 border-dark-border bg-code-snippet">
                    {reactCodeSnippet}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify center">
              <div className="mx-auto">
                <NFTE contract="0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7" tokenId={tokenId} />
              </div>
            </div>
          </div>
        )}
      </div>
    </NFTFullPage>
  );
};

export default FullPageNFT;
