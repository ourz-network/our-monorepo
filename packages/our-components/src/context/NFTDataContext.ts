'use client'

import { createContext } from 'react'
import type { useNFTType } from '@zoralabs/nft-hooks'

export type NFTDataContext = useNFTType

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const NFTDataContext = createContext<NFTDataContext>({
  data: undefined,
  currencyLoaded: false,
})
