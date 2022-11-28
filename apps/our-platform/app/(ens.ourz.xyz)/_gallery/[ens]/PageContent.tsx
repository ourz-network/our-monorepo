import { Box } from './degene-sais-quoi'
import Footer from './Footer'
import Header from './Nav'
import ClientProviders from './ClientProviders'

import { GalleryConfig } from '@/types'

export default function PageContent({
  ens,
  galleryConfig,
  children,
}: {
  ens: string
  galleryConfig?: GalleryConfig
  children: React.ReactNode
}) {
  return (
    <ClientProviders galleryConfig={galleryConfig}>
      <Box backgroundColor='backgroundSecondary'>
        {/* @ts-expect-error Server Component */}
        <Header ens={ens} galleryConfig={galleryConfig} />
        <main className='z-0 md:mb-28'>{children}</main>
        <Footer />
      </Box>
    </ClientProviders>
  )
}
