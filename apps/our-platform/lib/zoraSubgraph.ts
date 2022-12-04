import request, { gql } from 'graphql-request'

import { getEverySplit } from './splitsSubgraph'
import { getEditionMediaInfo, MediaInfo } from './zdk'

import { SubgraphERC721Drop } from '@/lib/models/subgraph'
import { getTokenInfo } from 'app/(ens.ourz.xyz)/_gallery/[ens]/token/[contract]/[id]/page'
import { NFTObject } from '@zoralabs/nft-hooks'

const ZORA_SUBGRAPH =
  'https://api.thegraph.com/subgraphs/name/iainnash/zora-editions-mainnet'

// export interface SplitDropShort extends Pick<SubgraphERC721Drop, 'id'> {
//   splitId: string
// }

export interface CollectionWithMediaInfo extends SubgraphERC721Drop {
  mediaInfo?: MediaInfo
  firstToken?: any
}
// export interface SplitDropMeta
//   extends Pick<
//     SubgraphERC721Drop,
//     'id' & 'rendererAddress' & 'editionMetadata'
//   > {
//   splitId: string
// }
// export interface SplitDropFull extends SubgraphERC721Drop {
//   splitId: string
// }

const ERC721_DROP_FRAGMENT = gql`
  fragment ERC721Fields on ERC721Drop {
    id
    created {
      id
      block
      timestamp
    }
    creator
    address
    name
    symbol
    contractConfig {
      id
      metadataRenderer
      editionSize
      royaltyBPS
      fundsRecipient
    }
    editionMetadata {
      imageURI
      contractURI
      description
      animationURI
    }
    dropMetadata {
      base
      extension
      freezeAt
      contractURI
    }
    salesConfig {
      id
      publicSalePrice
      maxSalePurchasePerAddress
      publicSaleStart
      publicSaleEnd
      presaleStart
      presaleEnd
      presaleMerkleRoot
    }
    sales {
      priceTotal
    }
    totalMinted
    maxSupply
  }
`

export const GET_COLLECTIONS_QUERY = gql`
  query GetCollection($collectionAddresses: [String]!) {
    erc721Drops(where: { address_in: $collectionAddresses }) {
      ...ERC721Fields
    }
  }

  ${ERC721_DROP_FRAGMENT}
`

export const GET_SPLITS_COLLECTIONS = gql`
  query GetZoraDropsWithSplits($splitAddresses: [Bytes!]!) {
    contractConfigs(where: { fundsRecipient_in: $splitAddresses }) {
      fundsRecipient
      drop {
        ...ERC721Fields
      }
    }
  }
  ${ERC721_DROP_FRAGMENT}
`
export const GET_ZORA_DROPS_WITH_SPLITS_METADATA = gql`
  query GetZoraDropsWithSplits($splitAddresses: [Bytes!]!) {
    contractConfigs(where: { fundsRecipient_in: $splitAddresses }) {
      fundsRecipient
      drop {
        id
        rendererAddress
        editionMetadata {
          description
          contractURI
          imageURI
          animationURI
        }
      }
    }
  }
  ${ERC721_DROP_FRAGMENT}
`

export const getCollections = async (
  collectionAddresses: string[]
): Promise<SubgraphERC721Drop[]> => {
  const { erc721Drops } = await request(ZORA_SUBGRAPH, GET_COLLECTIONS_QUERY, {
    collectionAddresses,
  })

  return erc721Drops
}

export const getSplitCollections = async (
  splitAddresses: string[]
): Promise<CollectionWithMediaInfo[]> => {
  const { contractConfigs } = await request(
    ZORA_SUBGRAPH,
    GET_SPLITS_COLLECTIONS,
    {
      splitAddresses,
    }
  )

  const drops: CollectionWithMediaInfo[] = contractConfigs.map(
    (contractConfig: { fundsRecipient: string; drop: any }) => ({
      ...contractConfig.drop,
      // splitId: contractConfig.fundsRecipient,
    })
  )

  return drops
}

// export const getCollectionsMeta = async (
//   splitAddresses: string[]
// ): Promise<SplitDropMeta[]> => {
//   const { contractConfigs } = await request(
//     ZORA_SUBGRAPH,
//     GET_ZORA_DROPS_WITH_SPLITS_METADATA,
//     {
//       splitAddresses,
//     }
//   )

//   const drops = contractConfigs.map(
//     (contractConfig: { fundsRecipient: string; drop: any }) => ({
//       ...contractConfig.drop,
//       splitId: contractConfig.fundsRecipient,
//     })
//   )

//   return drops
// }

// export const getAllZoraSplitDropsFull = async (
//   splitAddresses: string[]
// ): Promise<SplitDropFull[]> => {
//   const { contractConfigs } = await request(
//     ZORA_SUBGRAPH,
//     GET_COLLECTIONS_QUERY,
//     {
//       splitAddresses,
//     }
//   )

//   const drops = contractConfigs.map(
//     (contractConfig: { fundsRecipient: string; drop: any }) => ({
//       ...contractConfig.drop,
//       splitId: contractConfig.fundsRecipient,
//     })
//   )

//   return drops
// }

export const getCollectionWithMediaInfo = async (
  collectionAddress: string
): Promise<CollectionWithMediaInfo> => {
  const collections = await getCollections([collectionAddress])
  const mediaInfo = await getEditionMediaInfo(collectionAddress)

  const tokenInfo = await getTokenInfo(collectionAddress, '1')

  const collection = {
    ...collections[0],
    ...mediaInfo,
    firstToken: { ...tokenInfo },
  }

  return collection
}

export const getEverySplitCollectionWithMediaInfo = async () => {
  const splitCollections: CollectionWithMediaInfo[] = []
  const everySplit = await getEverySplit()
  const everySplitCollection = await getSplitCollections(everySplit)

  // eslint-disable-next-line consistent-return
  const promises = everySplitCollection.map(async (collection) => {
    const res = await getEditionMediaInfo(collection.address)
    if (res?.mediaInfo) {
      const { mediaInfo } = res
      return mediaInfo
    }
  })

  await Promise.allSettled(promises).then((results) =>
    results.forEach((res, i) => {
      if (res.status === 'fulfilled') {
        if (res.value !== undefined) {
          splitCollections.push({
            ...everySplitCollection[i],
            mediaInfo: { ...res.value },
          })
        }
      } else {
        // splitCollections.push({
        //   ...everySplitCollection[i],
        // })
      }
    })
  )

  return splitCollections
}

export const getEveryZoraSplit = async () => {
  const everySplit = await getEverySplit()

  const drops = await getSplitCollections(everySplit)

  const zoraSplits: string[] = drops.map(
    (drop) => drop.contractConfig.fundsRecipient
  )
  return zoraSplits
}
