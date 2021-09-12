import Link from "next/link"; // Dynamic routing
import { NFTE } from "@nfte/react";
import {
  NFTFullPage,
  FullComponents,
} from "@zoralabs/nft-components";
import { toTrimmedAddress } from "@/ethereum/utils";
import DetailedPie from "@/components/Charts/DetailedPie";

const FullPageNFT = (props) => {
  const creatorAddress = props.creator;
  const tokenId = props.tokenId;
  // const [loading, setLoading] = useState(true);
  const ownAccount = props.ownAccount;
  const chartData = props.chartData;
  const recipients = props.recipients;
  console.log("chartdata FullPageNFT", chartData);

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
  //     console.log(chartData);
  //     setLoading(false);
  //   }
  // }, []);

  // let chartData;

  const jsCodeSnippet = `<div className='nft-embed'></div>
  <script
        async
        src='https://nfte.app/api/embed.js?contract=0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7&tokenId=${tokenId}'>
  </script>`; //mainnet REPLACE
  const reactCodeSnippet = `import { NFTE } from '@nfte/react';
        
  <NFTE contract="0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7" tokenId="${tokenId}"/>`;

  return (
    <NFTFullPage id={tokenId}>
      <div className="object-contain py-1 border-b border-dark-border bg-dark-accent min-h-33vh">
        <FullComponents.MediaFull />
      </div>
      <div className="p-6 mx-auto mb-16 max-w-11/12 xl:max-w-2/3">
        {" "}
        {/*border-b border-l border-r shadow-xl*/}
        <div className="flex flex-col content-center w-full mb-6 xl:flex-row">
          <div className="flex flex-col xl:w-7/12">
            <FullComponents.MediaInfo />
            <div className="my-2">
              <FullComponents.ProofAuthenticity />
            </div>
            <FullComponents.BidHistory />
          </div>
          <div className="flex flex-col justify-between xl:mt-0 xl:w-5/12 xl:ml-6">
            <div className="mb-2">
              <FullComponents.CreatorEquity />
            </div>
            {recipients?.length > 1 && (
              <div className="p-2 mb-2 border border-dark-border">
                <div className="text-xl text-center">{`${recipients.length} Split Recipients`}</div>
                <table className="w-full mt-2 table-fixed">
                  <thead>
                    <tr>
                      <th className="w-3/12 font-normal text-center border border-dark-border">
                        Recipient
                      </th>
                      <th className="w-4/12 font-normal text-center border border-dark-border">
                        Name
                      </th>
                      <th className="w-3/12 font-normal text-center border border-dark-border">
                        Role
                      </th>
                      <th className="w-2/12 font-normal text-center border border-dark-border">
                        Share
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipients.map((split, i) => {
                      return (
                        <tr
                          key={i}
                          className={i % 2 == 0 ? `bg-dark-background` : ``}
                        >
                          <td className="w-3/12 text-center border border-dark-border overflow-ellipsis hover:underline">
                            <Link
                              href={`/${split.user.id}`}
                              className="cursor-pointer"
                            >
                              {toTrimmedAddress(split.user.id)}
                            </Link>
                          </td>
                          <td className="text-center border border-dark-border">
                            {split.name}
                          </td>
                          <td className="text-center border border-dark-border">
                            {split.role}
                          </td>
                          <td className="text-center border border-dark-border">
                            {split.shares}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            {chartData?.length > 1 && (
              <div className="border border-dark-border h-96">
                <div className="mx-auto -mt-8 -mb-12 w-96 h-96">
                  <DetailedPie
                    chartData={chartData}
                    secondaryBool={false}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {!ownAccount ? (
          ""
        ) : (
          <div className="flex flex-col w-full h-auto p-4 my-2 border border-dark-border">
            <h1 className="mx-auto mb-2 text-xl text-center">Share</h1>
            <h1 className="mx-auto mb-4 text-sm italic text-center">
              Display on your own website thanks to NFTE!
            </h1>
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-col justify-center">
                <div>
                  <h2 className="font-bold">HTML/JS snippet</h2>
                  <h4>Copy/paste into your site:</h4>
                  <div className="h-auto p-1 mt-1 mb-4 overflow-visible font-mono text-sm border border-solid resize-none text-ourange-300 border-dark-border bg-code-snippet">
                    {jsCodeSnippet}
                  </div>
                </div>
                <div>
                  <h2 className="font-bold">React</h2>
                  <h4>
                    Install with npm i @nfte/react or yarn add @nfte/react
                  </h4>
                  <div className="h-auto p-1 mt-1 overflow-visible font-mono text-sm border border-solid resize-none text-ourange-300 border-dark-border bg-code-snippet">
                    {reactCodeSnippet}
                  </div>
                </div>
              </div>
              <div className="min-w-nfte lg:ml-6">
                <NFTE
                  contract="0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7"
                  tokenId={tokenId}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </NFTFullPage>
  );
};

export default FullPageNFT;
