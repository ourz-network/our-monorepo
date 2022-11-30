/* eslint-disable react/jsx-props-no-spreading */

import "../styles/globals.css";
import { AppProps } from "next/dist/shared/lib/router/router";
import GlobalProvider from "@/app/index";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;
