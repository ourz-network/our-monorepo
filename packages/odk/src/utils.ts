import warning from 'tiny-warning';
import { getAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import BalanceTree from '@ourz/our-contracts/dist/merkle-tree/balance-tree';
import invariant from 'tiny-invariant';
import { FormSplitRecipient, MerkleSplitRecipient, SplitRecipient } from './types';
import { Recipient } from './subgraph/types/OurzSubgraph';

/********************
 * Type Constructors
 ********************
 */

/**
 * Creates roothash of merkle tree and prettifies SplitRecipients
 * see https://github.com/mirror-xyz/splits
 *
 * @param formData
 */
export function validateAndFormatSplit(formData: FormSplitRecipient[]): {
  splitData: SplitRecipient[];
  rootHash: string;
  tree: BalanceTree;
} {
  const splitData: SplitRecipient[] = formData.map(({ address, name, role, shares }) => ({
    address: address,
    name: name,
    role: role,
    shares: shares,
    allocation: (Number(shares) * 1000000).toFixed(0),
  }));

  const splitsForMerkle: MerkleSplitRecipient[] = formData.map(({ address, shares }) => ({
    account: address,
    allocation: BigNumber.from((Number(shares) * 1000000).toFixed(0)),
  }));
  const tree = new BalanceTree(splitsForMerkle);
  const rootHash = tree.getHexRoot();

  return { splitData, rootHash, tree };
}

/**
 * Creates roothash of merkle tree and prettifies SplitRecipients
 * see https://github.com/mirror-xyz/splits
 *
 * @param formData
 */
export function processQueryRecipients(recipients: Recipient[]): {
  splitsForMerkle: MerkleSplitRecipient[];
  rootHash: string;
  tree: BalanceTree;
} {
  const splitsForMerkle: MerkleSplitRecipient[] = recipients.map(({ id, allocation }) => ({
    account: id,
    allocation: allocation as unknown as BigNumber,
  }));
  const tree = new BalanceTree(splitsForMerkle);
  const rootHash = tree.getHexRoot();

  return { splitsForMerkle, rootHash, tree };
}

/**
 * Validates and returns the checksummed address
 *
 * @param address
 */
export function validateAndParseAddress(address: string): string {
  try {
    const checksummedAddress = getAddress(address);
    warning(address === checksummedAddress, `${address} is not checksummed.`);
    return checksummedAddress;
  } catch (error) {
    invariant(false, `${address} is not a valid address.`);
  }
}

/**
 * Returns the proper network name for the specified chainId
 *
 * @param chainId
 */
export function chainIdToNetworkName(chainId: number): string {
  switch (chainId) {
    case 137: {
      return 'polygon';
    }
    case 4: {
      return 'rinkeby';
    }
    case 1: {
      return 'mainnet';
    }
  }

  invariant(false, `ourz.network doesn't support chainId #${chainId}, yet.`);
}

/********************
 * Hashing Utilities
 ********************
 */

/******************
 * EIP-712 Utilities
 ******************
 */
