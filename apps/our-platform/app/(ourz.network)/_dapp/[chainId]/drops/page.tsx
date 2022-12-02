import { Suspense } from 'react'
import { MessonryGrid } from 'messonry'
import Link from 'next/link'

import { getEverySplitCollectionWithMediaInfo } from '@/lib/zoraSubgraph'
import { NFTPreview } from '@/components/_dapp/nfts/NFTPreview'

export async function generateStaticParams() {
  return [{ chainId: '1' }]
}

export default async function DropsPage({
  params,
}: {
  params: { chainId: string }
}) {
  const collections = await getEverySplitCollectionWithMediaInfo()

  return (
    <>
      {/*  eslint-disable-next-line arrow-body-style */}
      {collections.map((collection, i) => {
        const posterUrl = collection.mediaInfo?.image?.mediaEncoding?.poster
        const metadata = {
          ...collection.editionMetadata,
          ...collection.mediaInfo,
          name: collection.name,
          mimeType: collection.mediaInfo?.content?.mimeType as
            | string
            | undefined,
        }

        return (
          <div
            key={collection.address}
            className='flex flex-col items-center mx-auto text-center w-fit'
          >
            <p>{collection.name}</p>

            <Suspense fallback={<></>}>
              <Link href={`/drops/${collection.address}`} prefetch={false}>
                <NFTPreview
                  contentURI={
                    posterUrl ??
                    metadata?.contractURI ??
                    metadata?.animationURI ??
                    metadata?.imageURI
                  }
                  metadata={metadata}
                  a11yIdPrefix=''
                />
              </Link>
            </Suspense>
          </div>
        )
      })}
      {/* <MessonryGrid
        items={editions}
        options={{ useNextImage: true, nextImageConfig: {} }}
      /> */}
    </>
  )
}
