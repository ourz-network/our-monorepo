import { ZDK } from '@zoralabs/zdk/dist/index';
import {
  MarketType as ZDKMarketType,
  Network,
  SortDirection as ZDKSortDirection,
  TokensQueryInput,
  TokensQueryFilter,
  TokenSortInput,
  PaginationInput,
} from '@zoralabs/zdk/dist/queries/queries-sdk';
import DataLoader from 'dataloader';

import { NetworkIDs, NFTObject } from '../..';
import { MarketType, NFTQuery, NFTQueryResult, SortDirection } from '../../types/NFTQuery';
import { MEDIA_SOURCES, NFTIdentifier } from '../../types/NFTInterface';
import { NotFoundError } from '../../fetcher/ErrorUtils';

import { SharedTokenResponse, ZDKDataInterface } from './ZDKDataInterface';
import { resolveSortKey } from './utils/resolveSortKey';
import { dateToISO } from './utils/dateToISO';
import { transformEvents } from './transformUtils/transformEvents';
import { transformMarkets } from './transformUtils/transformMarkets';
import { getChainFromNetwork } from './utils/getChainFromNetwork';

// this enums are params for useNFTQuery()
export type {
  QuerySort,
  MarketType,
  ViewType,
  SortDirection,
  NFTQuery,
} from '../../types/NFTQuery';

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export { transformNFTZDK, transformEvents, transformMarkets };

function transformNFTZDK(tokenResponse: SharedTokenResponse, object?: NFTObject) {
  if (!object) {
    object = { rawData: {} };
  }
  const { token } = tokenResponse;
  object.nft = {
    tokenId: token.tokenId,
    tokenUrlMimeType: token.tokenUrlMimeType || undefined,
    contract: {
      address: token.collectionAddress,
      name: token.tokenContract?.name || undefined,
      symbol: token.tokenContract?.symbol || undefined,
    },
    minted: {
      address: token.mintInfo?.originatorAddress || undefined,
      at: token.mintInfo
        ? {
            timestamp: dateToISO(token.mintInfo.mintContext.blockTimestamp),
            blockNumber: token.mintInfo.mintContext.blockNumber,
            transactionHash: token.mintInfo!.mintContext.transactionHash || undefined,
          }
        : undefined,
    },
    owner: token.owner
      ? {
          address: token.owner,
        }
      : undefined,
    metadataURI: token.tokenUrl || undefined,
    contentURI: token.content?.url || undefined,
  };

  // Response of token query
  if (tokenResponse.__typename === 'TokenWithFullMarketHistory') {
    object.markets = transformMarkets(tokenResponse.markets);
    object.events = transformEvents(tokenResponse.events);
  }

  // Response of tokens (plural) query
  if (tokenResponse.__typename === 'TokenWithMarketsSummary') {
    object.markets = transformMarkets(tokenResponse.marketsSummary);
  }

  object.metadata = {
    name: token.name || undefined,
    description: token.description || undefined,
    contentUri: token.content?.url || undefined,
    imageUri: token.image?.url || undefined,
    attributes: token.attributes?.map((item) => ({
      name: item.traitType || undefined,
      value: item.value || undefined,
      display: item.displayType || undefined,
    })),
    raw: token.metadata,
  };

  let thumbnail;

  if (
    token.image?.mediaEncoding?.__typename === 'ImageEncodingTypes' &&
    token.image.mediaEncoding.thumbnail
  ) {
    thumbnail = {
      uri: token.image.mediaEncoding.thumbnail,
    };
  }

  if (
    token.content?.mediaEncoding?.__typename === 'ImageEncodingTypes' &&
    token.content.mediaEncoding.thumbnail
  ) {
    thumbnail = {
      uri: token.content.mediaEncoding.thumbnail,
    };
  }

  let large;
  if (
    token.image?.mediaEncoding?.__typename === 'ImageEncodingTypes' &&
    token.image.mediaEncoding.large
  ) {
    large = {
      uri: token.image.mediaEncoding.large,
    };
  }
  if (
    token.content?.mediaEncoding?.__typename === 'ImageEncodingTypes' &&
    token.content.mediaEncoding.large
  ) {
    large = {
      uri: token.content.mediaEncoding.large,
    };
  }

  let poster;
  if (
    token.image?.mediaEncoding?.__typename === 'ImageEncodingTypes' &&
    token.image.mediaEncoding.poster
  ) {
    poster = {
      uri: token.image.mediaEncoding.poster,
    };
  }

  if (
    token.content?.mediaEncoding?.__typename === 'ImageEncodingTypes' &&
    token.content.mediaEncoding.poster
  ) {
    poster = {
      uri: token.content.mediaEncoding.poster,
    };
  }

  object.media = {
    source: MEDIA_SOURCES.ZORA,
    mimeType: token.image?.mimeType || undefined,
    thumbnail,
    large,
    poster,
    image: token.image?.url
      ? {
          mime: token.image.mimeType || undefined,
          uri: token.image.url,
        }
      : undefined,
  };

  object.content = {
    source: MEDIA_SOURCES.ZORA,
    mimeType: token.content?.mimeType || undefined,
    original:
      (token.content?.mediaEncoding?.__typename === 'VideoEncodingTypes' ||
        token.content?.mediaEncoding?.__typename === 'AudioEncodingTypes') &&
      token.content.mediaEncoding.original
        ? {
            uri: token.content.mediaEncoding.original,
          }
        : undefined,
    large:
      (token.content?.mediaEncoding?.__typename === 'VideoEncodingTypes' ||
        token.content?.mediaEncoding?.__typename === 'AudioEncodingTypes') &&
      token.content.mediaEncoding.large
        ? {
            uri: token.content.mediaEncoding.large,
          }
        : undefined,
    poster:
      token.content?.mediaEncoding?.__typename === 'VideoEncodingTypes' &&
      token.content.mediaEncoding.poster
        ? {
            uri: token.content.mediaEncoding.poster,
          }
        : undefined,
    thumbnail:
      token.content?.mediaEncoding?.__typename === 'VideoEncodingTypes' &&
      token.content.mediaEncoding.thumbnail
        ? {
            uri: token.content.mediaEncoding.thumbnail,
          }
        : undefined,
  };

  if (!object.rawData) {
    object.rawData = {};
  }
  object.rawData.APIIndexer = token;
  return object;
}

export interface ZDKOptions {
  apiKey?: string;
  endpoint?: string;
}

export class ZDKDataSource implements ZDKDataInterface {
  zdk: ZDK;

  nftDataLoader: DataLoader<NFTIdentifier, SharedTokenResponse>;

  constructor(chainId: NetworkIDs, { apiKey, endpoint }: ZDKOptions) {
    this.nftDataLoader = new DataLoader(this.fetchNFTs);
    this.zdk = new ZDK({
      endpoint,
      apiKey,
      networks: [{ network: Network.Ethereum, chain: getChainFromNetwork(chainId) }],
    });
  }

  canLoadNFT(_: NFTIdentifier) {
    return true;
  }

  transformNFT(token: SharedTokenResponse, object?: NFTObject) {
    return transformNFTZDK(token, object);
  }

  loadNFTs = async (nfts: readonly NFTIdentifier[]) => this.nftDataLoader.loadMany(nfts);

  fetchNFTs = async (mediaIds: readonly NFTIdentifier[]) => {
    const response = await this.zdk.tokens({
      includeFullDetails: true,
      where: {
        tokens: mediaIds.map((mediaId) => ({
          tokenId: mediaId.id,
          address: mediaId.contract,
        })),
      },
    });

    return mediaIds.map(
      (key) =>
        response.tokens.nodes.find(
          (token) =>
            token.token.tokenId === key.id &&
            token.token.collectionAddress.toLowerCase() === key.contract.toLowerCase()
        ) || new NotFoundError('Missing record')
    );
  };

  loadNFT = async ({ contract, id }: NFTIdentifier): Promise<SharedTokenResponse | Error> => {
    const nfts = await this.loadNFTs([
      {
        contract,
        id,
      },
    ]);
    return nfts[0];
  };

  queryNFTs = async (query: NFTQuery) => {
    const marketsQuery: TokensQueryInput = {};
    const marketsFilter: TokensQueryFilter = {};
    let marketsSort: TokenSortInput | undefined;

    marketsQuery.ownerAddresses = query.query.owners;
    marketsQuery.collectionAddresses = query.query.collections;

    if (query.query.activeMarkets) {
      const marketsList: ZDKMarketType[] = [];
      query.query.activeMarkets.forEach((market) => {
        if (market === MarketType.AUCTION) {
          marketsList.push(ZDKMarketType.V2Auction);
        }
        if (market === MarketType.FIXED_PRICE) {
          marketsList.push(ZDKMarketType.V3Ask);
          marketsList.push(ZDKMarketType.V1Ask);
          marketsList.push(ZDKMarketType.V1BidShare);
        }
        if (market === MarketType.ANY_MARKET) {
          marketsList.push(ZDKMarketType.V1Ask);
          marketsList.push(ZDKMarketType.V3Ask);
          marketsList.push(ZDKMarketType.V1BidShare);
          marketsList.push(ZDKMarketType.V2Auction);
          marketsList.push(ZDKMarketType.V1Offer);
        }
      });
      marketsFilter.marketFilters = marketsList.map((marketType) => ({ marketType }));
    }

    if (query.query.minters) {
      throw new Error('Minters filter not supported');
    }

    if (query.sort) {
      if (query.sort.length > 1) {
        throw new Error('Can only sort on one column');
      }
      query.sort.forEach((sortItem) => {
        marketsSort = {
          sortDirection:
            sortItem.direction === SortDirection.DESC
              ? ZDKSortDirection.Desc
              : ZDKSortDirection.Asc,
          sortKey: resolveSortKey(sortItem.field),
        };
      });
    }

    const pagination: PaginationInput = {};
    if (query.pagination) {
      if (query.pagination.limit) {
        pagination.limit = query.pagination.limit;
      }
      if (query.pagination.after) {
        pagination.after = query.pagination.after;
      }
    }

    const results = await this.zdk.tokens({
      where: marketsQuery,
      filter: marketsFilter,
      sort: marketsSort,
      includeFullDetails: true,
      pagination,
      includeSalesHistory: !!query.additional.includeSaleHistory,
    });
    const paginationResult: NFTQueryResult['pageInfo'] = {};
    if (results.tokens.nodes) {
      if (results.tokens.nodes.length) {
        paginationResult.last = results.tokens.pageInfo.endCursor || undefined;
        paginationResult.limit = results.tokens.pageInfo.limit;
      }
      return {
        pageInfo: paginationResult,
        results: results.tokens.nodes.map((nft) => this.transformNFT(nft)),
      };
    }
    return { results: [], pageInfo: paginationResult };
  };
}
