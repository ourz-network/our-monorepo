/* eslint-disable react/jsx-props-no-spreading */

import "../styles/globals.css";
import GlobalProvider from "../app/index";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;
