import {
  useContext,
  // useEffect, useState
} from 'react';
import { OurFetchContext } from '../context/OurFetchContext';
import { EditionDetailsFragment } from 'src/graph-queries/ourz-graph-types';
import useSWR from 'swr';
// import { Edition } from '@ourz/odk';

export type useEditionType = {
  // saleInfoLoaded: boolean;
  editionLoaded: boolean;
  error?: string;
  data?: EditionDetailsFragment;
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

  const { data, error } = useSWR<EditionDetailsFragment>(
    editionAddress,
    async () => fetcher.loadEdition(editionAddress),
    options
  );
  // const [saleInfo, setSaleInfo] = useState({});

  // useEffect(() => {
  //   async function getSaleInfo() {
  //     const edi = new Edition(ethers);
  //   }

  //   if (editionAddress) {
  //     getSaleInfo();
  //   }
  // }, [editionAddress]);

  return {
    editionLoaded: !!data,
    error: error,
    data: { ...data, ...options?.initialData },
  };
}
