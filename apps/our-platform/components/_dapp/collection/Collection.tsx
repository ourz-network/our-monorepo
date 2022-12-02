import { SubgraphERC721Drop } from 'models/subgraph'

import { CollectionInner } from './CollectionInner'

import { DROPS_METADATA_RENDERER } from '@/constants/addresses'
import DropMetadataContractProvider from '@/components/_dapp/providers/DropMetadataProvider'
import ERC721DropContractProvider from '@/components/_dapp/providers/ERC721DropProvider'
import EditionMetadataContractProvider from '@/components/_dapp/providers/EditionMetadataProvider'
import { CollectionWithMediaInfo } from '@/lib/zoraSubgraph'

export function Collection({
  collection,
  username,
}: {
  collection: CollectionWithMediaInfo
  username?: string
}) {
  const components = {
    drop: DropMetadataContractProvider,
    edition: EditionMetadataContractProvider,
  }
  const MetadataProvider =
    components[
      DROPS_METADATA_RENDERER.includes(
        collection.contractConfig.metadataRenderer
      )
        ? 'drop'
        : 'edition'
    ]

  if (!collection) {
    return <div>Loading...</div>
  }

  return (
    <ERC721DropContractProvider collection={collection}>
      <MetadataProvider
        collection={collection}
        metadataRendererAddress={collection.contractConfig.metadataRenderer}
      >
        <CollectionInner collection={collection} username={username} />
      </MetadataProvider>
    </ERC721DropContractProvider>
  )
}
