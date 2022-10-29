import { Networks } from './networks';

export const OURZ_GRAPH_API_URL_BY_NETWORK = {
  [Networks.MAINNET]: 'https://api.thegraph.com/subgraphs/name/ourz-network/ourz-v1',
  [Networks.RINKEBY]: 'https://api.thegraph.com/subgraphs/name/nickadamson/ourzrinkebyv1',
  [Networks.POLYGON]:
    'https://api.thegraph.com/subgraphs/name/ourz-network/ourz-v1-polygon',
};

export const ENS_GRAPH_URL_BY_NETWORK = {
  [Networks.MAINNET]: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
  [Networks.RINKEBY]: 'https://api.thegraph.com/subgraphs/name/ensdomains/ensrinkeby',
};

export const RPC_URL_BY_NETWORK = {
  [Networks.MAINNET]: 'https://cloudflare-eth.com',
  [Networks.RINKEBY]: 'https://rinkeby-light.eth.linkpool.io',
};
