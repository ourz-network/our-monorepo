import { Networks } from "@zoralabs/nft-hooks";

import { AuctionHouseList } from "./auction-house/AuctionHouseList";
import { MediaConfiguration } from "./context/MediaConfiguration";
import * as MediaRenderers from "./content-components";
import * as RendererConfigTypes from "./content-components/RendererConfig";
import { NFTDataProvider } from "./context/NFTDataProvider";
import { MediaObject } from "./components/MediaObject";
import { NFTDataContext } from "./context/NFTDataContext";
import { NFTPreview, PreviewComponents } from "./nft-preview";
import { NFTFullPage, FullComponents } from "./nft-full";
import { EditionFullPage, EditionComponents } from "./edition-full";
import { SplitFullPage, SplitComponents } from "./split-full";
import { SplitPreview } from "./split-preview";

export {
  // Constant list of all networks
  Networks,
  // Contextual wrapper component for media configuration
  MediaConfiguration,
  // Auction house helper for listing curated NFTs
  AuctionHouseList,
  // Media rendering component
  // Preview thumbnail renderer
  NFTPreview,
  PreviewComponents,
  // Full Page renderer
  NFTFullPage,
  FullComponents,
  // NFT-Editions
  EditionFullPage,
  EditionComponents,
  // Splits
  // SplitDashboard
  SplitFullPage,
  SplitComponents,
  SplitPreview,
  // Generic data wrapper
  NFTDataProvider,
  // Data context for fetching NFT info with custom components
  NFTDataContext,
  MediaObject,
  // Renderers and default array for configuration
  MediaRenderers,
  RendererConfigTypes,
};
