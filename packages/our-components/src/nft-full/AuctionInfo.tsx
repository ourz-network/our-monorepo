import { useMemo, Fragment, useContext } from 'react'
import {
  AuctionLike,
  AUCTION_SOURCE_TYPES,
  FIXED_PRICE_MARKET_SOURCES,
  MARKET_INFO_STATUSES,
  MARKET_TYPES,
} from '@zoralabs/nft-hooks/dist/types'

import { PricingString } from '../utils/PricingString'
import { AddressView } from '../components/AddressView'
import {
  CountdownDisplay,
  DurationDisplay,
} from '../components/CountdownDisplay'
import { NFTDataContext } from '../context/NFTDataContext'
import { useMediaContext } from '../context/useMediaContext'
import type { StyleProps } from '../utils/StyleTypes'

import { InfoContainer, InfoContainerProps } from './InfoContainer'

type AuctionInfoProps = {
  showPerpetual?: boolean
  showFindersFee?: boolean
} & StyleProps

const AuctionInfoWrapper = ({
  className,
  children,
  ...containerArgs
}: InfoContainerProps) => (
  <InfoContainer {...containerArgs} className={className}>
    {children}
  </InfoContainer>
)

export const AuctionInfo = ({
  showPerpetual = true,
  showFindersFee = true,
  className,
}: AuctionInfoProps) => {
  const { data } = useContext(NFTDataContext)
  const { getStyles, getString } = useMediaContext()

  const reserveAuction = useMemo(
    () =>
      data.markets.find(
        (market) =>
          market.source === AUCTION_SOURCE_TYPES.ZORA_RESERVE_V2 &&
          market.status !== MARKET_INFO_STATUSES.CANCELED
      ),
    [data.markets]
  ) as undefined | AuctionLike

  const ask = useMemo(
    () =>
      data.markets.find(
        (market) =>
          market.type === MARKET_TYPES.FIXED_PRICE &&
          market.status === MARKET_INFO_STATUSES.ACTIVE
      ),
    [data.markets]
  )

  if (!data.nft) {
    return <></>
  }

  if (
    showPerpetual &&
    ask.source === FIXED_PRICE_MARKET_SOURCES.ZNFT_PERPETUAL
  ) {
    return (
      <>
        {ask && (
          <AuctionInfoWrapper titleString='LIST_PRICE' className={className}>
            <PricingString pricing={ask.amount} />
          </AuctionInfoWrapper>
        )}
        <AuctionInfoWrapper titleString='OPEN_OFFERS'>
          Be the first one to bid on this piece!
        </AuctionInfoWrapper>
      </>
    )
  }

  if (ask) {
    return (
      <>
        {ask && (
          <AuctionInfoWrapper titleString='CURRENT_PRICE' className={className}>
            <PricingString pricing={ask.amount} />
            {showFindersFee && ask.raw.findersFeeBps && (
              <>
                <div
                  {...getStyles('fullInfoSpacer', undefined, { width: 15 })}
                />
                <div {...getStyles('fullLabel')}>
                  {getString('FINDERS_FEE')}
                </div>
                {`${Math.floor(parseInt(ask.raw.findersFeeBps, 10) / 100)}%`}
              </>
            )}
          </AuctionInfoWrapper>
        )}
        {reserveAuction && reserveAuction.status === 'active' && (
          <AuctionInfoWrapper titleString='RESERVE_PRICE' className={className}>
            <PricingString pricing={reserveAuction.amount} />
          </AuctionInfoWrapper>
        )}
      </>
    )
  }

  if (reserveAuction && reserveAuction.status === 'complete') {
    return (
      <AuctionInfoWrapper className={className} titleString='AUCTION_SOLD_FOR'>
        <div {...getStyles('fullInfoAuctionPricing')}>
          <PricingString pricing={reserveAuction.amount} />
        </div>
        <div {...getStyles('fullInfoSpacer', undefined, { width: 15 })} />
        <div {...getStyles('fullLabel')}>{getString('WINNER')}</div>
        <AddressView address={reserveAuction.currentBid.creator} />
      </AuctionInfoWrapper>
    )
  }

  if (reserveAuction && reserveAuction.status === 'active') {
    return (
      <AuctionInfoWrapper titleString='AUCTION_ENDS'>
        {reserveAuction.endsAt && (
          <div {...getStyles('pricingAmount')}>
            <CountdownDisplay to={reserveAuction.endsAt.timestamp} />
          </div>
        )}
        <div {...getStyles('fullInfoSpacer')} />
        <div {...getStyles('fullLabel')}>{getString('HIGHEST_BID')}</div>
        <div {...getStyles('fullInfoAuctionPricing')}>
          <PricingString pricing={reserveAuction.amount} />
        </div>
        <div {...getStyles('fullInfoSpacer')} />
        <div {...getStyles('fullLabel')}>{getString('BIDDER')}</div>
        <AddressView address={reserveAuction.currentBid.creator} />
      </AuctionInfoWrapper>
    )
  }

  if (!reserveAuction && !ask) {
    return <></>
  }

  return (
    <AuctionInfoWrapper
      titleString={reserveAuction ? 'RESERVE_PRICE' : 'LIST_PRICE'}
    >
      <div {...getStyles('pricingAmount')}>
        {reserveAuction && (
          <>
            <div {...getStyles('fullInfoAuctionPricing')}>
              <PricingString pricing={reserveAuction.amount} />
            </div>
            <div>
              <div {...getStyles('fullInfoSpacer')} />
              <div {...getStyles('fullLabel')}>
                {getString('AUCTION_PENDING_DURATION')}
              </div>
              <DurationDisplay duration={reserveAuction.duration} />
            </div>
          </>
        )}
      </div>
    </AuctionInfoWrapper>
  )
}
