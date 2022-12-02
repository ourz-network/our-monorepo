'use client'

/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/button-has-type */

import { useDisconnect } from 'wagmi'

import { SubgraphERC721Drop } from '@/lib/models/subgraph'
// import ReactMarkdown from 'react-markdown'
import { ipfsImage } from '@/lib/helpers'
import { MintAndPresaleComponent } from '@/components/collection/MintAndPresaleComponent'
import { MintDetails } from '@/components/collection/MintDetails'
import { useERC721DropContract } from '@/components/providers/ERC721DropProvider'
import { useCollectionMetadata } from '@/hooks/useCollectionMetadata'
import { CollectionWithMediaInfo } from '@/lib/zoraSubgraph'
import { useState } from 'react'

export function CollectionInner({
  collection,
  username,
}: {
  collection: CollectionWithMediaInfo
  username?: string
}) {
  const mimeType =
    collection.mediaInfo?.content?.mimeType ??
    collection.mediaInfo?.image?.mimeType

  const collectionContext = useERC721DropContract()
  const { metadataDetails } = useCollectionMetadata(
    collectionContext.contractConfig.metadataRenderer
  )

  const srcs = mimeType?.startsWith('video')
    ? [
        // @ts-expect-error types
        collection?.mediaInfo?.content?.mediaEncoding?.large,
        collection?.mediaInfo?.content?.mediaEncoding?.original,
      ]
    : [
        // @ts-expect-error types
        collection?.mediaInfo?.content?.mediaEncoding?.large,
        collection?.mediaInfo?.content?.mediaEncoding?.original,
        collection?.mediaInfo?.image?.mediaEncoding?.large,
        collection?.mediaInfo?.image?.mediaEncoding?.original,
      ]

  const [showIPFS, setShowIPFS] = useState(true)
  const [sources, setSources] = useState(
    srcs.filter((src) => src !== null || src !== undefined)
  )

  const handleSourceError = () => {
    console.log('couldnt load that one')
    setSources((prevState) => [...prevState.slice(1)])
    setShowIPFS(true)
  }

  let description = '...'
  try {
    description = JSON.parse(`"${metadataDetails?.description || '...'}"`)
  } catch (e) {
    description = metadataDetails?.description || '...'
  }

  // const el = mimeType?.startsWith('video') ? 'video' : 'img'

  const { disconnect } = useDisconnect()
  return (
    <div className='flex w-full mt-3 flex-col md:flex-row-reverse gap-3 p-1 sm:p-10 max-w-[1350px] m-auto min-h-[80vh] justify-center items-center'>
      <div className='flex justify-center items-center p-4 w-2/3 max-h-[80vh] md:w-1/2'>
        {/* <Flex flex={{ '@initial': '1', '@1024': '1' }} p='x2' justify='center'> */}
        {mimeType?.startsWith('video') ? (
          <>
            {sources.length > 1 ? (
              <video
                className={`object-contain p-2 w-full h-full lg:p-12 ${
                  showIPFS ? 'hidden' : ''
                }`}
                // className={heroImage}
                src={sources[0]}
                // autoPlay
                controls // @ts-expect-error types
                poster={collection?.mediaInfo?.content?.mediaEncoding?.poster}
                // preload='metadata'
                onError={() => handleSourceError()}
                onLoadedMetadata={() => {
                  console.log('videoloaded')
                  if (showIPFS) setShowIPFS(false)
                }}
                // alt={collectionContext.name}
              />
            ) : (
              ''
              // <SpinnerOG />
            )}
            {showIPFS && (
              <video
                className='object-contain p-2 w-full h-full lg:p-12'
                // className={heroImage}
                // src={sources[0]}
                // preload='none'
                // autoPlay
                controls // @ts-expect-error types
                poster={collection?.mediaInfo?.content?.mediaEncoding?.poster}
                src={ipfsImage(
                  metadataDetails?.animationURI ?? metadataDetails?.imageURI
                )}
                // alt={collectionContext.name}
              />
            )}
          </>
        ) : (
          <>
            {sources.length > 1 ? (
              <img
                className={`object-contain p-2 w-full h-full lg:p-12 ${
                  showIPFS ? 'hidden' : ''
                }`}
                // className={heroImage}
                src={sources[0]}
                onError={() => handleSourceError()}
                onLoad={() => {
                  console.log('imageloaded')
                  if (showIPFS) setShowIPFS(false)
                }}
                alt={collectionContext.name}
              />
            ) : (
              ''
              // <SpinnerOG />
            )}
            {showIPFS && (
              <img
                className='object-contain p-2 w-full h-full lg:p-12'
                // className={heroImage}
                // src={sources[0]}
                src={ipfsImage(
                  metadataDetails?.animationURI ?? metadataDetails?.imageURI
                )}
                alt={collectionContext.name}
              />
            )}
          </>
        )}
      </div>
      <div className='flex flex-col p-4 m-auto min-w-min max-w-md border-2 border-red-100 min-h-[50vh] justify-between'>
        {/* <Box
        flex={{ '@initial': '1', '@1024': 'none' }}
        className={maxWidth}
        p='x4'
      > */}
        {/* <Stack gap='x2' mb='x3'> */}
        <div className='flex flex-col gap-2 m-3'>
          {/* <Text variant='display-md' mb='x2'> */}
          <span className='mb-2'>{collectionContext.name}</span>
          {/* </Text> */}
          {/* <Paragraph className={wrapWords} mb='x2'> */}
          <p className='whitespace-pre-wrap'>
            {/* <ReactMarkdown> */}
            {description}
            {/* </ReactMarkdown> */}
            {/* </Paragraph> */}
          </p>
        </div>
        {/* </div> */}
        {/* </Stack> */}

        {/* <Box> */}
        <div className='border-4 border-blue-500'>
          {/* <div className='box?'> */}
          {/* <div className='box?'> */}
          {collectionContext != null ? (
            <>
              <MintAndPresaleComponent collection={collectionContext} />

              {/* <Box> */}
              <div className='box?'>
                {username && (
                  <>
                    {/* // <Well borderColor='accent' py='x1' mt='x4'> */}
                    <div className='py-1 mt-4 border-8 border-purple-200'>
                      {/* <Flex justify='space-between' align='center'> */}
                      <div className='flex justify-between items-center'>
                        <span className='text-sm'>Logged in as {username}</span>
                        <button className='relative left-5 ghost'>
                          {/* <Button
                        pill
                        variant='ghost'
                        onClick={disconnect}
                        positive='relative'
                        style={{ left: vars.space.x5 }}
                      > */}
                          <span className='text-sm'>Disconnect</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {/* </div> */}
                {/* // <Well borderColor='accent' fontSize={14} mt='x4'> */}
                <div className='mt-4 text-sm border border-pink-400'>
                  <MintDetails collection={collectionContext} hideToggle />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* <Paragraph align='center' mt='x8'> */}
              <p className='items-center mt-8'>
                Loading...
                {/* <SpinnerOG /> */}
              </p>
            </>
          )}
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}
