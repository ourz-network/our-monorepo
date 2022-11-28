import { useSplit, useSplitType } from 'our-hooks'

import { SplitDataContext } from './SplitDataContext'

export interface SplitDataProviderProps {
  splitAddress: string
  refreshInterval?: number
  children: React.ReactNode
  initialData?:
    | {
        split?: useSplitType['data']
      }
    | any
}

export const SplitDataProvider = ({
  children,
  splitAddress,
  refreshInterval,
  initialData,
}: SplitDataProviderProps) => {
  const { Split: splitInitial } = initialData || {}

  const split = useSplit(splitAddress, {
    initialData: splitInitial,
    refreshInterval,
  })

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SplitDataContext.Provider value={{ split }}>
      {children}
    </SplitDataContext.Provider>
  )
}
