import ourzSubgraph from "./index"; // Apollo Client
import { SPLITS_BY_OWNER, SPLITS_BY_RECIPIENT, RECIPIENTS_BY_ID } from "./queries"; // GraphQL Queries

/**
 * Collect Split Proxies owned by a specific address
 * @param {String} owner ethereum address
 * @returns {Object} containing all split contracts owned by owner
 */
export const getSplitRecipients = async (proxyAddress) => {
  const query = await ourzSubgraph.query({
    query: RECIPIENTS_BY_ID(proxyAddress),
  });

  const data = await query.data;
  if (data?.ourProxy?.splitRecipients) {
    return data.ourProxy.splitRecipients;
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
export const getOwnedSplits = async (ownerAddress) => {
  const query = await ourzSubgraph.query({
    query: SPLITS_BY_OWNER(ownerAddress),
  });

  const data = await query.data;
  if (data?.user?.ownedProxies) {
    return data.user.ownedProxies;
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
export const getClaimableSplits = async (recipientAddress) => {
  const query = await ourzSubgraph.query({
    query: SPLITS_BY_RECIPIENT(recipientAddress),
  });

  const data = await query.data;
  if (data?.user?.recipientInfo) {
    return data.user.recipientInfo;
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
