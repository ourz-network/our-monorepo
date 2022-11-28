import { useMediaContext } from "../context/useMediaContext";
import { EditionDataProvider, EditionDataProviderProps } from "../context/EditionDataProvider";
import { useA11yIdPrefix } from "../utils/useA11yIdPrefix";
import type { StyleProps } from "../utils/StyleTypes";

import { ProofAuthenticity } from "./ProofAuthenticity";
import { MediaFull } from "./MediaFull";
import { SupplyInfo } from "./SupplyInfo";
import { SaleHistory } from "./SaleHistory";
import { CreatorEquity } from "./CreatorEquity";
import { MediaInfo } from "./MediaInfo";
import { MintButton } from "./MintButton";
import { CollectionTag } from "./CollectionTag";

type EditionFullPageProps = Omit<EditionDataProviderProps, "children"> & {
  children?: React.ReactNode;
  config?: {
    allowOffer?: boolean;
    showPerpetual?: boolean;
  };
} & StyleProps;

export const EditionFullPage = ({ children, config, className, ...wrapperProps }: EditionFullPageProps) => {
  const a11yIdPrefix = useA11yIdPrefix("media");
  const { getStyles, style } = useMediaContext();
  const {allowOffer} = config;
  const {showPerpetual} = config;

  const getChildren = () => {
    if (children) {
      return children;
    }

    return (
      <>
        <MediaFull a11yIdPrefix={a11yIdPrefix} />
        <div {...getStyles("fullPageDataGrid")}>
          {style.theme.useCollectionTag && <CollectionTag />}
          <MediaInfo a11yIdPrefix={a11yIdPrefix} />
          <MintButton allowOffer={allowOffer} />
          <SupplyInfo />
          <ProofAuthenticity />
          <SaleHistory showPerpetual={showPerpetual} />
          <CreatorEquity />
        </div>
      </>
    );
  };

  return (
    <EditionDataProvider {...wrapperProps}>
      <div {...getStyles("fullPage", className)}>{getChildren()}</div>
    </EditionDataProvider>
  );
};
