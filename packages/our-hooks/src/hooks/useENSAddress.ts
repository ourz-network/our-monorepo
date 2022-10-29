import { useContext } from 'react';
import useSWR, { SWRConfiguration } from 'swr';

import { OurFetchContext } from '../context/OurFetchContext';

/**
 * useENSAddress - Load ens address for pretty display of user addresses
 *
 * @param address string address to fetch ens domain
 * @returns DomainResolvedPartFragment
 */
export function useENSAddress(address?: string, options?: SWRConfiguration<any>) {
  const fetcher = useContext(OurFetchContext);
  return useSWR<string>(
    address ? ['loadENS', address.toLowerCase()] : null,
    async (_, address: string) => fetcher.loadEnsName(address),
    options
  );
}
