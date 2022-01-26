import { ApolloClient, InMemoryCache } from '@apollo/client';

const MAINNET_URL = 'https://api.thegraph.com/subgraphs/name/ourz-network/ourz-v1';
const POLYGON_URL = 'https://api.thegraph.com/subgraphs/name/ourz-network/ourz-v1-polygon';
const RINKEBY_URL = 'https://api.thegraph.com/subgraphs/name/nickadamson/ourzrinkebyv1';

export const OurzMainnetSubgraph = new ApolloClient({
  uri: MAINNET_URL,
  cache: new InMemoryCache(),
});

export const OurzPolygonSubgraph = new ApolloClient({
  uri: POLYGON_URL,
  cache: new InMemoryCache(),
});

export const OurzRinkebySubgraph = new ApolloClient({
  uri: RINKEBY_URL,
  cache: new InMemoryCache(),
});
