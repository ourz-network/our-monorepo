import { ApolloClient, InMemoryCache } from "@apollo/client";

// Ourz Rinkeby subgraph
// const APIURL = "https://api.thegraph.com/subgraphs/name/nickadamson/ourzrinkebyv1";

// Ourz Mainnet subgraph studio
// const APIURL = `https://gateway.thegraph.com/api/${process.env.SUBGRAPH_KEY}/subgraphs/id/0x11cdfcb54576d5990219c426bf2c630115a2012a-0`;

// Ourz Mainnet subgraph
const APIURL = "https://api.thegraph.com/subgraphs/name/nickadamson/ourz";

// Create client
const ourzSubgraph = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

// Export clients
export default ourzSubgraph;
