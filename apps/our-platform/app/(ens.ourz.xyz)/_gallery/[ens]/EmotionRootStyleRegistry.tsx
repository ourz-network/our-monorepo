'use client'

import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { useServerInsertedHTML } from 'next/navigation'
import { useState } from 'react'

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  const [{ cache, flush }] = useState(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const cache = createCache({ key: 'my' })
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args: any[]) => {
      const serialized = args[1]
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      // @ts-expect-error v13
      return prevInsert(...args)
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) return null
    let styles = ''
    // eslint-disable-next-line no-restricted-syntax
    for (const name of names) {
      styles += cache.inserted[name]
    }
    return (
      <style
        data-emotion={`${cache.key} ${names.join(' ')}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    )
  })

  return <CacheProvider value={cache}>{children}</CacheProvider>
}
