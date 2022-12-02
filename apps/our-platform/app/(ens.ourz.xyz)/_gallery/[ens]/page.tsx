import { ZDK } from '@zoralabs/zdk'

import NFTList from './NFTList'

import { getAllGalleryConfigs, getGalleryConfig } from '@/lib/fetchers'
import { getAddressFromENS } from '@/lib/ens'
import { GalleryConfig } from '@/types/_gallery'

export const revalidate = 10
//   dynamic = 'error',
// dynamicParams = true

export async function generateStaticParams() {
  const configs = await getAllGalleryConfigs()

  const allPaths = configs.map((config) => ({ ens: config.subdomain }))

  return allPaths
}

export default async function Page({ params }: { params: { ens: string } }) {
  const { ens } = params
  const galleryConfig = await getGalleryConfig(ens)

  const { collectionAddresses, curationAddresses, minterAddresses } =
    await getTokenAddresses(ens, galleryConfig)

  const API_ENDPOINT = 'https://api.zora.co/graphql'
  const zdk = new ZDK({ endpoint: API_ENDPOINT }) // Defaults to Ethereum Mainnet
  const curatedTokens = await zdk.tokens({
    where: {
      collectionAddresses,
      ownerAddresses: curationAddresses,
    },
    pagination: { limit: 25 },
    includeFullDetails: false,
    includeSalesHistory: false,
  })
  const mintedTokens = await zdk.mints({
    where: {
      collectionAddresses,
      minterAddresses,
    },
    pagination: { limit: 25 },
    includeFullDetails: false,
    includeMarkets: false,
  })

  const results = [...mintedTokens.mints.nodes, ...curatedTokens.tokens.nodes]

  const tokenMap = new Map<string, any>()

  // flatten duplicates
  results.forEach((item) => {
    if (
      item.token?.tokenId &&
      item.token.tokenContract &&
      // @ts-expect-error conditional
      (item.token.mintInfo || item.mint)
    ) {
      const token = {
        ...item,
        tokenId: item.token.tokenId,
        contractAddress: item.token.tokenContract.collectionAddress,
        minter:
          // @ts-expect-error conditional
          item.token.mintInfo?.originatorAddress ?? item.mint.originatorAddress,
        owner: item.token.owner,
      }

      tokenMap.set(`${token.contractAddress + token.tokenId}`, {
        ...JSON.parse(JSON.stringify({ ...token })),
      })
    }
  })

  // back to array
  const tokens: any[] = []
  tokenMap.forEach((value) => tokens.push(value))

  return (
    <div>
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
  const curationAddresses = galleryConfig?.curator
    ? [galleryConfig.curator]
    : []
  const ownerAddresses = galleryConfig?.subdomain
    ? [`${galleryConfig.subdomain}.eth`]
    : [await getAddressFromENS(ens)]
  const minterAddresses = [...curationAddresses, ...ownerAddresses]
  return {
    collectionAddresses,
    curationAddresses,
    minterAddresses,
  }
}
