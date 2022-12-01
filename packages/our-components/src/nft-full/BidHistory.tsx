'use client'

import { Fragment, useContext, useMemo } from 'react'
import {
  AuctionLike,
  CurrencyValue,
  FIXED_SIDE_TYPES,
  MARKET_INFO_STATUSES,
  MARKET_TYPES,
} from '@zoralabs/nft-hooks/dist/types'

import { AddressView } from '../components/AddressView'
import { NFTDataContext } from '../context/NFTDataContext'
import { useMediaContext } from '../context/useMediaContext'
import type { StyleProps } from '../utils/StyleTypes'
import { PricingString } from '../utils/PricingString'

import { InfoContainer } from './InfoContainer'

const dateFromTimestamp = (timestamp: string) => {
  try {
    return new Date(timestamp)
  } catch (e) {
    return new Date()
  }
}

const formatDate = (timestamp: string) =>
  dateFromTimestamp(timestamp).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    year: 'numeric',
    hour12: true,
  })

type BidHistoryProps = {
  showPerpetual?: boolean
} & StyleProps

interface MarketDataListType {
  activityDescription: string
  actor: string
  createdAt: string
  transactionHash: string | null
  pricing: CurrencyValue | undefined
}

export const BidHistory = ({
  showPerpetual = true,
  className,
}: BidHistoryProps) => {
  const { data } = useContext(NFTDataContext)
  const { getString, getStyles, style } = useMediaContext()

  const processedData = useMemo(() => {
    if (!data?.nft) {
      return []
    }
    const bidEvents: MarketDataListType[] = []
    if (data.nft.minted.address && data.nft.minted.at?.timestamp) {
      bidEvents.push({
        activityDescription: getString('BID_HISTORY_MINTED'),
        actor: data.nft.minted.address,
        createdAt: data.nft.minted.at.timestamp,
        transactionHash: data.nft.minted.at.transactionHash ?? null,
        pricing: undefined,
      })
    }
    data.markets?.forEach((market) => {
      if (market.type === MARKET_TYPES.AUCTION) {
        const typedAuction = market as AuctionLike
        if (typedAuction.canceledAt) {
          bidEvents.push({
            activityDescription: getString('BID_HISTORY_CANCELLED'),
            actor: typedAuction.createdBy!,
            createdAt: typedAuction.canceledAt.timestamp,
            transactionHash: typedAuction.canceledAt.transactionHash ?? null,
            pricing: undefined,
          })
        }
        if (typedAuction.winner && typedAuction.finishedAt) {
          bidEvents.push({
            activityDescription: getString('AUCTION_SOLD_FOR'),
            actor: typedAuction.winner,
            createdAt: typedAuction.finishedAt.timestamp,
            transactionHash: typedAuction.finishedAt.transactionHash ?? null,
            pricing: typedAuction.amount,
          })
        }
        typedAuction.bids.forEach((bid) =>
          bidEvents.push({
            activityDescription: getString('BID_HISTORY_BID'),
            createdAt: bid.created.timestamp,
            actor: bid.creator,
            transactionHash: bid.created.transactionHash ?? null,
            pricing: bid.amount,
          })
        )
      }
      if (market.type === MARKET_TYPES.FIXED_PRICE) {
        if (market.side === FIXED_SIDE_TYPES.ASK) {
          if (market.status === MARKET_INFO_STATUSES.ACTIVE) {
            bidEvents.push({
              activityDescription: getString('HISTORY_ASK_PRICE'),
              createdAt: market.createdAt.timestamp,
              actor: market.createdBy!,
              transactionHash: market.createdAt.transactionHash ?? null,
              pricing: market.amount,
            })
          }
          if (market.status === MARKET_INFO_STATUSES.CANCELED) {
            bidEvents.push({
              activityDescription: getString('HISTORY_ASK_CANCELLED'),
              createdAt:
                market.canceledAt?.timestamp ?? market.createdAt.timestamp,
              actor: market.createdBy!,
              transactionHash: market.canceledAt?.transactionHash ?? null,
              pricing: market.amount,
            })
          }
          if (market.status === MARKET_INFO_STATUSES.COMPLETE) {
            bidEvents.push({
              activityDescription: getString('HISTORY_ASK_FILLED'),
              createdAt: market.createdAt.timestamp,
              actor: market.createdBy!,
              transactionHash: market.createdAt.transactionHash ?? null,
              pricing: market.amount,
            })
          }
        }
        if (market.side === FIXED_SIDE_TYPES.OFFER) {
          bidEvents.push({
            activityDescription: getString('HISTORY_OFFER_PRICE'),
            createdAt: market.createdAt.timestamp,
            actor: market.createdBy!,
            transactionHash: market.createdAt.transactionHash ?? null,
            pricing: market.amount,
          })
        }
      }
    })

    return bidEvents
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.markets])

  if (!processedData.length) {
    return <></>
  }

  const pastBids = processedData
    .sort((bidA, bidB) =>
      new Date(bidA.createdAt).getTime() < new Date(bidB.createdAt).getTime()
        ? 1
        : -1
    )
    .map((bidItem) => (
      <li
        className='mt-4 flex flex-col font-light font-[family:var(--body-font)]'
        // {...getStyles('fullPageHistoryItem')}
        key={`${bidItem.actor}-${bidItem.createdAt}`}
      >
        <div
          className='flex justify-between'
          // {...getStyles('fullPageHistoryItemDescription')}
        >
          <div
            className='flex flex-wrap'
            // {...getStyles('fullPageHistoryItemDescriptionCopy')}
          >
            <AddressView address={bidItem.actor} />
            &nbsp;
            <span
              className='font-[family:var(--body-font)] font-normal'
              // {...getStyles('pricingAmount')}
            >
              {bidItem.activityDescription}{' '}
              {bidItem.pricing && <PricingString pricing={bidItem.pricing} />}
            </span>
          </div>
          {bidItem.transactionHash && style.theme.showTxnLinks && (
            <a
              className='font-[size:0] relative block hover:after:opacity-100 after:rounded after:p-1 after:opacity-80 after:top-[2px] after:z-10 after:right-0 after:transition-opacity after:duration-300 after:ease-in after:w-3 after:h-3 after:absolute'
              // {...getStyles('fullPageHistoryTxnLink')}
              href={`https://etherscan.io/tx/${bidItem.transactionHash}`}
              target='_blank'
              rel='noreferrer'
            >
              {getString('BID_HISTORY_VIEW_TRANSACTION')}
            </a>
          )}
        </div>
        {bidItem.createdAt && (
          <div
            className='relative'
            // {...getStyles('fullPageHistoryItemMeta')}
          >
            <time
              className='text-xs pt-[2px] opacity-50'
              // {...getStyles('fullPageHistoryItemDatestamp')}
              dateTime={dateFromTimestamp(bidItem.createdAt).toISOString()}
            >
              {formatDate(bidItem.createdAt)}
            </time>
          </div>
        )}
      </li>
    ))

  return (
    <InfoContainer titleString='NFT_HISTORY' className={className}>
      <ol
        className='p-0 m-0'
        // {...getStyles('fullPageHistoryList')}
      >
        {pastBids}
      </ol>
    </InfoContainer>
  )
}
