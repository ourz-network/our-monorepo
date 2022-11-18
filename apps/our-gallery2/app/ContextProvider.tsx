"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import SubdomainProvider from "./SubdomainProvider";
import WagmiProvider from "./WagmiProvider";

interface Props {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const [subdomain, setSubdomain] = useState<string>("");
  const [userConfig, setUserConfig] = useState({});
  const { data, error } = useSWR(`/api/user/${subdomain}`);
  console.log({ data });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { hostname } = window.location;
    setSubdomain(hostname.slice(0, hostname.indexOf(".")));
    setLoading(false);
  }, []);

  console.log(subdomain);

  return (
    <SubdomainProvider subdomain={subdomain ?? ""} userConfig={data}>
      <WagmiProvider>{children}</WagmiProvider>
    </SubdomainProvider>
  );
};

export default ContextProvider;
