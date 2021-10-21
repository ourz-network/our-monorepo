/* eslint-disable prefer-destructuring */
import axios, { AxiosResponse } from "axios";
import { ethers } from "ethers";
import { Ourz20210928 } from "@/utils/20210928";
import { SplitEdition } from "@/utils/OurzSubgraph";
import { Media } from "@/utils/ZoraSubgraph";

export interface NFTCard {
  nftKind: "Edition" | "1/1";
  creator: string;
  tokenId?: string;
  editionAddress?: string;
  editionSize?: number;
  symbol?: string;
  name: string;
  description: string;
  mimeType: string;
  contentURI: string;
  royalty: string;
}

const regexIPFS = /https:\/\/(?<IPFShash>\w+).ipfs.dweb.link/g;

const sanitizeURLs = (URLs: string[]): string[] => {
  const cleanURLs: string[] = [];

  URLs.forEach((url) => {
    if (url?.length < 2) cleanURLs.push("error");

    if (url.match(regexIPFS)) {
      // const { IPFShash } = regexIPFS.exec(url).groups;
      cleanURLs.push(`https://ipfs.io/ipfs/${regexIPFS.exec(url).groups.IPFShash}`);
    }

    if (
      url.includes("ipfs") ||
      url.includes("fleek") ||
      url.includes("arweave") ||
      url.includes("mirror") ||
      url.includes("giphy") ||
      url.includes("pinata")
    ) {
      cleanURLs.push(url);
    } else {
      cleanURLs.push("error");
    }
  });

  return cleanURLs;
};

const fetchMetadata = async (metadataURI: string): Promise<Ourz20210928 | null> => {
  try {
    const { data }: AxiosResponse<Ourz20210928> = await axios.get(metadataURI, {
      timeout: 15000,
    });
    return data;
  } catch (error) {
    return null;
  }
};

export const formatUniquePost = async (nft: Media | null): Promise<NFTCard | null> => {
  if (!nft) return null;

  const cleanURLs = sanitizeURLs([`${nft.contentURI}`, `${nft.metadataURI}`]);
  if (cleanURLs[0] === "error" && cleanURLs[1] === "error") return null;

  const metadata = await fetchMetadata(cleanURLs[1]);

  if (!metadata) return null;

  if (!metadata.mimeType) {
    // eslint-disable-next-line no-console
    console.log(`Aborted: No MimeType`);
    return null;
  }

  if (metadata.mimeType.startsWith("text")) {
    // if (metadata?.external_url !== "www.ourz.network") {
    // console.log(`Aborted: Not Ourz`);
    //   return;
    // }

    const text: AxiosResponse<string> = await axios.get(nft.contentURI);
    cleanURLs[0] = text.data;
  }

  return {
    nftKind: "1/1",
    creator: nft.creator.id,
    tokenId: nft.id,
    name: metadata.name,
    description: metadata.description,
    mimeType: metadata.mimeType,
    contentURI: cleanURLs[0],
    royalty: ethers.utils.formatEther(nft.creatorBidShare),
  };
};

export const formatEditionPost = (nft: SplitEdition): NFTCard | null => {
  const cleanURLs = sanitizeURLs([`${nft.animationUrl}`, `${nft.imageUrl}`]);

  let mimeType;
  let contentURI;

  if (cleanURLs[0] !== "error") {
    contentURI = cleanURLs[0]; // animationUrl
    mimeType = "video";
  } else if (cleanURLs[1] !== "error") {
    contentURI = cleanURLs[1]; // imageUrl
    mimeType = "image";
  } else return null;

  return {
    nftKind: "Edition",
    creator: nft.creator.id,
    editionAddress: nft.id,
    editionSize: nft.editionSize as unknown as number,
    symbol: nft.symbol,
    name: nft.name,
    description: nft.description,
    mimeType,
    contentURI,
    royalty: ((nft.royaltyBPS as unknown as number) / 100).toString(),
  };
};
