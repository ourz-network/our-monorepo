'use client'

import { Nav } from '@/components/Nav'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />

      <main className=''>{children}</main>
    </>
  )
}
