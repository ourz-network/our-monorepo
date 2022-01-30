import { useContext } from 'react';
import { OurFetchContext } from '../context/OurFetchContext';
import { EditionDetails } from '../fetcher/FetchResultTypes';
import useSWR from 'swr';

export type useEditionType = {
  editionLoaded: boolean;
  error?: string;
  data?: EditionDetails;
};

type OptionsType = {
  refreshInterval?: number;
  initialData?: any;
};

/**
 * Fetches ZNFT-Edition data from the Graph
 *
 * @param editionAddress addresses of the Edition(s)
 * @param options SWR flags
 * @returns useEditionType hook results include loading, error, and ZNFT-Edition metadata.
 */
export function useEdition(editionAddress: string, options: OptionsType = {}): useEditionType {
  const fetcher = useContext(OurFetchContext);

  const { data, error } = useSWR<EditionDetails>(
    editionAddress,
    async () => fetcher.loadEdition(editionAddress),
    options
  );

  return {
    editionLoaded: !!data,
    error: error,
    data: data,
  };
}
