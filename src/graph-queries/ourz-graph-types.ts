export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Erc20Transfer = {
  __typename?: 'ERC20Transfer';
  /** The amount of ERC20s Transferred */
  amount: Scalars['BigInt'];
  /** The address of the ERC20 Contract */
  contract: Scalars['String'];
  /** <txHash>-<proxyAddress> */
  id: Scalars['ID'];
  /** The address of the Split transferring the ERC20s */
  split: Split;
  /** The transaction hash of the transfer */
  transactionHash: Scalars['String'];
};

export type Erc20Transfer_Filter = {
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  contract?: InputMaybe<Scalars['String']>;
  contract_contains?: InputMaybe<Scalars['String']>;
  contract_ends_with?: InputMaybe<Scalars['String']>;
  contract_gt?: InputMaybe<Scalars['String']>;
  contract_gte?: InputMaybe<Scalars['String']>;
  contract_in?: InputMaybe<Array<Scalars['String']>>;
  contract_lt?: InputMaybe<Scalars['String']>;
  contract_lte?: InputMaybe<Scalars['String']>;
  contract_not?: InputMaybe<Scalars['String']>;
  contract_not_contains?: InputMaybe<Scalars['String']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']>;
  contract_not_in?: InputMaybe<Array<Scalars['String']>>;
  contract_not_starts_with?: InputMaybe<Scalars['String']>;
  contract_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  split?: InputMaybe<Scalars['String']>;
  split_contains?: InputMaybe<Scalars['String']>;
  split_ends_with?: InputMaybe<Scalars['String']>;
  split_gt?: InputMaybe<Scalars['String']>;
  split_gte?: InputMaybe<Scalars['String']>;
  split_in?: InputMaybe<Array<Scalars['String']>>;
  split_lt?: InputMaybe<Scalars['String']>;
  split_lte?: InputMaybe<Scalars['String']>;
  split_not?: InputMaybe<Scalars['String']>;
  split_not_contains?: InputMaybe<Scalars['String']>;
  split_not_ends_with?: InputMaybe<Scalars['String']>;
  split_not_in?: InputMaybe<Array<Scalars['String']>>;
  split_not_starts_with?: InputMaybe<Scalars['String']>;
  split_starts_with?: InputMaybe<Scalars['String']>;
  transactionHash?: InputMaybe<Scalars['String']>;
  transactionHash_contains?: InputMaybe<Scalars['String']>;
  transactionHash_ends_with?: InputMaybe<Scalars['String']>;
  transactionHash_gt?: InputMaybe<Scalars['String']>;
  transactionHash_gte?: InputMaybe<Scalars['String']>;
  transactionHash_in?: InputMaybe<Array<Scalars['String']>>;
  transactionHash_lt?: InputMaybe<Scalars['String']>;
  transactionHash_lte?: InputMaybe<Scalars['String']>;
  transactionHash_not?: InputMaybe<Scalars['String']>;
  transactionHash_not_contains?: InputMaybe<Scalars['String']>;
  transactionHash_not_ends_with?: InputMaybe<Scalars['String']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  transactionHash_not_starts_with?: InputMaybe<Scalars['String']>;
  transactionHash_starts_with?: InputMaybe<Scalars['String']>;
};

export enum Erc20Transfer_OrderBy {
  Amount = 'amount',
  Contract = 'contract',
  Id = 'id',
  Split = 'split',
  TransactionHash = 'transactionHash'
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  erc20Transfer?: Maybe<Erc20Transfer>;
  erc20Transfers: Array<Erc20Transfer>;
  recipient?: Maybe<Recipient>;
  recipients: Array<Recipient>;
  split?: Maybe<Split>;
  splitEdition?: Maybe<SplitEdition>;
  splitEditions: Array<SplitEdition>;
  splitZNFT?: Maybe<SplitZnft>;
  splitZNFTs: Array<SplitZnft>;
  splits: Array<Split>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryErc20TransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryErc20TransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Erc20Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc20Transfer_Filter>;
};


export type QueryRecipientArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRecipientsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Recipient_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Recipient_Filter>;
};


export type QuerySplitArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySplitEditionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySplitEditionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SplitEdition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SplitEdition_Filter>;
};


export type QuerySplitZnftArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySplitZnfTsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SplitZnft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SplitZnft_Filter>;
};


export type QuerySplitsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Split_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Split_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type Recipient = {
  __typename?: 'Recipient';
  /** Shares * 1,000,000 as a string */
  allocation: Scalars['String'];
  /** ETH available to claim for the specific user */
  claimableETH: Scalars['BigInt'];
  /** Total amount of ETH claimed from this Split */
  claimedETH: Scalars['BigInt'];
  /** `${proxyAddress}-${userAddress}` */
  id: Scalars['ID'];
  /** Name/Alias of User */
  name: Scalars['String'];
  /** Role in Split */
  role: Scalars['String'];
  /** Number between 0-100 as a string */
  shares: Scalars['String'];
  /** Split Entity */
  split: Split;
  /** User Entity */
  user: User;
};

export type Recipient_Filter = {
  allocation?: InputMaybe<Scalars['String']>;
  allocation_contains?: InputMaybe<Scalars['String']>;
  allocation_ends_with?: InputMaybe<Scalars['String']>;
  allocation_gt?: InputMaybe<Scalars['String']>;
  allocation_gte?: InputMaybe<Scalars['String']>;
  allocation_in?: InputMaybe<Array<Scalars['String']>>;
  allocation_lt?: InputMaybe<Scalars['String']>;
  allocation_lte?: InputMaybe<Scalars['String']>;
  allocation_not?: InputMaybe<Scalars['String']>;
  allocation_not_contains?: InputMaybe<Scalars['String']>;
  allocation_not_ends_with?: InputMaybe<Scalars['String']>;
  allocation_not_in?: InputMaybe<Array<Scalars['String']>>;
  allocation_not_starts_with?: InputMaybe<Scalars['String']>;
  allocation_starts_with?: InputMaybe<Scalars['String']>;
  claimableETH?: InputMaybe<Scalars['BigInt']>;
  claimableETH_gt?: InputMaybe<Scalars['BigInt']>;
  claimableETH_gte?: InputMaybe<Scalars['BigInt']>;
  claimableETH_in?: InputMaybe<Array<Scalars['BigInt']>>;
  claimableETH_lt?: InputMaybe<Scalars['BigInt']>;
  claimableETH_lte?: InputMaybe<Scalars['BigInt']>;
  claimableETH_not?: InputMaybe<Scalars['BigInt']>;
  claimableETH_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  claimedETH?: InputMaybe<Scalars['BigInt']>;
  claimedETH_gt?: InputMaybe<Scalars['BigInt']>;
  claimedETH_gte?: InputMaybe<Scalars['BigInt']>;
  claimedETH_in?: InputMaybe<Array<Scalars['BigInt']>>;
  claimedETH_lt?: InputMaybe<Scalars['BigInt']>;
  claimedETH_lte?: InputMaybe<Scalars['BigInt']>;
  claimedETH_not?: InputMaybe<Scalars['BigInt']>;
  claimedETH_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  role_contains?: InputMaybe<Scalars['String']>;
  role_ends_with?: InputMaybe<Scalars['String']>;
  role_gt?: InputMaybe<Scalars['String']>;
  role_gte?: InputMaybe<Scalars['String']>;
  role_in?: InputMaybe<Array<Scalars['String']>>;
  role_lt?: InputMaybe<Scalars['String']>;
  role_lte?: InputMaybe<Scalars['String']>;
  role_not?: InputMaybe<Scalars['String']>;
  role_not_contains?: InputMaybe<Scalars['String']>;
  role_not_ends_with?: InputMaybe<Scalars['String']>;
  role_not_in?: InputMaybe<Array<Scalars['String']>>;
  role_not_starts_with?: InputMaybe<Scalars['String']>;
  role_starts_with?: InputMaybe<Scalars['String']>;
  shares?: InputMaybe<Scalars['String']>;
  shares_contains?: InputMaybe<Scalars['String']>;
  shares_ends_with?: InputMaybe<Scalars['String']>;
  shares_gt?: InputMaybe<Scalars['String']>;
  shares_gte?: InputMaybe<Scalars['String']>;
  shares_in?: InputMaybe<Array<Scalars['String']>>;
  shares_lt?: InputMaybe<Scalars['String']>;
  shares_lte?: InputMaybe<Scalars['String']>;
  shares_not?: InputMaybe<Scalars['String']>;
  shares_not_contains?: InputMaybe<Scalars['String']>;
  shares_not_ends_with?: InputMaybe<Scalars['String']>;
  shares_not_in?: InputMaybe<Array<Scalars['String']>>;
  shares_not_starts_with?: InputMaybe<Scalars['String']>;
  shares_starts_with?: InputMaybe<Scalars['String']>;
  split?: InputMaybe<Scalars['String']>;
  split_contains?: InputMaybe<Scalars['String']>;
  split_ends_with?: InputMaybe<Scalars['String']>;
  split_gt?: InputMaybe<Scalars['String']>;
  split_gte?: InputMaybe<Scalars['String']>;
  split_in?: InputMaybe<Array<Scalars['String']>>;
  split_lt?: InputMaybe<Scalars['String']>;
  split_lte?: InputMaybe<Scalars['String']>;
  split_not?: InputMaybe<Scalars['String']>;
  split_not_contains?: InputMaybe<Scalars['String']>;
  split_not_ends_with?: InputMaybe<Scalars['String']>;
  split_not_in?: InputMaybe<Array<Scalars['String']>>;
  split_not_starts_with?: InputMaybe<Scalars['String']>;
  split_starts_with?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
};

export enum Recipient_OrderBy {
  Allocation = 'allocation',
  ClaimableEth = 'claimableETH',
  ClaimedEth = 'claimedETH',
  Id = 'id',
  Name = 'name',
  Role = 'role',
  Shares = 'shares',
  Split = 'split',
  User = 'user'
}

export type Split = {
  __typename?: 'Split';
  /** The ERC20 Transfers that the Proxy has successfully distributed */
  ERC20Transfers: Array<Erc20Transfer>;
  /** The amount of ETH/WETH currently available to claim by Split Recipients */
  ETH: Scalars['BigInt'];
  /** The number of the block the Ask created in */
  createdAtBlockNumber: Scalars['BigInt'];
  /** The timestamp of the block the Ask was created in */
  createdAtTimestamp: Scalars['BigInt'];
  /** The ERC721(s) the Proxy created */
  creations: Array<SplitZnft>;
  /** The original owner of the Proxy */
  creator: User;
  /** The Zora NFT-Edition(s) the Proxy created */
  editions: Array<SplitEdition>;
  /** The address of the Proxy */
  id: Scalars['ID'];
  /** Recipients should increment window before claiming */
  needsIncremented: Scalars['Boolean'];
  /** A nickname for the Proxy */
  nickname: Scalars['String'];
  /** The current owner(s) of the Proxy */
  owners: Array<User>;
  /** Array of the Split's Recipients */
  recipients: Array<Recipient>;
  /** The transaction hash the Proxy was created at */
  transactionHash: Scalars['String'];
};


export type SplitErc20TransfersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Erc20Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Erc20Transfer_Filter>;
};


export type SplitCreationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SplitZnft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SplitZnft_Filter>;
};


export type SplitEditionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SplitEdition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SplitEdition_Filter>;
};


export type SplitOwnersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<User_Filter>;
};


export type SplitRecipientsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Recipient_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Recipient_Filter>;
};

export type SplitEdition = {
  __typename?: 'SplitEdition';
  /** Metadata: Animation url (optional) of the Edition entry */
  animationUrl: Scalars['String'];
  /** The creator of the Edition Contract */
  creator: Split;
  /** Metadata: Description of the Edition entry */
  description: Scalars['String'];
  /** Total size of the Edition (number of possible editions) */
  editionSize: Scalars['BigInt'];
  /** The address of the Zora NFT-Editions contract */
  id: Scalars['ID'];
  /** Metadata: Image url (semi-required) of the Edition entry */
  imageUrl: Scalars['String'];
  /** The title of the Edition contract */
  name: Scalars['String'];
  /** BPS amount of royalty */
  royaltyBPS: Scalars['BigInt'];
  /** Symbol of the Edition contract */
  symbol: Scalars['String'];
};

export type SplitEdition_Filter = {
  animationUrl?: InputMaybe<Scalars['String']>;
  animationUrl_contains?: InputMaybe<Scalars['String']>;
  animationUrl_ends_with?: InputMaybe<Scalars['String']>;
  animationUrl_gt?: InputMaybe<Scalars['String']>;
  animationUrl_gte?: InputMaybe<Scalars['String']>;
  animationUrl_in?: InputMaybe<Array<Scalars['String']>>;
  animationUrl_lt?: InputMaybe<Scalars['String']>;
  animationUrl_lte?: InputMaybe<Scalars['String']>;
  animationUrl_not?: InputMaybe<Scalars['String']>;
  animationUrl_not_contains?: InputMaybe<Scalars['String']>;
  animationUrl_not_ends_with?: InputMaybe<Scalars['String']>;
  animationUrl_not_in?: InputMaybe<Array<Scalars['String']>>;
  animationUrl_not_starts_with?: InputMaybe<Scalars['String']>;
  animationUrl_starts_with?: InputMaybe<Scalars['String']>;
  creator?: InputMaybe<Scalars['String']>;
  creator_contains?: InputMaybe<Scalars['String']>;
  creator_ends_with?: InputMaybe<Scalars['String']>;
  creator_gt?: InputMaybe<Scalars['String']>;
  creator_gte?: InputMaybe<Scalars['String']>;
  creator_in?: InputMaybe<Array<Scalars['String']>>;
  creator_lt?: InputMaybe<Scalars['String']>;
  creator_lte?: InputMaybe<Scalars['String']>;
  creator_not?: InputMaybe<Scalars['String']>;
  creator_not_contains?: InputMaybe<Scalars['String']>;
  creator_not_ends_with?: InputMaybe<Scalars['String']>;
  creator_not_in?: InputMaybe<Array<Scalars['String']>>;
  creator_not_starts_with?: InputMaybe<Scalars['String']>;
  creator_starts_with?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  editionSize?: InputMaybe<Scalars['BigInt']>;
  editionSize_gt?: InputMaybe<Scalars['BigInt']>;
  editionSize_gte?: InputMaybe<Scalars['BigInt']>;
  editionSize_in?: InputMaybe<Array<Scalars['BigInt']>>;
  editionSize_lt?: InputMaybe<Scalars['BigInt']>;
  editionSize_lte?: InputMaybe<Scalars['BigInt']>;
  editionSize_not?: InputMaybe<Scalars['BigInt']>;
  editionSize_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  imageUrl?: InputMaybe<Scalars['String']>;
  imageUrl_contains?: InputMaybe<Scalars['String']>;
  imageUrl_ends_with?: InputMaybe<Scalars['String']>;
  imageUrl_gt?: InputMaybe<Scalars['String']>;
  imageUrl_gte?: InputMaybe<Scalars['String']>;
  imageUrl_in?: InputMaybe<Array<Scalars['String']>>;
  imageUrl_lt?: InputMaybe<Scalars['String']>;
  imageUrl_lte?: InputMaybe<Scalars['String']>;
  imageUrl_not?: InputMaybe<Scalars['String']>;
  imageUrl_not_contains?: InputMaybe<Scalars['String']>;
  imageUrl_not_ends_with?: InputMaybe<Scalars['String']>;
  imageUrl_not_in?: InputMaybe<Array<Scalars['String']>>;
  imageUrl_not_starts_with?: InputMaybe<Scalars['String']>;
  imageUrl_starts_with?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  royaltyBPS?: InputMaybe<Scalars['BigInt']>;
  royaltyBPS_gt?: InputMaybe<Scalars['BigInt']>;
  royaltyBPS_gte?: InputMaybe<Scalars['BigInt']>;
  royaltyBPS_in?: InputMaybe<Array<Scalars['BigInt']>>;
  royaltyBPS_lt?: InputMaybe<Scalars['BigInt']>;
  royaltyBPS_lte?: InputMaybe<Scalars['BigInt']>;
  royaltyBPS_not?: InputMaybe<Scalars['BigInt']>;
  royaltyBPS_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
};

export enum SplitEdition_OrderBy {
  AnimationUrl = 'animationUrl',
  Creator = 'creator',
  Description = 'description',
  EditionSize = 'editionSize',
  Id = 'id',
  ImageUrl = 'imageUrl',
  Name = 'name',
  RoyaltyBps = 'royaltyBPS',
  Symbol = 'symbol'
}

export type SplitZnft = {
  __typename?: 'SplitZNFT';
  /** The creator of the ERC-721 */
  creator: Split;
  /** The tokenId of the Zora Media ERC-721 */
  id: Scalars['ID'];
  /** The transaction hash the ERC-721 was originally logged in this subgraph */
  transactionHash: Scalars['String'];
};

export type SplitZnft_Filter = {
  creator?: InputMaybe<Scalars['String']>;
  creator_contains?: InputMaybe<Scalars['String']>;
  creator_ends_with?: InputMaybe<Scalars['String']>;
  creator_gt?: InputMaybe<Scalars['String']>;
  creator_gte?: InputMaybe<Scalars['String']>;
  creator_in?: InputMaybe<Array<Scalars['String']>>;
  creator_lt?: InputMaybe<Scalars['String']>;
  creator_lte?: InputMaybe<Scalars['String']>;
  creator_not?: InputMaybe<Scalars['String']>;
  creator_not_contains?: InputMaybe<Scalars['String']>;
  creator_not_ends_with?: InputMaybe<Scalars['String']>;
  creator_not_in?: InputMaybe<Array<Scalars['String']>>;
  creator_not_starts_with?: InputMaybe<Scalars['String']>;
  creator_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transactionHash?: InputMaybe<Scalars['String']>;
  transactionHash_contains?: InputMaybe<Scalars['String']>;
  transactionHash_ends_with?: InputMaybe<Scalars['String']>;
  transactionHash_gt?: InputMaybe<Scalars['String']>;
  transactionHash_gte?: InputMaybe<Scalars['String']>;
  transactionHash_in?: InputMaybe<Array<Scalars['String']>>;
  transactionHash_lt?: InputMaybe<Scalars['String']>;
  transactionHash_lte?: InputMaybe<Scalars['String']>;
  transactionHash_not?: InputMaybe<Scalars['String']>;
  transactionHash_not_contains?: InputMaybe<Scalars['String']>;
  transactionHash_not_ends_with?: InputMaybe<Scalars['String']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  transactionHash_not_starts_with?: InputMaybe<Scalars['String']>;
  transactionHash_starts_with?: InputMaybe<Scalars['String']>;
};

export enum SplitZnft_OrderBy {
  Creator = 'creator',
  Id = 'id',
  TransactionHash = 'transactionHash'
}

export type Split_Filter = {
  ETH?: InputMaybe<Scalars['BigInt']>;
  ETH_gt?: InputMaybe<Scalars['BigInt']>;
  ETH_gte?: InputMaybe<Scalars['BigInt']>;
  ETH_in?: InputMaybe<Array<Scalars['BigInt']>>;
  ETH_lt?: InputMaybe<Scalars['BigInt']>;
  ETH_lte?: InputMaybe<Scalars['BigInt']>;
  ETH_not?: InputMaybe<Scalars['BigInt']>;
  ETH_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtBlockNumber?: InputMaybe<Scalars['BigInt']>;
  createdAtBlockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtBlockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlockNumber_not?: InputMaybe<Scalars['BigInt']>;
  createdAtBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtTimestamp?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creator?: InputMaybe<Scalars['String']>;
  creator_contains?: InputMaybe<Scalars['String']>;
  creator_ends_with?: InputMaybe<Scalars['String']>;
  creator_gt?: InputMaybe<Scalars['String']>;
  creator_gte?: InputMaybe<Scalars['String']>;
  creator_in?: InputMaybe<Array<Scalars['String']>>;
  creator_lt?: InputMaybe<Scalars['String']>;
  creator_lte?: InputMaybe<Scalars['String']>;
  creator_not?: InputMaybe<Scalars['String']>;
  creator_not_contains?: InputMaybe<Scalars['String']>;
  creator_not_ends_with?: InputMaybe<Scalars['String']>;
  creator_not_in?: InputMaybe<Array<Scalars['String']>>;
  creator_not_starts_with?: InputMaybe<Scalars['String']>;
  creator_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  needsIncremented?: InputMaybe<Scalars['Boolean']>;
  needsIncremented_in?: InputMaybe<Array<Scalars['Boolean']>>;
  needsIncremented_not?: InputMaybe<Scalars['Boolean']>;
  needsIncremented_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  nickname?: InputMaybe<Scalars['String']>;
  nickname_contains?: InputMaybe<Scalars['String']>;
  nickname_ends_with?: InputMaybe<Scalars['String']>;
  nickname_gt?: InputMaybe<Scalars['String']>;
  nickname_gte?: InputMaybe<Scalars['String']>;
  nickname_in?: InputMaybe<Array<Scalars['String']>>;
  nickname_lt?: InputMaybe<Scalars['String']>;
  nickname_lte?: InputMaybe<Scalars['String']>;
  nickname_not?: InputMaybe<Scalars['String']>;
  nickname_not_contains?: InputMaybe<Scalars['String']>;
  nickname_not_ends_with?: InputMaybe<Scalars['String']>;
  nickname_not_in?: InputMaybe<Array<Scalars['String']>>;
  nickname_not_starts_with?: InputMaybe<Scalars['String']>;
  nickname_starts_with?: InputMaybe<Scalars['String']>;
  owners?: InputMaybe<Array<Scalars['String']>>;
  owners_contains?: InputMaybe<Array<Scalars['String']>>;
  owners_not?: InputMaybe<Array<Scalars['String']>>;
  owners_not_contains?: InputMaybe<Array<Scalars['String']>>;
  recipients?: InputMaybe<Array<Scalars['String']>>;
  recipients_contains?: InputMaybe<Array<Scalars['String']>>;
  recipients_not?: InputMaybe<Array<Scalars['String']>>;
  recipients_not_contains?: InputMaybe<Array<Scalars['String']>>;
  transactionHash?: InputMaybe<Scalars['String']>;
  transactionHash_contains?: InputMaybe<Scalars['String']>;
  transactionHash_ends_with?: InputMaybe<Scalars['String']>;
  transactionHash_gt?: InputMaybe<Scalars['String']>;
  transactionHash_gte?: InputMaybe<Scalars['String']>;
  transactionHash_in?: InputMaybe<Array<Scalars['String']>>;
  transactionHash_lt?: InputMaybe<Scalars['String']>;
  transactionHash_lte?: InputMaybe<Scalars['String']>;
  transactionHash_not?: InputMaybe<Scalars['String']>;
  transactionHash_not_contains?: InputMaybe<Scalars['String']>;
  transactionHash_not_ends_with?: InputMaybe<Scalars['String']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  transactionHash_not_starts_with?: InputMaybe<Scalars['String']>;
  transactionHash_starts_with?: InputMaybe<Scalars['String']>;
};

export enum Split_OrderBy {
  Erc20Transfers = 'ERC20Transfers',
  Eth = 'ETH',
  CreatedAtBlockNumber = 'createdAtBlockNumber',
  CreatedAtTimestamp = 'createdAtTimestamp',
  Creations = 'creations',
  Creator = 'creator',
  Editions = 'editions',
  Id = 'id',
  NeedsIncremented = 'needsIncremented',
  Nickname = 'nickname',
  Owners = 'owners',
  Recipients = 'recipients',
  TransactionHash = 'transactionHash'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  erc20Transfer?: Maybe<Erc20Transfer>;
  erc20Transfers: Array<Erc20Transfer>;
  recipient?: Maybe<Recipient>;
  recipients: Array<Recipient>;
  split?: Maybe<Split>;
  splitEdition?: Maybe<SplitEdition>;
  splitEditions: Array<SplitEdition>;
  splitZNFT?: Maybe<SplitZnft>;
  splitZNFTs: Array<SplitZnft>;
  splits: Array<Split>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionErc20TransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionErc20TransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Erc20Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Erc20Transfer_Filter>;
};


export type SubscriptionRecipientArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRecipientsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Recipient_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Recipient_Filter>;
};


export type SubscriptionSplitArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSplitEditionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSplitEditionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SplitEdition_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SplitEdition_Filter>;
};


export type SubscriptionSplitZnftArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSplitZnfTsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SplitZnft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SplitZnft_Filter>;
};


export type SubscriptionSplitsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Split_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Split_Filter>;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type User = {
  __typename?: 'User';
  /** Total amount of ETH claimed from all Splits */
  claimedETH: Scalars['BigInt'];
  /** Proxies that this address created */
  createdSplits: Array<Split>;
  /** Ethereum Address */
  id: Scalars['ID'];
  /** Proxies that this address owns */
  ownedSplits: Array<Split>;
  /** Splits that this address is a recipient of */
  recipientInfo: Array<Recipient>;
};


export type UserCreatedSplitsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Split_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Split_Filter>;
};


export type UserOwnedSplitsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Split_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Split_Filter>;
};


export type UserRecipientInfoArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Recipient_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Recipient_Filter>;
};

export type User_Filter = {
  claimedETH?: InputMaybe<Scalars['BigInt']>;
  claimedETH_gt?: InputMaybe<Scalars['BigInt']>;
  claimedETH_gte?: InputMaybe<Scalars['BigInt']>;
  claimedETH_in?: InputMaybe<Array<Scalars['BigInt']>>;
  claimedETH_lt?: InputMaybe<Scalars['BigInt']>;
  claimedETH_lte?: InputMaybe<Scalars['BigInt']>;
  claimedETH_not?: InputMaybe<Scalars['BigInt']>;
  claimedETH_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum User_OrderBy {
  ClaimedEth = 'claimedETH',
  CreatedSplits = 'createdSplits',
  Id = 'id',
  OwnedSplits = 'ownedSplits',
  RecipientInfo = 'recipientInfo'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type ZnftShortFragment = { __typename?: 'SplitZNFT', id: string, creator: { __typename?: 'Split', id: string } };

export type ZnftDetailsFragment = { __typename?: 'SplitZNFT', id: string, transactionHash: string, creator: { __typename?: 'Split', id: string, nickname: string, ETH: any, needsIncremented: boolean, owners: Array<{ __typename?: 'User', id: string }>, creator: { __typename?: 'User', id: string }, recipients: Array<{ __typename?: 'Recipient', id: string }>, creations: Array<{ __typename?: 'SplitZNFT', id: string }>, editions: Array<{ __typename?: 'SplitEdition', id: string }> } };

export type EditionShortFragment = { __typename?: 'SplitEdition', id: string, name: string, symbol: string, description: string, imageUrl: string, animationUrl: string, editionSize: any, creator: { __typename?: 'Split', id: string } };

export type EditionDetailsFragment = { __typename?: 'SplitEdition', id: string, name: string, symbol: string, description: string, imageUrl: string, animationUrl: string, editionSize: any, royaltyBPS: any, creator: { __typename?: 'Split', id: string, nickname: string, ETH: any, needsIncremented: boolean, owners: Array<{ __typename?: 'User', id: string }>, creator: { __typename?: 'User', id: string }, recipients: Array<{ __typename?: 'Recipient', id: string }>, creations: Array<{ __typename?: 'SplitZNFT', id: string }>, editions: Array<{ __typename?: 'SplitEdition', id: string }> } };

export type TransferShortFragment = { __typename?: 'ERC20Transfer', id: string, contract: string, amount: any };

export type TransferDetailsFragment = { __typename?: 'ERC20Transfer', id: string, transactionHash: string, contract: string, amount: any, split: { __typename?: 'Split', id: string, nickname: string, ETH: any, needsIncremented: boolean, owners: Array<{ __typename?: 'User', id: string }>, creator: { __typename?: 'User', id: string }, recipients: Array<{ __typename?: 'Recipient', id: string }>, creations: Array<{ __typename?: 'SplitZNFT', id: string }>, editions: Array<{ __typename?: 'SplitEdition', id: string }> } };

export type UserShortFragment = { __typename?: 'User', id: string, claimedETH: any, createdSplits: Array<{ __typename?: 'Split', id: string }>, ownedSplits: Array<{ __typename?: 'Split', id: string }>, recipientInfo: Array<{ __typename?: 'Recipient', id: string }> };

export type UserDetailsFragment = { __typename?: 'User', id: string, claimedETH: any, createdSplits: Array<{ __typename?: 'Split', id: string, nickname: string, ETH: any, needsIncremented: boolean, owners: Array<{ __typename?: 'User', id: string }>, creator: { __typename?: 'User', id: string }, recipients: Array<{ __typename?: 'Recipient', id: string }>, creations: Array<{ __typename?: 'SplitZNFT', id: string }>, editions: Array<{ __typename?: 'SplitEdition', id: string }> }>, ownedSplits: Array<{ __typename?: 'Split', id: string, nickname: string, ETH: any, needsIncremented: boolean, owners: Array<{ __typename?: 'User', id: string }>, creator: { __typename?: 'User', id: string }, recipients: Array<{ __typename?: 'Recipient', id: string }>, creations: Array<{ __typename?: 'SplitZNFT', id: string }>, editions: Array<{ __typename?: 'SplitEdition', id: string }> }>, recipientInfo: Array<{ __typename?: 'Recipient', id: string, name: string, role: string, shares: string, allocation: string, claimableETH: any, claimedETH: any }> };

export type RecipientShortFragment = { __typename?: 'Recipient', id: string, name: string, role: string, shares: string, allocation: string, claimableETH: any, claimedETH: any };

export type RecipientDetailsFragment = { __typename?: 'Recipient', id: string, name: string, role: string, shares: string, allocation: string, claimableETH: any, claimedETH: any, user: { __typename?: 'User', id: string, claimedETH: any, createdSplits: Array<{ __typename?: 'Split', id: string }>, ownedSplits: Array<{ __typename?: 'Split', id: string }>, recipientInfo: Array<{ __typename?: 'Recipient', id: string }> }, split: { __typename?: 'Split', id: string, nickname: string, ETH: any, needsIncremented: boolean, owners: Array<{ __typename?: 'User', id: string }>, creator: { __typename?: 'User', id: string }, recipients: Array<{ __typename?: 'Recipient', id: string }>, creations: Array<{ __typename?: 'SplitZNFT', id: string }>, editions: Array<{ __typename?: 'SplitEdition', id: string }> } };

export type SplitShortFragment = { __typename?: 'Split', id: string, nickname: string, ETH: any, needsIncremented: boolean, owners: Array<{ __typename?: 'User', id: string }>, creator: { __typename?: 'User', id: string }, recipients: Array<{ __typename?: 'Recipient', id: string }>, creations: Array<{ __typename?: 'SplitZNFT', id: string }>, editions: Array<{ __typename?: 'SplitEdition', id: string }> };

export type SplitDetailsFragment = { __typename?: 'Split', id: string, nickname: string, ETH: any, needsIncremented: boolean, transactionHash: string, createdAtTimestamp: any, createdAtBlockNumber: any, owners: Array<{ __typename?: 'User', id: string, claimedETH: any, createdSplits: Array<{ __typename?: 'Split', id: string }>, ownedSplits: Array<{ __typename?: 'Split', id: string }>, recipientInfo: Array<{ __typename?: 'Recipient', id: string }> }>, creator: { __typename?: 'User', id: string, claimedETH: any, createdSplits: Array<{ __typename?: 'Split', id: string }>, ownedSplits: Array<{ __typename?: 'Split', id: string }>, recipientInfo: Array<{ __typename?: 'Recipient', id: string }> }, recipients: Array<{ __typename?: 'Recipient', id: string, name: string, role: string, shares: string, allocation: string, claimableETH: any, claimedETH: any }>, creations: Array<{ __typename?: 'SplitZNFT', id: string, creator: { __typename?: 'Split', id: string } }>, editions: Array<{ __typename?: 'SplitEdition', id: string, name: string, symbol: string, description: string, imageUrl: string, animationUrl: string, editionSize: any, creator: { __typename?: 'Split', id: string } }>, ERC20Transfers: Array<{ __typename?: 'ERC20Transfer', id: string, contract: string, amount: any }> };

export type GetSplitsByAddressesQueryVariables = Exact<{
  addresses?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type GetSplitsByAddressesQuery = { __typename?: 'Query', splits: Array<{ __typename?: 'Split', id: string, nickname: string, ETH: any, needsIncremented: boolean, transactionHash: string, createdAtTimestamp: any, createdAtBlockNumber: any, owners: Array<{ __typename?: 'User', id: string, claimedETH: any, createdSplits: Array<{ __typename?: 'Split', id: string }>, ownedSplits: Array<{ __typename?: 'Split', id: string }>, recipientInfo: Array<{ __typename?: 'Recipient', id: string }> }>, creator: { __typename?: 'User', id: string, claimedETH: any, createdSplits: Array<{ __typename?: 'Split', id: string }>, ownedSplits: Array<{ __typename?: 'Split', id: string }>, recipientInfo: Array<{ __typename?: 'Recipient', id: string }> }, recipients: Array<{ __typename?: 'Recipient', id: string, name: string, role: string, shares: string, allocation: string, claimableETH: any, claimedETH: any }>, creations: Array<{ __typename?: 'SplitZNFT', id: string, creator: { __typename?: 'Split', id: string } }>, editions: Array<{ __typename?: 'SplitEdition', id: string, name: string, symbol: string, description: string, imageUrl: string, animationUrl: string, editionSize: any, creator: { __typename?: 'Split', id: string } }>, ERC20Transfers: Array<{ __typename?: 'ERC20Transfer', id: string, contract: string, amount: any }> }> };

export type GetSplitsByUsersQueryVariables = Exact<{
  addresses?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type GetSplitsByUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, claimedETH: any, createdSplits: Array<{ __typename?: 'Split', id: string, nickname: string, ETH: any, needsIncremented: boolean, owners: Array<{ __typename?: 'User', id: string }>, creator: { __typename?: 'User', id: string }, recipients: Array<{ __typename?: 'Recipient', id: string }>, creations: Array<{ __typename?: 'SplitZNFT', id: string }>, editions: Array<{ __typename?: 'SplitEdition', id: string }> }>, ownedSplits: Array<{ __typename?: 'Split', id: string, nickname: string, ETH: any, needsIncremented: boolean, owners: Array<{ __typename?: 'User', id: string }>, creator: { __typename?: 'User', id: string }, recipients: Array<{ __typename?: 'Recipient', id: string }>, creations: Array<{ __typename?: 'SplitZNFT', id: string }>, editions: Array<{ __typename?: 'SplitEdition', id: string }> }>, recipientInfo: Array<{ __typename?: 'Recipient', id: string, name: string, role: string, shares: string, allocation: string, claimableETH: any, claimedETH: any }> }> };

export type GetEditionsByAddressesQueryVariables = Exact<{
  addresses?: InputMaybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type GetEditionsByAddressesQuery = { __typename?: 'Query', splitEditions: Array<{ __typename?: 'SplitEdition', id: string, name: string, symbol: string, description: string, imageUrl: string, animationUrl: string, editionSize: any, royaltyBPS: any, creator: { __typename?: 'Split', id: string, nickname: string, ETH: any, needsIncremented: boolean, owners: Array<{ __typename?: 'User', id: string }>, creator: { __typename?: 'User', id: string }, recipients: Array<{ __typename?: 'Recipient', id: string }>, creations: Array<{ __typename?: 'SplitZNFT', id: string }>, editions: Array<{ __typename?: 'SplitEdition', id: string }> } }> };
