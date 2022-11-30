'use client'

import { Container } from '@nextui-org/react'
import { NFTE } from 'our-components'
import { MetadataIsh } from 'our-components/dist/nfte/MediaObject'

interface Props {
  contentURI: string | null | undefined
  a11yIdPrefix: string | null | undefined
  metadata: MetadataIsh | null | undefined
}
export function NFTPreview(props: Props) {
  return (
    <Container
      // xs
      // fluid={false}
      // responsive={false}
      display='flex'
      justify='center'
      alignContent='center'
      css={{
        objectFit: 'contain',
        maxWidth: '$breakpoints$xs',
        maxHeight: '$breakpoints$xs',
      }}
    >
      <div className='object-cover relative w-full h-full bg-transparent'>
        <NFTE {...props} isFullPage={false} />
      </div>
    </Container>
  )
}
