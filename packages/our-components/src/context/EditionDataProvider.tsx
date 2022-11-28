'use client'

import { useEdition, useEditionType } from 'our-hooks'

import { EditionDataContext } from './EditionDataContext'

export interface EditionDataProviderProps {
  contract: string
  refreshInterval?: number
  children: React.ReactNode
  initialData?:
    | {
        edition?: useEditionType['data']
        totalSupply?: number
      }
    | any
}

export const EditionDataProvider = ({
  children,
  contract,
  refreshInterval,
  initialData,
}: EditionDataProviderProps) => {
  const { edition: editionInitial } = initialData || {}

  const edition = useEdition(contract, {
    initialData: editionInitial,
    refreshInterval,
  })

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <EditionDataContext.Provider value={{ edition }}>
      {children}
    </EditionDataContext.Provider>
  )
}
