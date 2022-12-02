import { gql } from 'graphql-request'
import { ZDK, ZDKNetwork, ZDKChain } from '@zoralabs/zdk'
import {
  ImageEncodingTypes,
  TokenContentMedia,
} from '@zoralabs/zdk/dist/queries/queries-sdk'

export interface MediaInfo {
  image?: TokenContentMedia & {
    mimeType?: Pick<TokenContentMedia, 'mimeType'>
    size?: Pick<TokenContentMedia, 'size'>
    url?: Pick<TokenContentMedia, 'url'>
    mediaEncoding?: ImageEncodingTypes
  }
  content?: TokenContentMedia
}

const ZORA_API = 'https://api.zora.co/graphql'
const API_KEY = process.env.ZORA_API_KEY

const networkInfo = {
  network: ZDKNetwork.Ethereum,
  chain: ZDKChain.Mainnet,
}

const args = {
  endPoint: ZORA_API,
  networks: [networkInfo],
  apiKey: API_KEY,
}

const zdk = new ZDK(args)

export const GET_EDITION_METADATA = gql`
  query GetEditionMetadata($collectionAddress: String!) {
    token(token: { address: $collectionAddress, tokenId: "1" }) {
      token {
        collectionAddress
        owner
        tokenContract {
          name
          description
        }
        description
        metadata
        image {
          size
          url
          mimeType
          mediaEncoding {
            ... on ImageEncodingTypes {
              thumbnail
              poster
              large
              original
            }
            ... on VideoEncodingTypes {
              thumbnail
              poster
              preview
              large
              original
            }
            ... on AudioEncodingTypes {
              large
              original
            }
            ... on UnsupportedEncodingTypes {
              original
            }
          }
        }
        content {
          size
          url
          mimeType
          mediaEncoding {
            ... on ImageEncodingTypes {
              thumbnail
              poster
              large
              original
            }
            ... on VideoEncodingTypes {
              thumbnail
              poster
              preview
              large
              original
            }
            ... on AudioEncodingTypes {
              large
              original
            }
            ... on UnsupportedEncodingTypes {
              original
            }
          }
        }
      }
    }
  }
`

export const getEditionMediaInfo = async (
  collectionAddress: string
  // eslint-disable-next-line consistent-return
) => {
  const res = await zdk.tokens({
    where: {
      collectionAddresses: [collectionAddress],
    },
    includeFullDetails: false,
  })

  try {
    const tokens = res.tokens.nodes

    const firstToken = tokens[0].token
    const mediaInfo: MediaInfo = {
      image: { ...firstToken.image } as TokenContentMedia & {
        mimeType?: Pick<TokenContentMedia, 'mimeType'>
        size?: Pick<TokenContentMedia, 'size'>
        url?: Pick<TokenContentMedia, 'url'>
        mediaEncoding?: ImageEncodingTypes
      },
      content: { ...firstToken.content },
    }
    return { mediaInfo } as { mediaInfo: MediaInfo }
  } catch (error) {
    //
  }
}
