import { MediaData, BidShares, Ask, Bid } from '@zoralabs/zdk';
import { ContractTransaction } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';
import { Signer } from '@ethersproject/abstract-signer';
import { OurPylon, OurPylon__factory, OurSplitter } from '@ourz/our-contracts/dist/typechain';
import { getSplitInfo } from './subgraph/functions';
import { BigNumber, BytesLike, ethers } from 'ethers';
import { Split as SplitProxy } from './subgraph/types/OurzSubgraph.d';
import { processQueryRecipients, validateAndParseAddress } from './utils';
import { MerkleSplitRecipient } from './types';

export class Split {
  public signerOrProvider: Signer | Provider;
  public chainId: number;
  public splitProxy: OurPylon;
  public splitAddress: string;
  public readOnly: boolean;

  constructor(signerOrProvider: Signer | Provider, chainId: number, splitAddress: string) {
    if (Signer.isSigner(signerOrProvider)) {
      this.readOnly = false;
    } else {
      this.readOnly = true;
    }

    this.signerOrProvider = signerOrProvider;
    this.chainId = chainId;

    const parsedSplitAddress = validateAndParseAddress(splitAddress);
    this.splitAddress = parsedSplitAddress;
    this.splitProxy = OurPylon__factory.connect(this.splitAddress, signerOrProvider);
  }

  /******************
   * View Methods
   ******************
   */

  public async getInfo(): Promise<Pick<SplitProxy, 'owners' | 'recipients' | 'needsIncremented'>> {
    try {
      const { owners, recipients, needsIncremented } = await getSplitInfo(
        this.splitAddress,
        this.chainId
      );

      return { owners, recipients, needsIncremented };
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
      return Promise.reject('Error fetching split info');
    }
  }

  /******************
   * Write Methods
   ******************
   */

  /** OurManagement */

  public async addOwner(newOwner: string): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }
    return await this.splitProxy.addOwner(validateAndParseAddress(newOwner));
  }

  public async removeOwner(oldOwner: string, prevOwner: string): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }
    return await this.splitProxy.removeOwner(
      validateAndParseAddress(oldOwner),
      validateAndParseAddress(prevOwner)
    );
  }

  public async swapOwner(
    prevOwner: string,
    oldOwner: string,
    newOwner: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }
    return await this.splitProxy.swapOwner(
      validateAndParseAddress(prevOwner),
      validateAndParseAddress(oldOwner),
      validateAndParseAddress(newOwner)
    );
  }

  public async editNickname(nickname: string): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }
    return await this.splitProxy.editNickname(nickname);
  }

  /** OurSplitter */

  public async claimFundsForAddress(claimAddress: string): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }
    const { recipients, needsIncremented } = await this.getInfo();

    const { splitsForMerkle, tree } = processQueryRecipients(recipients);

    const claimSplit = splitsForMerkle.find(
      (recipient) => recipient.account.toLowerCase() === claimAddress.toLowerCase()
    );

    if (!claimSplit) {
      return Promise.reject(`The provided claimAddress is not a recipient of this Split.`);
    }

    const { account, allocation } = claimSplit;
    const proof = tree.getProof(account, ethers.BigNumber.from(allocation));

    if (needsIncremented) {
      return await this.splitProxy.incrementThenClaimAll(account, allocation, proof);
    } else {
      return await this.splitProxy.claimETHForAllWindows(account, allocation, proof);
    }
  }

  public async claimERC20(tokenAddress: string): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }
    const { recipients } = await this.getInfo();

    const { splitsForMerkle, tree } = processQueryRecipients(recipients);

    let accounts: string[] = [];
    let allocations: BigNumber[] = [];
    let proofs: OurSplitter.ProofStruct[] = [];

    splitsForMerkle.forEach((recipient: MerkleSplitRecipient) => {
      accounts.push(recipient.account);
      allocations.push(recipient.allocation as BigNumber);
      proofs.push(
        tree.getProof(
          recipient.account,
          ethers.BigNumber.from(recipient.allocation)
        ) as unknown as OurSplitter.ProofStruct
      );
    });

    return await this.splitProxy.claimERC20ForAll(tokenAddress, accounts, allocations, proofs);
  }

  /** OurMinter - Zora Core */

  public async mintZNFT(
    cryptomedia: MediaData,
    bidShares: BidShares
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.mintZNFT(cryptomedia, bidShares);
  }

  public async updateZNFTURIs(
    tokenId: number,
    tokenURI: string,
    metadataURI: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.updateZNFTURIs(tokenId, tokenURI, metadataURI);
  }

  public async updateTokenURI(tokenId: number, tokenURI: string): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.updateZNFTTokenURI(tokenId, tokenURI);
  }

  public async updateMetadaURI(tokenId: number, metadataURI: string): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.updateZNFTMetadataURI(tokenId, metadataURI);
  }

  public async setBidShares(tokenId: number, bidShares: BidShares): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.setZMarketBidShares(tokenId, bidShares);
  }

  public async setAsk(tokenId: number, ask: Ask): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.setZMarketAsk(tokenId, ask);
  }

  public async removeAsk(tokenId: number): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.removeZMarketAsk(tokenId);
  }

  public async acceptBid(tokenId: number, expectedBid: Bid): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.acceptZMarketBid(tokenId, expectedBid);
  }

  /** OurMinter - Zora Auction House */

  public async createZoraAuction({
    tokenId,
    tokenContract,
    duration,
    reservePrice,
    curator,
    curatorFeePercentage,
    auctionCurrency,
  }: {
    tokenId: string;
    tokenContract: string;
    duration: number;
    reservePrice: number;
    curator: string;
    curatorFeePercentage: number;
    auctionCurrency: string;
  }): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }
    return await this.splitProxy.createZoraAuction(
      tokenId,
      tokenContract,
      60 * 60 * duration,
      ethers.utils.parseUnits(reservePrice.toString(), 'ether'),
      curator || this.splitAddress,
      curatorFeePercentage || Number(0),
      auctionCurrency || '0x0000000000000000000000000000000000000000'
    );
  }

  public async setAuctionApproval(
    auctionId: number,
    approved: boolean
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.setZAuctionApproval(auctionId, approved);
  }

  public async setAuctionReserve(
    auctionId: number,
    reservePrice: number
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.setZAuctionReservePrice(auctionId, reservePrice);
  }

  public async cancelAuction(auctionId: number): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.cancelZAuction(auctionId);
  }

  /** OurMinter - Untrusted ERC-721 methods */

  public async safeTransfer721(
    tokenContract: string,
    newOwner: string,
    tokenId: number
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.untrustedSafeTransferERC721(tokenContract, newOwner, tokenId);
  }

  public async setApproval721(
    tokenContract: string,
    operator: string,
    approved: boolean
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.untrustedSetApprovalERC721(tokenContract, operator, approved);
  }

  public async burn721(tokenContract: string, tokenId: number): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.untrustedBurnERC721(tokenContract, tokenId);
  }

  public async executeTransaction(to: string, data: BytesLike): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly();
    } catch (err) {
      if (err instanceof Error) {
        return Promise.reject(err.message);
      }
    }

    return await this.splitProxy.executeTransaction(to, data);
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
}
