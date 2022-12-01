import request, { gql } from 'graphql-request'

const ZORA_API = 'https://api.zora.co/graphql'

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

export const getMetadataForEditions = async (editionAddresses: string[]) => {
  let editions: any[] = []

  const promises = editionAddresses.map(async (address) => {
    const token = await request(ZORA_API, GET_EDITION_METADATA, {
      collectionAddress: address,
    })
    if (token?.token) return { ...token.token }
  })

  await Promise.allSettled(promises).then((results) =>
    results.forEach((res) => {
      if (res.status === 'fulfilled') {
        editions.push(res.value)
      }
    })
  )

  editions = editions.filter((value) => value !== undefined)

  const formatUrl = (url: string) =>
    url.replace(
      'https://api.zora.co/media/ETHEREUM-MAINNET',
      'http://app.localhost:3000/api/media/1'
    )

  editions.forEach((edition, i) => {
    // if (i % 2 === 0) console.log({ ...edition?.token?.image })
    try {
      editions[i].token.metadata = JSON.parse?.(editions[i]?.token?.metadata)
    } catch (error) {
      // console.log(error)
    }
    try {
      const iME: Record<string, string> = edition.token.image.mediaEncoding

      // Object.entries(iME).forEach(([key, value]) => {
      //   iME[key] = formatUrl(value)
      // })

      editions[i].token.image.mediaEncoding = { ...iME }
      editions[i].token.metadata.image =
        iME?.thumbnail ?? iME?.preview ?? iME?.original
    } catch (error) {
      // console.log('error', i)
    }

    try {
      const cME: Record<string, string> = edition.token.content.mediaEncoding

      // Object.entries(cME).forEach(([key, value]) => {
      //   cME[key] = formatUrl(value)
      // })

      editions[i].token.content.mediaEncoding = { ...cME }
      editions[i].token.metadata.animation_url =
        cME?.thumbnail ?? cME?.preview ?? cME?.original
    } catch (error) {
      // console.log('error', i)
    }
    // if (i % 2 === 0)
    // console.log({ ...editions[i]?.token?.image?.mediaEncoding })
  })
  // console.log(JSON.stringify({ ...editions }))

  return editions
}
