import request, { gql } from 'graphql-request'

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

export const GET_ZORA_DROPS_WITH_SPLITS_IDS = gql`
  query GetZoraDropsWithSplits($splitAddresses: [Bytes!]!) {
    contractConfigs(where: { fundsRecipient_in: $splitAddresses }) {
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

export const getAllZoraDropIDsWithSplitRecipients = async (
  splitAddresses: string[]
) => {
  const { contractConfigs } = await request(
    ZORA_SUBGRAPH,
    GET_ZORA_DROPS_WITH_SPLITS_IDS,
    {
      splitAddresses,
    }
  )

  const drops = contractConfigs.map((contractConfig: { drop: any }) => ({
    ...contractConfig.drop,
  }))

  return drops
}

export const getAllZoraDropsMetadataWithSplitRecipients = async (
  splitAddresses: string[]
) => {
  const { contractConfigs } = await request(
    ZORA_SUBGRAPH,
    GET_ZORA_DROPS_WITH_SPLITS_METADATA,
    {
      splitAddresses,
    }
  )

  const drops = contractConfigs.map((contractConfig: { drop: any }) => ({
    ...contractConfig.drop,
  }))

  return drops
}

export const getAllZoraDropsFullWithSplitRecipients = async (
  splitAddresses: string[]
) => {
  const { contractConfigs } = await request(
    ZORA_SUBGRAPH,
    GET_ZORA_DROPS_WITH_SPLITS_FULL,
    {
      splitAddresses,
    }
  )

  const drops = contractConfigs.map((contractConfig: { drop: any }) => ({
    ...contractConfig.drop,
  }))

  return drops
}
