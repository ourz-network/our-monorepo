'use client'

import { useContext } from 'react'

import { AddressView } from '../components/AddressView'
import { MediaObject } from '../components/MediaObject'
import { useMediaContext } from '../context/useMediaContext'
import { NFTDataContext } from '../context/NFTDataContext'
import {
  defaultGetContentData,
  GetContentDataType,
} from '../utils/getContentDataOptions'
import type { StyleProps } from '../utils/StyleTypes'

export const MediaThumbnail = ({
  getContentData = defaultGetContentData,
  className,
}: GetContentDataType & StyleProps) => {
  const { data } = useContext(NFTDataContext)

  const { getStyles, getString } = useMediaContext()

  const getContent = () => {
    if (data?.metadata) {
      return {
        media: <MediaObject isFullPage={false} {...getContentData(data)} />,
        title: data.metadata.name,
      }
    }
    return {
      media: (
        <div
          className={`justify-center items-center w-full pointer-events-none min-h-fit${''}`}
          // {...getStyles('mediaLoader')}
        />
      ),
      title: '...',
    }
  }

  const { media, title } = getContent()
  const hasCreator = data?.nft?.minted.address
  const address = hasCreator
    ? data.nft?.minted.address
    : data?.nft?.owner?.address
  return (
    <>
      {/* <div className={className}> */}
      <div
        className='flex overflow-hidden relative justify-center items-center m-0 w-full h-80 bg-white'
        // {...getStyles('cardMediaWrapper')}
      >
        {media}
      </div>
      <div
        className='px-4 py-3 border-t-[3px] border-solid border-[color:var(--colors-accent)]'
        // {...getStyles('cardItemInfo')}
      >
        <h5
          className='m-0 w-full text-[color:var(--font-color)] whitespace-nowrap font-medium overflow-clip text-ellipsis'
          // TODO
          // {...getStyles('cardTitle')}
        >
          {title}
        </h5>
        <div>
          <span
            className='font-normal opacity-50 text-[color:var(--colors-accentText)]'
            // {...getStyles('textSubdued')}
          >
            {hasCreator
              ? getString('CARD_CREATED_BY')
              : getString('CARD_OWNED_BY')}
          </span>{' '}
          <span>{address && <AddressView address={address} />}</span>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}
