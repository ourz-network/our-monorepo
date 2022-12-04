'use client'

import { useNFT } from '@zoralabs/nft-hooks'
// import { useNFT } from 'our-hooks'

import { NFTDataContext } from './NFTDataContext'

export interface NFTDataProviderProps {
  id: string
  contract: string
  children: React.ReactNode
  options?: any
  marketOptions?: any
}

export const NFTDataProvider = ({
  id,
  children,
  contract,
  options = {},
  marketOptions = {},
}: NFTDataProviderProps) => {
  const nft = useNFT(contract, id, options, marketOptions)

  // console.log('nft', JSON.stringify(nft, null, 2))

  return (
    <NFTDataContext.Provider value={nft}>{children}</NFTDataContext.Provider>
  )
}
