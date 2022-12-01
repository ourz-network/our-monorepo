import { Suspense } from 'react'
import Link from 'next/link'

import { getEverySplitDropMeta, getEveryZoraSplit } from '@/lib/zoraSubgraph'

export default async function StatsPage() {
  const drops = await getEverySplitDropMeta()
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
