import { useContext } from 'react'

import { NFTDataContext } from '../context/NFTDataContext'
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
  const { data, error } = useContext(NFTDataContext)

  const getContent = () => {
    if (data && data.metadata) {
      return (
        <MediaObject
          isFullPage
          a11yIdPrefix={a11yIdPrefix}
          {...getContentData(data)}
        />
      )
    }
    if (!data && error) {
      return (
        <div
          className={`flex relative justify-center items-center w-full pointer-events-none min-h-fit${''}`}
          // {...getStyles('mediaLoader')}
        >
          error fetching...
        </div>
      )
    }
    return (
      <div
        className={`flex relative justify-center items-center w-full pointer-events-none min-h-fit${''}`}
        // {...getStyles('mediaLoader')}
      >
        loading...
      </div>
    )
  }

  const media = getContent()
  return (
    <div
      className='m-[5%] relative justify-center items-center flex'
      // {...getStyles('fullMediaWrapper', className)}
    >
      {media}
    </div>
  )
}
