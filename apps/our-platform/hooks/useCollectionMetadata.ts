import {
  DROPS_METADATA_RENDERER,
  EDITIONS_METADATA_RENDERER,
} from '@/lib/constants/addresses'
import { useDropMetadataContract } from '@/components/providers/DropMetadataProvider'
import { useEditionMetadataContract } from '@/components/providers/EditionMetadataProvider'

export const useCollectionMetadata = (metadataRendererAddress: string) => {
  const drop = useDropMetadataContract()
  const edition = useEditionMetadataContract()
  if (DROPS_METADATA_RENDERER.includes(metadataRendererAddress)) {
    return drop
  }
  if (EDITIONS_METADATA_RENDERER.includes(metadataRendererAddress)) {
    return edition
  }
  return edition
}
