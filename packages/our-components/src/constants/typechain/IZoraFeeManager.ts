/* Autogenerated file. Do not edit manually. */

/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
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

export interface IZoraFeeManagerInterface extends utils.Interface {
  functions: {
    'getZORAWithdrawFeesBPS(address)': FunctionFragment
  }

  getFunction(
    nameOrSignatureOrTopic: 'getZORAWithdrawFeesBPS'
  ): FunctionFragment

  encodeFunctionData(
    functionFragment: 'getZORAWithdrawFeesBPS',
    values: [string]
  ): string

  decodeFunctionResult(
    functionFragment: 'getZORAWithdrawFeesBPS',
    data: BytesLike
  ): Result

  events: {}
}

export interface IZoraFeeManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: IZoraFeeManagerInterface

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
    getZORAWithdrawFeesBPS(
      sender: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>
  }

  getZORAWithdrawFeesBPS(
    sender: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  callStatic: {
    getZORAWithdrawFeesBPS(
      sender: string,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber]>
  }

  filters: {}

  estimateGas: {
    getZORAWithdrawFeesBPS(
      sender: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>
  }

  populateTransaction: {
    getZORAWithdrawFeesBPS(
      sender: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>
  }
}
