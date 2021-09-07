import { useState, useEffect, CSSProperties } from "react";
import { NFTData } from "./types";
import Embed from "./Embed";

import styles from "./nfteStyles.module.css";

export const css = styles;

declare const API_HOST: string;

export function NFTE({
  contract,
  tokenId,
  initialData,
  className,
  style,
  darkMode,
  autoPlay = true,
  children,
  apiUrl = "https://nfte.app/api/nft-data",
  // Ourz
  galleryType,
  calcAspectRatio,
}: {
  contract: string;
  tokenId: string;
  initialData?: NFTData;
  className?: string;
  style?: CSSProperties;
  darkMode?: boolean;
  autoPlay?: boolean;
  apiUrl?: string;
  galleryType: string;
  calcAspectRatio: () => {};
  children?: (props: {
    data: NFTData | undefined;
    className?: string;
    style?: CSSProperties;
    darkMode?: boolean;
    autoPlay: boolean;
    // galleryType: string
    // calcAspectRatio: object
  }) => JSX.Element;
}) {
  const [data, setData] = useState<NFTData | undefined>(initialData);
  useEffect(() => {
    if (initialData || !contract || !tokenId) return;
    async function fetchNftData() {
      setData(undefined);
      const r = await fetch(
        `${apiUrl}?contract=${contract}&tokenId=${tokenId}`
      );

      if (r.ok) {
        const data = await r.json();

        setData(data);
      }
    }

    fetchNftData();
  }, [apiUrl, contract, initialData, tokenId]);
  const component = Embed;

  return component({
    data,
    className,
    style,
    darkMode,
    autoPlay,
    galleryType,
    calcAspectRatio,
  });
}
