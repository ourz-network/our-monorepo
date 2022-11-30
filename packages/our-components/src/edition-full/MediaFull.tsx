'use client'

import { useContext } from 'react'

import { EditionDataContext } from '../context/EditionDataContext'
import { MediaObject } from '../components/MediaObject'
import { useMediaContext } from '../context/useMediaContext'
import {
  defaultGetContentData,
  GetContentDataType,
} from '../utils/getContentDataOptions'
import type { StyleProps } from '../utils/StyleTypes'

type MediaFullProps = GetContentDataType & {
  a11yIdPrefix?: string
} & StyleProps

export const MediaFull = ({
  a11yIdPrefix,
  getContentData = defaultGetContentData,
  className,
}: MediaFullProps) => {
  const { getStyles } = useMediaContext()
  const {
    edition: { data, error },
  } = useContext(EditionDataContext)

  const getContent = () => {
    if (data) {
      const metadata = {
        mimeType: 'image/',
        name: data.name,
        description: data.description,
        animation_url: data.animationUrl,
        image: data.imageUrl,
      }
      return (
        <MediaObject
          isFullPage
          a11yIdPrefix={a11yIdPrefix}
          contentURI={data.animationUrl ?? data.imageUrl}
          metadata={metadata}
          // {...getContentData(data)}
        />
      )
    }
    if (error) {
      return (
        <div
          className='mediaLoader'
          // {...getStyles('mediaLoader')}
        >
          error fetching...
        </div>
      )
    }
    return (
      <div
        className='mediaLoader'
        // {...getStyles('mediaLoader')}
      >
        loading...
      </div>
    )
  }

  const media = getContent()
  return (
    <div
      className='fullMediaWrapper'
      // {...getStyles('fullMediaWrapper', className)}
    >
      {media}
    </div>
  )
}
