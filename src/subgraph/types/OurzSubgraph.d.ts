export interface SplitZNFT {
  // "The tokenId of the Zora Media ERC-721"
  id: ID;

  // "The creator of the ERC-721"
  creator: Split;

  // "The transaction hash the ERC-721 was originally logged in this subgraph"
  transactionHash: string;
}

export interface SplitEdition {
  // "The address of the Zora NFT-Editions contract"
  id: ID;

  // "The creator of the Edition Contract"
  creator: Split;

  // "The title of the Edition contract"
  name: string;

  // "Symbol of the Edition contract"
  symbol: string;

  // "Metadata: Description of the Edition entry"
  description: string;

  // "Metadata: Animation url (optional) of the Edition entry"
  animationUrl: string;

  // "Metadata: Image url (semi-required) of the Edition entry"
  imageUrl: string;

  // "Total size of the Edition (number of possible editions)"
  editionSize: BigInt;

  // "BPS amount of royalty"
  royaltyBPS: BigInt;
}

export interface ERC20Transfer {
  // "<txHash>-<proxyAddress>"
  id: ID;

  // "The address of the Split transferring the ERC20s"
  split: Split;

  // "The transaction hash of the transfer"
  transactionHash: string;

  // "The address of the ERC20 Contract"
  contract: string;

  // "The amount of ERC20s Transferred"
  amount: BigInt;
}

export interface Split {
  // "The address of the Proxy"
  id: ID;

  // "A nickname for the Proxy"
  nickname: string;

  // "The transaction hash the Proxy was created at"
  transactionHash: string;

  // "The timestamp of the block the Ask was created in"
  createdAtTimestamp: BigInt;

  // "The number of the block the Ask created in"
  createdAtBlockNumber: BigInt;

  // "The current owner(s) of the Proxy"
  owners: User[];

  // "The original owner of the Proxy"
  creator: User;

  // "The amount of ETH/WETH currently available to claim by Split Recipients"
  ETH: BigInt;

  // "Recipients should increment window before claiming"
  needsIncremented: boolean;

  // "Array of the Split's Recipients"
  recipients: Recipient[];

  // "The ERC721(s) the Proxy created"
  // @derivedFrom(field: "creator")
  creations: SplitZNFT[];

  // "The Zora NFT-Edition(s) the Proxy created"
  // @derivedFrom(field: "creator")
  editions: SplitEdition[];

  // "The ERC20 Transfers that the Proxy has successfully distributed"
  // @derivedFrom(field: "split")
  ERC20Transfers: ERC20Transfer[];
}

export interface User {
  // "Ethereum Address"
  id: ID;

  // "Total amount of ETH claimed from all Splits"
  claimedETH: BigInt;

  // "Proxies that this address owns"
  // @derivedFrom(field: "owners")
  ownedSplits: Split[];

  // "Proxies that this address created"
  // @derivedFrom(field: "creator")
  createdSplits: Split[];

  // "Splits that this address is a recipient of"
  // @derivedFrom(field: "user")
  recipientInfo: Recipient[];
}

export interface Recipient {
  // "`${proxyAddress}-${userAddress}`"
  id: ID;

  // "User Entity"
  user: User;

  // "Split Entity"
  split: Split;

  // "Name/Alias of User"
  name: string;

  // "Role in Split"
  role: string;

  // "Number between 0-100 as a string"
  shares: string;

  // "Shares * 1,000,000 as a string"
  allocation: string;

  // "ETH available to claim for the specific user"
  claimableETH: BigInt;

  // "Total amount of ETH claimed from this Split"
  claimedETH: BigInt;
}
