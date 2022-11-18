import { useSplit, useSplitType } from "our-hooks";
import { SplitDataContext } from "./SplitDataContext";

export type SplitDataProviderProps = {
  splitAddress: string;
  useBetaIndexer?: boolean;
  refreshInterval?: number;
  children: React.ReactNode;
  initialData?:
    | {
        split?: useSplitType["data"];
      }
    | any;
};

export const SplitDataProvider = ({
  children,
  splitAddress,
  refreshInterval,
  initialData,
}: SplitDataProviderProps) => {
  const { Split: splitInitial } = initialData || {};

  const split = useSplit(splitAddress, {
    initialData: splitInitial,
    refreshInterval: refreshInterval,
  });

  return (
    <SplitDataContext.Provider value={{ split }}>
      {children}
    </SplitDataContext.Provider>
  );
};
