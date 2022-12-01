import { Navbar } from '@/components/_app/layouts/Navbar'
import RootProvider from '@/components/_app/providers/Web3Providers'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootProvider>
      <Navbar />
      <main>
        <div>{children}</div>
      </main>
    </RootProvider>
  )
}
