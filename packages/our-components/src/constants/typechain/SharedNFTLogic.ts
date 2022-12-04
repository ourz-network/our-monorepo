/* Autogenerated file. Do not edit manually. */

/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers'
import type { FunctionFragment, Result } from '@ethersproject/abi'
import type { Listener, Provider } from '@ethersproject/providers'
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from './common'

export interface SharedNFTLogicInterface extends utils.Interface {
  functions: {
    'base64Encode(bytes)': FunctionFragment
    'createMetadataEdition(string,string,string,string,uint256,uint256)': FunctionFragment
    'createMetadataJSON(string,string,string,uint256,uint256)': FunctionFragment
    'encodeMetadataJSON(bytes)': FunctionFragment
    'numberToString(uint256)': FunctionFragment
    'tokenMediaData(string,string,uint256)': FunctionFragment
  }

  getFunction(
    nameOrSignatureOrTopic:
      | 'base64Encode'
      | 'createMetadataEdition'
      | 'createMetadataJSON'
      | 'encodeMetadataJSON'
      | 'numberToString'
      | 'tokenMediaData'
  ): FunctionFragment

  encodeFunctionData(
    functionFragment: 'base64Encode',
    values: [BytesLike]
  ): string
  encodeFunctionData(
    functionFragment: 'createMetadataEdition',
    values: [string, string, string, string, BigNumberish, BigNumberish]
  ): string
  encodeFunctionData(
    functionFragment: 'createMetadataJSON',
    values: [string, string, string, BigNumberish, BigNumberish]
  ): string
  encodeFunctionData(
    functionFragment: 'encodeMetadataJSON',
    values: [BytesLike]
  ): string
  encodeFunctionData(
    functionFragment: 'numberToString',
    values: [BigNumberish]
  ): string
  encodeFunctionData(
    functionFragment: 'tokenMediaData',
    values: [string, string, BigNumberish]
  ): string

  decodeFunctionResult(
    functionFragment: 'base64Encode',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'createMetadataEdition',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'createMetadataJSON',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'encodeMetadataJSON',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'numberToString',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'tokenMediaData',
    data: BytesLike
  ): Result

  events: {}
}

export interface SharedNFTLogic extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: SharedNFTLogicInterface

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>
  listeners(eventName?: string): Array<Listener>
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this
  removeAllListeners(eventName?: string): this
  off: OnEvent<this>
  on: OnEvent<this>
  once: OnEvent<this>
  removeListener: OnEvent<this>

  functions: {
    base64Encode(
      unencoded: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>

    createMetadataEdition(
      name: string,
      description: string,
      imageUrl: string,
      animationUrl: string,
      tokenOfEdition: BigNumberish,
      editionSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>

    createMetadataJSON(
      name: string,
      description: string,
      mediaData: string,
      tokenOfEdition: BigNumberish,
      editionSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>

    encodeMetadataJSON(
      json: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>

    numberToString(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>

    tokenMediaData(
      imageUrl: string,
      animationUrl: string,
      tokenOfEdition: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>
  }

  base64Encode(unencoded: BytesLike, overrides?: CallOverrides): Promise<string>

  createMetadataEdition(
    name: string,
    description: string,
    imageUrl: string,
    animationUrl: string,
    tokenOfEdition: BigNumberish,
    editionSize: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>

  createMetadataJSON(
    name: string,
    description: string,
    mediaData: string,
    tokenOfEdition: BigNumberish,
    editionSize: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>

  encodeMetadataJSON(
    json: BytesLike,
    overrides?: CallOverrides
  ): Promise<string>

  numberToString(
    value: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>

  tokenMediaData(
    imageUrl: string,
    animationUrl: string,
    tokenOfEdition: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>

  callStatic: {
    base64Encode(
      unencoded: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>

    createMetadataEdition(
      name: string,
      description: string,
      imageUrl: string,
      animationUrl: string,
      tokenOfEdition: BigNumberish,
      editionSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>

    createMetadataJSON(
      name: string,
      description: string,
      mediaData: string,
      tokenOfEdition: BigNumberish,
      editionSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>

    encodeMetadataJSON(
      json: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>

    numberToString(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>

    tokenMediaData(
      imageUrl: string,
      animationUrl: string,
      tokenOfEdition: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>
  }

  filters: {}

  estimateGas: {
    base64Encode(
      unencoded: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    createMetadataEdition(
      name: string,
      description: string,
      imageUrl: string,
      animationUrl: string,
      tokenOfEdition: BigNumberish,
      editionSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    createMetadataJSON(
      name: string,
      description: string,
      mediaData: string,
      tokenOfEdition: BigNumberish,
      editionSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    encodeMetadataJSON(
      json: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    numberToString(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    tokenMediaData(
      imageUrl: string,
      animationUrl: string,
      tokenOfEdition: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>
  }

  populateTransaction: {
    base64Encode(
      unencoded: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    createMetadataEdition(
      name: string,
      description: string,
      imageUrl: string,
      animationUrl: string,
      tokenOfEdition: BigNumberish,
      editionSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    createMetadataJSON(
      name: string,
      description: string,
      mediaData: string,
      tokenOfEdition: BigNumberish,
      editionSize: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    encodeMetadataJSON(
      json: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    numberToString(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    tokenMediaData(
      imageUrl: string,
      animationUrl: string,
      tokenOfEdition: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>
  }
}