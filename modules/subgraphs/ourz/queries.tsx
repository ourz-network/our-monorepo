/* eslint-disable no-param-reassign */
import { gql, DocumentNode } from "@apollo/client"; // graphql query language

/**
 * Returns gql query to retrieve specific Proxy's Split Recipients
 * @param {Number} proxyAddress Proxy information to retrieve
 * @returns {gql} query with template string embedded
 */
export const RECIPIENTS_BY_ID = (proxyAddress: string): DocumentNode => {
  proxyAddress = proxyAddress.toString().toLowerCase();
  return gql`
    {
      ourProxy(id: "${proxyAddress}") {
        splitRecipients {
          user { id }
          name
          role
          shares
          allocation
          ethClaimed
        }
      } 
    }
  `;
};

/**
 * Returns gql query to retrieve all Split Proxies by owner
 * @param {String} owner address
 * @returns {gql} query with template string embedded
 */
export const SPLITS_BY_OWNER = (owner: string): DocumentNode => {
  owner = owner.toString().toLowerCase();
  return gql`
    {
      user(id: "${owner}") {
        ownedProxies {
          id
          nickname
          proxyOwners {
            id
          }
          splitRecipients {
            user {
              id
            }
            name
            role
            shares
            allocation
            ethClaimed
            claimableETH
          }
          creations {
            tokenId
            contract {
              id
            }
          }
          ETH
          needsIncremented
        }
      } 
    }
  `;
};

/**
 * Returns gql query to retrieve all Split Proxies by recipient
 * @param {String} recipient address
 * @returns {gql} query with template string embedded
 */
export const SPLITS_BY_RECIPIENT = (recipient: string): DocumentNode => {
  recipient = recipient.toString().toLowerCase();
  return gql`
    {
      user(id: "${recipient}") {
        recipientInfo {
          splitProxy {
            id
            nickname
            proxyOwners {
              id
            }
            splitRecipients {
              user {
                id
              }
              name
              role
              shares
              allocation
              ethClaimed
            }
            creations {
              tokenId
              contract {
                id
              }
            }
            ETH
          }
          name
          role
          shares
          allocation
          ethClaimed
        }
      }
    }
  `;
};

/**
 * Calculates maximum number of Zora media items
 * @param {Object[]} users
 * @returns {Number} max number of Zora media items
 */
// export const calculateLatestCreation = (users) => {
//   // Collect all users
//   const allUsers = users.users;
//   let allCreationIDs = [];

//   // For each user
//   for (const user of allUsers) {
//     // If user has creations
//     if (user.creations && user.creations.length > 0) {
//       // For each creation
//       for (const creation of user.creations) {
//         // Push creation ID (cast to int) to allCreationIDs
//         allCreationIDs.push(parseInt(creation.id));
//       }
//     }
//   }
//   // Return max creation ID
//   return Math.max(...allCreationIDs);
// };
