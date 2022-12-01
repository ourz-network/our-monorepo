'use client'

import { NFTE } from 'our-components'
import { MetadataIsh } from 'our-components/dist/nfte/MediaObject'

interface Props {
  contentURI: string | null | undefined
  a11yIdPrefix: string | null | undefined
  metadata: MetadataIsh | null | undefined
}
export function NFTPreview(props: Props) {
  return (
    <div className='object-cover relative w-full h-full bg-transparent'>
      <NFTE {...props} isFullPage={false} />
    </div>
  )
}
