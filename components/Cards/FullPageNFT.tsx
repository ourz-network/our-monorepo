import { NFTE } from "@nfte/react";
import { NFTFullPage, FullComponents } from "@zoralabs/nft-components";
import DetailedPie from "@/components/Charts/DetailedPie";
import Table from "@/components/Charts/Table";
import { SplitRecipient } from "@/modules/subgraphs/ourz/types";

const FullPageNFT = ({
  tokenId,
  ownAccount,
  chartData,
  recipients,
}: {
  tokenId: number;
  ownAccount: boolean;
  chartData: any;
  recipients: SplitRecipient[];
}): JSX.Element => {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function getSplitMetadata(tokenId) {
  //     const metadataURI = await zoraQuery.fetchMetadataURI(tokenId);
  //     const res = await axios.get(metadataURI);
  //     const metadata = await res.data;
  //     if (metadata?.attributes) {
  //       const newChartData = metadata.attributes.flatMap((split) => ({
  //         name: `${split.name}`,
  //         shares: Number(split.shares),
  //         address: `${split.address}`,
  //         role: `${split.role}`,
  //       }));
  //       setChartData(newChartData);
  //     }

  //   }
  //   if (tokenId) {
  //     getSplitMetadata(tokenId);
  //     setLoading(false);
  //   }
  // }, []);

  // let chartData;

  const jsCodeSnippet = `<div className='nft-embed'></div>
  <script
        async
        src='https://nfte.app/api/embed.js?contract=0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7&tokenId=${tokenId}'>
  </script>`; // mainnet REPLACE
  const reactCodeSnippet = `import { NFTE } from '@nfte/react';
        
  <NFTE contract="0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7" tokenId="${tokenId}"/>`;

  return (
    <NFTFullPage id={tokenId.toString()}>
      <div className="object-contain py-1 border-b border-dark-border bg-dark-accent min-h-33vh">
        <FullComponents.MediaFull />
      </div>
      <div className="p-6 mx-auto mb-16 max-w-11/12 xl:max-w-5/6">
        {" "}
        {/* border-b border-l border-r shadow-xl */}
        <div className="flex flex-col content-center mb-6 w-full xl:flex-row">
          <div className="flex flex-col xl:w-7/12">
            <FullComponents.MediaInfo />
            <FullComponents.AuctionInfo />
            <div className="self-end my-2">
              <FullComponents.PlaceOfferButton />
            </div>
            <FullComponents.BidHistory />
            <div className="my-2">
              <FullComponents.ProofAuthenticity />
            </div>
          </div>
          <div className="flex flex-col justify-between xl:mt-0 xl:w-5/12 xl:ml-6">
            <div className="mb-2">
              <FullComponents.CreatorEquity />
            </div>
            {recipients?.length > 1 && <Table recipients={recipients} />}
            {chartData?.length > 1 && (
              <div className="h-96 border border-dark-border">
                <div className="mx-auto -mt-8 -mb-12 w-96 h-96">
                  <DetailedPie chartData={chartData} secondaryBool={false} />
                </div>
              </div>
            )}
          </div>
        </div>
        {!ownAccount ? (
          ""
        ) : (
          <div className="hidden p-4 mx-auto my-2 w-3/4 h-auto border min-w-nfte border-dark-border md:flex-col md:flex">
            <h1 className="mx-auto mb-2 text-xl text-center">Share</h1>
            <h1 className="mx-auto mb-4 text-sm italic text-center">
              Display on your own website thanks to NFTE!
            </h1>
            <div className="flex justify center">
              <div className="mx-auto min-w-nfte">
                <NFTE
                  contract="0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7"
                  tokenId={tokenId.toString()}
                />
              </div>
            </div>
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
                  <div className="overflow-visible p-1 mt-1 h-auto font-mono text-sm whitespace-pre-wrap break-all border border-solid resize-none text-ourange-300 border-dark-border bg-code-snippet">
                    {reactCodeSnippet}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </NFTFullPage>
  );
};

export default FullPageNFT;
