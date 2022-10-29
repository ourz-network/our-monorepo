import * as mainnet from '@ourz/our-contracts/dist/addresses/mainnet.json';
import * as rinkeby from '@ourz/our-contracts/dist/addresses/rinkeby.json';
import * as polygon from '@ourz/our-contracts/dist/addresses/polygon.json';

interface AddressBook {
  [key: string]: {
    [key: string]: string;
  };
}

const Mainnet = mainnet.Contracts;
const Rinkeby = rinkeby.Contracts;
const Polygon = polygon.Contracts;

/**
 * Mapping from Network to Officially Deployed Instances of Ourz Contracts
 */
export const addresses: AddressBook = {
  mainnet: { ...Mainnet, EditionFactory: '0xEf7a8fF7FC585FA1Fe3062455B628bfC657e2cD5' },
  rinkeby: { ...Rinkeby, EditionFactory: '0x38d43BedE3Aac0262FcA248C7fCA10cec35e3bCf' },
  polygon: { ...Polygon, EditionFactory: '0x8879eE595b76B8c5c40580ad42be95E2e3a2e4Bb' },
};
