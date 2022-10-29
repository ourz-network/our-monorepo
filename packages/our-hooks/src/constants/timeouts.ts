export type RequestType = 'Graph' | 'Rpc';
// | 'IPFS'
export type TimeoutsLookupType = Record<RequestType, number>;
export const DEFAULT_NETWORK_TIMEOUTS_MS: TimeoutsLookupType = {
  Graph: 5 * 1000,
  Rpc: 1 * 1000,
  // IPFS: 10 * 1000,
};
