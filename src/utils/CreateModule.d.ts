import { MediaData } from "@zoralabs/zdk";
import { Ourz20210928 } from "./20210928";

export interface FormSplitRecipient {
  id: unknown;
  account: string;
  name: string;
  role: string;
  shares: number;
}

export interface ZNFTEdition {
  name: string;
  symbol: string;
  description: string;
  animationUrl?: string;
  animationHash: BytesLike;
  imageUrl?: string;
  imageHash: BytesLike;
  editionSize: BigNumberish;
  royaltyBPS: BigNumberish;
}

export interface MintForm {
  mintKind: "1/1" | "1/1 Auction" | "Edition";
  media: {
    file: File | null;
    mimeType: string;
    preview: string | URL;
    blob: string | ArrayBuffer | null;
  };
  metadata: Ourz20210928 | ZNFTEdition;
  creatorBidShare: number;
  auctionInfo?: {
    reservePrice: number;
    duration: number;
  };
}
