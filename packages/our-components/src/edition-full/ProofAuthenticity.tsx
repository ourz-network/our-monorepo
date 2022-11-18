import React, { useContext } from "react";

import { EditionDataContext } from "../context/EditionDataContext";
import {
  MEDIA_URL_BASE_BY_NETWORK,
  VIEW_ETHERSCAN_URL_BASE_BY_NETWORK,
} from "../constants/media-urls";
import { useMediaContext } from "../context/useMediaContext";
import { InfoContainer } from "./InfoContainer";
import type { StyleProps } from "../utils/StyleTypes";
import type { EditionDetailsFragment } from "our-hooks/dist/graph-queries/ourz-graph-types";

const ProofLink = ({
  href,
  children,
  styles,
}: {
  href?: string;
  children: string;
  styles: any;
}) => (
  <a {...styles} href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);

export const ProofAuthenticity = ({ className }: StyleProps) => {
  const {
    edition: { data },
  } = useContext(EditionDataContext);
  const { getString, getStyles, networkId } = useMediaContext();
  const linkStyles = getStyles("fullProofLink");

  const getContent = (edition: EditionDetailsFragment) => {
    // const infoURL = (data && "zoraNFT" in data && data?.zoraNFT?.contentURI) || data?.nft.metadataURI;
    // const infoUrlLabelText =
    //   infoURL?.includes("/ipfs/") || infoURL?.startsWith("ipfs://") ? "VIEW_IPFS" : "VIEW_METADATA";

    return (
      <React.Fragment>
        <ProofLink
          styles={linkStyles}
          href={`${VIEW_ETHERSCAN_URL_BASE_BY_NETWORK[networkId]}${edition.id}`}
        >
          {getString("ETHERSCAN_TXN")}
        </ProofLink>
        {/* {infoURL && (
          <ProofLink styles={linkStyles} href={infoURL}>
            {getString(infoUrlLabelText)}
          </ProofLink>
        )} */}
        {data && (
          <ProofLink
            styles={linkStyles}
            href={`${MEDIA_URL_BASE_BY_NETWORK[networkId]}${edition.creator}`}
          >
            {getString("VIEW_ZORA")}
          </ProofLink>
        )}
      </React.Fragment>
    );
  };

  return (
    <InfoContainer
      titleString="PROOF_AUTHENTICITY"
      bottomPadding={false}
      className={className}
    >
      <div {...getStyles("fullInfoProofAuthenticityContainer")}>
        {data && getContent(data)}
      </div>
    </InfoContainer>
  );
};
