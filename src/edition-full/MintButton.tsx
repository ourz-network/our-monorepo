import { Fragment, useContext } from "react";

import { ZORA_SITE_URL_BASE } from "../constants/media-urls";
import { useMediaContext } from "../context/useMediaContext";
import { Button } from "../components/Button";
import { EditionDataContext } from "../context/EditionDataContext";
import { AuctionType } from "@zoralabs/nft-hooks";
import type { StyleProps } from "../utils/StyleTypes";

type MintButtonProps = {
  allowOffer?: boolean;
} & StyleProps;

export const MintButton = ({ allowOffer, className }: MintButtonProps) => {
  const { edition } = useContext(EditionDataContext);
  const { getString, getStyles } = useMediaContext();

  if (!edition) {
    return <Fragment />;
  }

  // Disable offer functionality if not a zora NFT or if offers are disabled
  // if (
  //   (allowOffer === false || !("zoraNFT" in edition.data) || edition.data.zoraNFT === undefined) &&
  //   edition.data.pricing.auctionType !== AuctionType.RESERVE
  // ) {
  //   return <Fragment />;
  // }

  // function getBidURLParts() {
  //   const data = edition.data;
  //   if (!data) {
  //     return;
  //   }
  //   if (data.pricing.auctionType !== AuctionType.RESERVE && data.edition.contract.knownContract !== "zora") {
  //     return;
  //   }
  //   return [
  //     ZORA_SITE_URL_BASE,
  //     "collections",
  //     data.edition.contract.address,
  //     data.edition.tokenId,
  //     data.pricing.auctionType === AuctionType.RESERVE ? "auction/bid" : "offer",
  //   ];
  // }

  // const bidURL = getBidURLParts()?.join("/");

  // if (!bidURL) {
  //   return <Fragment />;
  // }

  return (
    <>MINT</>
    // <div {...getStyles("fullMintButton", className)}>
    //   <Button primary={true} href={bidURL}>
    //     {getString(edition.data.pricing.auctionType === AuctionType.RESERVE ? "PLACE_BID" : "PLACE_OFFER")}
    //   </Button>
    // </div>
  );
};
