import { SubgraphERC721Drop } from 'models/subgraph'

import { CollectionInner } from './CollectionInner'

import { DROPS_METADATA_RENDERER } from '@/constants/addresses'
import DropMetadataContractProvider from '@/components/_app/providers/DropMetadataProvider'
import ERC721DropContractProvider from '@/components/_app/providers/ERC721DropProvider'
import EditionMetadataContractProvider from '@/components/_app/providers/EditionMetadataProvider'

export function Collection({
  collection,
  username,
}: {
  collection: SubgraphERC721Drop
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

  // console.log({ collection })
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
