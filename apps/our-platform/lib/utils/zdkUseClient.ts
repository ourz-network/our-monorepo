'use client'

import { Networks, NFTObject, Strategies } from '@zoralabs/nft-hooks'

export const getNFTObject = async (
  contract: string,
  id: string,
  chainId?: number
): Promise<NFTObject> => {
  const fetcher = new Strategies.ZDKFetchStrategy(
    !chainId || chainId === 1 ? Networks.MAINNET : Networks.POLYGON
  )
  const nft = await fetcher.fetchNFT(contract, id)

  return nft
}
