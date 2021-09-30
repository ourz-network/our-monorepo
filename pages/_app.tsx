/* eslint-disable react/jsx-props-no-spreading */

import "../styles/globals.css";
import { ReactNode } from "react";
import GlobalProvider from "../app/index";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.Component;
  pageProps: React.PropsWithChildren<ReactNode>;
}): JSX.Element {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;
