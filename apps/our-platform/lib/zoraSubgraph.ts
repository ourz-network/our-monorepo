import request, { gql } from 'graphql-request'

import { getEverySplit } from './splitsSubgraph'
import { getMetadataForEditions } from './zoraAPI'

import { SubgraphERC721Drop } from '@/models/subgraph'

const ZORA_SUBGRAPH =
  'https://api.thegraph.com/subgraphs/name/iainnash/zora-editions-mainnet'

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

export const GET_ZORA_DROPS_WITH_SPLITS_IDS = gql`
  query GetZoraDropsWithSplits($splitAddresses: [Bytes!]!) {
    contractConfigs(where: { fundsRecipient_in: $splitAddresses }) {
      fundsRecipient
      drop {
        id
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
export const GET_ZORA_DROPS_WITH_SPLITS_FULL = gql`
  query GetZoraDropsWithSplits($splitAddresses: [Bytes!]!) {
    contractConfigs(where: { fundsRecipient_in: $splitAddresses }) {
      drop {
        ...ERC721Fields
      }
    }
  }
  ${ERC721_DROP_FRAGMENT}
`

export const getCollectionsMeta = async (
  collectionAddresses: string[]
): Promise<SubgraphERC721Drop[]> => {
  const { erc721Drops } = await request(ZORA_SUBGRAPH, GET_COLLECTIONS_QUERY, {
    collectionAddresses,
  })

  return erc721Drops
}

export const getAllZoraSplitDropIDs = async (splitAddresses: string[]) => {
  const { contractConfigs } = await request(
    ZORA_SUBGRAPH,
    GET_ZORA_DROPS_WITH_SPLITS_IDS,
    {
      splitAddresses,
    }
  )

  const drops = contractConfigs.map(
    (contractConfig: { fundsRecipient: string; drop: any }) => ({
      ...contractConfig.drop,
      splitId: contractConfig.fundsRecipient,
    })
  )

  return drops
}

export const getAllZoraSplitDropsMeta = async (splitAddresses: string[]) => {
  const { contractConfigs } = await request(
    ZORA_SUBGRAPH,
    GET_ZORA_DROPS_WITH_SPLITS_METADATA,
    {
      splitAddresses,
    }
  )

  const drops = contractConfigs.map(
    (contractConfig: { fundsRecipient: string; drop: any }) => ({
      ...contractConfig.drop,
      splitId: contractConfig.fundsRecipient,
    })
  )

  return drops
}

export const getAllZoraSplitDropsFull = async (splitAddresses: string[]) => {
  const { contractConfigs } = await request(
    ZORA_SUBGRAPH,
    GET_ZORA_DROPS_WITH_SPLITS_FULL,
    {
      splitAddresses,
    }
  )

  const drops = contractConfigs.map(
    (contractConfig: { fundsRecipient: string; drop: any }) => ({
      ...contractConfig.drop,
      splitId: contractConfig.fundsRecipient,
    })
  )

  return drops
}

export const getEverySplitDropMeta = async () => {
  const everySplit = await getEverySplit()
  const everySplitDrop = await getAllZoraSplitDropIDs(everySplit)
  const splitDropsMeta = await getMetadataForEditions(
    everySplitDrop.map((drop: { id: string }) => drop.id)
  )

  return splitDropsMeta
}

export const getEveryZoraSplit = async () => {
  const everySplit = await getEverySplit()

  const drops = await getAllZoraSplitDropIDs(everySplit)

  const zoraSplits: string[] = drops.map(
    (drop: { splitId: string }) => drop.splitId
  )
  return zoraSplits
}
