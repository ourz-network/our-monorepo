import { Collection } from '@/components/_dapp/collection/Collection'
import {
  getCollectionWithMediaInfo,
  getEverySplitCollectionWithMediaInfo,
} from '@/lib/zoraSubgraph'

export const revalidate = 10

export async function generateStaticParams() {
  const collections = await getEverySplitCollectionWithMediaInfo()
  const allPaths = collections.map((collection) => ({
    chainId: '1',
    collectionAddress: collection.address,
  }))
  return allPaths
}

export default async function DropCollection({
  params,
}: {
  params: { chainId: string; collectionAddress: string }
}) {
  const collection = await getCollectionWithMediaInfo(params.collectionAddress)

  return <Collection collection={collection} />
}
