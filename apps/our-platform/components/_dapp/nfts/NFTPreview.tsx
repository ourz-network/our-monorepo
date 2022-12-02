'use client'

import { NFTE } from 'our-components'
import { MetadataIsh } from 'our-components/dist/nfte/MediaObject'

interface Props {
  contentURI: string
  a11yIdPrefix: string
  metadata: MetadataIsh
}
export function NFTPreview(props: Props) {
  return (
    <div className='object-cover relative w-full max-w-md h-full bg-transparent'>
      <NFTE {...props} isFullPage={false} />
    </div>
  )
}
