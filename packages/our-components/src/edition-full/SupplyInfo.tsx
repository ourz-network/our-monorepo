'use client'

import { Fragment, useContext } from 'react'
import type { EditionDetailsFragment } from 'our-hooks/dist/graph-queries/ourz-graph-types'

import { EditionDataContext } from '../context/EditionDataContext'
import type { StyleProps } from '../utils/StyleTypes'

import { InfoContainer, InfoContainerProps } from './InfoContainer'

type SupplyInfoProps = {
  showPerpetual?: boolean
} & StyleProps

const SupplyInfoWrapper = ({
  className,
  children,
  ...containerArgs
}: InfoContainerProps) => (
  <InfoContainer {...containerArgs} className={className}>
    {children}
  </InfoContainer>
)

export const SupplyInfo = ({
  showPerpetual = true,
  className,
}: SupplyInfoProps) => {
  const { edition } = useContext(EditionDataContext)
  // const { getStyles, getString } = useMediaContext();

  if (!edition) {
    return <></>
  }

  const { data } = edition

  if (
    (data as EditionDetailsFragment & { totalSupply: number }).totalSupply &&
    data?.editionSize
  ) {
    return (
      <SupplyInfoWrapper titleString='EDITION_SUPPLY'>
        {`${
          (data as EditionDetailsFragment & { totalSupply: number }).totalSupply
        }/${data.editionSize} Minted`}
        {/* <PricingString pricing={data.pricing.perpetual.ask.pricing} /> */}
      </SupplyInfoWrapper>
    )
  }
  return <></>

  // if (data?.totalSupply && data.editionSize) {
  //   return (
  //     <Fragment>
  //       {data.pricing.perpetual.ask && (
  //         <SupplyInfoWrapper titleString="LIST_PRICE">
  //           <PricingString pricing={data.pricing.perpetual.ask.pricing} />
  //         </SupplyInfoWrapper>
  //       )}
  //       <SupplyInfoWrapper titleString="OPEN_OFFERS">Be the first one to bid on this piece!</SupplyInfoWrapper>
  //     </Fragment>
  //   );
  // }

  // const reserve = data.pricing.reserve;

  // if (
  //   data.pricing.reserve &&
  //   data.pricing.reserve.current.likelyHasEnded &&
  //   (data.pricing.reserve.status === "Finished" ||
  //     data.pricing.reserve.status === "Active")
  // ) {
  //   const highestPreviousBid =
  //     data.pricing.reserve.currentBid || data.pricing.reserve.previousBids[0];
  //   return (
  //     <SupplyInfoWrapper className={className} titleString="AUCTION_SOLD_FOR">
  //       <div {...getStyles("fullInfoAuctionPricing")}>
  //         <PricingString pricing={highestPreviousBid.pricing} />
  //       </div>
  //       <div {...getStyles("fullInfoSpacer", undefined, { width: 15 })} />
  //       <div {...getStyles("fullLabel")}>{getString("WINNER")}</div>
  //       <AddressView address={highestPreviousBid.bidder.id} />
  //     </SupplyInfoWrapper>
  //   );
  // }

  // if (
  //   reserve !== undefined &&
  //   !reserve.current.likelyHasEnded &&
  //   reserve.expectedEndTimestamp &&
  //   reserve.current.highestBid !== undefined
  // ) {
  //   return (
  //     <SupplyInfoWrapper titleString="AUCTION_ENDS">
  //       <div {...getStyles("pricingAmount")}>
  //         <CountdownDisplay to={reserve.expectedEndTimestamp} />
  //       </div>
  //       <div {...getStyles("fullInfoSpacer")} />
  //       <div {...getStyles("fullLabel")}>{getString("HIGHEST_BID")}</div>
  //       <div {...getStyles("fullInfoAuctionPricing")}>
  //         <PricingString pricing={reserve.current.highestBid.pricing} />
  //       </div>
  //       <div {...getStyles("fullInfoSpacer")} />
  //       <div {...getStyles("fullLabel")}>{getString("BIDDER")}</div>
  //       <AddressView address={reserve.current.highestBid?.placedBy} />
  //     </SupplyInfoWrapper>
  //   );
  // }

  // if (
  //   showPerpetual &&
  //   data.pricing.auctionType === AuctionType.PERPETUAL &&
  //   data.pricing.perpetual.highestBid
  // ) {
  //   return (
  //     <SupplyInfoWrapper titleString="HIGHEST_BID">
  //       <PricingString pricing={data.pricing.perpetual.highestBid?.pricing} />
  //     </SupplyInfoWrapper>
  //   );
  // }

  // if (!showPerpetual && data.pricing.auctionType === AuctionType.PERPETUAL) {
  //   return <Fragment />;
  // }

  // return (
  //   <SupplyInfoWrapper
  //     titleString={
  //       data.pricing.auctionType === AuctionType.PERPETUAL
  //         ? "LIST_PRICE"
  //         : "RESERVE_PRICE"
  //     }
  //   >
  //     <div {...getStyles("pricingAmount")}>
  //       {data.pricing.auctionType === AuctionType.PERPETUAL &&
  //         data.pricing.perpetual.ask && (
  //           <div>
  //             <PricingString pricing={data.pricing.perpetual.ask.pricing} />
  //           </div>
  //         )}
  //       {data.pricing.auctionType === AuctionType.RESERVE &&
  //         data.pricing.reserve?.reservePrice && (
  //           <>
  //             <div {...getStyles("fullInfoAuctionPricing")}>
  //               <PricingString pricing={data.pricing.reserve.reservePrice} />
  //             </div>
  //             <div>
  //               <div {...getStyles("fullInfoSpacer")} />
  //               <div {...getStyles("fullLabel")}>
  //                 {getString("AUCTION_PENDING_DURATION")}
  //               </div>
  //               <DurationDisplay duration={data.pricing.reserve.duration} />
  //             </div>
  //           </>
  //         )}
  //     </div>
  //   </SupplyInfoWrapper>
  // );
}
