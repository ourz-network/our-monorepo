/* Autogenerated file. Do not edit manually. */

/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers'
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from '@ethersproject/abi'
import type { Listener, Provider } from '@ethersproject/providers'
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from './common'

export declare namespace IERC721Drop {
  export type SalesConfigurationStruct = {
    publicSalePrice: BigNumberish
    maxSalePurchasePerAddress: BigNumberish
    publicSaleStart: BigNumberish
    publicSaleEnd: BigNumberish
    presaleStart: BigNumberish
    presaleEnd: BigNumberish
    presaleMerkleRoot: BytesLike
  }

  export type SalesConfigurationStructOutput = [
    BigNumber,
    number,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string
  ] & {
    publicSalePrice: BigNumber
    maxSalePurchasePerAddress: number
    publicSaleStart: BigNumber
    publicSaleEnd: BigNumber
    presaleStart: BigNumber
    presaleEnd: BigNumber
    presaleMerkleRoot: string
  }
}

export interface ZoraNFTCreatorV1Interface extends utils.Interface {
  functions: {
    'contractVersion()': FunctionFragment
    'createDrop(string,string,address,uint64,uint16,address,(uint104,uint32,uint64,uint64,uint64,uint64,bytes32),string,string)': FunctionFragment
    'createEdition(string,string,uint64,uint16,address,address,(uint104,uint32,uint64,uint64,uint64,uint64,bytes32),string,string,string)': FunctionFragment
    'dropMetadataRenderer()': FunctionFragment
    'editionMetadataRenderer()': FunctionFragment
    'implementation()': FunctionFragment
    'initialize()': FunctionFragment
    'owner()': FunctionFragment
    'proxiableUUID()': FunctionFragment
    'renounceOwnership()': FunctionFragment
    'setupDropsContract(string,string,address,uint64,uint16,address,(uint104,uint32,uint64,uint64,uint64,uint64,bytes32),address,bytes)': FunctionFragment
    'transferOwnership(address)': FunctionFragment
    'upgradeTo(address)': FunctionFragment
    'upgradeToAndCall(address,bytes)': FunctionFragment
  }

  getFunction(
    nameOrSignatureOrTopic:
      | 'contractVersion'
      | 'createDrop'
      | 'createEdition'
      | 'dropMetadataRenderer'
      | 'editionMetadataRenderer'
      | 'implementation'
      | 'initialize'
      | 'owner'
      | 'proxiableUUID'
      | 'renounceOwnership'
      | 'setupDropsContract'
      | 'transferOwnership'
      | 'upgradeTo'
      | 'upgradeToAndCall'
  ): FunctionFragment

  encodeFunctionData(
    functionFragment: 'contractVersion',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'createDrop',
    values: [
      string,
      string,
      string,
      BigNumberish,
      BigNumberish,
      string,
      IERC721Drop.SalesConfigurationStruct,
      string,
      string
    ]
  ): string
  encodeFunctionData(
    functionFragment: 'createEdition',
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      string,
      string,
      IERC721Drop.SalesConfigurationStruct,
      string,
      string,
      string
    ]
  ): string
  encodeFunctionData(
    functionFragment: 'dropMetadataRenderer',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'editionMetadataRenderer',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'implementation',
    values?: undefined
  ): string
  encodeFunctionData(functionFragment: 'initialize', values?: undefined): string
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'proxiableUUID',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'renounceOwnership',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'setupDropsContract',
    values: [
      string,
      string,
      string,
      BigNumberish,
      BigNumberish,
      string,
      IERC721Drop.SalesConfigurationStruct,
      string,
      BytesLike
    ]
  ): string
  encodeFunctionData(
    functionFragment: 'transferOwnership',
    values: [string]
  ): string
  encodeFunctionData(functionFragment: 'upgradeTo', values: [string]): string
  encodeFunctionData(
    functionFragment: 'upgradeToAndCall',
    values: [string, BytesLike]
  ): string

  decodeFunctionResult(
    functionFragment: 'contractVersion',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'createDrop', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'createEdition',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'dropMetadataRenderer',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'editionMetadataRenderer',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'implementation',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'initialize', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'proxiableUUID',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'renounceOwnership',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'setupDropsContract',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'transferOwnership',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'upgradeTo', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'upgradeToAndCall',
    data: BytesLike
  ): Result

  events: {
    'AdminChanged(address,address)': EventFragment
    'BeaconUpgraded(address)': EventFragment
    'CreatedDrop(address,address,uint256)': EventFragment
    'OwnershipTransferred(address,address)': EventFragment
    'Upgraded(address)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'AdminChanged'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'BeaconUpgraded'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'CreatedDrop'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'OwnershipTransferred'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'Upgraded'): EventFragment
}

export interface AdminChangedEventObject {
  previousAdmin: string
  newAdmin: string
}
export type AdminChangedEvent = TypedEvent<
  [string, string],
  AdminChangedEventObject
>

export type AdminChangedEventFilter = TypedEventFilter<AdminChangedEvent>

export interface BeaconUpgradedEventObject {
  beacon: string
}
export type BeaconUpgradedEvent = TypedEvent<
  [string],
  BeaconUpgradedEventObject
>

export type BeaconUpgradedEventFilter = TypedEventFilter<BeaconUpgradedEvent>

export interface CreatedDropEventObject {
  creator: string
  editionContractAddress: string
  editionSize: BigNumber
}
export type CreatedDropEvent = TypedEvent<
  [string, string, BigNumber],
  CreatedDropEventObject
>

export type CreatedDropEventFilter = TypedEventFilter<CreatedDropEvent>

export interface OwnershipTransferredEventObject {
  previousOwner: string
  newOwner: string
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>

export interface UpgradedEventObject {
  implementation: string
}
export type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>

export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>

export interface ZoraNFTCreatorV1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: ZoraNFTCreatorV1Interface

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
    contractVersion(overrides?: CallOverrides): Promise<[number]>

    createDrop(
      name: string,
      symbol: string,
      defaultAdmin: string,
      editionSize: BigNumberish,
      royaltyBPS: BigNumberish,
      fundsRecipient: string,
      saleConfig: IERC721Drop.SalesConfigurationStruct,
      metadataURIBase: string,
      metadataContractURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    createEdition(
      name: string,
      symbol: string,
      editionSize: BigNumberish,
      royaltyBPS: BigNumberish,
      fundsRecipient: string,
      defaultAdmin: string,
      saleConfig: IERC721Drop.SalesConfigurationStruct,
      description: string,
      animationURI: string,
      imageURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    dropMetadataRenderer(overrides?: CallOverrides): Promise<[string]>

    editionMetadataRenderer(overrides?: CallOverrides): Promise<[string]>

    implementation(overrides?: CallOverrides): Promise<[string]>

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    owner(overrides?: CallOverrides): Promise<[string]>

    proxiableUUID(overrides?: CallOverrides): Promise<[string]>

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    setupDropsContract(
      name: string,
      symbol: string,
      defaultAdmin: string,
      editionSize: BigNumberish,
      royaltyBPS: BigNumberish,
      fundsRecipient: string,
      saleConfig: IERC721Drop.SalesConfigurationStruct,
      metadataRenderer: string,
      metadataInitializer: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    upgradeTo(
      newImplementation: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>
  }

  contractVersion(overrides?: CallOverrides): Promise<number>

  createDrop(
    name: string,
    symbol: string,
    defaultAdmin: string,
    editionSize: BigNumberish,
    royaltyBPS: BigNumberish,
    fundsRecipient: string,
    saleConfig: IERC721Drop.SalesConfigurationStruct,
    metadataURIBase: string,
    metadataContractURI: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  createEdition(
    name: string,
    symbol: string,
    editionSize: BigNumberish,
    royaltyBPS: BigNumberish,
    fundsRecipient: string,
    defaultAdmin: string,
    saleConfig: IERC721Drop.SalesConfigurationStruct,
    description: string,
    animationURI: string,
    imageURI: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  dropMetadataRenderer(overrides?: CallOverrides): Promise<string>

  editionMetadataRenderer(overrides?: CallOverrides): Promise<string>

  implementation(overrides?: CallOverrides): Promise<string>

  initialize(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  owner(overrides?: CallOverrides): Promise<string>

  proxiableUUID(overrides?: CallOverrides): Promise<string>

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  setupDropsContract(
    name: string,
    symbol: string,
    defaultAdmin: string,
    editionSize: BigNumberish,
    royaltyBPS: BigNumberish,
    fundsRecipient: string,
    saleConfig: IERC721Drop.SalesConfigurationStruct,
    metadataRenderer: string,
    metadataInitializer: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  upgradeTo(
    newImplementation: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  upgradeToAndCall(
    newImplementation: string,
    data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  callStatic: {
    contractVersion(overrides?: CallOverrides): Promise<number>

    createDrop(
      name: string,
      symbol: string,
      defaultAdmin: string,
      editionSize: BigNumberish,
      royaltyBPS: BigNumberish,
      fundsRecipient: string,
      saleConfig: IERC721Drop.SalesConfigurationStruct,
      metadataURIBase: string,
      metadataContractURI: string,
      overrides?: CallOverrides
    ): Promise<string>

    createEdition(
      name: string,
      symbol: string,
      editionSize: BigNumberish,
      royaltyBPS: BigNumberish,
      fundsRecipient: string,
      defaultAdmin: string,
      saleConfig: IERC721Drop.SalesConfigurationStruct,
      description: string,
      animationURI: string,
      imageURI: string,
      overrides?: CallOverrides
    ): Promise<string>

    dropMetadataRenderer(overrides?: CallOverrides): Promise<string>

    editionMetadataRenderer(overrides?: CallOverrides): Promise<string>

    implementation(overrides?: CallOverrides): Promise<string>

    initialize(overrides?: CallOverrides): Promise<void>

    owner(overrides?: CallOverrides): Promise<string>

    proxiableUUID(overrides?: CallOverrides): Promise<string>

    renounceOwnership(overrides?: CallOverrides): Promise<void>

    setupDropsContract(
      name: string,
      symbol: string,
      defaultAdmin: string,
      editionSize: BigNumberish,
      royaltyBPS: BigNumberish,
      fundsRecipient: string,
      saleConfig: IERC721Drop.SalesConfigurationStruct,
      metadataRenderer: string,
      metadataInitializer: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>

    upgradeTo(
      newImplementation: string,
      overrides?: CallOverrides
    ): Promise<void>

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>
  }

  filters: {
    'AdminChanged(address,address)'(
      previousAdmin?: null,
      newAdmin?: null
    ): AdminChangedEventFilter
    AdminChanged(previousAdmin?: null, newAdmin?: null): AdminChangedEventFilter

    'BeaconUpgraded(address)'(beacon?: string | null): BeaconUpgradedEventFilter
    BeaconUpgraded(beacon?: string | null): BeaconUpgradedEventFilter

    'CreatedDrop(address,address,uint256)'(
      creator?: string | null,
      editionContractAddress?: string | null,
      editionSize?: null
    ): CreatedDropEventFilter
    CreatedDrop(
      creator?: string | null,
      editionContractAddress?: string | null,
      editionSize?: null
    ): CreatedDropEventFilter

    'OwnershipTransferred(address,address)'(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter

    'Upgraded(address)'(implementation?: string | null): UpgradedEventFilter
    Upgraded(implementation?: string | null): UpgradedEventFilter
  }

  estimateGas: {
    contractVersion(overrides?: CallOverrides): Promise<BigNumber>

    createDrop(
      name: string,
      symbol: string,
      defaultAdmin: string,
      editionSize: BigNumberish,
      royaltyBPS: BigNumberish,
      fundsRecipient: string,
      saleConfig: IERC721Drop.SalesConfigurationStruct,
      metadataURIBase: string,
      metadataContractURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    createEdition(
      name: string,
      symbol: string,
      editionSize: BigNumberish,
      royaltyBPS: BigNumberish,
      fundsRecipient: string,
      defaultAdmin: string,
      saleConfig: IERC721Drop.SalesConfigurationStruct,
      description: string,
      animationURI: string,
      imageURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    dropMetadataRenderer(overrides?: CallOverrides): Promise<BigNumber>

    editionMetadataRenderer(overrides?: CallOverrides): Promise<BigNumber>

    implementation(overrides?: CallOverrides): Promise<BigNumber>

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    owner(overrides?: CallOverrides): Promise<BigNumber>

    proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    setupDropsContract(
      name: string,
      symbol: string,
      defaultAdmin: string,
      editionSize: BigNumberish,
      royaltyBPS: BigNumberish,
      fundsRecipient: string,
      saleConfig: IERC721Drop.SalesConfigurationStruct,
      metadataRenderer: string,
      metadataInitializer: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    upgradeTo(
      newImplementation: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>
  }

  populateTransaction: {
    contractVersion(overrides?: CallOverrides): Promise<PopulatedTransaction>

    createDrop(
      name: string,
      symbol: string,
      defaultAdmin: string,
      editionSize: BigNumberish,
      royaltyBPS: BigNumberish,
      fundsRecipient: string,
      saleConfig: IERC721Drop.SalesConfigurationStruct,
      metadataURIBase: string,
      metadataContractURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    createEdition(
      name: string,
      symbol: string,
      editionSize: BigNumberish,
      royaltyBPS: BigNumberish,
      fundsRecipient: string,
      defaultAdmin: string,
      saleConfig: IERC721Drop.SalesConfigurationStruct,
      description: string,
      animationURI: string,
      imageURI: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    dropMetadataRenderer(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    editionMetadataRenderer(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    implementation(overrides?: CallOverrides): Promise<PopulatedTransaction>

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>

    proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    setupDropsContract(
      name: string,
      symbol: string,
      defaultAdmin: string,
      editionSize: BigNumberish,
      royaltyBPS: BigNumberish,
      fundsRecipient: string,
      saleConfig: IERC721Drop.SalesConfigurationStruct,
      metadataRenderer: string,
      metadataInitializer: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    upgradeTo(
      newImplementation: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    upgradeToAndCall(
      newImplementation: string,
      data: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>
  }
}
