'use client'

import React, { useContext } from 'react'

import {
  NetworkIDs,
  Networks,
  NFTFetchConfiguration,
  Strategies,
} from '@zoralabs/nft-hooks'

// import {
//   NetworkIDs,
//   Networks,
//   OurFetchConfiguration as NFTFetchConfiguration,
//   Strategies,
// } from 'our-hooks'

import { merge } from 'merge-anything'

// import { ThemeProvider } from 'degene-sais-quoi'
// import type { Accent, Mode } from 'degene-sais-quoi/dist/types/tokens'

import type { NFTStrategy } from '@zoralabs/nft-hooks/dist/strategies'
import deepmerge from 'deepmerge'

import type { Strings } from '../constants/strings'
import type { RecursivePartial } from '../utils/RecursivePartial'
import type { RendererConfig } from '../content-components/RendererConfig'
import { MediaRendererDefaults } from '../content-components'

import { MediaContext, ThemeType } from './MediaContext'

type MediaContextConfigurationProps = {
  /**
   * NetworkID to set. Use Networks export to set constant. Default is mainnet.
   */
  networkId?: NetworkIDs
  children: React.ReactNode
  /**
   * Style configuration object. Contains both a theme and styles. Theme are generic settings for rendering styles.Style configuration object. Contains both a theme and styles.
   * Theme are generic settings for rendering styles.
   * Styles are raw emotion css-in-js styles for more fine-grained display settings.
   */
  style?: RecursivePartial<ThemeType>
  /**
   * List of content strings.
   */
  strings?: Partial<typeof Strings>
  /**
   * List of renderers.
   */
  renderers?: RendererConfig[]

  strategy?: NFTStrategy
}

export const MediaConfiguration = ({
  networkId,
  style = {},
  children,
  strings = {},
  renderers,
}: MediaContextConfigurationProps) => {
  const superContext = useContext(MediaContext)

  const newNetworkId = networkId ?? superContext.networkId

  if (!renderers) {
    // eslint-disable-next-line no-param-reassign
    renderers = MediaRendererDefaults
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const newContext = {
    // TODO(iain): Fix typing
    style: deepmerge(superContext.style, style) as ThemeType,
    strings: deepmerge(superContext.strings, strings),
    renderers,
    networkId: newNetworkId,
  }
  // const zdkStrategy = new Strategies.ZDKFetchStrategy(
  //   networkId ?? Networks.MAINNET
  // )
  return (
    <MediaContext.Provider value={newContext}>
      <NFTFetchConfiguration networkId={newNetworkId}>
        {children}
      </NFTFetchConfiguration>
    </MediaContext.Provider>
  )
}
