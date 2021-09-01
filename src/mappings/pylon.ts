import { BigInt, Address } from "@graphprotocol/graph-ts"
import { AddedOwner, Batch1155Received, ERC1155Received, ERC777Received, ETHReceived, MassTransferERC20, ProxySetup, RemovedOwner, TokenReceived, TransferETH, WindowIncremented } from "../../generated/OurPylon/OurPylon"
import { OurProxy, User, SplitNFT } from "../../generated/schema"
import { zeroAddress, findOrCreateUser, findOrCreateNFTContract, } from "./helpers"

/**
 * Handler called when the `ProxySetup` Event is emitted on a Proxy
 * @eventParam address[] owners: addresses to be set as owners
 */
export function handleProxySetup(event: ProxySetup): void {
  // get formatted variables
  let ourProxy = OurProxy.load(event.address.toHexString())
  let owners = event.params.owners;

  // get users
  let i = 0
  while (i <= owners.length) {
    let address = owners[i].toHexString()
    let user = findOrCreateUser(address)
    ourProxy.proxyOwners.push(user.id)
  }

  ourProxy.save()
 
}

/**
 * Handler called when the `AddedOwner` Event is emitted on a Proxy
 * @eventParam
 * @eventParam
 * @eventParam
 * @eventParam
 * @eventParam
 */
export function handleAddedOwner(event: AddedOwner): void {
  let ourProxy = OurProxy.load(event.address.toHexString())
  let address = event.params.owner.toHexString()
  let user = findOrCreateUser(address)

  ourProxy.proxyOwners.push(user.id)

  ourProxy.save()

}

/**
 * Handler called when the `RemovedOwner` Event is emitted on a Proxy
 * @eventParam
 * @eventParam
 * @eventParam
 * @eventParam
 * @eventParam
 */
export function handleRemovedOwner(event: RemovedOwner): void {
  let ourProxy = OurProxy.load(event.address.toHexString())
  let address = event.params.owner.toHexString()
  let user = findOrCreateUser(address)

  let index = ourProxy.proxyOwners.indexOf(user.id)
  ourProxy.proxyOwners.splice(index, 1)

  ourProxy.save()
}

/**
 * Handler called when the `ETHReceived` Event is emitted on a Proxy
 * @eventParam address origin: tx.origin of transaction
 * @eventParam address sender: address of the sender of the ETH/WETH
 * @eventParam uint256 value: the amount of ETH/WETH Received
 */
 export function handleETHReceived(event: ETHReceived): void {
  let ourProxy = OurProxy.load(event.address.toHexString())
  let value = event.params.value;

  ourProxy.ETH = ourProxy.ETH + value;

  ourProxy.save()
}

/**
 * Handler called when the `` Event is emitted on a Proxy
 * @eventParam
 * @eventParam
 * @eventParam
 * @eventParam
 * @eventParam
 */
// export function handleWindowIncremented(event: WindowIncremented): void {
//   let ourProxy = OurProxy.load(event.address.toHexString())

// }

export function handleTransferETH(event: TransferETH): void {
  let ourProxy = OurProxy.load(event.address.toHexString())
  let recipient = findOrCreateUser(event.params.account.toHexString())
  let amount = event.params.amount
  let success = event.params.success
  
  if (success) {
    let amountBefore = ourProxy.ETH
    ourProxy.ETH = amountBefore - amount
    ourProxy.save()
  }
}

/**
 * Handler called when the `` Event is emitted on a Proxy
 * @eventParam
 * @eventParam
 * @eventParam
 * @eventParam
 * @eventParam
 */
// export function handleMassTransferERC20(event: MassTransferERC20): void {
//   let ourProxy = OurProxy.load(event.address.toHexString())
//   let tokenAddress = event.params.token.toHexString()

// }

/**
 * Handler called when the `TokenReceived` Event is emitted on a Proxy. 
 * Only creates SplitNFT entity if newly minted
 * @eventParam address operator: msg.sender of ERC721 transfer (usually parent contract)
 * @eventParam address from: last owner of ERC721 OR 0x00 address if newly minted
 * @eventParam uint256 tokenId: tokenId of the ERC721
 * @eventParam bytes data: optional calldata
 */
// export function handleERC721Received(event: TokenReceived): void {
export function handleTokenReceived(event: TokenReceived): void {
  let ourProxy = OurProxy.load(event.address.toHexString())
  // get formatted variables
  let contract = event.params.operator.toHexString();
  let from = event.params.from.toHexString();
  let tokenId = event.params.tokenId.toString();
  let transactionHash = event.transaction.hash.toHexString();

  // find/create entity instances
  let nftContract = findOrCreateNFTContract(contract);

  // if the 'from' address is 0x00, the token was just Created, so create new SplitNFT
  if (from == zeroAddress) {
    let id = `${tokenId}-${contract}`;
    let splitNFT = new SplitNFT(id);
    splitNFT.tokenId = tokenId;
    splitNFT.contract = nftContract.id;
    splitNFT.creator = ourProxy.id;
    splitNFT.transactionHash = transactionHash;
    splitNFT.save()
  };
}

/**
 * Handler called when the `` Event is emitted on a Proxy
 * @eventParam
 * @eventParam
 * @eventParam
 * @eventParam
 * @eventParam
 */
// export function handleERC1155Received(event: ERC1155Received): void {
//   let ourProxy = OurProxy.load(event.address.toHexString())
// }

/**
 * Handler called when the `` Event is emitted on a Proxy
 * @eventParam
 * @eventParam
 * @eventParam
 * @eventParam
 * @eventParam
 */
// export function handleBatch1155Received(event: Batch1155Received): void {
//   let ourProxy = OurProxy.load(event.address.toHexString())
// }

/**
 * Handler called when the `` Event is emitted on a Proxy
 * @eventParam
 * @eventParam
 * @eventParam
 * @eventParam
 * @eventParam
 */
// export function handleERC777Received(event: ERC777Received): void {
//   let ourProxy = OurProxy.load(event.address.toHexString())
// }
