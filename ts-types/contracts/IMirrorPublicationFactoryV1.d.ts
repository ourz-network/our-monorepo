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

interface IMirrorPublicationFactoryV1Interface extends ethers.utils.Interface {
  functions: {
    "createPublication(address,string,string,string,uint8)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "createPublication",
    values: [string, string, string, string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "createPublication",
    data: BytesLike
  ): Result;

  events: {};
}

export class IMirrorPublicationFactoryV1 extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IMirrorPublicationFactoryV1Interface;

  functions: {
    createPublication(
      creator: string,
      label: string,
      tokenName: string,
      tokenSymbol: string,
      tokenDecimals: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "createPublication(address,string,string,string,uint8)"(
      creator: string,
      label: string,
      tokenName: string,
      tokenSymbol: string,
      tokenDecimals: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  createPublication(
    creator: string,
    label: string,
    tokenName: string,
    tokenSymbol: string,
    tokenDecimals: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "createPublication(address,string,string,string,uint8)"(
    creator: string,
    label: string,
    tokenName: string,
    tokenSymbol: string,
    tokenDecimals: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    createPublication(
      creator: string,
      label: string,
      tokenName: string,
      tokenSymbol: string,
      tokenDecimals: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "createPublication(address,string,string,string,uint8)"(
      creator: string,
      label: string,
      tokenName: string,
      tokenSymbol: string,
      tokenDecimals: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    createPublication(
      creator: string,
      label: string,
      tokenName: string,
      tokenSymbol: string,
      tokenDecimals: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "createPublication(address,string,string,string,uint8)"(
      creator: string,
      label: string,
      tokenName: string,
      tokenSymbol: string,
      tokenDecimals: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createPublication(
      creator: string,
      label: string,
      tokenName: string,
      tokenSymbol: string,
      tokenDecimals: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "createPublication(address,string,string,string,uint8)"(
      creator: string,
      label: string,
      tokenName: string,
      tokenSymbol: string,
      tokenDecimals: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
