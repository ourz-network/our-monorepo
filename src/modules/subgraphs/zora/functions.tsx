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
  const { data }: ApolloQueryResult<Data> = await zoraSubgraph.query({
    query: ZORA_MEDIA_BY_ID(id),
  });
  if (data?.media) {
    const post = await formatUniquePost(data.media);
    return post;
  }
  return null;
};

/**
 * Collect Zora media post by ID
 * @param {Number} id post number
 * @returns {Object} containing Zora media details
 */
export const getPostsByOwner = async (owner: string): Promise<(NFTCard | null)[] | null> => {
  const { data }: ApolloQueryResult<Data> = await zoraSubgraph.query({
    query: ZORA_MEDIA_BY_OWNER(owner),
  });
  if (data?.medias) {
    const posts: (NFTCard | null)[] = [];
    await Promise.all(
      data.medias.map(async (media: Media) => {
        const post = await formatUniquePost(media);
        posts.push(post);
      })
    );

    return posts;
  }
  return null;
};

export const getPostsByCreator = async (creator: string): Promise<(NFTCard | null)[] | null> => {
  const { data }: ApolloQueryResult<Data> = await zoraSubgraph.query({
    query: ZORA_MEDIA_BY_CREATOR(creator),
  });
  if (data?.medias) {
    const posts: (NFTCard | null)[] = [];
    await Promise.all(
      data.medias.map(async (media: Media) => {
        const post = await formatUniquePost(media);
        posts.push(post);
      })
    );

    return posts;
  }
  return null;
};
