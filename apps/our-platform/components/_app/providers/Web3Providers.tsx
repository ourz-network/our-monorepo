'use client'

import { SWRConfig } from 'swr'
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from '@rainbow-me/rainbowkit'
import {
  defaultChains,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'

const { chains, provider } = configureChains(
  [
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    defaultChains.find(
      (chain) => chain.id.toString() === process.env.NEXT_PUBLIC_CHAIN_ID
    )!,
  ],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID })]
)

const { connectors } = getDefaultWallets({
  appName: 'Zora Create Minting Page',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export default function Web3Providers({
  children, // will be a page or nested layout
  params,
}: {
  children: React.ReactNode
  params?: { chainId?: string }
}) {
  console.log({ params })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        modalSize='compact'
        theme={lightTheme({
          accentColor: 'orange',
          borderRadius: 'small',
        })}
      >
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          {children}
        </SWRConfig>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
