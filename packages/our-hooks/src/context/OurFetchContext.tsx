import React, { useContext, useMemo } from 'react';
import { Networks, NetworkIDs } from '../constants/networks';
import { OurFetchAgent } from '../fetcher/OurFetchAgent';

export type FetchContext = InstanceType<typeof OurFetchAgent>;

export const defaultFetchAgent = new OurFetchAgent(Networks.MAINNET);

export const OurFetchContext = React.createContext(defaultFetchAgent);

type OurFetchConfigurationProps = {
  networkId: NetworkIDs;
  children: React.ReactNode;
};

export const OurFetchConfiguration = ({
  networkId,
  children,
}: OurFetchConfigurationProps) => {
  const lastFetchContext = useContext(OurFetchContext);
  const fetchAgent = useMemo(() => {
    if (lastFetchContext.networkId === networkId) {
      return lastFetchContext;
    }
    return new OurFetchAgent(networkId);
  }, [networkId]);
  return (
    <OurFetchContext.Provider value={fetchAgent}>{children}</OurFetchContext.Provider>
  );
};
