// These styles apply to every route in the application
import '@/styles/_gallery/reset.css'
import '@/styles/_gallery/globals.css'
import '@/styles/_gallery/degene-sais-quoi.css'

import EmotionRootStyleRegistry from './EmotionRootStyleRegistry'
import ClientProviders from './ClientProviders'
import { Box } from './degene-sais-quoi'
import Footer from './Footer'
import Header from './Nav'

import { getGalleryConfig } from '@/lib/fetchers'
import Script from 'next/script'

export const revalidate = 10

export default async function RootLayout({
  params,
  children, // will be a page or nested layout
}: {
  params: { ens: string }
  children: React.ReactNode
}) {
  const { ens } = params
  const galleryConfig = await getGalleryConfig(ens)

  return (
    <html lang='en' data-theme={galleryConfig?.mode === 'dark' ? 'dark' : ''}>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </head>
      <body>
        <EmotionRootStyleRegistry>
          <ClientProviders galleryConfig={galleryConfig}>
            <Box backgroundColor='backgroundSecondary'>
              {/* @ts-expect-error Server Component */}
              <Header ens={ens} galleryConfig={galleryConfig} />
              <main className='z-0 md:mb-28'>{children}</main>
              <Footer />
            </Box>
          </ClientProviders>
        </EmotionRootStyleRegistry>
      </body>
      <Script
        id='tailwind-theme'
        strategy='afterInteractive'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            try {
              if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document?.documentElement?.classList?.add('dark')
                document?.documentElement?.classList?.add('--hello-world: #666')
              } else {
                document?.documentElement?.classList?.remove('dark')
              }
            } catch (_) {}
          `,
        }}
      />
    </html>
  )
}
