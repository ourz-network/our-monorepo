import { Fragment, useContext } from 'react'

import { NFTDataContext } from '../context/NFTDataContext'
import { AddressView } from '../components/AddressView'
import { useMediaContext } from '../context/useMediaContext'
import type { StyleProps } from '../utils/StyleTypes'

type MediaInfoProps = {
  a11yIdPrefix?: string
} & StyleProps

export const MediaInfo = ({ a11yIdPrefix, className }: MediaInfoProps) => {
  const { getStyles, getString, style } = useMediaContext()
  const { data } = useContext(NFTDataContext)

  const getContent = () => {
    if (data?.metadata?.raw) {
      return {
        title: data.metadata.raw.name,
        description: data.metadata.raw.description,
      }
    }
    if (data?.metadata) {
      return {
        title: data.metadata.name,
        description: data.metadata.description,
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
        className='mx-0 my-5 text-3xl'
        //  {...getStyles('fullDescription')}
        id={`${a11yIdPrefix}description`}
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
          {data?.nft?.minted?.address && style.theme.showCreator && (
            <>
              <dt
                className='mb-1 text-sm uppercase opacity-50'
                //  {...getStyles('fullLabel')}
              >
                {getString('CREATOR')}
              </dt>
              <dd
                className='fullOwnerAddress'
                //  {...getStyles('fullOwnerAddress')}
              >
                <AddressView address={data.nft?.minted.address} />
              </dd>
            </>
          )}
          {data?.nft?.owner && style.theme.showOwner && (
            <>
              <dt
                className='mb-1 text-sm uppercase opacity-50'
                //  {...getStyles('fullLabel')}
              >
                {getString('OWNER')}
              </dt>
              <dd
                className='fullOwnerAddress'
                //  {...getStyles('fullOwnerAddress')}
              >
                <AddressView address={data.nft?.owner.address} />
              </dd>
            </>
          )}
        </dl>
      )}
    </div>
  )
}
