import { useContext } from 'react';
import { OurFetchContext } from '../context/OurFetchContext';
import { UserDetails } from 'src/fetcher/FetchResultTypes';
import useSWR from 'swr';

export type useUsersType = {
  userLoaded: boolean;
  error?: string;
  data?: UserDetails[];
};

type OptionsType = {
  refreshInterval?: number;
  initialData?: any;
};

/**
 * Fetches OURZ User data from the Graph
 *
 * @param userAddresses addresses of the user(s)
 * @param options SWR flags
 * @returns useUsersType hook results include loading, error, and User split information.
 */
export function useUsers(userAddresses: string[], options: OptionsType = {}): useUsersType {
  const fetcher = useContext(OurFetchContext);

  const { data, error } = useSWR<UserDetails[]>(
    userAddresses,
    async () => fetcher.fetchUserGraph(userAddresses),
    options
  );

  return {
    userLoaded: !!data,
    error: error,
    data: data,
  };
}
