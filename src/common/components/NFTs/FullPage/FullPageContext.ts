import { createContext } from "react";
import { NFTCard } from "@/modules/subgraphs/utils";

interface SaleInfo {
  maxSupply: number;
  currentSupply: number;
  salePrice: number;
}

const FullPageContext = createContext<{
  post: NFTCard | undefined;
  saleInfo: SaleInfo | undefined;
}>({
  post: undefined,
  saleInfo: undefined,
});

export default FullPageContext;
