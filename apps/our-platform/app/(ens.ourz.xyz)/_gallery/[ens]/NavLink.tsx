'use client'

import React, { Children } from 'react'
import { usePathname } from 'next/navigation'
import cx from 'classnames'
import Link, { LinkProps } from 'next/link'

type NavLinkProps = React.PropsWithChildren<LinkProps> & {
  // eslint-disable-next-line react/require-default-props
  activeClassName?: string
}

const NavLink = ({
  children,
  activeClassName = 'active',
  ...props
}: NavLinkProps) => {
  const asPath = usePathname()
  // eslint-disable-next-line react/jsx-no-useless-fragment
  const child = Children.only(<>{children}</>) as React.ReactElement
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const childClassName: string = child.props.className || ''

  const isActive = asPath === props.href // || asPath === props.as
  const pathName = `${asPath!}`.split('/')[1]
  const activePath = pathName === '' ? 'index' : pathName

  const className = cx(childClassName, activePath, {
    [activeClassName]: isActive,
  })

  return (
    // eslint-disable-next-line react/jsx-filename-extension, react/jsx-props-no-spreading
    <Link {...props} className={className}>
      {children}
    </Link>
  )
}
export default NavLink
