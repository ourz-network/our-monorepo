'use client'

import { Fragment, useContext } from 'react'

import { EditionDataContext } from '../context/EditionDataContext'
import { AddressView } from '../components/AddressView'
import { useMediaContext } from '../context/useMediaContext'
import type { StyleProps } from '../utils/StyleTypes'

type MediaInfoProps = {
  a11yIdPrefix?: string
} & StyleProps

export const MediaInfo = ({ a11yIdPrefix, className }: MediaInfoProps) => {
  const { getStyles, getString, style } = useMediaContext()
  const {
    edition: { data, error },
  } = useContext(EditionDataContext)

  const getContent = () => {
    if (data) {
      return {
        title: data.name,
        description: data.description,
      }
    }
    if (error) {
      return {
        title: '?',
        description: '?',
      }
    }
    return {
      title: '...',
      description: '...',
    }
  }

  const { title, description } = getContent()
  return (
    <div
      className=''
      // {...getStyles('fullItemInfo', className)}
    >
      <h2
        className='mx-0 my-5 text-3xl'
        // {...getStyles('fullTitle')}
      >
        {title}
      </h2>
      <div
        id={`${a11yIdPrefix}description`}
        className='fullDescription'
        // {...getStyles('fullDescription')}
      >
        {description}
      </div>
      {!style.theme.showCreator && !style.theme.showOwner ? (
        <></>
      ) : (
        <dl
          className='grid grid-flow-col grid-rows-2 auto-cols-fr p-5 border-[3px] border-solid border-[color:var(--colors-accent)] rounded mt-5'
          // {...getStyles('fullCreatorOwnerSection')}
        >
          {data?.creator.id && style.theme.showCreator && (
            <>
              <dt
                className='mb-1 text-sm uppercase opacity-50'
                // {...getStyles('fullLabel')}
              >
                {getString('CREATOR')}
              </dt>
              <dd
                className='fullOwnerAddress'
                // {...getStyles('fullOwnerAddress')}
              >
                {data ? <AddressView address={data.creator.id} /> : ' '}
              </dd>
            </>
          )}
        </dl>
      )}
    </div>
  )
}
