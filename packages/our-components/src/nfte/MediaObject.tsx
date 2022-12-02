/* eslint-disable @typescript-eslint/no-unnecessary-condition */

'use client'

import { useState, useEffect, Fragment } from 'react'
import { useNFTContent } from '@zoralabs/nft-hooks'
import {
  ImageEncodingTypes,
  TokenContentMedia,
  VideoEncodingTypes,
} from '@zoralabs/zdk/dist/queries/queries-sdk'

import { SubgraphEditionMetadata, SubgraphERC721Drop } from '../types/subgraph'

import type {
  RendererConfig,
  RenderRequest,
} from './content-components/RendererConfig'
import { MediaRendererDefaults } from './content-components'

export interface MediaInfo {
  image?: TokenContentMedia & {
    mimeType?: Pick<TokenContentMedia, 'mimeType'>
    size?: Pick<TokenContentMedia, 'size'>
    url?: Pick<TokenContentMedia, 'url'>
    mediaEncoding?: ImageEncodingTypes
  }
  content?: TokenContentMedia
}

// export interface MetadataIsh extends MediaInfo {
//   mimeType?: string
//   name?: string
//   description?: string
//   // ourzapi
//   image?: string
//   animation_url?: string
//   // Only used for non-zora NFTs
//   contentUri?: string
//   animationURI?: string
//   imageURI?: string
//   imageUri?: string
//   contractURI?: string
// }
export interface MetadataIsh extends MediaInfo, SubgraphEditionMetadata {
  mimeType?: string
}
interface MediaObjectProps {
  contentURI?: string
  a11yIdPrefix?: string
  metadata: MetadataIsh
  isFullPage?: boolean
}

export const MediaObject = ({
  contentURI,
  metadata,
  a11yIdPrefix,
  isFullPage = false,
}: MediaObjectProps) => {
  const { image, content, imageURI, contractURI, animationURI, mimeType } =
    metadata

  // console.log({ image, content, imageURI, contractURI, animationURI, mimeType })
  // console.log(animationURI ?? imageURI ?? contractURI ?? contentURI)

  const mediaType = useNFTContent(
    animationURI ?? imageURI ?? contractURI ?? contentURI
  )
  const [renderingInfo, setRenderingInfo] = useState<RendererConfig>()
  const renderers = MediaRendererDefaults

  const request: RenderRequest = {
    media: {
      // from zora content uri
      content: {
        uri:
          (content?.mediaEncoding as ImageEncodingTypes | VideoEncodingTypes)
            ?.large ??
          content?.mediaEncoding?.original ??
          contractURI ??
          image?.mediaEncoding?.large ??
          image?.mediaEncoding?.original,
        type: content?.mimeType ?? mimeType,
      },
      image: {
        uri:
          image?.mediaEncoding?.poster ??
          image?.mediaEncoding?.original ??
          image?.mediaEncoding?.thumbnail ??
          imageURI,
        type: image?.mimeType ?? mimeType,
      },
      // metadata?.imageURI || metadata?.imageURI
      //   ? {
      //       uri: metadata.imageURI ?? metadata.imageURI,
      //       type: 'image/',
      //     }
      //   :
      // from metadata?.animation_url
      animation: {
        uri:
          (content?.mediaEncoding as ImageEncodingTypes | VideoEncodingTypes)
            ?.poster ?? animationURI,
        type: content?.mimeType ?? mimeType,
      },
      // metadata?.contentURI || metadata?.animation_url
      //   ? {
      //       uri: metadata.contentURI ?? metadata.animation_url!,
      //       type:
      //         metadata.mimeType ??
      //         (metadata as any)?.body?.mimeType ??
      //         mediaType.content?.mimeType,
      //     }
      //   :
    },
    metadata,
    renderingContext: isFullPage ? 'FULL' : 'PREVIEW',
  }
  // console.log({ request })

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
