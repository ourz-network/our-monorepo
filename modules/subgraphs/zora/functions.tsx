/* eslint-disable no-console */
/* eslint-disable consistent-return */
import { ApolloQueryResult } from "@apollo/client";
import axios, { AxiosResponse } from "axios"; // Requests
import zoraSubgraph from "./index"; // Apollo Client
import { ZORA_MEDIA_BY_ID, ZORA_MEDIA_BY_OWNER } from "./queries"; // GraphQL Queries
import {
  Media,
  // User,
  // Ask,
  // Bid,
  // InactiveBid,
  // InactiveAsk,
  // Currency,
  // Transfer,
  // URIUpdate,
  // ReserveAuctionBid,
  // ReserveAuction,
} from "./types";
import { Ourz20210928 } from "@/modules/Create/types/20210928";

interface Data {
  media?: Media;
  medias?: Media[];
}

const fetchMetadata = async (metadataURI: string): Promise<Ourz20210928> => {
  const res: AxiosResponse<Ourz20210928> = await axios.get(metadataURI, {
    timeout: 10000,
  });
  return res.data;
};

const createPost = async (media: Media, metadata: Ourz20210928): Promise<Media | null> => {
  // Only show posts with MimeType
  if (!metadata.mimeType) {
    return;
  }

  if (metadata?.external_url !== "www.ourz.network") {
    return;
  }

  const post = { metadata, ...media };

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
export const getPostByID = async (id: number): Promise<Media> => {
  // Collect post
  const query: ApolloQueryResult<Data> = await zoraSubgraph.query({
    query: ZORA_MEDIA_BY_ID(id),
  });

  const { media } = query.data;
  if (media) {
    // Collect post metadata
    try {
      const metadata = await fetchMetadata(media.metadataURI);
      const post = await createPost(media, metadata);
      if (post) {
        return post;
      }
    } catch (error) {
      // console.log(error);
    }
  }
};

/**
 * Collect Zora media post by ID
 * @param {Number} id post number
 * @returns {Object} containing Zora media details
 */
export const getPostsByOwner = async (owner: string): Promise<Media[]> => {
  // Collect post
  const query: ApolloQueryResult<Data> = await zoraSubgraph.query({
    query: ZORA_MEDIA_BY_OWNER(owner),
  });

  const { medias } = query.data;
  if (medias) {
    const posts: Media[] = [];
    await Promise.all(
      medias.map(async (media: Media) => {
        try {
          const metadata = await fetchMetadata(media.metadataURI);
          const post = await createPost(media, metadata);
          if (post) {
            posts.push(post);
          }
        } catch (error) {
          // console.log(error);
        }
      })
    );
    return posts;
  }
};
