'use client'

import { NFTPreview as NFTPreviewZ } from 'our-components'

interface Props {
  contentURI: string
  a11yIdPrefix: string
  metadata: any
  contract: string
  id: string
}

export function NFTPreview({ contract, id, ...props }: Props) {
  return (
    <div className='object-cover relative w-full max-w-md h-full bg-transparent'>
      <NFTPreviewZ contract={contract} {...props} id={id} />
    </div>
  )
}
