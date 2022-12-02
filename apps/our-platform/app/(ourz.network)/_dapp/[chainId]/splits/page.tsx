import { Suspense } from 'react'
import Link from 'next/link'

import { getEveryZoraSplit } from '@/lib/zoraSubgraph'

export async function generateStaticParams() {
  return [{ chainId: '1' }]
}

export default async function SplitsPage({
  params,
}: {
  params: { chainId: string }
}) {
  const zoraSplits = await getEveryZoraSplit()

  return (
    <>
      {/*  eslint-disable-next-line arrow-body-style */}
      {zoraSplits.map((split, i) => {
        return (
          <div key={split} className='p-4 m-4 border border-gray-500'>
            <Suspense fallback={<></>}>
              <Link href={`/splits/${split}`} prefetch={false}>
                {split}
              </Link>
            </Suspense>
          </div>
        )
      })}
    </>
  )
}
