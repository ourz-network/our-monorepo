import { Fragment, useContext, useMemo } from 'react'
import {
  AUCTION_SOURCE_TYPES,
  AuctionLike,
  EditionLike,
  MARKET_INFO_STATUSES,
  MARKET_TYPES,
  FIXED_SIDE_TYPES,
} from '@zoralabs/nft-hooks/dist/types'

import { useMediaContext } from '../context/useMediaContext'
import { NFTDataContext } from '../context/NFTDataContext'
import { CountdownDisplay } from '../components/CountdownDisplay'
import { PricingString } from '../utils/PricingString'
import type { StyleProps } from '../utils/StyleTypes'

function isInFuture(timestamp: string) {
  return new Date(timestamp).getTime() > new Date().getTime()
}

type PricingComponentProps = {
  showPerpetual?: boolean
} & StyleProps

export const PricingComponent = ({
  showPerpetual = true,
  className,
}: PricingComponentProps) => {
  const { data } = useContext(NFTDataContext)

  const { getStyles, getString } = useMediaContext()

  const reserveAuction = useMemo(
    () =>
      data?.markets?.find(
        (market) =>
          market?.source === AUCTION_SOURCE_TYPES.ZORA_RESERVE_V2 &&
          market?.status !== MARKET_INFO_STATUSES.CANCELED
      ),
    [data?.markets]
  ) as undefined | AuctionLike

  const ask = useMemo(
    () =>
      data?.markets?.find(
        (market) =>
          market?.type === MARKET_TYPES.FIXED_PRICE &&
          market?.side === FIXED_SIDE_TYPES.ASK &&
          market?.status === MARKET_INFO_STATUSES.ACTIVE
      ),
    [data?.markets]
  )

  const edition = useMemo(
    () =>
      data?.markets?.find(
        (market) => market?.type === 'Edition' && market?.status === 'active'
      ),
    [data?.markets]
  ) as undefined | EditionLike

  if (!reserveAuction && !ask && !edition) {
    return (
      <div
        className='grid grid-flow-col grid-rows-2 grid-[auto-columns:1fr] py-3 px-4 border-t-[2px]'
        // {...getStyles('cardAuctionPricing', className, { type: 'unknown' })}
      >
        <div
          className='opacity-50'
          // {...getStyles('textSubdued')}
        >
          {getString('RESERVE_PRICE')}
        </div>
        <div
          className='font-[family:var(--body-font)] font-normal'
          // {...getStyles('pricingAmount')}
        >
          {getString('NO_PRICING_PLACEHOLDER')}
        </div>
        <div
          className='opacity-50'
          // {...getStyles('textSubdued')}
        >
          {getString('HIGHEST_BID')}
        </div>
        <div
          className='font-[family:var(--body-font)] font-normal'
          // {...getStyles('pricingAmount')}
        >
          {getString('NO_PRICING_PLACEHOLDER')}
        </div>
      </div>
    )
  }

  if (edition && edition.status === MARKET_INFO_STATUSES.ACTIVE) {
    return (
      <div
        className='grid grid-flow-col grid-rows-2 grid-[auto-columns:1fr] py-3 px-4 border-t-[2px]'
        {...getStyles('cardAuctionPricing', className, { type: 'unknown' })}
      >
        <span
          className='opacity-50'
          // {...getStyles('textSubdued')}>
        >
          {getString('EDITION_PRICE')}
        </span>
        <PricingString pricing={edition.amount} showUSD={false} />

        <span
          className='opacity-50'
          //  {...getStyles('textSubdued')}>
        >
          {getString('NFTS_COLLECTED')}
        </span>
        <span
          className='font-[family:var(--body-font)] font-normal'
          // {...getStyles('pricingAmount')}
        >
          {`${edition.totalSupply} / ${edition.editionSize}`}
        </span>
      </div>
    )
  }

  if (ask && reserveAuction?.status !== MARKET_INFO_STATUSES.ACTIVE) {
    let listPrice = <></>

    if (ask) {
      listPrice = (
        <>
          <span
            className='opacity-50'
            //  {...getStyles('textSubdued')}>
          >
            {getString('LIST_PRICE')}
          </span>
          <PricingString pricing={ask.amount} showUSD={false} />
        </>
      )
    }
    const highestBid = undefined
    if (
      !highestBid &&
      reserveAuction?.status === MARKET_INFO_STATUSES.COMPLETE
    ) {
      return (
        <div
          className='grid grid-flow-col grid-rows-2 grid-[auto-columns:1fr] py-3 px-4 border-t-[2px]'
          {...getStyles('cardAuctionPricing', className, {
            type: 'reserve-pending',
          })}
        >
          <span
            className='opacity-50'
            //  {...getStyles('textSubdued')}>
          >
            {getString('SOLD_FOR')}
          </span>
          <span
            className='font-[family:var(--body-font)] font-normal'
            // {...getStyles('pricingAmount')}
          >
            <PricingString pricing={reserveAuction.amount} showUSD={false} />
          </span>
          {listPrice}
        </div>
      )
    }
    return (
      <div
        className='grid grid-flow-col grid-rows-2 grid-[auto-columns:1fr] py-3 px-4 border-t-[2px]'
        {...getStyles('cardAuctionPricing', className, { type: 'perpetual' })}
      >
        <span
          className='opacity-50'
          // {...getStyles('textSubdued')}>
        >
          {getString('HIGHEST_BID')}
        </span>
        <span
          className='font-[family:var(--body-font)] font-normal'
          // {...getStyles('pricingAmount')}
        >
          {highestBid ? (
            <PricingString showUSD={false} pricing={highestBid} />
          ) : (
            getString('NO_PRICING_PLACEHOLDER')
          )}
        </span>
        {listPrice}
      </div>
    )
  }
  if (reserveAuction) {
    if (reserveAuction.status === 'active') {
      const highestBid = reserveAuction.amount
      return (
        <div
          className='grid grid-flow-col grid-rows-2 grid-[auto-columns:1fr] py-3 px-4 border-t-[2px] bg-black text-white'
          {...getStyles('cardAuctionPricing', className, {
            type: 'reserve-active',
          })}
        >
          <span
            className='opacity-50'
            //  {...getStyles('textSubdued')}>
          >
            {getString('TOP_BID')}
          </span>
          <span
            className='font-[family:var(--body-font)] font-normal'
            // {...getStyles('pricingAmount')}
          >
            {highestBid && (
              <PricingString pricing={highestBid} showUSD={false} />
            )}
          </span>
          {reserveAuction.endsAt?.timestamp &&
            isInFuture(reserveAuction.endsAt.timestamp) && (
              <>
                <span
                  className='opacity-50'
                  //  {...getStyles('textSubdued')}>
                >
                  {getString('ENDS_IN')}
                </span>
                <span
                  className='font-[family:var(--body-font)] font-normal'
                  // {...getStyles('pricingAmount')}
                >
                  <CountdownDisplay to={reserveAuction.endsAt.timestamp} />
                </span>
              </>
            )}
        </div>
      )
    }

    if (reserveAuction.status === MARKET_INFO_STATUSES.COMPLETE) {
      return (
        <div
          className='grid grid-flow-col grid-rows-2 grid-[auto-columns:1fr] py-3 px-4 border-t-[2px]'
          {...getStyles('cardAuctionPricing', className, {
            type: 'reserve-finished',
          })}
        >
          <span
            className='opacity-50'
            //  {...getStyles('textSubdued')}>
          >
            {getString('SOLD_FOR')}
          </span>
          <span
            className='font-[family:var(--body-font)] font-normal'
            // {...getStyles('pricingAmount')}
          >
            <PricingString showUSD={false} pricing={reserveAuction.amount} />
          </span>
        </div>
      )
    }
    if (reserveAuction.status === MARKET_INFO_STATUSES.PENDING) {
      return (
        <div
          className='grid grid-flow-col grid-rows-2 grid-[auto-columns:1fr] py-3 px-4 border-t-[2px] bg-[color:var(--colors-accent)]'
          {...getStyles('cardAuctionPricing', className, {
            type: 'reserve-pending',
          })}
        >
          <span
            className='opacity-50'
            //  {...getStyles('textSubdued')}>
          >
            {getString('RESERVE_PRICE')}
          </span>
          <span>
            <PricingString showUSD={false} pricing={reserveAuction.amount} />
          </span>
        </div>
      )
    }
  }

  return (
    <div
      className='grid grid-flow-col grid-rows-2 grid-[auto-columns:1fr] py-3 px-4 border-t-[2px]'
      {...getStyles('cardAuctionPricing', className, { type: 'unknown' })}
    >
      <div
        className='opacity-50'
        //  {...getStyles('textSubdued')}>
      >
        {getString('PRICING_LOADING')}
      </div>
      <div
        className='font-[family:var(--body-font)] font-normal'
        // {...getStyles('pricingAmount')}
      >
        {getString('PRICING_LOADING')}
      </div>
    </div>
  )
}
