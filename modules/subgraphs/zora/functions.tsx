/* eslint-disable consistent-return */
import axios from "axios"; // Requests
import zoraSubgraph from "./index"; // Apollo Client
import { ZORA_MEDIA_BY_ID } from "./queries"; // GraphQL Queries

/**
 * Collect Zora media post by ID
 * @param {Number} id post number
 * @returns {Object} containing Zora media details
 */
const getPostByID = async (id) => {
  // Collect post
  const query = await zoraSubgraph.query({
    query: ZORA_MEDIA_BY_ID(id),
  });

  const media = await query.data.media;
  if (media) {
    // Collect post metadata

    try {
      const res = await axios.get(media.metadataURI, { timeout: 10000 });
      const metadata = await res.data;
      if (metadata) {
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
          const text = await axios.get(post.contentURI);
          post.contentURI = text.data;
        }

        // Return post
        return post;
      }
    } catch (e) {
      return null;
    }
  } else return null;
};

export default getPostByID;
