import { BigInt, Address } from "@graphprotocol/graph-ts"
import { OwnershipTransferred, TokenReceived, ETHReceived } from "../../generated/templates/OurProxy/OurProxy"
import { OurProxy, User, TransferOfOwnership, SplitNFT } from "../../generated/schema"
import { zeroAddress, findOrCreateUser, findOrCreateNFTContract, } from "./helpers"

/**
 * Handler called when the `OwnershipTransferred` Event is emitted on a Proxy
 * @eventParam address oldOwner: address of the Proxy's old owner
 * @eventParam address newOwner: address of the Proxy's new owner
 */
export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  // get formatted variables
  let oldOwner = findOrCreateUser(event.params.oldOwner.toHexString());
  let newOwner = findOrCreateUser(event.params.newOwner.toHexString());
  let proxyAddress = event.address.toHexString();
  let transactionHash = event.transaction.hash.toHexString();
  
  // update and save OurProxy
  let ourProxy = OurProxy.load(proxyAddress);
  ourProxy.owner = newOwner.id;
  ourProxy.transfers = ourProxy.transfers + BigInt.fromI32(1);
  ourProxy.save();

  // create and save TransferOfOwnership
  let transferId = `${event.address.toHexString()}-${event.transaction.hash.toHexString()}`
  let transferOfOwnership = new TransferOfOwnership(transferId);
  transferOfOwnership.transactionHash = transactionHash;
  transferOfOwnership.proxy = ourProxy.id;
  transferOfOwnership.from = oldOwner.id;
  transferOfOwnership.to = newOwner.id;
  transferOfOwnership.timestamp = event.block.timestamp;
  transferOfOwnership.save();
}

/**
 * Handler called when the `TokenReceived` Event is emitted on a Proxy. 
 * Only creates SplitNFT entity if newly minted
 * @eventParam address operator: msg.sender of ERC721 transfer (usually parent contract)
 * @eventParam address from: last owner of ERC721 OR 0x00 address if newly minted
 * @eventParam uint256 tokenId: tokenId of the ERC721
 * @eventParam bytes data: optional calldata
 */
export function handleTokenReceived(event: TokenReceived): void {
  // get formatted variables
  let contract = event.params.operator.toHexString();
  let from = event.params.from.toHexString();
  let tokenId = event.params.tokenId.toString();
  // let data = event.params.data.toString();
  let proxyAddress = event.address.toHexString();
  let transactionHash = event.transaction.hash.toHexString();

  // find/create entity instances
  let nftContract = findOrCreateNFTContract(contract);
  let ourProxy = OurProxy.load(proxyAddress);

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
 * Handler called when the `ETHReceived` Event is emitted on a Proxy
 * @eventParam address origin: tx.origin of transaction
 * @eventParam address sender: address of the sender of the ETH/WETH
 * @eventParam uint256 value: the amount of ETH/WETH Received
 */
export function handleETHReceived(event: ETHReceived): void {
  let value = event.params.value;
  let proxyAddress = event.address.toHexString();

  let ourProxy = OurProxy.load(proxyAddress)

  ourProxy.ETH = ourProxy.ETH + value;

  ourProxy.save()
}

/**
 * Handler called when the `ETHReceived` Event is emitted on a Proxy
 * @eventParam address origin: tx.origin of transaction
 * @eventParam address sender: address of the sender of the ETH/WETH
 * @eventParam uint256 value: the amount of ETH/WETH Received
 */
export function handleETHReceived(event: ETHReceived): void {
  let value = event.params.value;
  let proxyAddress = event.address.toHexString();

  let ourProxy = OurProxy.load(proxyAddress)

  ourProxy.ETH = ourProxy.ETH + value;

  ourProxy.save()
}
