'use client'

/* eslint-disable @next/next/no-img-element */
import { forwardRef } from 'react'

import { MediaLoader, useMediaObjectProps } from './MediaLoader'
import {
  RenderComponentType,
  RendererConfig,
  RenderingPreference,
  RenderRequest,
} from './RendererConfig'

export const ImageRenderer = forwardRef<HTMLImageElement, RenderComponentType>(
  (requestProps, ref) => {
    const { request } = requestProps
    const { props, loading, error } = useMediaObjectProps({
      uri:
        request.renderingContext === 'FULL'
          ? /* request.media.content?.uri ?? */ request.media.image?.uri
          : request.media.image?.uri,
      ...requestProps,
    })

    return (
      <MediaLoader loading={loading} error={error}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img className='' ref={ref} {...props} />
      </MediaLoader>
    )
  }
)
export const Image: RendererConfig = {
  getRenderingPreference: (request: RenderRequest) => {
    if (request.media.image) {
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