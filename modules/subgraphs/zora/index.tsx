import { ApolloClient, InMemoryCache } from "@apollo/client";

// Zora Mainnet subgraph
// const APIURL = "https://api.thegraph.com/subgraphs/name/ourzor8a/zora-v1"

// Zora Rinkeby subgraph
const APIURL = "https://api.thegraph.com/subgraphs/name/ourzora/zora-v1-rinkeby";

// Create client
const zoraSubgraph = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

// Export client
export default zoraSubgraph;
