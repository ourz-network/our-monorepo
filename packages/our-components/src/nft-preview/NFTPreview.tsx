import { NFTObject, useNFTMetadataType, useNFTType } from '@zoralabs/nft-hooks'

import {
  NFTDataProvider,
  NFTDataProviderProps,
} from '../context/NFTDataProvider'
import type { StyleProps } from '../utils/StyleTypes'

import { PricingComponent } from './PricingComponent'
import { MediaThumbnailWrapper } from './MediaThumbnailWrapper'
import { MediaThumbnail } from './MediaThumbnail'

export type NFTPreviewProps = {
  onClick?: (evt: React.MouseEvent<HTMLElement>) => void
  href?: string
  children?: React.ReactNode
  showBids?: boolean
  showPerpetual?: boolean
  initialData?: {
    nft: NFTObject
  }
} & Omit<NFTDataProviderProps, 'children'> &
  StyleProps

export const NFTPreview = ({
  children,
  className,
  href,
  onClick,
  showBids = true,
  showPerpetual = true,
  ...wrapperProps
}: NFTPreviewProps) => {
  const getChildren = () => {
    if (children) {
      return children
    }
    return (
      <>
        <MediaThumbnail />
        {showBids && <PricingComponent showPerpetual={showPerpetual} />}
      </>
    )
  }

  return (
    <NFTDataProvider {...wrapperProps}>
      <MediaThumbnailWrapper
        className={className}
        onClick={onClick}
        href={href}
      >
        {getChildren()}
      </MediaThumbnailWrapper>
    </NFTDataProvider>
  )
}
