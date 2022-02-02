import { createContext, useEffect, useState } from "react";
import { getAddressFromENS } from "../utils/ethers";

export const SubdomainContext = createContext({
  userConfig: {},
  subdomain: "",
});

const SubdomainContextProvider: React.FunctionComponent = (props) => {
  const [address, setAddress] = useState(undefined);

  const [config, setConfig] = useState({
    subdomain: props?.subdomain,
    title: props?.subdomain,
    networkId: 1,
    curatorAddress: address,
    contractAddresses: ["0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7"],
  });

  useEffect(() => {
    async function getAddress() {
      const addr = await getAddressFromENS(props.subdomain);
      setAddress(() => addr);
    }

    if (props?.subdomain) {
      getAddress();
    }
  }, [props?.subdomain]);

  useEffect(() => {
    if (props?.userConfig) {
      setConfig(() => props?.userConfig);
    }
  }, [props?.userConfig]);

  return (
    <>
      <SubdomainContext.Provider
        value={{
          userConfig: config,
          subdomain: props?.subdomain,
        }}
      >
        {props.children}
      </SubdomainContext.Provider>
    </>
  );
};

export default SubdomainContextProvider;
