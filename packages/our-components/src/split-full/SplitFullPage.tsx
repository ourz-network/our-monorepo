import type { RecipientShortFragment } from "@ourz/our-hooks/dist/graph-queries/ourz-graph-types";
import React, { useContext } from "react";
import { SplitDataContext } from "../context/SplitDataContext";
import { SplitDataProvider, SplitDataProviderProps } from "../context/SplitDataProvider";
import { useMediaContext } from "../context/useMediaContext";
import type { StyleProps } from "../utils/StyleTypes";
import SplitPie from "./SplitPie";
import SplitTable from "./SplitTable";

type SplitFullPageProps = Omit<SplitDataProviderProps, "children"> & {
  children?: React.ReactNode;
} & StyleProps;

const SplitFullPage = ({ children, className, ...wrapperProps }: SplitFullPageProps): JSX.Element => {
  const {
    split: { data },
  } = useContext(SplitDataContext);

  const { getStyles, style } = useMediaContext();

  const getChildren = () => {
    if (children) {
      return children;
    }

    return (
      <>
        <div {...getStyles("fullPageDataGrid")}>
          <SplitPie recipients={data?.recipients as RecipientShortFragment[]} secondarySale={false} />
          <SplitTable recipients={data?.recipients as RecipientShortFragment[]} />
        </div>
      </>
    );
  };

  return (
    <SplitDataProvider {...wrapperProps}>
      <div {...getStyles("fullPage", className)}>{getChildren()}</div>
    </SplitDataProvider>
  );
};

export default SplitFullPage;
