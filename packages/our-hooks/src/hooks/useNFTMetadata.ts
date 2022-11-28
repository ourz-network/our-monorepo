import { useContext } from 'react';
import useSWR, { SWRConfiguration } from 'swr';

import { OurFetchContext } from '../context/OurFetchContext';

export interface useNFTMetadataType {
  loading: boolean;
  error?: Error;
  metadata: any;
}

/**
 * Fetches NFT Metadata from IPFS.
 * This hook is cached, it can be called
 *  multiple times with no issue on one page.
 *
 * @param uri URI of metadata to fetch
 * @returns @type useNFTMetadataType
 */
export function useNFTMetadata(uri?: string, options?: SWRConfiguration): useNFTMetadataType {
  const { fetcher } = useContext(OurFetchContext);
  const { error, data } = useSWR(
    uri ? ['loadMetadata', uri] : null,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (_, uri) => fetcher.fetchIPFSMetadata(uri),
    options
  );

  return {
    loading: !error && !data,
    error,
    metadata: data,
  };
}
