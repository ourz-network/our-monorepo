import { useContext } from 'react';
import { OurFetchContext } from '../context/OurFetchContext';
import { EditionDetails } from 'src/fetcher/FetchResultTypes';
import useSWR from 'swr';

export type useEditionsType = {
  editionLoaded: boolean;
  error?: string;
  data?: EditionDetails[];
};

type OptionsType = {
  refreshInterval?: number;
  initialData?: any;
};

/**
 * Fetches ZNFT-Edition data from the Graph
 *
 * @param editionAddresses addresses of the Edition(s)
 * @param options SWR flags
 * @returns useEditionsType hook results include loading, error, and ZNFT-Edition metadata.
 */
export function useEditions(
  editionAddresses: string[],
  options: OptionsType = {}
): useEditionsType {
  const fetcher = useContext(OurFetchContext);

  const { data, error } = useSWR<EditionDetails[]>(
    editionAddresses,
    async () => fetcher.fetchEditionGraph(editionAddresses),
    options
  );

  return {
    editionLoaded: !!data,
    error: error,
    data: data,
  };
}
