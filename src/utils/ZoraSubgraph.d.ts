import BytesLike from "ethers";

export type Media = {
  // "The tokenId on the Zora Media Contract"
  id: string;

  // "The transaction hash the media was created at"
  transactionHash?: string;

  // "The current owner of the Media"
  owner?: User;

  // "The creator of the Media"
  creator?: User;

  // "The previous owner of the Zora Media's Market"
  prevOwner?: User;

  // "The approved user of the Media"
  approved?: User;

  // "The sha256 hash of the media's content"
  contentHash?: BytesLike.Bytes;

  // "The sha256 hash of the media's metadata"
  metadataHash?: BytesLike.Bytes;

  // "The uri of the content"
  contentURI?: string;

  // "The uri of the metadata"
  metadataURI?: string;

  // "The bid share for the current owner of the Media"
  ownerBidShare?: BigInt;

  // "The bid share for the creator of the Media"
  creatorBidShare?: BigInt;

  // "The bid share for the previous owner of the Media's market"
  prevOwnerBidShare?: BigInt;

  // "The timestamp of the block the Media was minted in"
  createdAtTimestamp?: BigInt;

  // "The number of the block the Media was minted in"
  createdAtBlockNumber?: BigInt;

  // "The timestamp of the block the Media was burned in"
  burnedAtTimeStamp?: BigInt;

  // "The number of the block the Media was burned in"
  burnedAtBlockNumber?: BigInt;

  // "The current Ask of the Media"
  // @derivedFrom(field?: "media")
  currentAsk?: Ask;

  // "The current Bids on the Media"
  // @derivedFrom(field?: "media")
  currentBids?: Bid[];

  // "The InactiveAsks of the Media"
  // @derivedFrom(field?: "media")
  inactiveAsks?: InactiveAsk[];

  // "The InactiveBids of the Media"
  // @derivedFrom(field?: "media")
  inactiveBids?: InactiveBid[];

  // "The transfers of the Media"
  // @derivedFrom(field?: "media")
  transfers?: Transfer[];

  // "The ReserveAuctions of the Media"
  // @derivedFrom(field?: "media")
  reserveAuctions?: ReserveAuction[];
};

export type User = {
  // "Ethereum Address"
  id: string;

  // "Users that have been granted `ApprovalForAll` Media of the User's Collection"
  authorizedUsers: User[];

  // "The Media the User owns"
  // @derivedFrom(field: "owner")
  collection: Media[];

  // "The Media the User created"
  // @derivedFrom(field: "creator")
  creations: Media[];

  // "The active Bids made by the User"
  // @derivedFrom(field: "bidder")
  currentBids: Bid[];
};

export type Ask = {
  // "<tokenId>-<ownerAddress>"
  id: string;

  // "The Media associated with the Ask"
  media: Media;

  // "Transaction hash the ask was created at"
  transactionHash: string;

  // "The Currency of the Ask"
  currency: Currency;

  // "The amount of Currency of the Ask"
  amount: BigInt;

  // "The owner of the Ask"
  owner: User;

  // "The timestamp of the block the Ask was created in"
  createdAtTimestamp: BigInt;

  // "The number of the block the Ask created in"
  createdAtBlockNumber: BigInt;
};

export type Bid = {
  // "<token-id>-<bidderAddress>"
  id: string;

  // "Transaction hash the bid was created at"
  transactionHash: string;

  // "The Media associated with the Bid"
  media: Media;

  // "The Currency of the Bid"
  currency: Currency;

  // "The amount of Currency of the Bid"
  amount: BigInt;

  // "The sellOnShare of the Bid"
  sellOnShare: BigInt;

  // "The bidder of the Bid"
  bidder: User;

  // "The recipient of Media if the Bid is accepted"
  recipient: User;

  // "The timestamp of the block the Bid was created in"
  createdAtTimestamp: BigInt;

  // "The number of the block the Bid was created in"
  createdAtBlockNumber: BigInt;
};

// "The Types for MarketEvents (Asks, Bids)"
enum MarketEventType {
  Finalized,
  Removed,
}

export type InactiveBid = {
  // "<tokenId>-<transactionHash>-<logIndex>"
  id: string;

  // "Transaction hash the bid was created at"
  transactionHash: string;

  // "The Media associated with the InactiveBid"
  media: Media;

  // "The reason why this Bid is Inactive"
  type: MarketEventType;

  // "The Currency of the InactiveBid"
  currency: Currency;

  // "The amount of Currency of the InactiveBid"
  amount: BigInt;

  // "The sellOnShare of the InactiveBid"
  sellOnShare: BigInt;

  // "The bidder of the InactiveBid"
  bidder: User;

  // "The recipient of the InactiveBid"
  recipient: User;

  // "The timestamp of the block the original Bid was created in"
  createdAtTimestamp: BigInt;

  // "The number of the block the original Bid was created in"
  createdAtBlockNumber: BigInt;

  //  "The timestamp of the block the original Bid was inactivated in"
  inactivatedAtTimestamp: BigInt;

  // "The number of the block the original Bid was inactivated in"
  inactivatedAtBlockNumber: BigInt;
};

export type InactiveAsk = {
  // "<tokenId>-<transactionHash>-<logIndex>"
  id: string;

  // "Transaction hash the ask was created at"
  transactionHash: string;

  // "The Media associated with the InactiveAsk"
  media: Media;

  // "The why this Ask is Inactive"
  type: MarketEventType;

  // "The Currency of the InactiveAsk"
  currency: Currency;

  // "The amount of Currency of the InactiveAsk"
  amount: BigInt;

  // "The owner of the InactiveAsk"
  owner: User;

  // "The timestamp of the block the original Ask was created in"
  createdAtTimestamp: BigInt;

  // "The number of the block the original Ask was created in"
  createdAtBlockNumber: BigInt;

  // "The timestamp of the block the original Ask was inactivated in"
  inactivatedAtTimestamp: BigInt;

  // "The number of the block the original Ask was inactivated in"
  inactivatedAtBlockNumber: BigInt;
};

export type Currency = {
  // "The address of the Currency"
  id: string;

  // "The name of the Currency"
  name: string;

  // "The symbol of the Currency"
  symbol: string;

  // "The decimals of the Currency"
  decimals: number;

  // "Total Bid Liquidity of the Currency on all Zora Media"
  liquidity: BigInt;

  // "The active Bids denominated in the Currency"
  // @derivedFrom(field: "currency")
  activeBids: Bid[];

  // "The active Asks denominated in the Currency"
  // @derivedFrom(field: "currency")
  activeAsks: Ask[];

  // "The InactiveBids denominated in the Currency"
  // @derivedFrom(field: "currency")
  inactiveBids: InactiveBid[];

  // "The InactiveAsks denominated in the Currency"
  // @derivedFrom(field: "currency")
  inactiveAsks: InactiveAsk[];
};

export type Transfer = {
  // "<tokenId>-<transactionHash>-<logIndex>"
  id: string;

  // "Transaction hash for the transfer"
  transactionHash: string;

  // "The Media associated with the Transfer"
  media: Media;

  // "The User transferring the Media"
  from: User;

  // "The User receiving the Media"
  to: User;

  // "The timestamp of the block the Transfer was created in"
  createdAtTimestamp: BigInt;

  // "The number of the block the Transfer was created in"
  createdAtBlockNumber: BigInt;
};

// "The Types of URI Updates"
enum URIUpdateType {
  Content,
  Metadata,
}

export type URIUpdate = {
  // "<tokenId>-<transactionHash>-<logIndex>"
  id: string;

  // "The transaction has the uri update happened at"
  transactionHash: string;

  // "The Type of URIUpdate"
  type: URIUpdateType;

  // "The previous uri"
  from: string;

  // "The new uri"
  to: string;

  // "The Media associated with the URIUpdate"
  media: Media;

  // "The owner of the Media"
  owner: User;

  // "The updater of the Media's URI"
  updater: User;

  // "The timestamp of the block the URIUpdate was created in"
  createdAtTimestamp: BigInt;

  // "The number of the block the URIUpdate was created in"
  createdAtBlockNumber: BigInt;
};

enum ReserveAuctionBidType {
  Active,
  Refunded,
  Final,
}

export type ReserveAuctionBid = {
  // "<auctionId>-<txHash>-<logIndex>"
  id: string;

  // "The transaction hash the reserve auction big was created at"
  transactionHash: string;

  // "The Reserve auction associated with the Bid"
  reserveAuction: ReserveAuction;

  // "The amount of the Bid"
  amount: BigInt;

  // "The bidder of the Bid"
  bidder: User;

  // "The type of bid (active, refunded, final)"
  bidType: ReserveAuctionBidType;

  // "The timestamp of the block the Bid was created in"
  createdAtTimestamp: BigInt;

  // "The number of the block the Bid was created in"
  createdAtBlockNumber: BigInt;
};

export type InactiveReserveAuctionBid = {
  // "<auctionId>-<txHash>-<logIndex>"
  id: string;

  // "The transaction hash the reserve auction big was created at"
  transactionHash: string;

  // "The Reserve auction associated with the Bid"
  reserveAuction: ReserveAuction;

  // "The amount of the Bid"
  amount: BigInt;

  // "The bidder of the Bid"
  bidder: User;

  // "The type of bid (active, refunded, final)"
  bidType: ReserveAuctionBidType;

  // "The timestamp of the block the bid was inactivated at (via outbid, cancellation, winning bid)"
  bidInactivatedAtTimestamp: BigInt;

  // "The number of the block the bid was inactivated at (via outbid, cancellation, winning bid)"
  bidInactivatedAtBlockNumber: BigInt;

  // "The timestamp of the block the Bid was created in"
  createdAtTimestamp: BigInt;

  // "The number of the block the Bid was created in"
  createdAtBlockNumber: BigInt;
};
enum ReserveAuctionStatus {
  Pending,
  Active,
  Canceled,
  Finished,
}

export type ReserveAuction = {
  // "ID of the auction from contract, autoincrementing int"
  id: string;

  // "Transaction hash where the reserve auction was created"
  transactionHash: string;

  // "The originating token contract for this auction"
  tokenContract: string;

  // "The token ID for this auction"
  tokenId: BigInt;

  // "<tokenContract>-<tokenId>"
  token: string;

  // "The media for the auction, if it is a zora NFT"
  media: Media;

  // "Whether or not the auction has been approved by the curator"
  approved: boolean;

  // "The length of time the auction is intended to run for, after the first bid is made"
  duration: BigInt;

  // "The expected end of auction timestamp, which can change if bids were placed within the last 15 minutes, and is not set until the first bid is placed"
  expectedEndTimestamp: BigInt;

  // "The time the first bid was placed"
  firstBidTime: BigInt;

  // "The minimum price of the first bid"
  reservePrice: BigInt;

  // "The sale percentage to send to the curator"
  curatorFeePercentage: number;

  // "The address that should receive the funds once the NFT is sold"
  tokenOwner: User;

  // "The address of the auction's curator"
  curator: User;

  // "The address of the ERC-20 currency to run the auction with, or 0x0 for ETH"
  auctionCurrency: Currency;

  status: ReserveAuctionStatus;

  // "The current bid on this auction"
  currentBid: ReserveAuctionBid;

  // "The previous bids on this auction"
  // @derivedFrom(field: "reserveAuction")
  previousBids: InactiveReserveAuctionBid[];

  // "The time the auction was approved"
  approvedTimestamp: BigInt;

  // "The number of the block the auction was Approved"
  approvedBlockNumber: BigInt;

  // "The timestamp of the block the Transfer was created in"
  createdAtTimestamp: BigInt;

  // "The number of the block the Transfer was created in"
  createdAtBlockNumber: BigInt;

  // "The timestamp at which the auction end function was called"
  finalizedAtTimestamp: BigInt;

  // "The block number at which the auction end function was called"
  finalizedAtBlockNumber: BigInt;
};

// export type Post = {
//   metadata: ;
// }
