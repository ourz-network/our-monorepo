'use client'

import { NFTObject } from '@zoralabs/nft-hooks'
import { NFTFullPage } from 'our-components'

const FullPageNFT = ({
  contract,
  id,
  nft,
}: {
  contract: string
  id: string
  nft: NFTObject
}) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: '80%',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}
  >
    <NFTFullPage
      // useBetaIndexer={true}
      contract={contract}
      id={id}
      config={{ allowOffer: true }}
      initialData={{ nft }}
    />
  </div>
)

export default FullPageNFT
