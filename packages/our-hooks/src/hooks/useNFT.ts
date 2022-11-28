/* eslint-disable @typescript-eslint/no-shadow */
import { useContext } from 'react';
import merge from 'deepmerge';
import useSWR, { SWRConfiguration } from 'swr';

import { OurFetchContext } from '../context/OurFetchContext';
import { NFTObject } from '../types/NFTInterface';

export interface useNFTType {
  currencyLoaded: boolean;
  error?: any;
  marketError?: any;
  data?: NFTObject;
}

/**
 * Fetches on-chain NFT data and pricing for the given nft contract address and id
 *
 * @param contractAddress address of the contract, if null and tokenID is passed in, a NFT is assumed
 * @param tokenId id of NFT to fetch blockchain information for
 * @param options SWR flags and an option to load currency info
 * @returns useNFTType hook results include loading, error, and chainNFT data.
 */
export function useNFT(
  contractAddress?: string,
  tokenId?: string,
  options: SWRConfiguration = {},
  marketOptions: SWRConfiguration = {}
): useNFTType {
  const dataContext = useContext(OurFetchContext);

  const { strategy } = dataContext;

  // Fetch media data
  const { data: nftData, error: nftError } = useSWR(
    contractAddress && tokenId ? ['fetchNFTData', contractAddress, tokenId] : null,
    (_, address: string, tokenId: string) => strategy.fetchNFT(address, tokenId),
    options
  );

  // Fetch market data (if needed)
  const { data: nftMarketData, error: nftMarketError } = useSWR(
    contractAddress &&
      tokenId &&
      strategy.hasSecondaryData({ contract: contractAddress, id: tokenId })
      ? ['fetchSecondaryData', contractAddress, tokenId]
      : null,
    (_, address: string, tokenId: string) => strategy.fetchSecondaryData(address, tokenId, nftData),
    marketOptions
  );

  return {
    data: nftData || nftMarketData ? merge(nftData || {}, nftMarketData || {}) : undefined,
    currencyLoaded: false,
    error: nftError,
    marketError: nftMarketError,
  };
}
