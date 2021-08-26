/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IOurFactoryInterface extends ethers.utils.Interface {
  functions: {
    "merkleRoot()": FunctionFragment;
    "minter()": FunctionFragment;
    "splitOwner()": FunctionFragment;
    "splitter()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "merkleRoot",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "minter", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "splitOwner",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "splitter", values?: undefined): string;

  decodeFunctionResult(functionFragment: "merkleRoot", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "minter", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "splitOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "splitter", data: BytesLike): Result;

  events: {};
}

export class IOurFactory extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IOurFactoryInterface;

  functions: {
    merkleRoot(overrides?: Overrides): Promise<ContractTransaction>;

    "merkleRoot()"(overrides?: Overrides): Promise<ContractTransaction>;

    minter(overrides?: Overrides): Promise<ContractTransaction>;

    "minter()"(overrides?: Overrides): Promise<ContractTransaction>;

    splitOwner(overrides?: Overrides): Promise<ContractTransaction>;

    "splitOwner()"(overrides?: Overrides): Promise<ContractTransaction>;

    splitter(overrides?: Overrides): Promise<ContractTransaction>;

    "splitter()"(overrides?: Overrides): Promise<ContractTransaction>;
  };

  merkleRoot(overrides?: Overrides): Promise<ContractTransaction>;

  "merkleRoot()"(overrides?: Overrides): Promise<ContractTransaction>;

  minter(overrides?: Overrides): Promise<ContractTransaction>;

  "minter()"(overrides?: Overrides): Promise<ContractTransaction>;

  splitOwner(overrides?: Overrides): Promise<ContractTransaction>;

  "splitOwner()"(overrides?: Overrides): Promise<ContractTransaction>;

  splitter(overrides?: Overrides): Promise<ContractTransaction>;

  "splitter()"(overrides?: Overrides): Promise<ContractTransaction>;

  callStatic: {
    merkleRoot(overrides?: CallOverrides): Promise<string>;

    "merkleRoot()"(overrides?: CallOverrides): Promise<string>;

    minter(overrides?: CallOverrides): Promise<string>;

    "minter()"(overrides?: CallOverrides): Promise<string>;

    splitOwner(overrides?: CallOverrides): Promise<string>;

    "splitOwner()"(overrides?: CallOverrides): Promise<string>;

    splitter(overrides?: CallOverrides): Promise<string>;

    "splitter()"(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    merkleRoot(overrides?: Overrides): Promise<BigNumber>;

    "merkleRoot()"(overrides?: Overrides): Promise<BigNumber>;

    minter(overrides?: Overrides): Promise<BigNumber>;

    "minter()"(overrides?: Overrides): Promise<BigNumber>;

    splitOwner(overrides?: Overrides): Promise<BigNumber>;

    "splitOwner()"(overrides?: Overrides): Promise<BigNumber>;

    splitter(overrides?: Overrides): Promise<BigNumber>;

    "splitter()"(overrides?: Overrides): Promise<BigNumber>;
  };

  populateTransaction: {
    merkleRoot(overrides?: Overrides): Promise<PopulatedTransaction>;

    "merkleRoot()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    minter(overrides?: Overrides): Promise<PopulatedTransaction>;

    "minter()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    splitOwner(overrides?: Overrides): Promise<PopulatedTransaction>;

    "splitOwner()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    splitter(overrides?: Overrides): Promise<PopulatedTransaction>;

    "splitter()"(overrides?: Overrides): Promise<PopulatedTransaction>;
  };
}
