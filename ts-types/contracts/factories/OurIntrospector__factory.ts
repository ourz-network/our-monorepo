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
  "0x608060405234801561001057600080fd5b506107dd806100206000396000f3fe608060405234801561001057600080fd5b50600436106100665760003560e01c8063150b7a0211610050578063150b7a02146100a8578063bc197c81146100ec578063f23a6e61146100ff57600080fd5b806223de291461006b57806301ffc9a714610080575b600080fd5b61007e610079366004610498565b610112565b005b61009361008e3660046106b9565b61017b565b60405190151581526020015b60405180910390f35b6100bb6100b63660046105d6565b610260565b6040517fffffffff00000000000000000000000000000000000000000000000000000000909116815260200161009f565b6100bb6100fa366004610540565b6102e6565b6100bb61010d366004610643565b610357565b6040805173ffffffffffffffffffffffffffffffffffffffff8a8116825289811660208301528816818301526060810187905290517f0fe6507bce457d6e175fa9bc1db1b817f39e37b1f5c91695fd1a62848bc433b79181900360800190a15050505050505050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f4e2312e000000000000000000000000000000000000000000000000000000000148061020e57507fffffffff0000000000000000000000000000000000000000000000000000000082167f150b7a0200000000000000000000000000000000000000000000000000000000145b8061025a57507fffffffff0000000000000000000000000000000000000000000000000000000082167f01ffc9a700000000000000000000000000000000000000000000000000000000145b92915050565b6040805173ffffffffffffffffffffffffffffffffffffffff8088168252861660208201529081018490526000907f941a9d9a9af7f97737c018d13918859e12f44e16c4b4c6ac922dacf021cfbf149060600160405180910390a1507f150b7a020000000000000000000000000000000000000000000000000000000095945050505050565b60007f762f561e1c5dd9bc02eb3404c59dd1c32e6aa53a8097b703e4e0c14870869d7d8989898989896040516103219695949392919061074d565b60405180910390a1507fbc197c810000000000000000000000000000000000000000000000000000000098975050505050505050565b6040805173ffffffffffffffffffffffffffffffffffffffff808916825287166020820152908101859052606081018490526000907ffae60880665b87af033fc873390c3749e126b4cd010b87a7f1191dbd2b32f1979060800160405180910390a1507ff23a6e61000000000000000000000000000000000000000000000000000000009695505050505050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461040957600080fd5b919050565b60008083601f84011261041f578182fd5b50813567ffffffffffffffff811115610436578182fd5b6020830191508360208260051b850101111561045157600080fd5b9250929050565b60008083601f840112610469578182fd5b50813567ffffffffffffffff811115610480578182fd5b60208301915083602082850101111561045157600080fd5b60008060008060008060008060c0898b0312156104b3578384fd5b6104bc896103e5565b97506104ca60208a016103e5565b96506104d860408a016103e5565b955060608901359450608089013567ffffffffffffffff808211156104fb578586fd5b6105078c838d01610458565b909650945060a08b013591508082111561051f578384fd5b5061052c8b828c01610458565b999c989b5096995094979396929594505050565b60008060008060008060008060a0898b03121561055b578384fd5b610564896103e5565b975061057260208a016103e5565b9650604089013567ffffffffffffffff8082111561058e578586fd5b61059a8c838d0161040e565b909850965060608b01359150808211156105b2578586fd5b6105be8c838d0161040e565b909650945060808b013591508082111561051f578384fd5b6000806000806000608086880312156105ed578081fd5b6105f6866103e5565b9450610604602087016103e5565b935060408601359250606086013567ffffffffffffffff811115610626578182fd5b61063288828901610458565b969995985093965092949392505050565b60008060008060008060a0878903121561065b578182fd5b610664876103e5565b9550610672602088016103e5565b94506040870135935060608701359250608087013567ffffffffffffffff81111561069b578283fd5b6106a789828a01610458565b979a9699509497509295939492505050565b6000602082840312156106ca578081fd5b81357fffffffff00000000000000000000000000000000000000000000000000000000811681146106f9578182fd5b9392505050565b81835260007f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff831115610731578081fd5b8260051b80836020870137939093016020019283525090919050565b600073ffffffffffffffffffffffffffffffffffffffff808916835280881660208401525060806040830152610787608083018688610700565b828103606084015261079a818587610700565b999850505050505050505056fea2646970667358221220eb7fbd549c6e2367f9cefbfdc868a8823e8a177dcb70167a9656089b0551093264736f6c63430008040033";
