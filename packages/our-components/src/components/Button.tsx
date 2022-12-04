import type { StyleProps } from '../utils/StyleTypes'
import { useMediaContext } from '../context/useMediaContext'

// One of onClick or href required
export type ButtonProps = {
  primary?: boolean
  href?: string
  onClick?: () => void
  children: React.ReactNode
} & StyleProps

export const Button = ({
  children,
  primary = false,
  href,
  onClick,
  className,
}: ButtonProps) => {
  const { getStyles } = useMediaContext()
  const ButtonComponent = href ? 'a' : 'button'
  const classStr = primary ? `bg-[#333] font-[#fff]` : `bg-[#eee] font-[#000]`
  return (
    <ButtonComponent
      onClick={onClick}
      href={href}
      target={href ? '_blank' : undefined}
      className={`p-3 rounded-md transition-transform duration-100 ease-in-out active:scale-95 ${classStr} ${className}`}
      // {...getStyles('button', className, { primary })}
    >
      {children}
    </ButtonComponent>
  )
}
