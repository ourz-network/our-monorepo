import { FormSplitRecipient } from './types';
import { ContractTransaction } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';
import { Signer } from '@ethersproject/abstract-signer';
import {
  OurPylon,
  OurPylon__factory,
  OurFactory,
  OurFactory__factory,
  OurProxy__factory,
} from '@ourz/our-contracts/dist/typechain';
import { addresses } from './addresses';
import { chainIdToNetworkName, validateAndFormatSplit, validateAndParseAddress } from './utils';
import invariant from 'tiny-invariant';

export class Ourz {
  public signerOrProvider: Signer | Provider;
  public chainId: number;
  public ourFactory: OurFactory;
  public factoryAddress: string;
  public ourPylon: OurPylon;
  public pylonAddress: string;
  public ourProxyBytecode: string;
  public readOnly: boolean;

  constructor({
    signerOrProvider,
    chainId,
    factoryAddress,
    pylonAddress,
  }: {
    signerOrProvider: Signer | Provider;
    chainId: number;
    factoryAddress?: string;
    pylonAddress?: string;
  }) {
    if (!factoryAddress != !pylonAddress) {
      invariant(
        false,
        'Ourz Constructor: factoryAddress and pylonAddress must both be non-null or both be null'
      );
    }

    if (Signer.isSigner(signerOrProvider)) {
      this.readOnly = false;
    } else {
      this.readOnly = true;
    }

    this.signerOrProvider = signerOrProvider;
    this.chainId = chainId;

    if (factoryAddress && pylonAddress) {
      const parsedFactoryAddress = validateAndParseAddress(factoryAddress);
      const parsedPylonAddress = validateAndParseAddress(pylonAddress);
      this.factoryAddress = parsedFactoryAddress;
      this.pylonAddress = parsedPylonAddress;
    } else {
      const network = chainIdToNetworkName(chainId);
      this.factoryAddress = addresses[network].factory;
      this.pylonAddress = addresses[network].pylon;
    }

    this.ourFactory = OurFactory__factory.connect(this.factoryAddress, signerOrProvider);
    this.ourPylon = OurPylon__factory.connect(this.pylonAddress, signerOrProvider);

    this.ourProxyBytecode = OurProxy__factory.bytecode;
  }

  /******************
   * OurPylon View Methods
   ******************
   */

  public async getDeployData(owners: string[]): Promise<string> {
    const deployData = await this.ourPylon.interface.encodeFunctionData('setup', [owners]);
    return deployData;
  }

  /******************
   * OurFactory Write Methods
   ******************
   */

  public async createNewSplitProxy(
    formData: FormSplitRecipient[],
    nickname: string,
    owners?: string[]
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    const { rootHash, splitData } = validateAndFormatSplit(formData);

    const deployData: string = await this.getDeployData(
      owners ? owners : [await (this.signerOrProvider as Signer).getAddress()]
    );

    return await this.ourFactory.createSplit(
      rootHash,
      deployData,
      JSON.stringify(splitData),
      nickname
    );
  }

  /***********************
   * ERC-721 View Methods
   ***********************
   */

  /***********************
   * ERC-721 Write Methods
   ***********************
   */

  /****************
   * Miscellaneous
   * **************
   */

  /******************
   * Private Methods
   ******************
   */

  /**
   * Throws an error if called on a readOnly == true instance of Zora Sdk
   * @private
   */
  private ensureNotReadOnly() {
    if (this.readOnly) {
      throw new Error(
        'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
      );
    }
  }
}
