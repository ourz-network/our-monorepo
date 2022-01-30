import { useContext } from 'react';
import { OurFetchContext } from '../context/OurFetchContext';
import { SplitDetails } from '../fetcher/FetchResultTypes';
import useSWR from 'swr';

export type useSplitType = {
  splitLoaded: boolean;
  error?: string;
  data?: SplitDetails;
};

type OptionsType = {
  refreshInterval?: number;
  initialData?: any;
};

/**
 * Fetches Split details from the Graph
 *
 * @param splitAddress addresses of the split(s)
 * @param options SWR flags
 * @returns useSplitType hook results include loading, error, and Split details.
 */
export function useSplit(splitAddress: string, options: OptionsType = {}): useSplitType {
  const fetcher = useContext(OurFetchContext);

  const { data, error } = useSWR<SplitDetails>(
    splitAddress,
    async () => fetcher.loadSplit(splitAddress),
    options
  );

  return {
    splitLoaded: !!data,
    error: error,
    data: data,
  };
}
