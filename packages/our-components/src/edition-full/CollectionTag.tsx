import { useContext } from "react";
import { css } from "@emotion/css";
import { useMediaContext } from "../context/useMediaContext";
import { EditionDataContext } from "../context/EditionDataContext";
import { Orb } from "../components/Orb";

export const CollectionTag = () => {
  const {
    edition: { data },
  } = useContext(EditionDataContext);

  const { getStyles } = useMediaContext();

  const getContent = () => {
    return (
      <a
        {...getStyles("colectionTagWrapper")}
        href={`https://zora.co/collections/${data?.id}`}
        target="_blank"
        rel="noreferrer">
        <div {...getStyles("collectionTagIcon")}>
          <Orb />
        </div>
        <span>Zora</span>
      </a>
    );
  };

  return (
    <div
      className={css`
        position: relative;
        display: flex;
        flex-direction: row;
      `}>
      {data ? getContent() : "..."}
    </div>
  );
};
