import { Collection } from '@/components/_app/mint-page-template/Collection'
import {
  getAllZoraSplitDropsFull,
  getCollectionsMeta,
} from '@/lib/zoraSubgraph'

export default async function DropCollection({
  params,
}: {
  params: { chainId: string; collectionAddress: string }
}) {
  console.log('drop collection params', { params })
  // let collection

  // try {
  const collections = await getCollectionsMeta([params.collectionAddress])
  // console.log({ collections })
  const collection = { ...collections[0] }
  // } catch (error) {
  // console.log(error)
  // }
  // console.log({ collection })

  return (
    <>
      {/* <div className='border border-red-500'>{JSON.stringify(params)}</div> */}
      <Collection collection={collection} />
    </>
  )
}
