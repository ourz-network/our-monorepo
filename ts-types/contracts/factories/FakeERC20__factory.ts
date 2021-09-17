/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { FakeERC20 } from "../FakeERC20";

export class FakeERC20__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(owner: string, overrides?: Overrides): Promise<FakeERC20> {
    return super.deploy(owner, overrides || {}) as Promise<FakeERC20>;
  }
  getDeployTransaction(
    owner: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(owner, overrides || {});
  }
  attach(address: string): FakeERC20 {
    return super.attach(address) as FakeERC20;
  }
  connect(signer: Signer): FakeERC20__factory {
    return super.connect(signer) as FakeERC20__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FakeERC20 {
    return new Contract(address, _abi, signerOrProvider) as FakeERC20;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200107238038062001072833981016040819052620000349162000249565b6040805180820182526006815265046616b6532360d41b60208083019182528351808501909452600484526346414b4560e01b9084015281519192916200007e91600391620001a3565b50805162000094906004906020840190620001a3565b505050620000b4816a52b7d2dcc80cd2e4000000620000bb60201b60201c565b50620002db565b6001600160a01b038216620001165760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b80600260008282546200012a919062000279565b90915550506001600160a01b038216600090815260208190526040812080548392906200015990849062000279565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b828054620001b1906200029e565b90600052602060002090601f016020900481019282620001d5576000855562000220565b82601f10620001f057805160ff191683800117855562000220565b8280016001018555821562000220579182015b828111156200022057825182559160200191906001019062000203565b506200022e92915062000232565b5090565b5b808211156200022e576000815560010162000233565b6000602082840312156200025b578081fd5b81516001600160a01b038116811462000272578182fd5b9392505050565b600082198211156200029957634e487b7160e01b81526011600452602481fd5b500190565b600181811c90821680620002b357607f821691505b60208210811415620002d557634e487b7160e01b600052602260045260246000fd5b50919050565b610d8780620002eb6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c806342966c681161008c57806395d89b411161006657806395d89b41146101d0578063a457c2d7146101d8578063a9059cbb146101eb578063dd62ed3e146101fe57600080fd5b806342966c681461018157806370a082311461019457806379cc6790146101bd57600080fd5b806318160ddd116100c857806318160ddd1461013a57806323b872dd1461014c578063313ce5671461015f578063395093511461016e57600080fd5b806306fdde03146100ef578063095ea7b31461010d5780631249c58b14610130575b600080fd5b6100f7610237565b6040516101049190610c2e565b60405180910390f35b61012061011b366004610bed565b6102c9565b6040519015158152602001610104565b6101386102df565b005b6002545b604051908152602001610104565b61012061015a366004610bb2565b6102f6565b60405160128152602001610104565b61012061017c366004610bed565b6103ba565b61013861018f366004610c16565b6103f6565b61013e6101a2366004610b5f565b6001600160a01b031660009081526020819052604090205490565b6101386101cb366004610bed565b610403565b6100f76104a2565b6101206101e6366004610bed565b6104b1565b6101206101f9366004610bed565b610562565b61013e61020c366004610b80565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606003805461024690610cce565b80601f016020809104026020016040519081016040528092919081815260200182805461027290610cce565b80156102bf5780601f10610294576101008083540402835291602001916102bf565b820191906000526020600020905b8154815290600101906020018083116102a257829003601f168201915b5050505050905090565b60006102d633848461056f565b50600192915050565b6102f4336a52b7d2dcc80cd2e40000006106c7565b565b60006103038484846107a6565b6001600160a01b0384166000908152600160209081526040808320338452909152902054828110156103a25760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206160448201527f6c6c6f77616e636500000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6103af853385840361056f565b506001949350505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490916102d69185906103f1908690610c9f565b61056f565b61040033826109be565b50565b600061040f833361020c565b9050818110156104865760405162461bcd60e51b8152602060048201526024808201527f45524332303a206275726e20616d6f756e74206578636565647320616c6c6f7760448201527f616e6365000000000000000000000000000000000000000000000000000000006064820152608401610399565b610493833384840361056f565b61049d83836109be565b505050565b60606004805461024690610cce565b3360009081526001602090815260408083206001600160a01b03861684529091528120548281101561054b5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f0000000000000000000000000000000000000000000000000000006064820152608401610399565b610558338585840361056f565b5060019392505050565b60006102d63384846107a6565b6001600160a01b0383166105ea5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610399565b6001600160a01b0382166106665760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f73730000000000000000000000000000000000000000000000000000000000006064820152608401610399565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b03821661071d5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610399565b806002600082825461072f9190610c9f565b90915550506001600160a01b0382166000908152602081905260408120805483929061075c908490610c9f565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b0383166108225760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152608401610399565b6001600160a01b03821661089e5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f65737300000000000000000000000000000000000000000000000000000000006064820152608401610399565b6001600160a01b0383166000908152602081905260409020548181101561092d5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e636500000000000000000000000000000000000000000000000000006064820152608401610399565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610964908490610c9f565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516109b091815260200190565b60405180910390a350505050565b6001600160a01b038216610a3a5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360448201527f73000000000000000000000000000000000000000000000000000000000000006064820152608401610399565b6001600160a01b03821660009081526020819052604090205481811015610ac95760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60448201527f63650000000000000000000000000000000000000000000000000000000000006064820152608401610399565b6001600160a01b0383166000908152602081905260408120838303905560028054849290610af8908490610cb7565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b80356001600160a01b0381168114610b5a57600080fd5b919050565b600060208284031215610b70578081fd5b610b7982610b43565b9392505050565b60008060408385031215610b92578081fd5b610b9b83610b43565b9150610ba960208401610b43565b90509250929050565b600080600060608486031215610bc6578081fd5b610bcf84610b43565b9250610bdd60208501610b43565b9150604084013590509250925092565b60008060408385031215610bff578182fd5b610c0883610b43565b946020939093013593505050565b600060208284031215610c27578081fd5b5035919050565b6000602080835283518082850152825b81811015610c5a57858101830151858201604001528201610c3e565b81811115610c6b5783604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b60008219821115610cb257610cb2610d22565b500190565b600082821015610cc957610cc9610d22565b500390565b600181811c90821680610ce257607f821691505b60208210811415610d1c577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea2646970667358221220ab5ec50581b9dcf0a1717e2c63af2cbd088963b309d140db2b118e24565266fe64736f6c63430008040033";
