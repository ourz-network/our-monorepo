import {
  getEverySplitCollectionWithMediaInfo,
  getEveryZoraSplit,
} from '@/lib/zoraSubgraph'

export async function generateStaticParams() {
  return [{ chainId: '1' }]
}

export default async function StatsPage() {
  const drops = await getEverySplitCollectionWithMediaInfo()
  const splits = await getEveryZoraSplit()

  return (
    <>
      There are {splits.length} 0xSplits existing within the Zora Protocol.
      <br />
      They have created {drops.length} drops.
      <br />
      Of those drops, {/** mints.length */ 'a lot of'} tokens have been minted,
      <br />
      netting their co-creators {/** mints.sales.value */ '1 bajillion'} ETH.
      <br />
      Secondary sales with royalties account for another{' '}
      {/** secondarySales.value */ '9 gazillion'} ETH.
    </>
  )
}
