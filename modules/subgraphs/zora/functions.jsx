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
  // console.log(id);
  // Collect post
  const query = await zoraSubgraph.query({
    query: ZORA_MEDIA_BY_ID(id),
  });

  const media = await query.data.media;
  if (media) {
    // Collect post metadata

    try {
      const res = await axios.get(media.metadataURI, { timeout: 10000 });
      // console.log(
      //   `Functions.js - getPostByID \nGetMetadata: ${id} \nres: `,
      //   res
      // );
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
        // console.log(
        //   `Functions.js - getPostByID \ntokenId: ${id} \npost: `,
        //   post
        // );

        // console.log(
        //   `Functions.js - getPostByID \ntokenId: ${id} \nmetadata: `,
        //   post.metadata
        // );
        // If text media, collect post content
        if (metadata.mimeType.startsWith("text")) {
          const text = await axios.get(post.contentURI);
          post.contentURI = text.data;
        }

        // console.log(`Functions.js - getPostByID \npost: `, post);
        // Return post
        return post;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  } else return null;
};

export default getPostByID;
