import { useMediaContext } from '../context/useMediaContext'
import {
  NFTDataProvider,
  NFTDataProviderProps,
} from '../context/NFTDataProvider'
import type { StyleProps } from '../utils/StyleTypes'

import { ProposalMediaDisplay } from './ProposalMediaDisplay'
import {
  ProposalActionList,
  ProposalActionListProps,
} from './ProposalActionList'

type NFTProposalProps = Omit<NFTDataProviderProps, 'children'> & {
  actionConfiguration?: ProposalActionListProps
} & StyleProps

export const NFTProposal = ({
  actionConfiguration,
  className,
  ...wrapperProps
}: NFTProposalProps) => {
  const { getStyles } = useMediaContext()

  return (
    <NFTDataProvider {...wrapperProps}>
      <div {...getStyles('nftProposal', className)}>
        <ProposalMediaDisplay />
        <ProposalActionList {...actionConfiguration} />
      </div>
    </NFTDataProvider>
  )
}
