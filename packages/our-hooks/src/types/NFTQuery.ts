import { NFTObject } from './NFTInterface';

export enum MarketType {
  FIXED_PRICE,
  ANY_MARKET,
  AUCTION,
  SOLD,
}

export enum SortDirection {
  ASC,
  DESC,
}

export enum SortField {
  ACTIVE,
  AUCTION_PRICE,
  FIXED_PRICE,
  ANY_PRICE,
  TOKEN_ID,
  MINTED,
}

export interface QuerySort {
  direction: SortDirection;
  field: SortField;
}

export enum ViewType {
  SUMMARY,
  FULL,
}

export interface NFTQueryResult {
  pageInfo: {
    limit?: number;
    last?: string;
  };
  results: NFTObject[];
}

export interface NFTQuery {
  query: {
    owners?: string[];
    collections?: string[];
    minters?: string[];
    activeMarkets?: MarketType[];
  };
  view: ViewType;
  sort?: QuerySort[];
  pagination?: {
    limit: number;
    after: string;
  };
  additional?: any;
}
