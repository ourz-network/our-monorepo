import { Navbar } from '@/components/layouts/Navbar'
import RootProvider from '@/components/providers/Web3Providers'

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
