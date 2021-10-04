import { MediaConfiguration } from "@zoralabs/nft-components";
import { NFTFetchConfiguration, Networks } from "@zoralabs/nft-hooks";
import web3 from "@/app/web3";

export default function GlobalProvider({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <NFTFetchConfiguration networkId={Networks.RINKEBY}>
      <web3.Provider>
        <MediaConfiguration
          networkId="4"
          style={{
            theme: {
              borderStyle: "1px solid #4D4D4D", // dark-border
              defaultBorderRadius: 0,
              lineSpacing: 28,
              /*
               * headerFont: "color: #691900;",
               * titleFont: "color: #FF7246;", //dark-primary
               */
              bodyFont: "color: #FFFFFF;", // dark-primary
              linkColor: "#FF7246", // ourange-300
              buttonColor: {
                primaryBackground: "#FFF",
                primaryText: "#000",
                background: "#000",
              },
              previewCard: {
                background: "#060606", // dark-background
                height: "330px",
                width: "330px",
              },
              /*
               * titleFont: {
               *   color: "#fff",
               * },
               * mediaContentFont: {
               *   color: "#fff",
               * },
               */
            },
            /*
             * styles: {
             *   cardAuctionPricing: {
             *     display: "hidden",
             *   },
             *   cardItemInfo: {
             *     display: "hidden",
             *   },
             * },
             */
          }}
        >
          {children}
        </MediaConfiguration>
      </web3.Provider>
    </NFTFetchConfiguration>
  );
}

export { web3 };
