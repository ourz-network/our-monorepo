/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { OurIntrospector } from "../OurIntrospector";

export class OurIntrospector__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<OurIntrospector> {
    return super.deploy(overrides || {}) as Promise<OurIntrospector>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): OurIntrospector {
    return super.attach(address) as OurIntrospector;
  }
  connect(signer: Signer): OurIntrospector__factory {
    return super.connect(signer) as OurIntrospector__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OurIntrospector {
    return new Contract(address, _abi, signerOrProvider) as OurIntrospector;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "Batch1155Received",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "ERC1155Received",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721Received",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ERC777Received",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator_",
        type: "address",
      },
      {
        internalType: "address",
        name: "from_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId_",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "tokensReceived",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610665806100206000396000f3fe608060405234801561001057600080fd5b50600436106100565760003560e01c806223de291461005b57806301ffc9a714610070578063150b7a0214610098578063bc197c81146100c4578063f23a6e61146100d7575b600080fd5b61006e61006936600461035e565b6100ea565b005b61008361007e36600461057f565b610146565b60405190151581526020015b60405180910390f35b6100ab6100a636600461049c565b610198565b6040516001600160e01b0319909116815260200161008f565b6100ab6100d2366004610406565b6101f8565b6100ab6100e5366004610509565b610250565b604080516001600160a01b038a8116825289811660208301528816818301526060810187905290517f0fe6507bce457d6e175fa9bc1db1b817f39e37b1f5c91695fd1a62848bc433b79181900360800190a15050505050505050565b60006001600160e01b03198216630271189760e51b148061017757506001600160e01b03198216630a85bd0160e11b145b8061019257506001600160e01b031982166301ffc9a760e01b145b92915050565b604080516001600160a01b038088168252861660208201529081018490526000907f941a9d9a9af7f97737c018d13918859e12f44e16c4b4c6ac922dacf021cfbf149060600160405180910390a150630a85bd0160e11b95945050505050565b60007f762f561e1c5dd9bc02eb3404c59dd1c32e6aa53a8097b703e4e0c14870869d7d898989898989604051610233969594939291906105e2565b60405180910390a15063bc197c8160e01b98975050505050505050565b604080516001600160a01b03808916825287166020820152908101859052606081018490526000907ffae60880665b87af033fc873390c3749e126b4cd010b87a7f1191dbd2b32f1979060800160405180910390a15063f23a6e6160e01b9695505050505050565b80356001600160a01b03811681146102cf57600080fd5b919050565b60008083601f8401126102e5578182fd5b50813567ffffffffffffffff8111156102fc578182fd5b6020830191508360208260051b850101111561031757600080fd5b9250929050565b60008083601f84011261032f578182fd5b50813567ffffffffffffffff811115610346578182fd5b60208301915083602082850101111561031757600080fd5b60008060008060008060008060c0898b031215610379578384fd5b610382896102b8565b975061039060208a016102b8565b965061039e60408a016102b8565b955060608901359450608089013567ffffffffffffffff808211156103c1578586fd5b6103cd8c838d0161031e565b909650945060a08b01359150808211156103e5578384fd5b506103f28b828c0161031e565b999c989b5096995094979396929594505050565b60008060008060008060008060a0898b031215610421578384fd5b61042a896102b8565b975061043860208a016102b8565b9650604089013567ffffffffffffffff80821115610454578586fd5b6104608c838d016102d4565b909850965060608b0135915080821115610478578586fd5b6104848c838d016102d4565b909650945060808b01359150808211156103e5578384fd5b6000806000806000608086880312156104b3578081fd5b6104bc866102b8565b94506104ca602087016102b8565b935060408601359250606086013567ffffffffffffffff8111156104ec578182fd5b6104f88882890161031e565b969995985093965092949392505050565b60008060008060008060a08789031215610521578182fd5b61052a876102b8565b9550610538602088016102b8565b94506040870135935060608701359250608087013567ffffffffffffffff811115610561578283fd5b61056d89828a0161031e565b979a9699509497509295939492505050565b600060208284031215610590578081fd5b81356001600160e01b0319811681146105a7578182fd5b9392505050565b81835260006001600160fb1b038311156105c6578081fd5b8260051b80836020870137939093016020019283525090919050565b6001600160a01b0387811682528616602082015260806040820181905260009061060f90830186886105ae565b82810360608401526106228185876105ae565b999850505050505050505056fea2646970667358221220670493598ae9e2dc8d43b9b32088139ba051b3609cceeb67ac4cb8fd7a0352a764736f6c63430008040033";
