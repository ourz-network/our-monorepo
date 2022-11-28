import { NetworkIDs, NFTObject } from '../index';
import { ZDKDataSource , ZDKOptions } from '../backends/zdk/ZDKDataSource';
import { NFTQuery, NFTQueryResult } from '../types/NFTQuery';

import { NFTStrategy } from './NFTStrategy';

export class ZDKFetchStrategy extends NFTStrategy {
  source: ZDKDataSource;

  constructor(networkId: NetworkIDs, options: ZDKOptions = {}) {
    super(networkId);
    this.source = new ZDKDataSource(networkId, options);
  }

  fetchNFT = async (contract: string, id: string): Promise<NFTObject> => {
    const result = await this.source.loadNFT({ contract, id });
    if (result instanceof Error) {
      throw result;
    }
    return this.source.transformNFT(result);
  };

  queryNFTs = async (query: NFTQuery): Promise<NFTQueryResult> => await this.source.queryNFTs(query);
}
