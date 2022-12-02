'use client'

import { NFTFullPage } from 'our-components'

const FullPageNFT = ({
  contract,
  id,
  token,
}: {
  contract: string
  id: string
  token: any
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
      contract={contract as string}
      id={id as string}
      config={{ allowOffer: true }}
      // @ts-expect-error prop exists
      initialData={token}
    />
  </div>
)

export default FullPageNFT
