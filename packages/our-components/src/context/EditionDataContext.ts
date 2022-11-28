import { createContext } from 'react'
import type { useEditionType } from 'our-hooks'

export interface EditionDataContext {
  edition: useEditionType
}

const DEFAULT_OBJECT = {
  loading: true,
  error: undefined,
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const EditionDataContext = createContext<EditionDataContext>({
  edition: { ...DEFAULT_OBJECT, editionLoaded: false },
})
