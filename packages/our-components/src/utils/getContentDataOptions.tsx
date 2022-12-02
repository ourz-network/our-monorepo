import type { NFTObject } from '@zoralabs/nft-hooks'
import { EditionDetailsFragment } from 'our-hooks/dist/graph-queries/ourz-graph-types'

export const defaultGetContentData = (nft: NFTObject) => {
  const contentMimeType =
    nft?.nft?.tokenUrlMimeType ??
    nft?.content?.mimeType ??
    nft?.nft?.tokenUrlMimeType ??
    nft?.media?.mimeType
  const previewMimeType = nft?.media?.mimeType

  const getFullSizeSources = () => {
    // if (contentMimeType?.startsWith('audio')) {
    //   return [
    //     nft?.content?.large?.uri,
    //     nft?.content?.original?.uri,
    //     nft?.metadata?.contentUri,
    //   ].filter((x) => x !== undefined)
    // }
    // if (contentMimeType?.startsWith('image')) {
    // console.log('hiii')
    return [
      nft?.content?.large?.uri,
      nft?.content?.original?.uri,
      nft?.content?.poster?.uri,
      nft?.metadata?.contentUri,
    ].filter((x) => x !== undefined)
    // }
  }
  const getPreviewSources = () => {
    // if (previewMimeType?.startsWith('image')) {
    //   return [].filter((x) => x !== undefined)
    // }
    // if (previewMimeType?.startsWith('audio')) {
    return [
      nft?.media?.poster?.uri,
      nft?.media?.thumbnail?.uri,
      nft?.media?.large?.uri,
      // nft?.content?.original?.uri,
      nft?.metadata?.imageUri,
    ].filter((x) => x !== undefined)
    // }
  }

  return {
    contentMimeType,
    previewMimeType,
    contentURI:
      nft?.metadata?.contentUri ??
      nft?.media?.content?.uri ??
      nft.nft?.contentURI ??
      nft.media?.image?.uri ??
      nft?.metadata?.imageUri,

    previewURI: nft?.metadata?.imageUri ?? nft.media?.image?.uri,
    fullSizeSources: getFullSizeSources(),
    previewSources: getPreviewSources(),
    metadata: nft.metadata,
    contract: nft.nft?.contract.address,
    tokenId: nft.nft?.tokenId,
  }
}

export interface GetContentDataType {
  getContentData?: (nft: NFTObject | EditionDetailsFragment) => {
    contentURI?: string
    contentMimeType?: string
    previewURI?: string
    previewMimeType?: string
    metadata?: any
    contract?: any
    tokenId?: any
  }
}
