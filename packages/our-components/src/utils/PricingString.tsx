'use client'

/* eslint-disable react/require-default-props */
import type { CurrencyValue } from '@zoralabs/nft-hooks'
import { Fragment } from 'react'

import { useMediaContext } from '../context/useMediaContext'

export const PricingString = ({
  pricing,
  showUSD = true,
}: {
  pricing?: CurrencyValue
  showUSD?: boolean
}) => {
  const { getStyles, style } = useMediaContext()

  const { format } = new Intl.NumberFormat(
    typeof window === 'undefined' ? 'en-US' : navigator.language,
    {
      style: 'decimal',
      maximumFractionDigits: style.theme.maximumPricingDecimals,
    }
  )

  const { format: formatUSD } = new Intl.NumberFormat(
    typeof window === 'undefined' ? 'en-US' : navigator.language,
    {
      style: 'decimal',
      maximumFractionDigits: 2,
    }
  )

  if (!pricing) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>
  }

  return (
    <>
      {!!pricing.amount.value && (
        <span
          className='first-of-type:pr-3 font-[family:var(--body-font)] font-normal'
          // {...getStyles('pricingAmount')}
        >
          {format(pricing?.amount?.value)} {pricing?.symbol}
        </span>
      )}
      {showUSD && !!pricing?.usd?.value && (
        <span
          className='opacity-50'
          // {...getStyles('textSubdued')}
        >
          {' '}
          ${formatUSD(pricing?.usd?.value)}
        </span>
      )}
    </>
  )
}
