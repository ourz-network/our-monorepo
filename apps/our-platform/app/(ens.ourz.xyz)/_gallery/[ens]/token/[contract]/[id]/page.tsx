import { ZDK } from '@zoralabs/zdk'
import { NFTObject } from '@zoralabs/nft-hooks'

import FullPageNFT from '@/components/_gallery/FullPageNFT'
import { TokenQuery } from '@zoralabs/zdk/dist/queries/queries-sdk'

export const getTokenInfo = async (
  contract: string,
  id: string,
  chainId?: number
) => {
  const API_ENDPOINT = 'https://api.zora.co/graphql'
  const zdk = new ZDK({
    endpoint: API_ENDPOINT,
  })
  const { token } = await zdk.token({
    token: {
      address: contract,
      tokenId: id,
    },
  })

  return { token }
}

export default async function Page({
  params,
}: {
  params: { ens: string; contract: string; id: string }
}) {
  const { contract, id } = params

  // const API_ENDPOINT = 'https://api.zora.co/graphql'
  // const zdk = new ZDK({ endpoint: API_ENDPOINT })
  // const { token } = await zdk.token({
  //   token: {
  //     address: contract,
  //     tokenId: id,
  //   },
  // })

  const token = await getTokenInfo(contract, id)

  const nft = token?.token as unknown as NFTObject

  return <FullPageNFT contract={contract} id={id} nft={nft} />
}
