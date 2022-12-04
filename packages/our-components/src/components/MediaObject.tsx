import { useState, useEffect, Fragment, useMemo } from 'react'
import { useNFTContent } from '@zoralabs/nft-hooks'

import { useMediaContext } from '../context/useMediaContext'
import type {
  RendererConfig,
  RenderRequest,
} from '../content-components/RendererConfig'

type MetadataIsh = {
  mimeType: string
  name: string
  description: string

  // Only used for non-zora NFTs
  contentUri?: string
  imageUri?: string
}

type MediaObjectProps = {
  contentURI?: string
  a11yIdPrefix?: string
  metadata?: MetadataIsh
  contract?: string
  tokenId?: string
  isFullPage?: boolean
  contentMimeType?: string
  previewURI?: string
  previewMimeType?: string
  fullSizeSources?: string[]
  previewSources?: string[]
}

export const MediaObject = ({
  contentURI,
  metadata,
  a11yIdPrefix,
  contract,
  tokenId,
  isFullPage = false,
  contentMimeType,
  previewURI,
  previewMimeType,
  fullSizeSources,
  previewSources,
}: MediaObjectProps) => {
  const mediaType = useNFTContent(contentURI ?? metadata?.contentUri)
  const { getStyles, getString, renderers, style, networkId } =
    useMediaContext()
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
    contract,
    tokenId,
    networkId,
    renderingContext: isFullPage ? 'FULL' : 'PREVIEW',
  }

  console.log('metadata', JSON.stringify(metadata, null, 2))
  // console.log('request', JSON.stringify(request, null, 2))
  const renderingInfo = useMemo(() => {
    const sortedRenderers = renderers.sort((a, b) =>
      a.getRenderingPreference(request) > b.getRenderingPreference(request)
        ? -1
        : 1
    )
    return sortedRenderers[0]
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
