/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { OurFactory } from "../OurFactory";

export class OurFactory__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    splitter_: string,
    minter_: string,
    overrides?: Overrides
  ): Promise<OurFactory> {
    return super.deploy(
      splitter_,
      minter_,
      overrides || {}
    ) as Promise<OurFactory>;
  }
  getDeployTransaction(
    splitter_: string,
    minter_: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(splitter_, minter_, overrides || {});
  }
  attach(address: string): OurFactory {
    return super.attach(address) as OurFactory;
  }
  connect(signer: Signer): OurFactory__factory {
    return super.connect(signer) as OurFactory__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OurFactory {
    return new Contract(address, _abi, signerOrProvider) as OurFactory;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "splitter_",
        type: "address",
      },
      {
        internalType: "address",
        name: "minter_",
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
        indexed: false,
        internalType: "address",
        name: "ourProxy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "proxyManager",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "splitRecipients",
        type: "string",
      },
    ],
    name: "ProxyCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "merkleRoot_",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "splitRecipients_",
        type: "string",
      },
    ],
    name: "createSplit",
    outputs: [
      {
        internalType: "address",
        name: "ourProxy",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "merkleRoot",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "splitOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "splitter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b50604051610d5a380380610d5a83398101604081905261002f91610069565b6001600160601b0319606092831b8116608052911b1660a05261009b565b80516001600160a01b038116811461006457600080fd5b919050565b6000806040838503121561007b578182fd5b6100848361004d565b91506100926020840161004d565b90509250929050565b60805160601c60a05160601c610c966100c4600039600060910152600060e20152610c966000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806303fca8471461005c578063075461721461008c57806309200922146100b35780632eb4a7ab146100c65780633cd8045e146100dd575b600080fd5b60005461006f906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b61006f7f000000000000000000000000000000000000000000000000000000000000000081565b61006f6100c13660046101d1565b610104565b6100cf60015481565b604051908152602001610083565b61006f7f000000000000000000000000000000000000000000000000000000000000000081565b600080546001600160a01b03191633178155600183905560408051602081018590520160405160208183030381529060405280519060200120604051610149906101c4565b8190604051809103906000f5905080158015610169573d6000803e3d6000fd5b506000600181905580546001600160a01b03191690556040519091507ff6d2909e43c0a43861d485afb2afe249c4b52ab0ab1c7b825f63208b09324680906101b690839033908690610287565b60405180910390a192915050565b6109548061030d83390190565b600080604083850312156101e3578182fd5b82359150602083013567ffffffffffffffff80821115610201578283fd5b818501915085601f830112610214578283fd5b813581811115610226576102266102f6565b604051601f8201601f19908116603f0116810190838211818310171561024e5761024e6102f6565b81604052828152886020848701011115610266578586fd5b82602086016020830137856020848301015280955050505050509250929050565b600060018060a01b0380861683526020818616818501526060604085015284519150816060850152825b828110156102cd578581018201518582016080015281016102b1565b828111156102de5783608084870101525b5050601f01601f191691909101608001949350505050565b634e487b7160e01b600052604160045260246000fdfe608060405234801561001057600080fd5b50336001600160a01b0316633cd8045e6040518163ffffffff1660e01b8152600401602060405180830381600087803b15801561004c57600080fd5b505af1158015610060573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100849190610303565b600260006101000a8154816001600160a01b0302191690836001600160a01b03160217905550336001600160a01b031663075461726040518163ffffffff1660e01b8152600401602060405180830381600087803b1580156100e557600080fd5b505af11580156100f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061011d9190610303565b600360006101000a8154816001600160a01b0302191690836001600160a01b03160217905550336001600160a01b03166303fca8476040518163ffffffff1660e01b8152600401602060405180830381600087803b15801561017e57600080fd5b505af1158015610192573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101b69190610303565b600760006101000a8154816001600160a01b0302191690836001600160a01b03160217905550336001600160a01b0316632eb4a7ab6040518163ffffffff1660e01b8152600401602060405180830381600087803b15801561021757600080fd5b505af115801561022b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061024f9190610331565b6000556003546001600160a01b03166102706007546001600160a01b031690565b6040516001600160a01b03909116602482015260440160408051601f198184030181529181526020820180516001600160e01b0316635df75c0360e01b179052516102bb9190610349565b600060405180830381855af49150503d80600081146102f6576040519150601f19603f3d011682016040523d82523d6000602084013e6102fb565b606091505b505050610382565b600060208284031215610314578081fd5b81516001600160a01b038116811461032a578182fd5b9392505050565b600060208284031215610342578081fd5b5051919050565b60008251815b81811015610369576020818601810151858301520161034f565b818111156103775782828501525b509190910192915050565b6105c3806103916000396000f3fe6080604052600436106100955760003560e01c8063715018a611610059578063715018a61461022f57806381e580d3146102445780638da5cb5b14610264578063ba0bafb414610282578063f2fde38b14610298576100f1565b80630754617214610155578063150b7a021461018c5780632eb4a7ab146101c55780633cd8045e146101e95780634f0e0ef314610207576100f1565b366100f15760408051328152336020820152348183015290517fb9659f60fc4a5d95eed07c34f45658647b37d1c60931f8e14ed9a5d1603c6b3c9181900360600190a134600660008282546100ea9190610569565b9091555050005b6007546001600160a01b031633141561013f5760006101186003546001600160a01b031690565b905060405136600082376000803683855af43d806000843e81801561013b578184f35b8184fd5b60006101186002546001600160a01b031690565b005b34801561016157600080fd5b506003546001600160a01b03165b6040516001600160a01b0390911681526020015b60405180910390f35b34801561019857600080fd5b506101ac6101a736600461046a565b6102b8565b6040516001600160e01b03199091168152602001610183565b3480156101d157600080fd5b506101db60005481565b604051908152602001610183565b3480156101f557600080fd5b506002546001600160a01b031661016f565b34801561021357600080fd5b5061016f73c778417e063141139fce010982780140aa0cd5ab81565b34801561023b57600080fd5b5061015361030b565b34801561025057600080fd5b506101db61025f366004610500565b61032e565b34801561027057600080fd5b506007546001600160a01b031661016f565b34801561028e57600080fd5b506101db60015481565b3480156102a457600080fd5b506101536102b3366004610449565b61034f565b60007f5343d39c46825e39cfee854256354ed1b3837af99997a3242ae29e831889773c86868686866040516102f1959493929190610518565b60405180910390a150630a85bd0160e11b95945050505050565b6007546001600160a01b0316331461032257600080fd5b61032c60006103db565b565b6004818154811061033e57600080fd5b600091825260209091200154905081565b6007546001600160a01b0316331461036657600080fd5b6001600160a01b0381166103cf5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840160405180910390fd5b6103d8816103db565b50565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80356001600160a01b038116811461044457600080fd5b919050565b60006020828403121561045a578081fd5b6104638261042d565b9392505050565b600080600080600060808688031215610481578081fd5b61048a8661042d565b94506104986020870161042d565b935060408601359250606086013567ffffffffffffffff808211156104bb578283fd5b818801915088601f8301126104ce578283fd5b8135818111156104dc578384fd5b8960208285010111156104ed578384fd5b9699959850939650602001949392505050565b600060208284031215610511578081fd5b5035919050565b6001600160a01b038681168252851660208201526040810184905260806060820181905281018290526000828460a084013781830160a090810191909152601f909201601f19160101949350505050565b6000821982111561058857634e487b7160e01b81526011600452602481fd5b50019056fea264697066735822122039c7e10a6e712cf69d0e0ea69558ff171852a931f3689c612659c4349e9bc17864736f6c63430008040033a2646970667358221220099e1ceb70292ba5b604e7888be86924a51a977eab188ba9bee1587059b369af64736f6c63430008040033";
