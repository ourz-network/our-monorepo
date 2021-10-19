export interface SplitZNFT {
  // "The tokenId of the ERC-721";
  id: string;

  // "The creator of the ERC-721";
  creator: OurProxy;

  // "The transaction hash the ERC-721 was originally logged in this subgraph";
  transactionHash: string;
}

export interface SplitEdition {
  // "The address of the Zora NFT-Editions contract"
  id: string;

  // "The creator of the Edition Contract"
  creator: OurProxy;

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
  id: string;

  // "The address of the Split transferring the ERC20s"
  splitProxy: OurProxy;

  // "The transaction hash of the transfer"
  transactionHash: string;

  // "The address of the ERC20 Contract"
  contract: string;

  // "The amount of ERC20s Transferred"
  amount: BigInt;
}

export interface OurProxy {
  // "The address of the Proxy"
  id: string;

  // "A nickname for the Proxy"
  nickname: string;

  // "The transaction hash the Proxy was created at"
  transactionHash: string;

  // "The timestamp of the block the Ask was created in"
  createdAtTimestamp: BigInt;

  // "The number of the block the Ask created in"
  createdAtBlockNumber: BigInt;

  // "The current owner(s) of the Proxy"
  proxyOwners: User[];

  // "The original owner of the Proxy"
  creator: User;

  // "The number of times ownership has been transferred"
  transfers: BigInt;

  // "The amount of ETH/WETH available to claim by Split Recipients"
  ETH: BigInt;

  // "Recipients should increment window before claiming"
  needsIncremented: boolean;

  // "Array of SplitRecipients"
  splitRecipients: SplitRecipient[];

  // "The ERC721(s) the Proxy created"
  // @derivedFrom(field: "creator")
  creations: SplitZNFT[];

  // "The Zora NFT-Edition(s) the Proxy created"
  // @derivedFrom(field: "creator")
  editions: SplitEdition[];

  // "The ERC20 Transfers that the Proxy has successfully distributed"
  // @derivedFrom(field: "splitProxy")
  ERC20Transfers: ERC20Transfer[];
}

export interface User {
  // "Ethereum Address"
  id: string;

  // "Total amount of ETH claimed from all Splits"
  ethClaimed: BigInt;

  // "Proxies that this address owns"
  // @derivedFrom(field: "proxyOwners")
  ownedProxies: OurProxy[];

  // "Proxies that this address created"
  // @derivedFrom(field: "creator")
  createdProxies: OurProxy[];

  // "Splits that this address is a recipient of"
  // @derivedFrom(field: "user")
  recipientInfo: SplitRecipient[];
}

export interface SplitRecipient {
  // "`${proxyAddress}-${userAddress}`"
  id: string;

  // "User Entity"
  user: User;

  // "OurProxy Entity"
  splitProxy: OurProxy;

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
  ethClaimed: BigInt;
}
