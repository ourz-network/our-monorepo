/* eslint-disable react/button-has-type */
import { ConnectButton as RKConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import { shortenAddress } from 'lib/helpers'
import { useDisconnect } from 'wagmi'

import { Zorb } from './Zorb'

export const ConnectWallet = ({
  connectspan = 'Connect wallet',
  ...props
}: {
  connectspan: string
}) => {
  const { disconnect } = useDisconnect()
  return (
    <RKConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, mounted }) => (
        <>
          {(() => {
            if (!mounted) {
              return null
            }
            if (!mounted || !account || !chain) {
              return (
                <button
                  // size='sm'
                  // px='x4'
                  onClick={openConnectModal}
                  suppressHydrationWarning
                  {...props}
                >
                  {connectspan}
                </button>
              )
            }

            if (
              chain.unsupported ||
              String(chain.id) !== process.env.NEXT_PUBLIC_CHAIN_ID
            ) {
              return (
                <button
                  // size='sm'
                  // variant='destructive'
                  // px='x4'
                  onClick={openChainModal}
                  style={{ gap: 4, gridGap: 4 }}
                  {...props}
                >
                  <span
                    // as='span'
                    // variant='paragraph-lg'
                    style={{ lineHeight: 0, top: 1, position: 'relative' }}
                  >
                    &#x26A0;
                  </span>{' '}
                  Wrong network
                </button>
              )
            }

            // <Flex gap='x3'>
            // <PopUp
            //   padding='x0'
            //   placement='bottom-end'
            //   trigger={
            //     <button
            //       size='sm'
            //       // pill
            //       variant='ghost'
            //       type='button'
            //       style={{ gap: 8, minWidth: 0 }}
            //     >
            return (
              <>
                <Zorb size={24} address={account.address} />
                <div
                // as='span' className={hideMobile}>
                >
                  {account.displayName}
                </div>
                {/* </button> */}

                {/* // } */}
                {/* // > */}
                {/* // <Stack gap='x0' style={{ minWidth: 180 }}> */}
                <Link
                  passHref
                  href={`https://etherscan.io/address/${account.address}`}
                >
                  <button
                  // as='a'
                  // size='sm'
                  // variant='ghost'
                  // className={menuItem}
                  >
                    <span>{account.displayName}</span>
                    <p
                    // size='sm'
                    //  color='tertiary'
                    >
                      {shortenAddress(account.address)}
                    </p>
                  </button>
                </Link>
                <br />
                <button
                  // size='sm'
                  // variant='ghost'
                  // className={menuItem}
                  onClick={() => disconnect()}
                >
                  Disconnect
                </button>
              </>
              //     </Stack>
              //   </PopUp>
              // </Flex>
            )
          })()}
        </>
      )}
    </RKConnectButton.Custom>
  )
}
