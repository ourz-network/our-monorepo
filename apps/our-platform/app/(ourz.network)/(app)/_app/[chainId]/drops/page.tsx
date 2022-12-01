import { ZDK } from '@zoralabs/zdk'
import {
  CollectionSortKey,
  MarketSortKey,
  MarketsQueryFilter,
  MarketsQueryInput,
  MarketStatus,
  MarketType,
  MarketTypeFilter,
  SortDirection,
} from '@zoralabs/zdk/dist/queries/queries-sdk'
import request, { gql } from 'graphql-request'

import { NFTPreview } from '@/components/NFTPreview'
import { getAllSplits } from '@/lib/splitsSubgraph'
import { getEverySplitDropMeta } from '@/lib/zoraSubgraph'
import { getMetadataForEditions } from '@/lib/zoraAPI'
import { Suspense } from 'react'
// import { MessonryGrid } from 'messonry'
import Link from 'next/link'

export default async function DropsPage() {
  const editions = await getEverySplitDropMeta()
  console.log({ editions })

  // const collections = await zdk.collections({
  //   where: {
  //     collectionAddresses: drops.map((drop: { id: string }) => drop.id),
  //   },
  //   sort: {
  //     sortDirection: SortDirection.Desc,
  //     sortKey: CollectionSortKey.Created,
  //   },
  //   pagination: { limit: 1 },
  //   includeFullDetails: true,
  // })
  // console.log(JSON.stringify(collections))

  // const token = await zdk.token({
  //   token: {
  //     address: '0x6c2b29d31ec82ac77575a0d26357ce75323da033',
  //     tokenId: '1',
  //   },
  //   includeFullDetails: true,
  // })
  // console.log(JSON.stringify(token))

  // const tokens = await zdk.tokens({
  //   where: {
  //     collectionAddresses: drops.map((drop: { id: string }) => drop.id),
  //   },
  //   filter: {},
  //   includeFullDetails: true,
  // })
  // console.log(JSON.stringify(tokens))

  // const activeAuctions = await zdk.markets({
  //   where: {
  //     collectionAddresses: ['0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7'],
  //   },
  //   filter: {
  //     marketFilters: [
  //       {
  //         marketType: MarketType.V2Auction,
  //         // marketType: MarketType.V3ReserveAuction,
  //         // marketType: MarketType.V3Ask,
  //         statuses: [
  //           MarketStatus.Active,
  //           // MarketStatus.Completed,
  //           // MarketStatus.Invalid,
  //           // MarketStatus.Canceled,
  //         ],
  //       },
  //     ],
  //   },
  //   pagination: { limit: 10 },
  //   includeFullDetails: false,
  //   sort: {
  //     sortDirection: SortDirection.Desc,
  //     sortKey: MarketSortKey.Created,
  //   },
  // })

  // console.log([...activeAuctions.markets.nodes])
  // const tokens = [...activeAuctions.markets.nodes]

  return (
    <>
      {/*  eslint-disable-next-line arrow-body-style */}
      {editions.map((edition, i) => {
        // console.log(edition.token)
        return (
          <div
            key={edition?.token?.collectionAddress}
            className='flex flex-col items-center mx-auto text-center w-fit'
          >
            <p>
              {/* {i} */}
              {edition?.token?.tokenContract?.name}
            </p>
            {/* <p> */}
            {/* {edition?.token?.tokenContract?.description ??
               edition?.token?.description} */}
            {/* </p> */}
            {/* <p>{edition?.content?.mimeType}</p>  */}
            <Suspense fallback={<></>}>
              <Link
                href={`/drops/${edition?.token?.collectionAddress}`}
                prefetch={false}
              >
                <NFTPreview
                  contentURI={edition?.token?.content?.url}
                  metadata={edition?.token?.metadata}
                  a11yIdPrefix={undefined}
                />
              </Link>
            </Suspense>
          </div>
        )
      })}
      {/* <MessonryGrid
        items={editions}
        options={{ useNextImage: true, nextImageConfig: {} }}
      /> */}
    </>
  )
}
