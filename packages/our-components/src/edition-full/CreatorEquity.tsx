'use client'

import React, { useContext } from 'react'

import { useMediaContext } from '../context/useMediaContext'
import { EditionDataContext } from '../context/EditionDataContext'
import { AddressView } from '../components/AddressView'
import type { StyleProps } from '../utils/StyleTypes'

import { InfoContainer } from './InfoContainer'

export const CreatorEquity = ({ className }: StyleProps) => {
  const {
    edition: { data },
  } = useContext(EditionDataContext)
  const { getStyles, getString } = useMediaContext()

  const getContent = (bidSharePercentage: number) => (
    <>{Math.floor(bidSharePercentage)}%</>
  )

  return (
    <>
      {data && (
        <InfoContainer titleString='CREATOR_EQUITY' className={className}>
          <div {...getStyles('fullInfoCreatorEquityContainer')}>
            {getContent((data.royaltyBPS as unknown as number) / 100)}
          </div>
        </InfoContainer>
      )}
      {/* {data && data.pricing.reserve && data.pricing.reserve?.curatorFeePercentage > 0 && (
        <InfoContainer titleString="CURATOR_FEE" className={className}>
          <div {...getStyles("fullInfoCuratorFeeContainer")}>
            <span>
              {getContent(data.pricing.reserve?.curatorFeePercentage)} {getString("CURATOR_PROCEEDS_DESC")}
            </span>
            &nbsp;
            <AddressView address={data.pricing.reserve.curator.id} />
          </div>
        </InfoContainer>
      )} */}
    </>
  )
}
