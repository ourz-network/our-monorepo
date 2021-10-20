import { ApolloQueryResult } from "@apollo/client";
import zoraSubgraph from "./index";
import { ZORA_MEDIA_BY_CREATOR, ZORA_MEDIA_BY_ID, ZORA_MEDIA_BY_OWNER } from "./queries";
import { Media } from "@/utils/ZoraSubgraph";
import { formatUniquePost, NFTCard } from "../utils";

interface Data {
  media?: Media;
  medias?: Media[];
}

/**
 * Collect Zora media post by ID
 * @param {Number} id post number
 * @returns {Object} containing Zora media details
 */
export const getPostByID = async (id: number): Promise<NFTCard | null> => {
  const query: ApolloQueryResult<Data> = await zoraSubgraph.query({
    query: ZORA_MEDIA_BY_ID(id),
  });
  if (!query.data.media) return null;

  const post = await formatUniquePost(query.data.media);
  return post;
};

/**
 * Collect Zora media post by ID
 * @param {Number} id post number
 * @returns {Object} containing Zora media details
 */
export const getPostsByOwner = async (owner: string): Promise<(NFTCard | null)[]> => {
  const query: ApolloQueryResult<Data> = await zoraSubgraph.query({
    query: ZORA_MEDIA_BY_OWNER(owner),
  });
  if (!query.data.medias) return [];

  const posts: (NFTCard | null)[] = [];
  await Promise.all(
    query.data.medias.map(async (media: Media) => {
      const post = await formatUniquePost(media);
      posts.push(post);
    })
  );

  return posts;
};

export const getPostsByCreator = async (creator: string): Promise<(NFTCard | null)[]> => {
  const query: ApolloQueryResult<Data> = await zoraSubgraph.query({
    query: ZORA_MEDIA_BY_CREATOR(creator),
  });
  if (!query.data.medias) return [];

  const posts: (NFTCard | null)[] = [];
  await Promise.all(
    query.data.medias.map(async (media: Media) => {
      const post = await formatUniquePost(media);
      posts.push(post);
    })
  );

  return posts;
};
