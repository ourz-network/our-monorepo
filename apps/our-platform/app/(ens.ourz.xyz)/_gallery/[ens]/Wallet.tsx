'use client'

import { useState } from 'react'
import { Button, IconWallet, IconLockClosed, IconCog } from 'degene-sais-quoi'
import {
  useWalletButton,
  useWeb3Wallet,
} from '@zoralabs/simple-wallet-provider'

import Form from './Form'

import { GalleryConfig } from '@/types'

const Wallet = ({
  ens,
  subdomainOwnerAddress,
  galleryConfig,
}: {
  ens: string
  subdomainOwnerAddress: string
  galleryConfig: GalleryConfig
}) => {
  const wallet = useWeb3Wallet()
  const { buttonAction, actionText } = useWalletButton()
  const isOwner = subdomainOwnerAddress === wallet.account
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <div className='flex'>
        <Button
          shape='circle'
          variant='transparent'
          onClick={() => buttonAction()}
        >
          {actionText === 'Connect Wallet' ? (
            <IconWallet />
          ) : (
            <IconLockClosed />
          )}
        </Button>
        {isOwner && (
          <Button
            shape='circle'
            variant='transparent'
            onClick={() => setShowForm(() => true)}
          >
            <IconCog />
          </Button>
        )}
      </div>
      {showForm && (
        <Form
          subdomain={ens}
          address={wallet.account}
          galleryConfig={galleryConfig}
          setShowForm={setShowForm}
        />
      )}
    </>
  )
}

export default Wallet
