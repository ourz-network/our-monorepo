'use client'

/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable consistent-return */

import type { ContractTransaction, Signer } from 'ethers'
import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { cleanDescription } from '../utils/edition'
import { SubgraphERC721Drop } from '../models/subgraph'
import { EditionMetadataRenderer__factory } from '../constants/typechain'

interface MetadataDetails {
  description: string
  imageURI: string
  animationURI: string
}

export interface EditionMetadataProviderState {
  loading: boolean
  metadataDetails?: MetadataDetails
  updateDescription: (
    description: string
  ) => Promise<ContractTransaction | undefined>
  updateMediaURIs: (
    imageURI: string,
    animationURI: string
  ) => Promise<ContractTransaction | undefined>
}

export const EditionMetadataContext =
  React.createContext<EditionMetadataProviderState>(
    {} as EditionMetadataProviderState
  )

function EditionMetadataContractProvider({
  collection,
  metadataRendererAddress,
  signer,
  children,
}: {
  collection: SubgraphERC721Drop
  metadataRendererAddress: string
  signer?: Signer
  children?: ReactNode
}) {
  // const { data: signer } = useSigner()
  const [metadataDetails, setMetadataDetails] = useState<MetadataDetails>(
    collection.editionMetadata
  )
  const [loading, setLoading] = useState(true)
  const metadataRenderer = useMemo(
    () =>
      signer
        ? new EditionMetadataRenderer__factory(signer).attach(
            metadataRendererAddress
          )
        : null,
    [signer, metadataRendererAddress]
  )

  useEffect(() => {
    ;(async () => {
      try {
        if (!collection || !metadataRenderer || !signer?.getAddress) {
          throw 'No signer or metadataRenderer'
        }
        const metadata = (await metadataRenderer.tokenInfos(
          collection.address
        )) as MetadataDetails
        setMetadataDetails({
          ...metadata,
          description: cleanDescription(metadata.description),
        } as MetadataDetails)
        setLoading(false)
      } catch (e: any) {
        setLoading(false)
      }
    })()
  }, [metadataRenderer, collection, signer])

  const updateDescription = useCallback(
    async (description: string) => {
      if (!metadataRenderer) return

      const jsonDescription = JSON.stringify(description).slice(1, -1)
      const tx = await metadataRenderer.updateDescription(
        collection.address,
        jsonDescription
      )
      console.log({ tx })
      await tx.wait(2)

      setMetadataDetails({
        ...metadataDetails,
        description: jsonDescription,
      } as MetadataDetails)
      return tx
    },
    [metadataDetails, metadataRenderer, collection.address]
  )

  const updateMediaURIs = useCallback(
    async (imageURI: string, animationURI: string) => {
      if (!metadataRenderer) return

      const tx = await metadataRenderer.updateMediaURIs(
        collection.address,
        imageURI,
        animationURI
      )
      await tx.wait(2)

      setMetadataDetails({
        ...metadataDetails,
        imageURI,
        animationURI,
      } as MetadataDetails)

      return tx
    },
    [metadataDetails, metadataRenderer, collection.address]
  )

  return (
    <EditionMetadataContext.Provider
      value={{
        loading,
        metadataDetails,
        updateDescription,
        updateMediaURIs,
      }}
    >
      {children}
    </EditionMetadataContext.Provider>
  )
}

export default EditionMetadataContractProvider

export const useEditionMetadataContract = () =>
  useContext(EditionMetadataContext)
