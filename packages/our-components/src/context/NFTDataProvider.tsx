'use client'

import { useNFT } from '@zoralabs/nft-hooks'
import { DROPS_METADATA_RENDERER } from '../constants/addresses'
import { SubgraphERC721Drop } from '../models/subgraph'
import DropMetadataContractProvider from '../providers/DropMetadataProvider'
import EditionMetadataContractProvider from '../providers/EditionMetadataProvider'
// import { useNFT } from 'our-hooks'

import { NFTDataContext } from './NFTDataContext'

export interface NFTDataProviderProps {
  id: string
  contract: string
  children: React.ReactNode
  options?: any
  marketOptions?: any
  collection?: SubgraphERC721Drop
}

export const NFTDataProvider = ({
  id,
  children,
  contract,
  options = {},
  marketOptions = {},
  collection,
}: NFTDataProviderProps) => {
  const nft = useNFT(contract, id, options, marketOptions)

  return (
    <NFTDataContext.Provider value={nft}>{children}</NFTDataContext.Provider>
  )
}
