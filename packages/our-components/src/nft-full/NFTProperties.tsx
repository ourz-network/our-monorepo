'use client'

import { Fragment, useContext } from 'react'

import { useMediaContext } from '../context/useMediaContext'
import { NFTDataContext } from '../context/NFTDataContext'
import type { StyleProps } from '../utils/StyleTypes'

import { InfoContainer } from './InfoContainer'

type NFTPropertiesProps = StyleProps

export const NFTProperties = ({ className }: NFTPropertiesProps) => {
  const { data } = useContext(NFTDataContext)
  const { getStyles } = useMediaContext()

  const renderAttributes = (attributes: any) => {
    function formatAttributes(obj: any) {
      if (Array.isArray(obj)) {
        return obj
      }
      const array = Object.keys(obj).length === 0 ? false : Object.entries(obj)
      if (array !== false) {
        return array.map((a) => ({
          trait_type: a[0],
          value: a[1],
        }))
      }
      return []
    }

    const formattedAttributes = formatAttributes(attributes)

    if (!attributes || !formattedAttributes.length) {
      return null
    }
    return (
      <InfoContainer className={className} titleString='PROPERTIES_TITLE'>
        <div
          className='propertiesGrid'
          // {...getStyles('propertiesGrid')}
        >
          {formattedAttributes.map((attribute: any, index: number) => {
            const name = attribute?.name || attribute?.trait_type

            return (
              <div
                className='propertiesItem'
                // {...getStyles('propertiesItem')}
                // eslint-disable-next-line react/no-array-index-key
                key={`${data?.nft?.tokenId}${index}`}
              >
                {name && (
                  <span
                    className='propertiesLabel'
                    // {...getStyles('propertiesLabel')}
                  >
                    {name}
                  </span>
                )}
                {attribute?.value && <span>{attribute?.value}</span>}
              </div>
            )
          })}
        </div>
      </InfoContainer>
    )
  }

  const getContent = () => {
    if (data && data.metadata && 'attributes' in data.metadata) {
      return renderAttributes(data.metadata.attributes)
    }
    if (data && data.metadata && 'traits' in data.metadata) {
      return renderAttributes((data.metadata as any).traits)
    }
    return <></>
  }

  return data ? getContent() : null
}
