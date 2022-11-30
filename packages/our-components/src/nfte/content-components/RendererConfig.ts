'use client'

export enum RenderingPreference {
  INVALID = -1,
  FALLBACK = 0,
  LOW = 1,
  NORMAL = 2,
  PREFERRED = 3,
  PRIORITY = 4,
}

export interface MediaUriType {
  uri: string
  type?: string
}

export interface RenderRequest {
  media: {
    // from zora content uri
    content?: MediaUriType
    image?: MediaUriType
    // from metadata.animation_url
    animation?: MediaUriType
  }
  metadata: any
  renderingContext: 'PREVIEW' | 'FULL'
}

export interface RenderComponentType {
  request: RenderRequest
  a11yIdPrefix: string | null | undefined
}

export interface RendererConfig {
  getRenderingPreference(request: RenderRequest): RenderingPreference
  render: React.FunctionComponent<RenderComponentType>
}
