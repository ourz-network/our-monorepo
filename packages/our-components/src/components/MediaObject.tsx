'use client'

import { useState, useEffect, Fragment } from 'react'
import { useNFTContent } from '@zoralabs/nft-hooks'

import { useMediaContext } from '../context/useMediaContext'
import type {
  RendererConfig,
  RenderRequest,
} from '../content-components/RendererConfig'

interface MetadataIsh {
  mimeType: string
  name: string
  description: string

  // Only used for non-zora NFTs
  contentUri?: string
  imageUri?: string
}

interface MediaObjectProps {
  contentURI?: string
  contentMimeType?: string
  previewURI?: string
  previewMimeType?: string
  fullSizeSources?: string[]
  previewSources?: string[]
  metadata?: any
  contract?: any
  tokenId?: any
  a11yIdPrefix?: string
  isFullPage?: boolean
}

export const MediaObject = ({
  contentURI,
  contentMimeType,
  previewURI,
  previewMimeType,
  fullSizeSources,
  previewSources,
  metadata,
  a11yIdPrefix,
  isFullPage = false,
}: MediaObjectProps) => {
  const mediaType = useNFTContent(contentURI ?? metadata?.contentUri)
  const [renderingInfo, setRenderingInfo] = useState<RendererConfig>()
  const { getStyles, getString, renderers, style } = useMediaContext()
  console.log({
    contentURI,
    contentMimeType,
    previewURI,
    previewMimeType,
    fullSizeSources,
    previewSources,
  })
  const request: RenderRequest = {
    media: {
      // from zora content uri
      content: {
        uri: contentURI!,
        sources: fullSizeSources,
        // TODO(iain): Clean up for catalog.works
        type:
          contentMimeType ??
          metadata?.mimeType ??
          (metadata as any)?.body?.mimeType ??
          mediaType?.content?.mimeType,
      },
      image: {
        sources: previewSources,
        uri: !contentMimeType?.startsWith('audio')
          ? previewURI ?? contentURI!
          : previewURI!,
        type: previewMimeType,
      },
      // from metadata?.animation_url
      animation: metadata?.contentUri
        ? {
            uri: metadata?.contentUri,
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

  console.log('request', JSON.stringify(request, null, 2))
  useEffect(() => {
    console.log(
      renderers.map((renderer) => {
        return {
          mimeType: renderer.render.toString(),
          priority: renderer.getRenderingPreference(request),
        }
      })
    )
    const sortedRenderers = renderers.sort((a, b) =>
      a.getRenderingPreference(request) > b.getRenderingPreference(request)
        ? -1
        : 1
    )
    setRenderingInfo(sortedRenderers[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderers, metadata, contentURI, mediaType.content])

  if (renderingInfo) {
    const RenderingComponent = renderingInfo.render
    return (
      <RenderingComponent
          a11yIdPrefix={a11yIdPrefix}
          getStyles={getStyles}
          getString={getString}
          theme={style.theme}
          request={request}
        />
    )
  }

  return <></>
}
