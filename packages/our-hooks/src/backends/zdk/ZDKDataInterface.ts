import { TokenResponseItem, TokensResponseList } from '@zoralabs/zdk/dist/types';

import { NFTInterface } from '../../types/NFTInterface';


type TokensResponseItem = TokensResponseList[0];
export type SharedTokenResponse = TokenResponseItem | TokensResponseItem;

export type ZDKDataInterface = NFTInterface<SharedTokenResponse>
