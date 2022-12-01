/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
  BytesLike,
} from 'ethers'
import type { Provider, TransactionRequest } from '@ethersproject/providers'
import type {
  ZoraNFTCreatorProxy,
  ZoraNFTCreatorProxyInterface,
} from '../ZoraNFTCreatorProxy'

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_logic',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    stateMutability: 'payable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'previousAdmin',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newAdmin',
        type: 'address',
      },
    ],
    name: 'AdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beacon',
        type: 'address',
      },
    ],
    name: 'BeaconUpgraded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'implementation',
        type: 'address',
      },
    ],
    name: 'Upgraded',
    type: 'event',
  },
  {
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
]

const _bytecode =
  '0x60806040526040516108523803806108528339810160408190526100229161034d565b818161004f60017f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbd61041b565b60008051602061080b8339815191521461006b5761006b610440565b61007782826000610080565b505050506104a5565b610089836100b6565b6000825111806100965750805b156100b1576100af83836100f660201b6100291760201c565b505b505050565b6100bf81610122565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b606061011b838360405180606001604052806027815260200161082b602791396101e2565b9392505050565b610135816102c060201b6100551760201c565b61019c5760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084015b60405180910390fd5b806101c160008051602061080b83398151915260001b6102cf60201b6100711760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b60606001600160a01b0384163b61024a5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b6064820152608401610193565b600080856001600160a01b0316856040516102659190610456565b600060405180830381855af49150503d80600081146102a0576040519150601f19603f3d011682016040523d82523d6000602084013e6102a5565b606091505b5090925090506102b68282866102d2565b9695505050505050565b6001600160a01b03163b151590565b90565b606083156102e157508161011b565b8251156102f15782518084602001fd5b8160405162461bcd60e51b81526004016101939190610472565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561033c578181015183820152602001610324565b838111156100af5750506000910152565b6000806040838503121561036057600080fd5b82516001600160a01b038116811461037757600080fd5b60208401519092506001600160401b038082111561039457600080fd5b818501915085601f8301126103a857600080fd5b8151818111156103ba576103ba61030b565b604051601f8201601f19908116603f011681019083821181831017156103e2576103e261030b565b816040528281528860208487010111156103fb57600080fd5b61040c836020830160208801610321565b80955050505050509250929050565b60008282101561043b57634e487b7160e01b600052601160045260246000fd5b500390565b634e487b7160e01b600052600160045260246000fd5b60008251610468818460208701610321565b9190910192915050565b6020815260008251806020840152610491816040850160208701610321565b601f01601f19169190910160400192915050565b610357806104b46000396000f3fe60806040523661001357610011610017565b005b6100115b610027610022610074565b6100b9565b565b606061004e83836040518060600160405280602781526020016102fb602791396100dd565b9392505050565b73ffffffffffffffffffffffffffffffffffffffff163b151590565b90565b60006100b47f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b3660008037600080366000845af43d6000803e8080156100d8573d6000f35b3d6000fd5b606073ffffffffffffffffffffffffffffffffffffffff84163b610188576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f60448201527f6e7472616374000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6000808573ffffffffffffffffffffffffffffffffffffffff16856040516101b0919061028d565b600060405180830381855af49150503d80600081146101eb576040519150601f19603f3d011682016040523d82523d6000602084013e6101f0565b606091505b509150915061020082828661020a565b9695505050505050565b6060831561021957508161004e565b8251156102295782518084602001fd5b816040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161017f91906102a9565b60005b83811015610278578181015183820152602001610260565b83811115610287576000848401525b50505050565b6000825161029f81846020870161025d565b9190910192915050565b60208152600082518060208401526102c881604085016020870161025d565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016919091016040019291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212208ccecd99caaa5d4b77c37364204014a1284adffc802627f4ceb8d320523fe37164736f6c634300080a0033360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564'

type ZoraNFTCreatorProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>

const isSuperArgs = (
  xs: ZoraNFTCreatorProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1

export class ZoraNFTCreatorProxy__factory extends ContractFactory {
  constructor(...args: ZoraNFTCreatorProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args)
    } else {
      super(_abi, _bytecode, args[0])
    }
  }

  override deploy(
    _logic: string,
    _data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ZoraNFTCreatorProxy> {
    return super.deploy(_logic, _data, overrides || {}) as Promise<ZoraNFTCreatorProxy>
  }
  override getDeployTransaction(
    _logic: string,
    _data: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_logic, _data, overrides || {})
  }
  override attach(address: string): ZoraNFTCreatorProxy {
    return super.attach(address) as ZoraNFTCreatorProxy
  }
  override connect(signer: Signer): ZoraNFTCreatorProxy__factory {
    return super.connect(signer) as ZoraNFTCreatorProxy__factory
  }

  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): ZoraNFTCreatorProxyInterface {
    return new utils.Interface(_abi) as ZoraNFTCreatorProxyInterface
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ZoraNFTCreatorProxy {
    return new Contract(address, _abi, signerOrProvider) as ZoraNFTCreatorProxy
  }
}
