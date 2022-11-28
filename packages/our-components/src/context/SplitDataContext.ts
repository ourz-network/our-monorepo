'use client'

import { createContext } from 'react'
import type { useSplitType } from 'our-hooks'

export interface SplitDataContext {
  split: useSplitType
}

const DEFAULT_OBJECT = {
  loading: true,
  error: undefined,
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SplitDataContext = createContext<SplitDataContext>({
  split: { ...DEFAULT_OBJECT, splitLoaded: false },
})
