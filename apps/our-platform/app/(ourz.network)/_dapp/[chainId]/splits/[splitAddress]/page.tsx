import { SplitsClient } from '@0xsplits/splits-sdk'

import { getEveryZoraSplit } from '@/lib/zoraSubgraph'

export async function generateStaticParams() {
  const zoraSplits = await getEveryZoraSplit()
  const allPaths = zoraSplits.map((split) => ({
    chainId: '1',
    splitAddress: split,
  }))
  return allPaths
}

export default async function SplitOverview({
  params,
}: {
  params: { chainId: string; splitAddress: string }
}) {
  const client = new SplitsClient({
    chainId: Number(params.chainId),
  })
  const split = await client.getSplitMetadata({ splitId: params.splitAddress })

  return (
    <div className='border border-red-500'>{JSON.stringify(split)}</div>
  )
}
