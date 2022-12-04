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
      className={`border-[3px] border-solid border-[color:var(--colors-accent)] rounded relative pt-5 px-5 ${
        bottomPadding ? 'pb-5' : ''
      }`}
      // {...getStyles('infoContainer', className, { bottomPadding })}
    >
      <h4
        className='mb-1 text-sm uppercase opacity-50'
        // {...getStyles('fullLabel')}
      >
        {getString(titleString)}
      </h4>
      {children}
    </div>
  )
}
