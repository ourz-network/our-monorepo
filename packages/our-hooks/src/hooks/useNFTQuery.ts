import { useContext } from 'react';
import useSWR, { SWRConfiguration } from 'swr';

import { OurFetchContext } from '../context/OurFetchContext';
import { NFTQuery, NFTQueryResult } from '../types/NFTQuery';

export interface useNFTQueryType {
  data?: NFTQueryResult;
  error: Error;
}

/**
 * Fetches on-chain NFT data and pricing for a given general NFT Query
 *
 * @param query Query parameter to get list of NFTs for
 * @param options Options for SWR flags
 * @returns useNFTQueryType results including data and error for resulting NFTs
 */
export function useNFTQuery(
  query: NFTQuery,
  options: SWRConfiguration<NFTQueryResult>
): useNFTQueryType {
  const { strategy } = useContext(OurFetchContext);

  // Run query
  const { data, error } = useSWR<NFTQueryResult>(
    query ? ['queryNFTs', JSON.stringify(query)] : null,
    (_, queryString) => strategy.queryNFTs(JSON.parse(queryString) as NFTQuery),
    options
  );

  return {
    data,
    error,
  };
}
