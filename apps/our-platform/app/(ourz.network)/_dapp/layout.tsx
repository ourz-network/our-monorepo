import { Navbar } from '@/components/_dapp/layouts/Navbar'
import RootProvider from '@/components/_dapp/providers/Web3Providers'

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
