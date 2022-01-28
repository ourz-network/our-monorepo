import { useContext } from 'react';
import { OurFetchContext } from '../context/OurFetchContext';
import { SplitDetails } from 'src/fetcher/FetchResultTypes';
import useSWR from 'swr';

export type useSplitsType = {
  splitLoaded: boolean;
  error?: string;
  data?: SplitDetails[];
};

type OptionsType = {
  refreshInterval?: number;
  initialData?: any;
};

/**
 * Fetches Split details from the Graph
 *
 * @param splitAddresses addresses of the split(s)
 * @param options SWR flags
 * @returns useSplitsType hook results include loading, error, and Split details.
 */
export function useSplits(splitAddresses: string[], options: OptionsType = {}): useSplitsType {
  const fetcher = useContext(OurFetchContext);

  const { data, error } = useSWR<SplitDetails[]>(
    splitAddresses,
    async () => fetcher.fetchSplitGraph(splitAddresses),
    options
  );

  return {
    splitLoaded: !!data,
    error: error,
    data: data,
  };
}
