'use client'

import { MediaConfiguration } from 'our-components'

import { ThemeProvider } from './degene-sais-quoi'

import GlobalStyles from '@/styles/_gallery/GlobalStyles'
import { mediaConfigurationStyles } from '@/styles/_gallery/theme'
import { GalleryConfig } from '@/lib/types'

const ClientProviders = ({
  galleryConfig,
  children,
}: {
  galleryConfig: GalleryConfig | undefined
  children: React.ReactNode
}) => (
  <>
    <GlobalStyles galleryConfig={galleryConfig} />
    <ThemeProvider
      defaultMode={galleryConfig?.mode ?? 'dark'}
      defaultAccent={galleryConfig?.accent ?? 'orange'}
    >
      <MediaConfiguration
        networkId='1'
        style={mediaConfigurationStyles}
        mode={galleryConfig?.mode ?? 'dark'}
        accent={galleryConfig?.accent ?? 'orange'}
      >
        {children}
      </MediaConfiguration>
    </ThemeProvider>
  </>
)

export default ClientProviders
