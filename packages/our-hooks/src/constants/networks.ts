type NetworkNames = 'MAINNET' | 'RINKEBY' | 'POLYGON';
type NetworkIDs = '1' | '4' | '137';

// Supported networks with OURZ contract deployments.
// As more networks are supported by Zora & OURZ, more network IDs will be added.
const Networks: Record<NetworkNames, NetworkIDs> = {
  MAINNET: '1',
  RINKEBY: '4',
  POLYGON: '137',
};

export { Networks };
export type { NetworkIDs };
