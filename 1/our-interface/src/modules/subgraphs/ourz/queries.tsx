/* eslint-disable no-param-reassign */
import { gql, DocumentNode } from "@apollo/client"; // graphql query language

/**
 * Returns gql query to retrieve all known Zora 1/1's minted by a split contract
 * @returns {gql} query with template string embedded
 */
export const ALL_TOKENS = (): DocumentNode => gql`
  {
    splitZNFTs(first: 100) {
      id
      creator {
        id
        nickname
      }
    }
  }
`;

/**
 * Returns gql query to retrieve all known Zora 1/1's minted by a split contract
 * @returns {gql} query with template string embedded
 */
export const ALL_EDITIONS = (): DocumentNode => gql`
  {
    splitEditions(first: 100) {
      id
      creator {
        id
        nickname
      }
      name
      symbol
      description
      animationUrl
      imageUrl
      editionSize
      royaltyBPS
    }
  }
`;

/**
 * Returns gql query to retrieve all known EOA addresses related to a Split
 * @returns {gql} query with template string embedded
 */
export const ALL_USER_ADDRESSES = (): DocumentNode => gql`
  {
    users(first: 1000) {
      id
    }
  }
`;
/**
 * Returns gql query to retrieve all known Split Proxy contracts
 * @param {Number} proxyAddress Proxy information to retrieve
 * @returns {gql} query with template string embedded
 */
export const ALL_PROXY_ADDRESSES = (): DocumentNode => gql`
  {
    splits(first: 1000) {
      id
    }
  }
`;

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
        claimedETH
        ownedSplits {
          id
          nickname
          ETH
          needsIncremented
          owners { id }
          creator { id }
          creations {
            id
          }
          editions {
            id
            creator { 
              id
              nickname
            }
            name
            symbol
            description
            animationUrl
            imageUrl
            editionSize
            royaltyBPS
          }
          recipients {
            user { id }
            name
            role
            shares
            allocation
            claimableETH
            claimedETH
          }
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
        claimedETH
        recipientInfo {
          split {
            id
            nickname
            ETH
            needsIncremented
            owners { id }
            creator { id }
            creations {
              id
            }
            editions {
              id
              creator { 
                id
                nickname
              }
              name
              symbol
              description
              animationUrl
              imageUrl
              editionSize
              royaltyBPS
            }
            recipients {
              user { id }
              name
              role
              shares
              allocation
              claimableETH
              claimedETH
            }
          }
          name
          role
          shares
          allocation
          claimableETH
          claimedETH
        }
      }
    }
  `;
};

/**
 * Returns gql query to retrieve metadata of Edition
 * @param {Number} editionAddress The address of the Edition Contract
 * @returns {gql} query with template string embedded
 */
export const EDITION_INFO = (editionAddress: string): DocumentNode => {
  editionAddress = editionAddress.toLowerCase();

  return gql`
    {
      splitEdition(id: "${editionAddress}") {
        id
        creator {
          id
          nickname
          owners {
             id
          }
          recipients {
            user { id }
            name
            role
            shares
            allocation
            claimedETH
            claimableETH
          }
        }
        name
        symbol
        description
        animationUrl
        imageUrl
        editionSize
        royaltyBPS
      }
    }
  `;
};

/**
 * Returns gql query to retrieve specific Proxy's Split Recipients
 * @param {Number} proxyAddress Proxy information to retrieve
 * @returns {gql} query with template string embedded
 */
export const RECIPIENTS_BY_ID = (proxyAddress: string): DocumentNode => {
  proxyAddress = proxyAddress.toString().toLowerCase();
  return gql`
    {
      split(id: "${proxyAddress}") {
        owners { id }
        recipients {
          user { id }
          name
          role
          shares
          allocation
          claimedETH
        }
      } 
    }
  `;
};
