'use client'

/* eslint-disable @next/next/no-img-element */
import { forwardRef, useState } from 'react'

import { ipfsImage } from '../lib/helpers'

import { MediaLoader, useMediaObjectProps } from './MediaLoader'
import {
  RenderComponentType,
  RendererConfig,
  RenderingPreference,
  RenderRequest,
} from './RendererConfig'

export const ImageRenderer = forwardRef<HTMLImageElement, RenderComponentType>(
  (requestProps, ref) => {
    const { getStyles, theme, request } = requestProps
    const [sources, setSources] = useState(
      request.renderingContext === 'FULL'
        ? [...(request?.media?.content?.sources ?? [])]
        : [...(request?.media?.image?.sources ?? [])]
    )
    const uri = sources[0]
    const { props, loading, error } = useMediaObjectProps({
      uri: ipfsImage(uri),
      preferredIPFSGateway: theme?.preferredIPFSGateway,
      ...requestProps,
    })
    console.log({ props })
    return (
      <MediaLoader getStyles={getStyles} loading={loading} error={error}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img ref={ref} {...props} />
      </MediaLoader>
    )
  }
)
export const Image: RendererConfig = {
  getRenderingPreference: (request: RenderRequest) => {
    if (request.media.image?.uri) {
      // Make low priority only if full screen, move to normal priority if preview
      if (request.renderingContext === 'FULL' && request.media.animation) {
        return RenderingPreference.LOW
      }
      return RenderingPreference.NORMAL
    }
    if (request.media.content?.type?.startsWith('image/')) {
      return RenderingPreference.NORMAL
    }
    if (request.media.content?.type?.startsWith('application/svg+xml')) {
      return RenderingPreference.NORMAL
    }
    return RenderingPreference.INVALID
  },
  render: ImageRenderer,
}
