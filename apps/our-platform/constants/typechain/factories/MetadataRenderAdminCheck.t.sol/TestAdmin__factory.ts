/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers'
import type { Provider, TransactionRequest } from '@ethersproject/providers'
import type {
  TestAdmin,
  TestAdminInterface,
} from '../../MetadataRenderAdminCheck.t.sol/TestAdmin'

const _abi = [
  {
    inputs: [],
    name: 'Access_OnlyAdmin',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'Ok',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
    ],
    name: 'updateSomething',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const _bytecode =
  '0x608060405234801561001057600080fd5b506101f0806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80634ad2de1514610030575b600080fd5b61004361003e36600461015b565b610045565b005b8073ffffffffffffffffffffffffffffffffffffffff811633148015906100f757506040517f24d7806c00000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff8216906324d7806c90602401602060405180830381865afa1580156100d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100f59190610198565b155b1561012e576040517f02bd6bd100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040517fe0c639021f79ad31e1aacf49a83e0271d8e62700ff8aefd948df19d1053fbd6590600090a15050565b60006020828403121561016d57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461019157600080fd5b9392505050565b6000602082840312156101aa57600080fd5b8151801515811461019157600080fdfea264697066735822122080145bde5471c356ce7ca9e1dae60fbb59427a6d660f3627417c7e1f5124378364736f6c634300080a0033'

type TestAdminConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>

const isSuperArgs = (
  xs: TestAdminConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1

export class TestAdmin__factory extends ContractFactory {
  constructor(...args: TestAdminConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args)
    } else {
      super(_abi, _bytecode, args[0])
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestAdmin> {
    return super.deploy(overrides || {}) as Promise<TestAdmin>
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {})
  }
  override attach(address: string): TestAdmin {
    return super.attach(address) as TestAdmin
  }
  override connect(signer: Signer): TestAdmin__factory {
    return super.connect(signer) as TestAdmin__factory
  }

  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): TestAdminInterface {
    return new utils.Interface(_abi) as TestAdminInterface
  }
  static connect(address: string, signerOrProvider: Signer | Provider): TestAdmin {
    return new Contract(address, _abi, signerOrProvider) as TestAdmin
  }
}
