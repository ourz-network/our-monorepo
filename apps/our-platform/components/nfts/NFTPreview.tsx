'use client'

import { MediaObject, NFTE, NFTPreview as NFTPreviewZ } from 'our-components'
import { MetadataIsh } from 'our-components/dist/nfte/MediaObject'

interface Props {
  contentURI: string
  a11yIdPrefix: string
  metadata: MetadataIsh
  contract: string
  id: string
}
export function NFTPreview({ contract, id }: Props) {
  return (
    <div className='object-cover relative w-full max-w-md h-full bg-transparent'>
      {/* @ts-ignore */}
      <NFTPreviewZ contract={contract} id={id} />
    </div>
  )
}
