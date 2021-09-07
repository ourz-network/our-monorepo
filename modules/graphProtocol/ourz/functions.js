import ourzSubgraph from "./index"; // Apollo Client
import { SPLITS_BY_OWNER, RECIPIENTS_BY_ID } from "./queries"; // GraphQL Queries

/**
 * Collect Split Proxies owned by a specific address
 * @param {String} owner ethereum address
 * @returns {Object} containing all split contracts owned by owner
 */
export const getSplitRecipients = async (proxyAddress) => {
  console.log(`Getting Split Recipients for: ${proxyAddress}...`);
  const query = await ourzSubgraph.query({
    query: RECIPIENTS_BY_ID(proxyAddress),
  });

  const data = await query.data;
  if (data?.ourProxy?.splitRecipients) {
    return data.ourProxy.splitRecipients;
    //returns:
    //  [{
    //    "allocation": "#",
    //    "ethClaimed": #,
    //    "name": "",
    //    "role": "",
    //    "shares": "#",
    //    "user": {
    //      "id": "0x00"}}]
  } else return null;
};

/**
 * Collect Split Proxies owned by a specific address
 * @param {String} owner ethereum address
 * @returns {Object} containing all split contracts owned by owner
 */
export const getOwnedSplits = async (owner) => {
  console.log(`Getting owned Splits for: ${owner}...`);
  const query = await ourzSubgraph.query({
    query: SPLITS_BY_OWNER(owner),
  });

  const data = await query.data;
  if (data?.user?.ownedProxies) {
    // console.log(`${owner}'s Splits:`, data.user.ownedProxies);
    return data.user.ownedProxies;
    //returns:
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
  } else return null;
};

/**
 * Collect Split Proxies owned by a specific address
 * @param {String} proxyAddress ethereum address of proxy
 * @returns {Object} containing all split recipients
 */
// export const parseSplitRecipients = async (proxyAddress) => {
//   console.log(`Parsing recipients for Split: ${proxyAddress}...`);

//   const query = await ourzSubgraph.query({
//     query: RECIPIENTS_BY_ID(proxyAddress),
//   });
//   console.log(`Got back this... \n`, query);

//   const stringified = await query.data.ourProxies;
//   console.log(`Stringified: ${stringified}`);

//   try {
//     const parsed = JSON.parse(stringified);

//     if (parsed) {
//       console.log(`Parsed: ${parsed}`);
//       return parsed;
//     }
//   } catch (error) {
//     return null;
//   }
// };
