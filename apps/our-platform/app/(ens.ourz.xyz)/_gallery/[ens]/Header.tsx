import { Suspense } from 'react'

import NavLink from './NavLink'
import Wallet from './Wallet'
import WalletProvider from './WalletProvider'

import { GalleryConfig } from '@/types'
import { getAddressFromENS } from '@/lib/ethers'

async function getOwnerAddress(subdomain: string) {
  const ensAddress = await getAddressFromENS(subdomain)
  return ensAddress
}

const Header = async ({
  ens,
  galleryConfig,
}: {
  ens: string
  galleryConfig: GalleryConfig
}) => {
  const subdomainOwnerAddress = await getOwnerAddress(ens)

  return (
    <header className='2xl:px-24'>
      <div className='flex justify-start w-1/3 text-left'>
        <NavLink passHref href='/'>
          Auctions
        </NavLink>
      </div>
      <div className='flex justify-center w-1/3 text-center'>
        <NavLink passHref href='/collection'>
          Collection
        </NavLink>
      </div>
      <div className='flex justify-end w-1/3'>
        <Suspense fallback={<span>`LOADING...`</span>}>
          <WalletProvider>
            <Wallet
              ens={ens}
              galleryConfig={galleryConfig}
              subdomainOwnerAddress={subdomainOwnerAddress}
            />
          </WalletProvider>
        </Suspense>
      </div>
    </header>
  )
}

export default Header
