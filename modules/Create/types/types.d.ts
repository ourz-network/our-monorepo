import { Ourz20210928 } from "@/modules/Create/types/20210928";

export interface FormSplitRecipient {
  id: string | number;
  account: string;
  name: string;
  role: string;
  shares: number;
}

export interface ZNFTEdition {
  name: string;
  symbol: string;
  description: string;
  animation_url: string;
  image_url: string;
  editionSize: number;
  royaltyBPS: number;
}

export interface MintForm {
  mintKind: "1/1" | "1/1 Auction" | "Edition";
  media: {
    file: File;
    mimeType: string;
    preview: string | URL;
    blob: string | ArrayBuffer;
  };
  metadata: Ourz20210928 | ZNFTEdition;
  creatorBidShare: number;
  splitMetadata?: SplitRecipient[];
  auctionInfo?: {
    reservePrice: number;
    duration: number;
    auctionCurrency: string;
  };
}
