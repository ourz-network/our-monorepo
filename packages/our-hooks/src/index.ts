/* eslint-disable import/no-cycle */
import { useUser, useUserType } from './hooks/useUser';
import { useSplit, useSplitType } from './hooks/useSplit';
import { OurFetchConfiguration } from './context/OurFetchContext';
import { OurFetchAgent } from './fetcher/OurFetchAgent';
import { useEdition, useEditionType } from './hooks/useEdition';
import { Networks, NetworkIDs } from './constants/networks';
import { useNFT, useNFTType } from './hooks/useNFT';
import { useNFTContent, useNFTContentType } from './hooks/useNFTContent';
import { useENSAddress } from './hooks/useENSAddress';
import { useNFTMetadata, useNFTMetadataType } from './hooks/useNFTMetadata';
import { RequestError } from './fetcher/RequestError';
import { CurrencyValue, NFTObject } from './types/NFTInterface';
import * as Strategies from './strategies';
import * as Backends from './backends';
import { useNFTQuery } from './hooks/useNFTQuery';

export {
  // Main useNFT hool
  useNFT,
  // Get content of a file. Used by rendering libraries
  useNFTContent,
  // Get metadata for content. Only useful for strategies that don't handle metadata
  useNFTMetadata,

  // Media hook types
  useNFTContentType,
  // Shared standard NFT query hook
  useNFTQuery,
  // Used only for backwards compat with old strategies not providing metadata
  useNFTMetadataType,
  // Used as a return type for useNFTMetadata*
  useNFTType,
  // New types
  // Shared NFT object types
  NFTObject,
  // Fetching strategies
  Strategies,
  // Backends for fetching data (use for debugging or server transforms)
  Backends,
  CurrencyValue,

  // Hooks
  useSplit,
  useUser,
  useEdition,
  // Wrapped by useNFT, can use the underlying hooks here
  useENSAddress,
  // Hook types
  useSplitType,
  useUserType,
  useEditionType,
  // Configuration
  OurFetchConfiguration,
  // Fetch Agent underlying helper
  OurFetchAgent,
  // Constants
  Networks,
  // Constant Types
  NetworkIDs,
  // Error type
  RequestError,
};
