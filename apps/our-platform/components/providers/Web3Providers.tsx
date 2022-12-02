'use client'

import { SWRConfig } from 'swr'
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from '@rainbow-me/rainbowkit'
import {
  chain,
  configureChains,
  createClient,
  useProvider,
  WagmiConfig,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'

const { chains, provider } = configureChains(
  [chain.mainnet],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID ?? '' }),
    publicProvider(),
  ]
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
}: {
  children: React.ReactNode
}) {
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
