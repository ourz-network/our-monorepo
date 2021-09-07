import "../styles/globals.css";
// import "tailwindcss/tailwind.css";

import GlobalProvider from "../app/index";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;
