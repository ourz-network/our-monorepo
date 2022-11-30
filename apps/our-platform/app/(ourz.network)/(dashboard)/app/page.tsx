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
import { getAllZoraDropIDsWithSplitRecipients } from '@/lib/zoraSubgraph'
import { getMetadataForEditions } from '@/lib/zoraAPI'
import { Suspense } from 'react'

export default async function AppHomePage() {
  const allSplits = await getAllSplits()
  const drops = await getAllZoraDropIDsWithSplitRecipients(
    allSplits.map((split: { id: string }) => split.id)
  )
  // console.log({ drops })
  const dropIDs = drops.map((drop: { id: string }) => drop.id)

  const editions = await getMetadataForEditions(dropIDs)
  // console.log(JSON.stringify(editions))
  const API_ENDPOINT = 'https://api.zora.co/graphql'
  const zdk = new ZDK({ endpoint: API_ENDPOINT }) // Defaults to Ethereum Mainnet

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
      <p>Hello</p>
      {editions.map((edition, i) => {
        // console.log({ ...edition.metadata })
        // console.log('')
        return (
          <div key={edition?.token?.collectionAddress}>
            {/* <p>
              {i}
              {edition?.token?.tokenContract?.name}
            </p>
            <p>
              {edition?.token?.tokenContract?.description ??
                edition?.token?.description}
            </p>
            <p>{edition?.content?.mimeType}</p> */}
            <Suspense fallback={<>Loading...</>}>
              <NFTPreview
                contentURI={edition?.token?.content?.url}
                metadata={edition?.token?.metadata}
                a11yIdPrefix={undefined}
              />
            </Suspense>
          </div>
        )
      })}
      {/* {tokens.map((token) => {
        if (token.token?.tokenId)
          // console.log(JSON.stringify(token.token?.metadata))
          return (
            <div key={token.token.tokenId}>
              <NFTPreview
                contentURI={token.token.content?.url}
                metadata={token.token.metadata}
                a11yIdPrefix={undefined}
              />
            </div>
          )
        return <p>hi</p>
      })} */}
    </>
  )
}
