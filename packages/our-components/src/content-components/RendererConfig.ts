import type { ThemeType } from '../context/MediaContext'

export enum RenderingPreference {
  INVALID = -1,
  FALLBACK = 0,
  LOW = 1,
  NORMAL = 2,
  PREFERRED = 3,
  PRIORITY = 4,
}

export type MediaUriType = {
  uri: string
  type?: string
  sources?: string[]
}

export type RenderRequest = {
  media: {
    // from zora content uri
    content?: MediaUriType

    image?: MediaUriType
    // from metadata?.animation_url
    animation?: MediaUriType
  }
  metadata: any
  renderingContext: 'PREVIEW' | 'FULL'
  contract?: string
  tokenId?: string
  networkId?: string
}

export type RenderComponentType = {
  request: RenderRequest
  // TODO(iain): Fix types
  getString: any | null
  getStyles: any | null
  theme: ThemeType['theme'] | null
  a11yIdPrefix?: string
}

export type RendererConfig = {
  getRenderingPreference(request: RenderRequest): RenderingPreference
  render: React.FunctionComponent<RenderComponentType>
}
