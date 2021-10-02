import { ApolloQueryResult } from "@apollo/client";
import ourzSubgraph from "./index"; // Apollo Client
import {
  ALL_TOKENS,
  SPLITS_BY_OWNER,
  SPLITS_BY_RECIPIENT,
  RECIPIENTS_BY_ID,
  ALL_USER_ADDRESSES,
  ALL_PROXY_ADDRESSES,
} from "./queries"; // GraphQL Queries
import { OurProxy, NFTContract, SplitZNFT, ERC20Transfer, User, SplitRecipient } from "./types";

interface Data {
  ourProxy?: OurProxy;
  ourProxies?: OurProxy[];
  user?: User;
  users?: User[];
  splitZNFT?: SplitZNFT;
  splitZNFTs?: SplitZNFT[];
}

export const getAllProfilePaths = async (): Promise<string[]> => {
  const queryUsers = await ourzSubgraph.query({
    query: ALL_USER_ADDRESSES(),
  });
  const queryProxies = await ourzSubgraph.query({
    query: ALL_PROXY_ADDRESSES(),
  });

  const addresses: string[] = [];
  if (queryUsers.data && queryProxies.data) {
    const { users } = queryUsers.data;
    const { ourProxies } = queryProxies.data;

    await users.map((user) => addresses.push(user.id));
    await ourProxies.map((proxy) => addresses.push(proxy.id));
  }
  return addresses;
};

export const getAllOurzTokens = async (): Promise<SplitZNFT[]> => {
  const query: ApolloQueryResult<Data> = await ourzSubgraph.query({
    query: ALL_TOKENS(),
  });

  const { splitZNFTs } = query.data;
  return splitZNFTs;
};

/**
 * Collect Split Proxies owned by a specific address
 * @param {String} owner ethereum address
 * @returns {Object} containing all split contracts owned by owner
 */
export const getSplitRecipients = async (proxyAddress: string): Promise<SplitRecipient[]> => {
  const query: ApolloQueryResult<Data> = await ourzSubgraph.query({
    query: RECIPIENTS_BY_ID(proxyAddress),
  });

  const { ourProxy } = query.data;
  if (ourProxy?.splitRecipients) {
    return ourProxy.splitRecipients;
    // returns:
    //  [{
    //    "allocation": "#",
    //    "ethClaimed": #,
    //    "name": "",
    //    "role": "",
    //    "shares": "#",
    //    "user": {
    //      "id": "0x00"}}]
  }
  return null;
};

/**
 * Collect Split Proxies owned by a specific address
 * @param {String} ownerAddress ethereum address
 * @returns {Object} containing all split contracts owned by owner
 */
export const getOwnedSplits = async (ownerAddress: string): Promise<OurProxy[]> => {
  const query = await ourzSubgraph.query({
    query: SPLITS_BY_OWNER(ownerAddress),
  });

  const { user } = query.data;
  if (user.ownedProxies) {
    return user.ownedProxies;
    // returns:
    //  [{
    //     "id": "0x00", // ADDRESS OF SPLIT CONTRACT
    //     "proxyOwners": [ // OTHER OWNERS IF ANY
    //       {
    //         "id": "0x00"
    //       }
    //     ],
    //     "ETH": 0, // ETH AVAILABLE TO BE CLAIMED
    //     "creations": [{ // NFTS TOKENIDS AND CONTRACT ADDRESSES
    //        "tokenID": #
    //      }, {
    //        "contract": {
    //          "id": "0x00"
    //        }
    //     }],
    //     "splitRecipients": [ // SPLIT RECIPIENT METADATA
    //       {
    //         "allocation": #,
    //         "ethClaimed": #,
    //         "name": "",
    //         "role": "",
    //         "shares": "",
    //         "user": {
    //           "id": "0x00"}}]}]}}}
  }
  return null;
};

/**
 * Collect Split Proxies claimable by a specific address
 * @param {String} recipientAddress ethereum address
 * @returns {Object} containing all split contracts claimable by recipient
 */
export const getClaimableSplits = async (recipientAddress: string): Promise<SplitRecipient[]> => {
  const query: ApolloQueryResult<Data> = await ourzSubgraph.query({
    query: SPLITS_BY_RECIPIENT(recipientAddress),
  });

  const { user } = query.data;
  if (user.recipientInfo) {
    return user.recipientInfo;
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
