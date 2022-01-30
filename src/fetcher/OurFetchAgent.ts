import DataLoader from 'dataloader';
import { GraphQLClient } from 'graphql-request';
import { OURZ_GRAPH_API_URL_BY_NETWORK } from '../constants/urls';
import { reverseResolveEnsAddresses } from './EnsReverseFetcher';
import type { NetworkIDs } from '../constants/networks';
import { GET_SPLITS, GET_USERS, GET_EDITIONS } from '../graph-queries/ourz-graph';
import { TimeoutsLookupType, DEFAULT_NETWORK_TIMEOUTS_MS } from '../constants/timeouts';
import { EditionDetails, UserDetails, SplitDetails } from './FetchResultTypes';
import { FetchWithTimeout } from './FetchWithTimeout';
import {
  GetSplitsByUsersQuery,
  GetEditionsByAddressesQuery,
  GetSplitsByAddressesQuery,
} from '../graph-queries/ourz-graph-types';

/**
 * Internal agent for Our-Hooks to fetch from the OURZ Subgraph.
 * Can be used directly for interaction with non-react web frameworks or server frameworks.
 * Uses a cached promise-based API.
 * Fetches from the Graph solely.
 * Built by Zora
 * Zora's architecture allows for possible future scaling.
 */
export class OurFetchAgent {
  // Network ID used to set fetch URLs
  readonly networkId: NetworkIDs;

  private timeouts: TimeoutsLookupType;

  // Batching content loaders
  private loaders: {
    // fetches Split data from the OURZ subgraph, cached and batched
    splitLoader: DataLoader<string, SplitDetails>;
    // fetches User data from the OURZ subgraph, cached and batched
    userLoader: DataLoader<string, UserDetails>;
    // fetches NFT-Editions data from the OURZ subgraph, cached and batched
    editionLoader: DataLoader<string, EditionDetails>;
    // ensLoader
    ensLoader: DataLoader<string, string>;
  };

  constructor(network: NetworkIDs) {
    this.timeouts = DEFAULT_NETWORK_TIMEOUTS_MS;
    this.networkId = network;

    this.loaders = {
      splitLoader: new DataLoader((keys) => this.fetchSplitGraph(keys), { cache: false }),
      userLoader: new DataLoader((keys) => this.fetchUserGraph(keys), { cache: false }),
      editionLoader: new DataLoader((keys) => this.fetchEditionGraph(keys), {
        cache: false,
      }),
      ensLoader: new DataLoader((keys) => this.loadEnsBatch(keys), { maxBatchSize: 100 }),
    };
  }

  /**
   * Clear all cached responses from metadata, currency, and NFT chain information loaders
   */
  clearCache() {
    Object.values(this.loaders).forEach((loader) => loader.clearAll());
  }

  async loadSplit(splitAddress: string) {
    const splitInfo = await this.loaders.splitLoader.load(splitAddress);
    return splitInfo;
  }
  async loadUser(userAddress: string) {
    const userInfo = await this.loaders.userLoader.load(userAddress);
    return userInfo;
  }
  async loadEdition(editionAddress: string) {
    const editionInfo = await this.loaders.editionLoader.load(editionAddress);
    return editionInfo;
  }

  private async fetchSplitGraph(splitAddresses: readonly string[]) {
    const fetchWithTimeout = new FetchWithTimeout(this.timeouts.Graph);
    const client = new GraphQLClient(OURZ_GRAPH_API_URL_BY_NETWORK[this.networkId], {
      fetch: fetchWithTimeout.fetch,
    });
    const response = (await client.request(GET_SPLITS, {
      addresses: splitAddresses.map((addr) => addr.toLowerCase()),
    })) as GetSplitsByAddressesQuery;
    return response.splits;
  }

  private async fetchUserGraph(userAddresses: readonly string[]) {
    const fetchWithTimeout = new FetchWithTimeout(this.timeouts.Graph);
    const client = new GraphQLClient(OURZ_GRAPH_API_URL_BY_NETWORK[this.networkId], {
      fetch: fetchWithTimeout.fetch,
    });
    const response = (await client.request(GET_USERS, {
      addresses: userAddresses.map((addr) => addr.toLowerCase()),
    })) as GetSplitsByUsersQuery;
    return response.users;
  }

  private async fetchEditionGraph(editionAddresses: readonly string[]) {
    const fetchWithTimeout = new FetchWithTimeout(this.timeouts.Graph);
    const client = new GraphQLClient(OURZ_GRAPH_API_URL_BY_NETWORK[this.networkId], {
      fetch: fetchWithTimeout.fetch,
    });
    const response = (await client.request(GET_EDITIONS, {
      addresses: editionAddresses.map((addr) => addr.toLowerCase()),
    })) as GetEditionsByAddressesQuery;
    return response.splitEditions;
  }

  async loadEnsBatch(addresses: readonly string[]) {
    const addressToNames = await reverseResolveEnsAddresses(
      addresses,
      this.networkId,
      this.timeouts.Rpc
    );
    return addresses.map((address) => addressToNames[address] || Error('Not found'));
  }

  async loadEnsName(address: string) {
    return this.loaders.ensLoader.load(address.toLowerCase());
  }
}
