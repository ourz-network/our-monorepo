// These styles apply to every route in the application
import '@/styles/reset.css'
import '@/styles/globals.css'
import '@/styles/degene-sais-quoi.css'

import EmotionRootStyleRegistry from './EmotionRootStyleRegistry'
import ClientProviders from './ClientProviders'
import { Box } from './degene-sais-quoi'
import Footer from './Footer'
import Header from './Nav'

import { getGalleryConfig } from '@/lib/fetchers'
import { inter } from '@/styles/fonts'
import PageContent from './PageContent'

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
    <html
      lang='en'
      data-theme={galleryConfig?.mode === 'dark' ? 'dark' : ''}
      // style={}
    >
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </head>
      <body>
        <EmotionRootStyleRegistry>
          {/* <div className={inter.variable}> */}

          <PageContent ens={ens} galleryConfig={galleryConfig}>
            {children}
          </PageContent>

          {/* </div> */}
        </EmotionRootStyleRegistry>
      </body>
    </html>
  )
}
