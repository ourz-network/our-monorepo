'use client'

import { NFTPreview } from 'our-components'
import { useRouter } from 'next/navigation'
import { NFTObject } from '@zoralabs/nft-hooks'

export type GalleryNFT = NFTObject & {
  tokenId: string
  contractAddress: string
  minter: string
  owner: string
}

const NFTList = ({ tokens }: { tokens: GalleryNFT[] }) => {
  const router = useRouter()

  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {tokens.map((token) => (
        <NFTPreview
          key={token?.contractAddress?.concat(token?.tokenId?.toString())}
          id={token?.tokenId}
          // @ts-expect-error prop exists
          initialData={token}
          contract={token?.contractAddress}
          onClick={() =>
            router.push(`/token/${token?.contractAddress}/${token?.tokenId}`)
          }
        />
      ))}
    </div>
  )
}

export default NFTList
