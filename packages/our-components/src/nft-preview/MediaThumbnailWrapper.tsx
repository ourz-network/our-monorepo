'use client'

import { useContext } from 'react'

import type { StyleProps } from '../utils/StyleTypes'
import { NFTDataContext } from '../context/NFTDataContext'
import { useMediaContext } from '../context/useMediaContext'

type MediaThumbnailWrapperProps = {
  children: React.ReactNode
  onClick?: (evt: React.MouseEvent<HTMLElement>) => void
  href?: string
} & StyleProps

export const MediaThumbnailWrapper = ({
  children,
  onClick,
  href,
  className,
}: MediaThumbnailWrapperProps) => {
  const { getStyles } = useMediaContext()

  const { data } = useContext(NFTDataContext)

  if (data?.markets) {
    const markets = data.markets.filter(
      (market) => market.status === 'active' || market.status === 'complete'
    )
    const lastMarket = markets.length ? markets[markets.length - 1] : null

    const LinkComponent = href ? 'a' : 'button'

    return (
      <div
        className='overflow-hidden relative m-4 w-80 max-w-xs border-[3px] border-solid border-[color:var(--colors-accent)] transition-transform duration-100 ease-in-out active:scale-95'
        // {...getStyles('cardOuter', className, {
        //   hasClickEvent: !!onClick,
        //   auctionStatus: lastMarket?.status,
        // })}
      >
        {(href || onClick) && (
          <LinkComponent
            className='absolute w-full h-full bg-transparent appearance-none'
            // {...getStyles('cardLink')}
            href={href}
            onClick={onClick}
          >
            View NFT
          </LinkComponent>
        )}
        {children}
      </div>
    )
  }
  return <></>
}
