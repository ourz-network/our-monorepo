import Link from 'next/link'
import React, { Fragment, ReactNode } from 'react'

interface CollectionDetailsItemProps {
  name: string
  value?: string
  href?: string
  children?: ReactNode
  className?: string
}
export function CollectionDetailsItem({
  children,
  name,
  value,
  href,
  ...props
}: CollectionDetailsItemProps) {
  const Wrapper = href != null ? Link : (Fragment as any)

  return (
    <>
      {/* <Wrapper {...(href != null ? { href, passHref: true } : {})}> */}
      {/* <Flex
          as={href != null ? 'a' : undefined}
          gap='x3'
          align='center'
          justify='space-between'
          target='_blank'
          rel='noreferrer'
          aria-label='External link'
          {...props}
        > */}
      {/* <Paragraph size='sm' color='tertiary'> */}
      {name}
      {/* </Paragraph> */}

      {/* <Flex gap='x2' align='center'> */}
      {/* {!!value && !href && <Paragraph size='sm'>{value}</Paragraph>} */}
      {!!value && !href && <p>{value}</p>}
      {!!href && (
        <>
          {/* <Paragraph size='sm' className={trailingArrow}> */}
          {value || 'Explore'}
          {/* </Paragraph> */}
        </>
      )}
      {children}
      {/* </Flex> */}
      {/* </Flex> */}
      {/* </Wrapper> */}
    </>
  )
}
