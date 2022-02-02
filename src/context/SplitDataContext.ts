import { createContext } from "react";
import type { useSplitType } from "@ourz/our-hooks";

export type SplitDataContext = {
  split: useSplitType;
};

const DEFAULT_OBJECT = {
  loading: true,
  error: undefined,
};

export const SplitDataContext = createContext<SplitDataContext>({
  split: { ...DEFAULT_OBJECT, splitLoaded: false },
});
