import { UserDetailsFragment } from './../graph-queries/ourz-graph-types';
import { useContext } from 'react';
import { OurFetchContext } from '../context/OurFetchContext';
import useSWR from 'swr';

export type useUserType = {
  userLoaded: boolean;
  error?: string;
  data?: UserDetailsFragment;
};

type OptionsType = {
  refreshInterval?: number;
  initialData?: any;
};

/**
 * Fetches OURZ User data from the Graph
 *
 * @param userAddress addresses of the user(s)
 * @param options SWR flags
 * @returns useUserType hook results include loading, error, and User split information.
 */
export function useUser(userAddress: string, options: OptionsType = {}): useUserType {
  const fetcher = useContext(OurFetchContext);

  const { data, error } = useSWR<UserDetailsFragment>(
    userAddress,
    async () => fetcher.loadUser(userAddress),
    options
  );

  return {
    userLoaded: !!data,
    error: error,
    data: { ...data, ...options.initialData },
  };
}
