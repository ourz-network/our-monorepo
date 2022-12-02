import { useState } from 'react'

import { MintComponent } from '@/components/collection/MintComponent'
import { PresaleComponent } from '@/components/collection/PresaleComponent'
import { useSaleStatus } from '@/hooks/useSaleStatus'
import { ERC721DropProviderState } from '@/components/providers/ERC721DropProvider'

export function MintAndPresaleComponent({
  collection,
  className = '',
  showPresaleValue = true,
}: {
  className?: string // BoxProps['className']
  showPresaleValue?: boolean
  collection: ERC721DropProviderState
}) {
  const { presaleExists, merkleRootExists, saleNotStarted, saleIsFinished } =
    useSaleStatus({
      collection,
    })

  const [showPresale, setShowPresale] = useState(
    saleNotStarted && !saleIsFinished && showPresaleValue
  )

  return presaleExists && merkleRootExists ? (
    <>
      {/* <Box className={className}> */}
      {/* <Flex flexChildren gap='x3' mb='x2'> */}
      {/* <Button
          pill
          variant={showPresale ? 'primary' : 'ghost'}
          color={showPresale ? 'primary' : 'tertiary'}
          onClick={() => setShowPresale(true)}
          > */}
      Presale
      {/* </Button> */}
      {/* <Button
          pill
          variant={!showPresale ? 'primary' : 'ghost'}
          color={!showPresale ? 'primary' : 'tertiary'}
          onClick={() => setShowPresale(false)}
          > */}
      Public sale
      {/* </Button> */}
      {/* </Flex> */}
      {/* <Box display={showPresale ? 'block' : 'none'}> */}
      <PresaleComponent collection={collection} />
      {/* </Box> */}
      {/* <Box display={!showPresale ? 'block' : 'none'}> */}
      <MintComponent collection={collection} />
      {/* </Box> */}
      {/* </Box> */}
    </>
  ) : (
    <MintComponent
      // className={className}
      collection={collection}
    />
  )
}
