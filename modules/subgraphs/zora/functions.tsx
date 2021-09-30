/* eslint-disable consistent-return */
import { ApolloQueryResult } from "@apollo/client";
import axios, { AxiosResponse } from "axios"; // Requests
import zoraSubgraph from "./index"; // Apollo Client
import { ZORA_MEDIA_BY_ID } from "./queries"; // GraphQL Queries
import {
  Media,
  User,
  Ask,
  Bid,
  InactiveBid,
  InactiveAsk,
  Currency,
  Transfer,
  URIUpdate,
  ReserveAuctionBid,
  ReserveAuction,
} from "./types";
import { Ourz20210928 } from "./20210928";

interface Data {
  media: Media;
}

/**
 * Collect Zora media post by ID
 * @param {Number} id post number
 * @returns {Object} containing Zora media details
 */
const getPostByID = async (id: number): Promise<Media> => {
  // Collect post
  const query: ApolloQueryResult<Data> = await zoraSubgraph.query({
    query: ZORA_MEDIA_BY_ID(id),
  });

  const { media } = query.data;
  if (media) {
    // Collect post metadata
    try {
      const res: AxiosResponse<Ourz20210928> = await axios.get(media.metadataURI, {
        timeout: 10000,
      });
      const metadata = res.data;
      // Only show posts with MimeType
      if (!metadata.mimeType) {
        return undefined;
      }

      if (metadata?.external_url !== "www.ourz.network") {
        return undefined;
      }

      const post = { metadata, ...media };

      // If text media, collect post content
      if (metadata.mimeType.startsWith("text")) {
        const text: AxiosResponse<string> = await axios.get(post.contentURI);
        post.contentURI = text.data;
      }

      // Return post
      return post;
    } catch (e) {
      return null;
    }
  } else return null;
};

export default getPostByID;
