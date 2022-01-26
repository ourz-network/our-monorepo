import { ApolloClient, ApolloQueryResult, NormalizedCacheObject } from '@apollo/client';
import { OurzMainnetSubgraph, OurzPolygonSubgraph, OurzRinkebySubgraph } from './index'; // Apollo Client
import { Split as SplitProxy } from './types/OurzSubgraph.d';
import { gql, DocumentNode } from '@apollo/client';

/**
 * Returns gql query to retrieve specific Proxy's owners,
 *    recipients, and windowIncrement status
 * @param {Number} proxyAddress Proxy information to retrieve
 * @returns {gql} query with template string embedded
 */
const INFO_BY_ID = (proxyAddress: string): DocumentNode => {
  proxyAddress = proxyAddress.toString().toLowerCase();
  return gql`
    {
      split(id: "${proxyAddress}") {
        owners { id }
        recipients {
          user { id }
          allocation
        }
        needsIncremented
      } 
    }
  `;
};

const ourzSubgraph = (chainId: number): ApolloClient<NormalizedCacheObject> => {
  switch (chainId) {
    case 1:
      return OurzMainnetSubgraph;
    case 4:
      return OurzRinkebySubgraph;
    case 137:
      return OurzPolygonSubgraph;
    default:
      return OurzMainnetSubgraph;
  }
};

interface Data {
  split: Pick<SplitProxy, 'owners' | 'recipients' | 'needsIncremented'>;
}

/**
 * Collect Split Info
 * @param {String} proxyAddress split's address
 * @returns {Object} containing owners, recipients, and needsIncremented
 */
export const getSplitInfo = async (
  proxyAddress: string,
  chainId: number
): Promise<Pick<SplitProxy, 'owners' | 'recipients' | 'needsIncremented'>> => {
  const { data }: ApolloQueryResult<Data> = await ourzSubgraph(chainId).query({
    query: INFO_BY_ID(proxyAddress),
  });

  if (data?.split) {
    return data.split;
  }
  return Promise.reject(`Not Found`);
};
