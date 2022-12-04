/* Autogenerated file. Do not edit manually. */

/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers'
import type { Provider, TransactionRequest } from '@ethersproject/providers'
import type {
  OwnableSkeleton,
  OwnableSkeletonInterface,
} from '../OwnableSkeleton'

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

const _bytecode =
  '0x6080604052348015600f57600080fd5b50608f8061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80638da5cb5b14602d575b600080fd5b6000546040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f3fea264697066735822122073c3912717ff9c03d7808a394cb3b77448427c61c81d541a023efa27a1598bce64736f6c634300080a0033'

type OwnableSkeletonConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>

const isSuperArgs = (
  xs: OwnableSkeletonConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1

export class OwnableSkeleton__factory extends ContractFactory {
  constructor(...args: OwnableSkeletonConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args)
    } else {
      super(_abi, _bytecode, args[0])
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<OwnableSkeleton> {
    return super.deploy(overrides || {}) as Promise<OwnableSkeleton>
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {})
  }
  override attach(address: string): OwnableSkeleton {
    return super.attach(address) as OwnableSkeleton
  }
  override connect(signer: Signer): OwnableSkeleton__factory {
    return super.connect(signer) as OwnableSkeleton__factory
  }

  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): OwnableSkeletonInterface {
    return new utils.Interface(_abi) as OwnableSkeletonInterface
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OwnableSkeleton {
    return new Contract(address, _abi, signerOrProvider) as OwnableSkeleton
  }
}