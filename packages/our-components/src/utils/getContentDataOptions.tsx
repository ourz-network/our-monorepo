import type { NFTObject } from '@zoralabs/nft-hooks'

export const defaultGetContentData = (nft: NFTObject) => ({
    contentURI: nft.media.content.uri ||
      nft.media.image.uri ||
      nft.nft.contentURI!,
    metadata: nft.metadata,
    contract: nft.nft.contract.address,
    tokenId: nft.nft.tokenId,
  })

export interface GetContentDataType {
  getContentData?: (nft: NFTObject) => {
    contentURI?: string
    metadata?: any
    contract?: any
    tokenId?: any
  }
}
