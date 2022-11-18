import "../styles/reset.css";
import "../styles/Globals.scss";

import type { AppProps } from "next/app";
import { MediaConfiguration as OurConfiguration } from "@ourz/our-components";
import { Web3ConfigProvider } from "@zoralabs/simple-wallet-provider";

// import { Source_Serif_4 } from "@next/font/google";
import { useState, useEffect } from "react";
import { Box, Spinner, ThemeProvider } from "degene-sais-quoi";
import "degene-sais-quoi/styles";
import GlobalStyles from "../styles/GlobalStyles";
import useSWR from "swr";

import { createClient, configureChains, chain, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { RPC_URL } from "../utils/env-vars";
import SubdomainContextProvider from "../context/SubdomainContext";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { mediaConfigurationStyles } from "../styles/theme";

// const sourceSerif4 = Source_Serif_4();

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

export default function CreateAuctionHouseApp({ Component, pageProps }: AppProps) {
  const [subdomain, setSubdomain] = useState<null | string>();
  const { data, error } = useSWR(subdomain ? `/api/user/${subdomain}` : null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("hi");
    const { hostname } = window.location;
    setSubdomain(hostname.slice(0, hostname.indexOf(".")));
    setLoading(false);
  }, []);

  return (
    <SubdomainContextProvider subdomain={subdomain} userConfig={{ ...data }}>
      {/* <GlobalStyles /> */}
      {/* <WagmiConfig client={wagmiClient}>
        {loading && (
          <Box
            minHeight="viewHeight"
            minWidth="viewWidth"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner />
          </Box>
        )}
        {(data || subdomain === "www" || error) && (
          */}{" "}
      <ThemeProvider defaultMode={data?.mode ?? "light"} defaultAccent={data?.accent ?? "blue"}>
        {" "}
        {/*
            <OurConfiguration
              networkId={data?.networkId?.toString() ?? "1"}
              style={mediaConfigurationStyles}
              mode={data?.mode ?? "light"}
              accent={data?.accent ?? "blue"}
            >
              <Box backgroundColor="backgroundSecondary">
                <Header />
                <main>
                  */}
        <Component {...pageProps} />
        {/* </main>
                <Footer />
              </Box>
            </OurConfiguration>
          */}{" "}
      </ThemeProvider>{" "}
      {/*
        )}
      </WagmiConfig> */}
    </SubdomainContextProvider>
  );
}
