export type SplitShort = {
  id: string;
  nickname: string;
  owners: {
    id: string;
  }[];
  creator: {
    id: string;
  };
  recipients: {
    id: string;
  }[];
  creations: {
    id: string;
  }[];
  editions: {
    id: string;
  }[];
  ETH: BigInt;
  needsIncremented: boolean;
};

export type SplitDetails = {
  id: string;
  nickname: string;
  owners: UserShort[];
  creator: UserShort;
  recipients: RecipientShort[];
  creations: ZNFTShort[];
  editions: EditionShort[];
  ETH: BigInt;
  needsIncremented: boolean;
  ERC20Transfers: TransferShort[];
  transactionHash: string;
  createdAtTimestamp: BigInt;
  createdAtBlockNumber: BigInt;
};

export type UserShort = {
  id: string;
  createdSplits: {
    id: string;
  }[];
  ownedSplits: {
    id: string;
  }[];
  recipientInfo: {
    id: string;
  }[];
  claimedETH: BigInt;
};

export type UserDetails = {
  id: string;
  createdSplits: SplitShort[];
  ownedSplits: SplitShort[];
  recipientInfo: RecipientShort[];
  claimedETH: BigInt;
};

export type EditionShort = {
  id: string;
  creator: {
    id: string;
  };
  name: string;
  symbol: string;
  description: string;
  imageUrl: string;
  animationUrl: string;
  editionSize: BigInt;
};

export type EditionDetails = {
  id: string;
  creator: SplitShort;
  name: string;
  symbol: string;
  description: string;
  imageUrl: string;
  animationUrl: string;
  editionSize: BigInt;
  royaltyBPS: BigInt;
};

export type ZNFTShort = {
  id: string;
  creator: {
    id: string;
  };
};

export type ZNFTDetails = {
  id: string;
  creator: SplitShort;
  transactionHash: string;
};

export type RecipientShort = {
  id: string;
  name: string;
  role: string;
  shares: string;
  allocation: string;
  claimableETH: BigInt;
  claimedETH: BigInt;
};

export type RecipientDetails = {
  id: string;
  user: UserShort;
  split: SplitShort;
  name: string;
  role: string;
  shares: string;
  allocation: string;
  claimableETH: BigInt;
  claimedETH: BigInt;
};

export type TransferShort = {
  id: string;
  contract: string;
  amount: BigInt;
};
export type TransferDetails = {
  id: string;
  split: SplitShort;
  transactionHash: string;
  contract: string;
  amount: BigInt;
};

export type GetSplitQueryResult = {
  data: { splits: SplitDetails[] };
};
export type GetUserQueryResult = {
  data: { users: UserDetails[] };
};
export type GetEditionQueryResult = {
  data: { editions: EditionDetails[] };
};
