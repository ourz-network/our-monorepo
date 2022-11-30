'use client'

import { useState, useEffect, Fragment } from 'react'
import { useNFTContent } from '@zoralabs/nft-hooks'

import type {
  RendererConfig,
  RenderRequest,
} from './content-components/RendererConfig'
import { MediaRendererDefaults } from './content-components'

export interface MetadataIsh {
  mimeType: string
  name: string
  description: string
  // ourzapi
  image?: string
  animation_url?: string
  // Only used for non-zora NFTs
  contentUri?: string
  imageUri?: string
}

interface MediaObjectProps {
  contentURI: string | null | undefined
  a11yIdPrefix: string | null | undefined
  metadata: MetadataIsh | null | undefined
  isFullPage: boolean | null | undefined
}

export const MediaObject = ({
  contentURI,
  metadata,
  a11yIdPrefix,
  isFullPage = false,
}: MediaObjectProps) => {
  const mediaType = useNFTContent(contentURI ?? metadata?.contentUri)
  const [renderingInfo, setRenderingInfo] = useState<RendererConfig>()
  const renderers = MediaRendererDefaults

  const request: RenderRequest = {
    media: {
      // from zora content uri
      content: contentURI
        ? {
            uri: contentURI,
            // TODO(iain): Clean up for catalog.works
            type:
              metadata?.mimeType ??
              (metadata as any)?.body?.mimeType ??
              mediaType?.content?.mimeType,
          }
        : undefined,
      image:
        metadata?.imageUri || metadata?.image
          ? {
              uri: metadata?.imageUri ?? metadata.image!,
              type: 'image/',
            }
          : undefined,
      // from metadata?.animation_url
      animation:
        metadata?.contentUri || metadata?.animation_url
          ? {
              uri: metadata?.contentUri ?? metadata.animation_url!,
              type:
                metadata?.mimeType ??
                (metadata as any)?.body?.mimeType ??
                mediaType?.content?.mimeType,
            }
          : undefined,
    },
    metadata,
    renderingContext: isFullPage ? 'FULL' : 'PREVIEW',
  }

  useEffect(() => {
    const sortedRenderers = renderers.sort((a, b) =>
      a.getRenderingPreference(request) > b.getRenderingPreference(request)
        ? -1
        : 1
    )
    setRenderingInfo(sortedRenderers[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderers, metadata, contentURI, mediaType.content])

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (renderingInfo) {
    const RenderingComponent = renderingInfo.render
    return <RenderingComponent a11yIdPrefix={a11yIdPrefix} request={request} />
  }

  return <></>
}
