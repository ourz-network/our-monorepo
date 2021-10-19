/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { ApolloQueryResult } from "@apollo/client";
import axios, { AxiosResponse } from "axios"; // Requests
import zoraSubgraph from "./index"; // Apollo Client
import { ZORA_MEDIA_BY_CREATOR, ZORA_MEDIA_BY_ID, ZORA_MEDIA_BY_OWNER } from "./queries"; // GraphQL Queries
import { Media } from "./ZoraSubgraph";
import { Ourz20210928 } from "@/Create/types/20210928";

interface Data {
  media?: Media;
  medias?: Media[];
}

const regexIPFS = /https:\/\/(?<IPFShash>\w+).ipfs.dweb.link/g;

const cleanURLs = (media: Media): Media => {
  const { contentURI, metadataURI } = media;

  const newMedia = { ...media };

  if (contentURI.match(regexIPFS)) {
    const { IPFShash } = regexIPFS.exec(contentURI).groups;
    newMedia.contentURI = `https://ipfs.io/ipfs/${IPFShash as string}`;
  }

  if (metadataURI.match(regexIPFS)) {
    const { IPFShash } = regexIPFS.exec(metadataURI).groups;
    newMedia.metadataURI = `https://ipfs.io/ipfs/${IPFShash as string}`;
  }

  media = newMedia;
  return media;
};

const fetchMetadata = async (metadataURI: string): Promise<Ourz20210928> => {
  const res: AxiosResponse<Ourz20210928> = await axios.get(metadataURI, {
    timeout: 10000,
  });

  return res.data;
};

const createPost = async (media: Media, metadata: Ourz20210928): Promise<Media | null> => {
  // Only show posts with MimeType
  if (!metadata.mimeType) {
    // eslint-disable-next-line no-console
    console.log(`Aborted: No MimeType`);
    return;
  }

  // if (metadata?.external_url !== "www.ourz.network") {
  // eslint-disable-next-line no-console
  // console.log(`Aborted: Not Ourz`);
  //   return;
  // }

  const post: Media & Ourz20210928 = { metadata, ...media };

  // If text media, collect post content
  if (metadata.mimeType.startsWith("text")) {
    const text: AxiosResponse<string> = await axios.get(post.contentURI);
    post.contentURI = text.data;
  }

  // Return post
  return post;
};

/**
 * Collect Zora media post by ID
 * @param {Number} id post number
 * @returns {Object} containing Zora media details
 */
export const getPostByID = async (id: number): Promise<Media & { metadata: Ourz20210928 }> => {
  // Collect post
  const query: ApolloQueryResult<Data> = await zoraSubgraph.query({
    query: ZORA_MEDIA_BY_ID(id),
  });

  let { media } = query.data;
  if (media) {
    media = cleanURLs(media);

    // Collect post metadata
    try {
      const metadata = await fetchMetadata(media.metadataURI);
      const post = await createPost(media, metadata);
      if (post) {
        return post;
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`getPostByID() Error: `, error);
    }
  }
};

/**
 * Collect Zora media post by ID
 * @param {Number} id post number
 * @returns {Object} containing Zora media details
 */
export const getPostsByOwner = async (
  owner: string
): Promise<Media & { metadata: Ourz20210928 }[]> => {
  // Collect post
  const query: ApolloQueryResult<Data> = await zoraSubgraph.query({
    query: ZORA_MEDIA_BY_OWNER(owner),
  });

  const { medias } = query.data;
  if (medias) {
    const posts: Media[] = [];
    await Promise.all(
      medias.map(async (media: Media) => {
        media = cleanURLs(media);

        try {
          const metadata = await fetchMetadata(media.metadataURI);
          const post = await createPost(media, metadata);
          if (post) {
            posts.push(post);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      })
    );
    return posts;
  }
};

export const getPostsByCreator = async (
  creator: string
): Promise<Media & { metadata: Ourz20210928 }[]> => {
  // Collect post
  const query: ApolloQueryResult<Data> = await zoraSubgraph.query({
    query: ZORA_MEDIA_BY_CREATOR(creator),
  });

  const { medias } = query.data;
  if (medias) {
    const posts: Media[] = [];
    await Promise.all(
      medias.map(async (media: Media) => {
        media = cleanURLs(media);

        try {
          const metadata = await fetchMetadata(media.metadataURI);
          const post = await createPost(media, metadata);
          if (post) {
            posts.push(post);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      })
    );
    return posts;
  }
};
