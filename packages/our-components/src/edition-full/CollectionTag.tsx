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
      {...getStyles('colectionTagWrapper')}
      href={`https://zora.co/collections/${data.id}`}
      target='_blank'
      rel='noreferrer'
    >
      <div {...getStyles('collectionTagIcon')}>
        <Orb />
      </div>
      <span>Zora</span>
    </a>
  )

  return (
    <div
      // eslint-disable-next-line react/no-unknown-property
      css={css`
        position: relative;
        display: flex;
        flex-direction: row;
      `}
    >
      {data ? getContent() : '...'}
    </div>
  )
}
