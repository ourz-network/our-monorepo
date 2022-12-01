import { Suspense } from 'react'
import Link from 'next/link'

import { getEveryZoraSplit } from '@/lib/zoraSubgraph'

export default async function SplitsPage() {
  const zoraSplits = await getEveryZoraSplit()

  return (
    <>
      {/*  eslint-disable-next-line arrow-body-style */}
      {zoraSplits.map((split, i) => {
        // console.log(split)
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
