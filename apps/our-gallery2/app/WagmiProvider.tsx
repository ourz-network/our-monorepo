"use client";

import { createClient, configureChains, chain, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { ReactNode } from "react";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet],
  [publicProvider()]
);

const wagmiClient = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Other (Injected)",
        shimDisconnect: true,
      },
    }),
  ],
});

const WagmiProvider = ({ children }: { children: ReactNode }) => (
  <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
);

export default WagmiProvider;
