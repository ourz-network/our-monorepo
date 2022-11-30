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
      className='fullItemInfo'
      // {...getStyles('fullItemInfo', className)}
    >
      <h2
        className='fullTitle'
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
          className='fullCreatorOwnerSection'
          // {...getStyles('fullCreatorOwnerSection')}
        >
          {data?.creator.id && style.theme.showCreator && (
            <>
              <dt
                className='fullLabel'
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
