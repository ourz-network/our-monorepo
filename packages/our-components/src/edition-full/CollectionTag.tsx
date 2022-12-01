'use client'

import { useContext } from 'react'
import { css } from '@emotion/react'

import { useMediaContext } from '../context/useMediaContext'
import { EditionDataContext } from '../context/EditionDataContext'
import { Orb } from '../components/Orb'

export const CollectionTag = () => {
  const {
    edition: { data },
  } = useContext(EditionDataContext)

  const { getStyles } = useMediaContext()

  const getContent = () => (
    <a
      className='border-[2px] border-solid border-[color:var(--colors-accent)] border-[radius:200px] transition-transform duration-100 ease-in-out p-[5px] flex items-center text-[decoration:none] cursor-pointer active:scale-95 font-[family:var(--hero-font)] font-medium'
      // {...getStyles('colectionTagWrapper')}
      href={`https://zora.co/collections/${data?.id}`}
      target='_blank'
      rel='noreferrer'
    >
      <div
      // {...getStyles('collectionTagIcon')}
      >
        <Orb />
      </div>
      <span className='my-0 mx-[10px]'>Zora</span>
    </a>
  )

  return (
    <div
      // eslint-disable-next-line react/no-unknown-property
      // css={css`
      //   position: relative;
      //   display: flex;
      //   flex-direction: row;
      // `}
      className='flex relative'
    >
      {data ? getContent() : '...'}
    </div>
  )
}
