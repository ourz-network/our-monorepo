import React, { useMemo } from 'react';

import { Networks, NetworkIDs } from '../constants/networks';
import { OurFetchAgent } from '../fetcher/OurFetchAgent';
import { NFTStrategy } from '../strategies/NFTStrategy';
import { ZDKFetchStrategy } from '../strategies/ZDKFetchStrategy';

export type FetchContext = InstanceType<typeof OurFetchAgent>;

// export const defaultFetchAgent = new OurFetchAgent(Networks.MAINNET);
const defaultNetwork = Networks.MAINNET;
export const defaultFetchAgent: { strategy: any; fetcher: any } = {
  strategy: new ZDKFetchStrategy(defaultNetwork),
  fetcher: new OurFetchAgent(defaultNetwork),
};
export const OurFetchContext = React.createContext<{
  strategy: NFTStrategy | ZDKFetchStrategy;
  fetcher: OurFetchAgent;
}>(defaultFetchAgent);

interface OurFetchConfigurationProps {
  strategy?: NFTStrategy;
  networkId: NetworkIDs;
  children: React.ReactNode;
}

export const OurFetchConfiguration = ({
  strategy: userStrategy,
  children,
  networkId,
}: OurFetchConfigurationProps) => {
  const strategy = useMemo(() => {
    if (userStrategy) {
      return userStrategy;
    }
    return new ZDKFetchStrategy(networkId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStrategy]);

  const fetcher = useMemo(() => new OurFetchAgent(networkId), [networkId]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <OurFetchContext.Provider value={{ strategy, fetcher }}>{children}</OurFetchContext.Provider>
  );
};
