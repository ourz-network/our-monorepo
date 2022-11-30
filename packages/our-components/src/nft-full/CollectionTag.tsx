'use client'

/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react'
import { css } from '@emotion/react'

import { useMediaContext } from '../context/useMediaContext'
import { NFTDataContext } from '../context/NFTDataContext'
import { Orb } from '../components/Orb'

export const CollectionTag = () => {
  const { data } = useContext(NFTDataContext)

  const { getStyles } = useMediaContext()

  const getContent = () => (
    <a
      className='colectionTagWrapper'
      // {...getStyles('colectionTagWrapper')}
      href={`https://zora.co/collections/${data?.nft!.contract.address}`}
      target='_blank'
      rel='noreferrer'
    >
      <div
        className='collectionTagIcon'
        // {...getStyles('collectionTagIcon')}
      >
        {data &&
        'OpenSea' in data.rawData &&
        data.rawData.OpenSea.asset_contract.image_url ? (
          <img
            src={data.rawData.OpenSea.asset_contract.image_url}
            alt={data.rawData.OpenSea.asset_contract.name}
          />
        ) : (
          <Orb />
        )}
      </div>
      <span>{data?.nft!.contract.name}</span>
    </a>
  )

  return (
    <div
      className='flex relative'
      // eslint-disable-next-line react/no-unknown-property
      // css={css`
      //   position: relative;
      //   display: flex;
      //   flex-direction: row;
      // `}
    >
      {data?.nft ? getContent() : '...'}
    </div>
  )
}
