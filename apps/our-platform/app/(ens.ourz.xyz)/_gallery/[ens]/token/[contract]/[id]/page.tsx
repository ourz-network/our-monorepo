import { ZDK } from '@zoralabs/zdk'

import FullPageNFT from '@/components/_gallery/FullPageNFT'

export default async function Page({
  params,
}: {
  params: { ens: string; contract: string; id: string }
}) {
  const { contract, id } = params

  const API_ENDPOINT = 'https://api.zora.co/graphql'
  const zdk = new ZDK({ endpoint: API_ENDPOINT })
  const token = await zdk.token({
    token: {
      address: contract,
      tokenId: id,
    },
  })

  return <FullPageNFT contract={contract} id={id} token={token} />
}
