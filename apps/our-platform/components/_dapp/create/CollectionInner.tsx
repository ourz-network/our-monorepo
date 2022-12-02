/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/button-has-type */
'use client'

import { useDisconnect } from 'wagmi'

import { SubgraphERC721Drop } from '@/models/subgraph'
// import ReactMarkdown from 'react-markdown'
import { ipfsImage } from '@/lib/helpers'
import { MintAndPresaleComponent } from '@/components/_dapp/collection/MintAndPresaleComponent'
import { MintDetails } from '@/components/_dapp/collection/MintDetails'
import { useERC721DropContract } from '@/components/_dapp/providers/ERC721DropProvider'
import { useCollectionMetadata } from '@/hooks/useCollectionMetadata'

export function CollectionInner({
  collection,
  username,
}: {
  collection: SubgraphERC721Drop
  username?: string
}) {
  const collectionContext = useERC721DropContract()
  const { metadataDetails } = useCollectionMetadata(
    collectionContext.contractConfig.metadataRenderer
  )

  let description = '...'
  try {
    description = JSON.parse(`"${metadataDetails?.description || '...'}"`)
  } catch (e) {
    description = metadataDetails?.description || '...'
  }

  const { disconnect } = useDisconnect()
  return (
    <div className='flex w-full mt-3 flex-col md:flex-row-reverse gap-3 p-1 sm:p-10 max-w-[1350px] m-auto min-h-[80vh] justify-center items-center'>
      <div className='flex justify-center items-center p-4 w-2/3 max-h-[80vh] md:w-1/2'>
        {/* <Flex flex={{ '@initial': '1', '@1024': '1' }} p='x2' justify='center'> */}
        {metadataDetails?.imageURI ? (
          <img
            className='object-contain p-2 w-full h-full lg:p-12'
            // className={heroImage}
            src={ipfsImage(metadataDetails?.imageURI)}
            alt={collectionContext.name}
          />
        ) : (
          ''
          // <SpinnerOG />
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
