import { Context, createContext, ReactNode, useEffect, useState } from "react";
import { getAddressFromENS } from "../utils/ethers";

export type UserConfig = {
  subdomain?: string;
  title?: string;
  desc?: string;
  networkId?: 1 | 4 | 137;
  curator?: string;
  contracts?: string[];
  fontFamily?: "serif" | "sans" | "mono";
  mode?: "light" | "dark";
  accent?: "blue" | "green" | "indigo" | "orange" | "pink" | "purple" | "red" | "teal" | "yellow";
};

export const SubdomainContext: Context<{ userConfig: UserConfig; subdomain: string }> =
  createContext({
    userConfig: {},
    subdomain: "",
  });

const SubdomainContextProvider = ({
  subdomain,
  userConfig,
  children,
}: {
  subdomain: string;
  userConfig: UserConfig;
  children: ReactNode;
}) => {
  const [address, setAddress] = useState(undefined);

  const [config, setConfig] = useState<UserConfig>({
    subdomain: subdomain,
    title: subdomain,
    networkId: 1,
    curator: address,
    contracts: JSON.parse(process.env.NEXT_PUBLIC_MAINNET_CONTRACTS),
  });

  useEffect(() => {
    async function getAddress() {
      const addr = await getAddressFromENS(subdomain);
      setAddress(() => addr);
    }

    if (subdomain && subdomain !== "www") {
      getAddress();
    }
  }, [subdomain]);

  useEffect(() => {
    if (userConfig) {
      setConfig(() => userConfig);
    }
  }, [userConfig]);

  return (
    <>
      <SubdomainContext.Provider
        value={{
          userConfig: config,
          subdomain: subdomain,
        }}
      >
        {children}
      </SubdomainContext.Provider>
    </>
  );
};

export default SubdomainContextProvider;
