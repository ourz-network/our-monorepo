import { useContext } from 'react';
import useSWR from 'swr';

import { OurFetchContext } from '../context/OurFetchContext';
import { SplitDetailsFragment } from '../graph-queries/ourz-graph-types';

export interface UseSplitType {
  splitLoaded: boolean;
  error?: string;
  data?: SplitDetailsFragment | (SplitDetailsFragment & { totalSupply: number });
}

interface OptionsType {
  refreshInterval?: number;
  initialData?: any;
}

/**
 * Fetches Split details from the Graph
 *
 * @param splitAddress addresses of the split(s)
 * @param options SWR flags
 * @returns UseSplitType hook results include loading, error, and Split details.
 */
export function useSplit(splitAddress: string, options: OptionsType = {}): UseSplitType {
  const { fetcher } = useContext(OurFetchContext);

  const { data, error } = useSWR<SplitDetailsFragment>(
    splitAddress,
    async () => fetcher.loadSplit(splitAddress),
    options
  );

  return {
    splitLoaded: !!data,
    error,
    data: { ...data, ...options.initialData },
  };
}
