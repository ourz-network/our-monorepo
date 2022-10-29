import "../styles/reset.css";
import "../styles/Globals.css";

import type { AppProps } from "next/app";
import { css } from "@emotion/css";
import { MediaConfiguration as OurConfiguration } from "@ourz/our-components";
import { Web3ConfigProvider } from "@zoralabs/simple-wallet-provider";
import { mediaConfigurationStyles } from "../styles/theme";
import GlobalStyles from "../styles/GlobalStyles";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import SubdomainContextProvider from "../context/SubdomainContext";
import { useState, useEffect } from "react";
import { RPC_URL } from "../utils/env-vars";
import { Box, Spinner, ThemeProvider } from "degene-sais-quoi";
import "degene-sais-quoi/styles";
import useSWR from "swr";

export default function CreateAuctionHouseApp({ Component, pageProps }: AppProps) {
  const [subdomain, setSubdomain] = useState<null | string>();
  const { data, error } = useSWR(subdomain ? `/api/user/${subdomain}` : null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hostname = window.location.hostname;
    setSubdomain(hostname.slice(0, hostname.indexOf(".")));
    setLoading(false);
  }, []);

  return (
    <>
      <SubdomainContextProvider subdomain={subdomain} userConfig={{ ...data }}>
        <GlobalStyles />
        <Web3ConfigProvider
          networkId={data?.networkId ? Number(data.networkId) : 1}
          rpcUrl={(RPC_URL as string) || undefined}
          theme={{
            walletOption: css`
              color: #000 !important;
              position: relative;
              width: 100%;
              padding: 20px;
              margin-bottom: 20px;
              cursor: pointer;
              &:last-child {
                margin-bottom: 0;
              }
            `,
          }}
        >
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
            <ThemeProvider
              defaultMode={data?.mode ?? "light"}
              defaultAccent={data?.accent ?? "blue"}
            >
              <OurConfiguration
                networkId={data?.networkId?.toString() ?? "1"}
                style={mediaConfigurationStyles}
                mode={data?.mode ?? "light"}
                accent={data?.accent ?? "blue"}
              >
                <Box backgroundColor="backgroundSecondary">
                  <Header />
                  <main>
                    <Component {...pageProps} />
                  </main>
                  <Footer />
                </Box>
              </OurConfiguration>
            </ThemeProvider>
          )}
        </Web3ConfigProvider>
      </SubdomainContextProvider>
    </>
  );
}
