import { ContractTransaction } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';
import { Signer } from '@ethersproject/abstract-signer';
import { BytesLike, Contract, ethers } from 'ethers';
import { OurPylon, OurPylon__factory } from '@ourz/our-contracts/dist/typechain';
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
  public splitProxy: OurPylon;
  public splitAddress: string;
  public readOnly: boolean;

  constructor(
    signerOrProvider: Signer | Provider,
    chainId: number,
    splitAddress: string,
    editionFactoryAddress?: string,
    editionAddress?: string
  ) {
    if (Signer.isSigner(signerOrProvider)) {
      this.readOnly = false;
    } else {
      this.readOnly = true;
    }

    this.signerOrProvider = signerOrProvider;
    this.chainId = chainId;

    if (editionFactoryAddress) {
      const parsedEditionFactoryAddress = validateAndParseAddress(editionFactoryAddress);
      this.editionFactoryAddress = parsedEditionFactoryAddress;
      this.editionFactory = initializeEditionFactory(this.editionFactoryAddress, signerOrProvider);
    } else {
      const network = chainIdToNetworkName(chainId);
      this.editionFactoryAddress = addresses[network].EditionFactory;
      this.editionFactory = initializeEditionFactory(this.editionFactoryAddress, signerOrProvider);
    }

    if (editionAddress) {
      const parsedEditionAddress = validateAndParseAddress(editionAddress);
      this.editionAddress = parsedEditionAddress;
      this.edition = initializeEdition(this.editionAddress, signerOrProvider);
    }

    const parsedSplitAddress = validateAndParseAddress(splitAddress);
    this.splitAddress = parsedSplitAddress;
    this.splitProxy = OurPylon__factory.connect(this.splitAddress, signerOrProvider);
  }

  /* Zora NFT-Editions */
  //  createZoraEdition
  public async createZoraEdition(
    name: string,
    symbol: string,
    description: string,
    animationUrl: string,
    animationHash: BytesLike,
    imageUrl: string,
    imageHash: BytesLike,
    editionSize: number,
    royaltyBPS: number,
    salePrice: number,
    publicMint: boolean
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      this.ensureSplitInitialized();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.createZoraEdition(
      name,
      symbol,
      description,
      animationUrl,
      animationHash,
      imageUrl,
      imageHash,
      editionSize,
      royaltyBPS,
      ethers.utils.parseUnits(salePrice.toString(), 'ether'),
      publicMint
    );
  }

  //  setEditionPrice
  public async setEditionPrice(salePrice: string): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      this.ensureEditionInitialized();
      this.ensureSplitInitialized();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.setEditionPrice(
      this.editionAddress as string,
      ethers.utils.parseUnits(salePrice)
    );
  }

  //  setEditionMinter
  public async setApprovedEditionMinter(
    minterAddress: string,
    approved: boolean
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      this.ensureEditionInitialized();
      this.ensureSplitInitialized();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.setEditionMinter(
      this.editionAddress as string,
      minterAddress,
      approved
    );
  }

  //  mintEditionsTo
  public async mintEditionsToRecipients(recipients: string[]): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      this.ensureEditionInitialized();
      this.ensureSplitInitialized();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.mintEditionsTo(this.editionAddress as string, recipients);
  }

  //  withdrawEditionFunds
  public async withdrawEditionFunds(): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      this.ensureEditionInitialized();
      this.ensureSplitInitialized();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.withdrawEditionFunds(this.editionAddress as string);
  }

  //  updateEditionURLs
  public async updateEditionURLs(
    imageUrl: string,
    animationUrl: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      this.ensureEditionInitialized();
      this.ensureSplitInitialized();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.updateEditionURLs(
      this.editionAddress as string,
      imageUrl,
      animationUrl
    );
  }

  public async purchaseEdition(salePrice: string): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
      this.ensureEditionInitialized();
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
  private ensureSplitInitialized() {
    if (!this.splitProxy || !this.splitAddress) {
      throw new Error('ensureSplitInitialized: missing splitAddress.');
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
