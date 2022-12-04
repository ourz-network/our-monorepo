import type { NFTObject } from '@zoralabs/nft-hooks'
import React, { Fragment, useContext } from 'react'

import { NFTDataContext } from '../context/NFTDataContext'
import {
  MEDIA_URL_BASE_BY_NETWORK,
  VIEW_ETHERSCAN_URL_BASE_BY_NETWORK,
} from '../constants/media-urls'
import { useMediaContext } from '../context/useMediaContext'
import type { StyleProps } from '../utils/StyleTypes'

import { InfoContainer } from './InfoContainer'

const ProofLink = ({
  href,
  children,
  styles,
}: {
  href?: string
  children: string
  styles: any
}) => (
  <a
    {...styles}
    className='block text-[decoration:none] text-[color:var(--colors-primary)] p-5 my-0 -mx-5 border-t-[3px] border-solid border-[color:var(--colors-accent)] hover:bg-[color:var(--colors-accent)] after:w-3 after:h-3 after:opacity-50 after:right-[20px] after:absolute'
    href={href}
    target='_blank'
    rel='noreferrer'
  >
    {children}
  </a>
)

export const ProofAuthenticity = ({ className }: StyleProps) => {
  const { data } = useContext(NFTDataContext)
  const { getString, getStyles, networkId } = useMediaContext()
  const linkStyles = getStyles('fullProofLink')

  const getContent = (nft: NFTObject) => {
    const infoURL = data?.nft?.contentURI
    const infoUrlLabelText =
      infoURL?.includes('/ipfs/') || infoURL?.startsWith('ipfs://')
        ? 'VIEW_IPFS'
        : 'VIEW_METADATA'

    if (!nft.nft) {
      return <></>
    }

    return (
      <>
        <ProofLink
          styles={linkStyles}
          href={`${VIEW_ETHERSCAN_URL_BASE_BY_NETWORK[networkId]}${nft.nft.contract.address}?a=${nft.nft.tokenId}`}
        >
          {getString('ETHERSCAN_TXN')}
        </ProofLink>
        {infoURL && (
          <ProofLink styles={linkStyles} href={infoURL}>
            {getString(infoUrlLabelText)}
          </ProofLink>
        )}
        {data?.nft &&
          (data.rawData['zora-indexer'] ||
            data.nft.contract.knownContract === 'zora') && (
            <ProofLink
              styles={linkStyles}
              href={`${MEDIA_URL_BASE_BY_NETWORK[networkId]}collections/${
                nft.nft!.contract.address
              }/${nft.nft!.tokenId}`}
            >
              {getString('VIEW_ZORA')}
            </ProofLink>
          )}
      </>
    )
  }

  return (
    <InfoContainer
      titleString='PROOF_AUTHENTICITY'
      bottomPadding={false}
      className={className}
    >
      <div
        className='fullInfoProofAuthenticityContainer'
        // {...getStyles('fullInfoProofAuthenticityContainer')}
      >
        {data && getContent(data)}
      </div>
    </InfoContainer>
  )
}
