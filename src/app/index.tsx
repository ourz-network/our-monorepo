import { MediaConfiguration } from "@zoralabs/nft-components";
import { NFTFetchConfiguration, Networks } from "@zoralabs/nft-hooks";
import { css } from "@emotion/react";
import web3 from "@/app/web3";

export default function GlobalProvider({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <NFTFetchConfiguration networkId={Networks.RINKEBY}>
      <web3.Provider>
        <MediaConfiguration
          networkId="4"
          style={{
            styles: {
              cardAuctionPricing: (theme, { type }) => {
                // eslint-disable-next-line consistent-return
                const getActiveStyle = () => {
                  // eslint-disable-next-line default-case
                  switch (type) {
                    case "reserve-active":
                      return `
                        background: #F68D15;
                        color: #fff;
                      `;
                    case "reserve-pending":
                      return `
                        background: #060606; 
                      `;
                    case "unknown":
                      return ``;
                    case "perpetual":
                      return ``;
                  }
                };
                return css`
                  display: grid;
                  grid-auto-flow: column;
                  grid-template-rows: auto auto;
                  grid-auto-columns: 1fr;
                  padding: ${theme.textBlockPadding};
                  border-top: ${theme.borderStyle};
                  ${getActiveStyle()};
                `;
              },
            },
            theme: {
              previewCard: {
                width: "330px",
                height: "330px",
                background: "#060606", // dark-background
              },
              nftProposalCard: {
                mediaWidth: ";",
                mediaHeight: ";",
              },
              // showCreator: true,
              // showOwner: true,
              showTxnLinks: true,
              // spacingUnit: "20px",
              textBlockPadding: "10px 15px",
              borderStyle: "1px solid #4D4D4D", // dark-border
              lineSpacing: 28,
              maximumPricingDecimals: 4,
              linkColor: "#B2B2B2", // ourange-300
              bodyFont: `
              color: #FFF;
              `, // dark-primary
              titleFont: `
                color: #F68D15; 
              `, // 70% gray
              headerFont: "color: #691900;",
              mediaContentFont: {
                fontFamily: `'Playfair Display', 'serif';`,
              },
              buttonColor: {
                primaryBackground: "#FFF",
                primaryText: "#000",
                background: "#000",
              },
              defaultBorderRadius: 0,
              fontSizeFull: 16,
              // audioColors: {
              //   waveformColor: '#999',
              //   progressColor: '#333'
              // }
            },
          }}
        >
          {children}
        </MediaConfiguration>
      </web3.Provider>
    </NFTFetchConfiguration>
  );
}

export { web3 };
