import { useEdition, useEditionType } from "our-hooks";
import { EditionDataContext } from "./EditionDataContext";

export type EditionDataProviderProps = {
  contract: string;
  useBetaIndexer?: boolean;
  refreshInterval?: number;
  children: React.ReactNode;
  initialData?:
    | {
        edition?: useEditionType["data"];
        totalSupply?: number;
      }
    | any;
};

export const EditionDataProvider = ({
  children,
  contract,
  refreshInterval,
  initialData,
}: EditionDataProviderProps) => {
  const { edition: editionInitial } = initialData || {};

  const edition = useEdition(contract, {
    initialData: editionInitial,
    refreshInterval: refreshInterval,
  });

  return (
    <EditionDataContext.Provider value={{ edition }}>
      {children}
    </EditionDataContext.Provider>
  );
};
