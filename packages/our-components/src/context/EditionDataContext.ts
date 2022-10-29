import { createContext } from "react";
import type { useEditionType } from "@ourz/our-hooks";

export type EditionDataContext = {
  edition: useEditionType;
};

const DEFAULT_OBJECT = {
  loading: true,
  error: undefined,
};

export const EditionDataContext = createContext<EditionDataContext>({
  edition: { ...DEFAULT_OBJECT, editionLoaded: false },
});
