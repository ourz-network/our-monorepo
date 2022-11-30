import { ZDK } from '@zoralabs/zdk'

import NFTList from '../NFTList'

import { getGalleryConfig } from '@/lib/fetchers'
import { GalleryConfig } from '@/types'
import { getAddressFromENS } from '@/lib/ens'

export default async function Home({ params }: { params: { ens: string } }) {
  const { ens } = params
  const galleryConfig = await getGalleryConfig(ens)

  const { collectionAddresses, ownerAddresses } = await getTokenAddresses(
    ens,
    galleryConfig
  )

  const API_ENDPOINT = 'https://api.zora.co/graphql'
  const zdk = new ZDK({ endpoint: API_ENDPOINT }) // Defaults to Ethereum Mainnet

  const ownedTokens = await zdk.tokens({
    where: {
      collectionAddresses,
      ownerAddresses,
    },
    pagination: { limit: 25 },
    includeFullDetails: false,
    includeSalesHistory: false,
  })

  const tokens = ownedTokens.tokens.nodes.map((item) => {
    const token = {
      ...item,
      tokenId: item.token.tokenId,
      contractAddress: item.token.tokenContract?.collectionAddress,
      minter: item.token.mintInfo?.originatorAddress,
      owner: item.token.owner,
    }

    return {
      ...JSON.parse(JSON.stringify({ ...token })),
    }
  })

  return (
    <div className='md:mb-28'>
      <h1>{galleryConfig?.title ?? ''}</h1>
      <h2>{galleryConfig?.desc ?? ''}</h2>
      <NFTList tokens={tokens} />
    </div>
  )
}

async function getTokenAddresses(ens: string, galleryConfig?: GalleryConfig) {
  const collectionAddresses = galleryConfig?.contracts
    ? galleryConfig.contracts.split(',')
    : ['0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7']
  const ownerAddresses = galleryConfig?.subdomain
    ? [`${galleryConfig.subdomain}.eth`]
    : [await getAddressFromENS(ens)]
  return {
    collectionAddresses,
    ownerAddresses,
  }
}
