"use client";

import { Context, createContext, useEffect, useState } from "react";
import { getDefaultProvider } from "ethers";
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
  accent?:
    | "blue"
    | "green"
    | "indigo"
    | "orange"
    | "pink"
    | "purple"
    | "red"
    | "teal"
    | "yellow";
};

export const SubdomainContext: Context<{
  userConfig: UserConfig;
  subdomain: string;
  domainAddress: string;
}> = createContext({
  userConfig: {},
  domainAddress: "",
  subdomain: "",
});

const SubdomainProvider = ({
  subdomain,
  userConfig,
  children,
}: {
  subdomain: string;
  userConfig: UserConfig;
  children: React.ReactNode;
}) => {
  const [domainAddress, setDomainAddress] = useState("");
  const [config, setConfig] = useState<UserConfig>({
    subdomain: subdomain,
    title: subdomain,
    networkId: 1,
    curator: domainAddress,
    // contracts: JSON.parse(process.env.NEXT_PUBLIC_MAINNET_CONTRACTS),
  });

  useEffect(() => {
    async function getAddress() {
      const addr = await getAddressFromENS(subdomain);
      setDomainAddress(() => addr);
    }
    async function getConfig() {
      const data = await fetch(`/api/user/${subdomain}`);
      const config = await data.json();
      console.log(config);
      setConfig(config as UserConfig);
    }

    if (subdomain && subdomain !== "www") {
      getAddress();
      getConfig();
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
          domainAddress: domainAddress,
        }}
      >
        {children}
      </SubdomainContext.Provider>
    </>
  );
};

export default SubdomainProvider;
