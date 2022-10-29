import { ContractTransaction } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';
import { Signer } from '@ethersproject/abstract-signer';
import { Contract, ethers } from 'ethers';
import { chainIdToNetworkName, validateAndParseAddress } from './utils';
import editionFactory from './abi/SingleEditionMintableCreator.json';
import editionMintable from './abi/SingleEditionMintable.json';
import { addresses } from './addresses';

const initializeEditionFactory = (
  factoryAddress: string,
  signerOrProvider: Signer | Provider
): Contract => new ethers.Contract(factoryAddress, editionFactory.abi, signerOrProvider);

const initializeEdition = (editionAddress: string, signerOrProvider: Signer | Provider): Contract =>
  new ethers.Contract(editionAddress, editionMintable.abi, signerOrProvider);

export class Edition {
  public signerOrProvider: Signer | Provider;
  public chainId: number;
  public editionFactory: Contract;
  public editionFactoryAddress: string;
  public edition?: Contract;
  public editionAddress?: string;
  public readOnly: boolean;

  constructor({
    signerOrProvider,
    chainId,
    editionAddress,
  }: {
    signerOrProvider: Signer | Provider;
    chainId: number;
    editionAddress?: string;
  }) {
    if (Signer.isSigner(signerOrProvider)) {
      this.readOnly = false;
    } else {
      this.readOnly = true;
    }

    this.signerOrProvider = signerOrProvider;
    this.chainId = chainId;

    const network = chainIdToNetworkName(chainId);
    this.editionFactoryAddress = addresses[network].EditionFactory;
    this.editionFactory = initializeEditionFactory(this.editionFactoryAddress, signerOrProvider);

    if (editionAddress) {
      const parsedEditionAddress = validateAndParseAddress(editionAddress);
      this.editionAddress = parsedEditionAddress;
      this.edition = initializeEdition(this.editionAddress, signerOrProvider);
    }
  }

  /* Zora NFT-Editions */
  // getTotalSupply
  public async getTotalSupply(): Promise<number | undefined> {
    try {
      this.ensureEditionInitialized();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    try {
      return Number(await (this.edition as Contract).totalSupply());
    } catch (error) {
      return undefined;
    }
  }

  public async purchaseEdition(salePrice: string): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await (this.edition as Contract).purchase({
      value: ethers.utils.parseUnits(salePrice.toString()),
    });
  }

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

  /**
   * Throws an error if Edition is not yet initialized
   * @private
   */
  private ensureEditionInitialized() {
    if (!this.edition || !this.editionAddress) {
      throw new Error('ensureEditionInitialized: missing editionAddress.');
    }
  }
}
