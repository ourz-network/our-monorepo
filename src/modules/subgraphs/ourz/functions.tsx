import { ApolloQueryResult } from "@apollo/client";
import ourzSubgraph from "./index"; // Apollo Client
import {
  ALL_TOKENS,
  ALL_EDITIONS,
  ALL_USER_ADDRESSES,
  ALL_PROXY_ADDRESSES,
  SPLITS_BY_OWNER,
  SPLITS_BY_RECIPIENT,
  EDITION_INFO,
  RECIPIENTS_BY_ID,
} from "./queries"; // GraphQL Queries
import { OurProxy, SplitZNFT, SplitEdition, User, SplitRecipient } from "@/utils/OurzSubgraph";

interface Data {
  ourProxy?: OurProxy;
  ourProxies?: OurProxy[];
  user?: User;
  users?: User[];
  splitZNFT?: SplitZNFT;
  splitZNFTs?: SplitZNFT[];
  splitEdition?: SplitEdition;
  splitEditions?: SplitEdition[];
}

// const Subgraph = ourzSubgraph

export const getAllProfilePaths = async (): Promise<string[] | null> => {
  const queryUsers: ApolloQueryResult<Data> = await ourzSubgraph.query({
    query: ALL_USER_ADDRESSES(),
  });
  const queryProxies: ApolloQueryResult<Data> = await ourzSubgraph.query({
    query: ALL_PROXY_ADDRESSES(),
  });

  const addresses: string[] = [];
  if (queryUsers?.data && queryProxies?.data) {
    const { users } = queryUsers.data;
    const { ourProxies } = queryProxies.data;

    users.map((user) => addresses.push(user.id));
    ourProxies.map((proxy) => addresses.push(proxy.id));
  }
  return addresses;
};

export const getAllOurzTokens = async (): Promise<SplitZNFT[] | undefined> => {
  const query: ApolloQueryResult<Data> = await ourzSubgraph.query({
    query: ALL_TOKENS(),
  });

  const { splitZNFTs } = query.data;
  return splitZNFTs;
};

export const getAllOurzEditions = async (): Promise<SplitEdition[] | undefined> => {
  const query: ApolloQueryResult<Data> = await ourzSubgraph.query({
    query: ALL_EDITIONS(),
  });

  const { splitEditions } = query.data;
  return splitEditions;
};

/**
 * Collect Split Proxies owned by a specific address
 * @param {String} owner ethereum address
 * @returns {Object} containing all split contracts owned by owner
 */
export const getSplitRecipients = async (
  proxyAddress: string
): Promise<SplitRecipient[] | null> => {
  const query: ApolloQueryResult<Data> = await ourzSubgraph.query({
    query: RECIPIENTS_BY_ID(proxyAddress),
  });

  const { ourProxy } = query.data;
  if (ourProxy?.splitRecipients) {
    return ourProxy.splitRecipients;
  }
  return null;
};

/**
 * Collect Split Proxies owned by a specific address
 * @param {String} ownerAddress ethereum address
 * @returns {Object} containing all split contracts owned by owner
 */
export const getOwnedSplits = async (ownerAddress: string): Promise<OurProxy[] | null> => {
  const query: ApolloQueryResult<Data> = await ourzSubgraph.query({
    query: SPLITS_BY_OWNER(ownerAddress),
  });

  const { user } = query.data;
  if (user?.ownedProxies) {
    return user.ownedProxies;
  }
  return null;
};

/**
 * Collect Split Proxies claimable by a specific address
 * @param {String} recipientAddress ethereum address
 * @returns {Object} containing all split contracts claimable by recipient
 */
export const getClaimableSplits = async (
  recipientAddress: string
): Promise<SplitRecipient[] | null> => {
  const query: ApolloQueryResult<Data> = await ourzSubgraph.query({
    query: SPLITS_BY_RECIPIENT(recipientAddress),
  });

  const { user } = query.data;
  if (user?.recipientInfo) {
    return user.recipientInfo;
  }
  return null;
};

/**
 * Collect metadata for an Edition Contract
 * @param {String} editionAddress ethereum address
 * @returns {Object} containing metadata
 */
export const getEditionMetadata = async (editionAddress: string): Promise<SplitEdition | null> => {
  const query: ApolloQueryResult<Data> = await ourzSubgraph.query({
    query: EDITION_INFO(editionAddress),
  });

  const { splitEdition } = query.data;
  if (splitEdition) {
    return splitEdition;
  }
  return null;
};

/**
 * Collect Split Proxies owned by a specific address
 * @param {String} proxyAddress ethereum address of proxy
 * @returns {Object} containing all split recipients
 */
// export const parseSplitRecipients = async (proxyAddress) => {

//   const query = await ourzSubgraph.query({
//     query: RECIPIENTS_BY_ID(proxyAddress),
//   });

//   const stringified = await query.data.ourProxies;

//   try {
//     const parsed = JSON.parse(stringified);

//     if (parsed) {
//       return parsed;
//     }
//   } catch (error) {
//     return null;
//   }
// };
