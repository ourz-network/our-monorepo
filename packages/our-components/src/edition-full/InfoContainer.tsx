'use client'

import type { StyleProps } from '../utils/StyleTypes'
import type { Strings } from '../constants/strings'
import { useMediaContext } from '../context/useMediaContext'

export type InfoContainerProps = {
  children: React.ReactNode
  titleString: keyof typeof Strings
  bottomPadding?: boolean
} & StyleProps

export const InfoContainer = ({
  children,
  titleString,
  bottomPadding = true,
  className,
}: InfoContainerProps) => {
  const { getStyles, getString } = useMediaContext()

  return (
    <div
      className='infoContainer'
      // {...getStyles('infoContainer', className, { bottomPadding })}
    >
      <h4
        className='fullLabel'
        // {...getStyles('fullLabel')}
      >
        {getString(titleString)}
      </h4>
      {children}
    </div>
  )
}
