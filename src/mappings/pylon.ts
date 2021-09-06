import { BigInt, Address, ByteArray, log } from "@graphprotocol/graph-ts"
import { AddedOwner, Batch1155Received, ERC1155Received, ERC777Received, ETHReceived, MassTransferERC20, ProxySetup, RemovedOwner, ERC721Received, TransferETH, WindowIncremented } from "../../generated/templates/OurPylon/OurPylon"
import { OurProxy, User, SplitNFT } from "../../generated/schema"
import { zeroAddress, findOrCreateUser, findOrCreateNFTContract } from "./helpers"

/**
 * Handler called when the `ProxySetup` Event is emitted on a Proxy
 * @eventParam address[] owners: addresses to be set as owners
 */
export function handleProxySetup(event: ProxySetup): void {
  // get formatted variables
  let proxy = event.address
  let proxyAddress = proxy.toHexString()
  log.info('Handling Event: ProxySetup at {}...', [proxyAddress])

  let ourProxy = OurProxy.load(proxyAddress)!

  let eventOwners = event.params.owners as Array<Address>;
  let ownersLength = eventOwners.length
  log.debug('Length of eventOwners array is {}.', [ownersLength.toString()])
  
  // copy proxyOwners property
  let proxyOwners = ourProxy.proxyOwners;

  // // get users
  for (let i = 0; i < eventOwners.length; i++) {
    let address = eventOwners[i];
    let addressHex = address.toHexString();
    log.debug('Owner #{} -- Address: {}', [`${i}`, addressHex])

    let user = findOrCreateUser(addressHex);
    let userId = user.id

    proxyOwners.push(userId)
  }
  
  log.info('These are the owners: {}', [proxyOwners.toString()])

  ourProxy.proxyOwners = proxyOwners;
  ourProxy.save();
  log.info('Proxy at {}: Owners saved successfully', [proxyAddress])
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
  // get formatted variables
  let proxy = event.address
  let proxyAddress = proxy.toHexString()
  log.info('Handling Event: AddedOwner at {}...', [proxyAddress])
  
  let ourProxy = OurProxy.load(proxyAddress)!

  let newOwner = event.params.owner.toHexString()
  let user = findOrCreateUser(newOwner)

  ourProxy.proxyOwners.push(user.id)

  ourProxy.save()
  log.info('Added Owner: {} to Proxy at {}', [user.id, proxyAddress])
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
  // get formatted variables
  let proxy = event.address
  let proxyAddress = proxy.toHexString()
  log.info('Handling Event: RemovedOwner at {}...', [proxyAddress])
  
  let ourProxy = OurProxy.load(proxyAddress)!

  let exOwner = event.params.owner.toHexString()
  let user = findOrCreateUser(exOwner)

  let index = ourProxy.proxyOwners.indexOf(user.id)
  ourProxy.proxyOwners.splice(index, 1)

  ourProxy.save()
  log.info('Removed Owner: {} from Proxy at {}', [user.id, proxyAddress])
}

/**
 * Handler called when the `ETHReceived` Event is emitted on a Proxy
 * @eventParam address origin: tx.origin of transaction
 * @eventParam address sender: address of the sender of the ETH/WETH
 * @eventParam uint256 value: the amount of ETH/WETH Received
 */
 export function handleETHReceived(event: ETHReceived): void {
  // get formatted variables
  let proxy = event.address
  let proxyAddress = proxy.toHexString()
  log.info('Handling Event: ETHReceived at {}...', [proxyAddress])
  
  let ourProxy = OurProxy.load(proxyAddress)!

  let beforeETH = ourProxy.ETH ? ourProxy.ETH : BigInt.fromI32(0)
  let value = event.params.value;

  let afterETH = beforeETH + value;
  ourProxy.ETH = afterETH

  ourProxy.save()
  log.info('{} sent {} Ether. Balance {} -> {}', [event.params.sender.toHexString(), value.toString(), beforeETH ? beforeETH.toString() : "0", afterETH.toString()])
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
  // get formatted variables
  let proxy = event.address
  let proxyAddress = proxy.toHexString()
  log.info('Handling Event: TransferETH at {}...', [proxyAddress])
    
  let ourProxy = OurProxy.load(proxyAddress)!

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
export function handleERC721Received(event: ERC721Received): void {
  let ourProxy = OurProxy.load(event.address.toHexString())!
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
