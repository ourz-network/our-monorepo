import { BytesLike } from '@ethersproject/bytes';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';

/**
 * Standard Split Recipient Type
 */
export type SplitRecipient = {
  address: string;
  name?: string;
  role?: string;
  shares: number;
  allocation: BigNumberish | BytesLike;
};

/**
 * Split Recipient Type for creating a merkle tree
 */
export type MerkleSplitRecipient = {
  account: string;
  allocation: BigNumber;
};

/**
 * Split Recipient Type for user-input form
 */
export type FormSplitRecipient = {
  address: string;
  name?: string;
  role?: string;
  shares: number;
};
