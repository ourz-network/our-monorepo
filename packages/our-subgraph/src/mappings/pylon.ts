import { BigInt, Address, log } from "@graphprotocol/graph-ts";
import {
  SplitSetup,
  AddedOwner,
  RemovedOwner,
  NameChanged,
  ZNFTMinted,
  EditionCreated,
  ETHReceived,
  WindowIncremented,
  TransferETH,
  TransferERC20,
} from "../../../../generated/templates/OurPylon/OurPylon";
import {
  Split,
  User,
  SplitZNFT,
  SplitEdition,
  Recipient,
  ERC20Transfer,
} from "../../../../generated/schema";
import { findOrCreateUser } from "./helpers";

/**
 * Handler called when the `SplitSetup` Event is emitted on a Proxy
 * @eventParam address[] owners: addresses to be set as owners
 */
export function handleSplitSetup(event: SplitSetup): void {
  // load entities
  let split = Split.load(event.address.toHexString())!;
  // log.info("Handling Event: SplitSetup at {}...", [split.id]);

  // get formatted variables
  let eventOwners = event.params.owners as Array<Address>;
  // let ownersLength = eventowners.length;

  // load owners from entity to update.
  let owners = split.owners;
  // find or create users
  for (let i = 0; i < eventOwners.length; i++) {
    // let address = eventowners[i];
    // let addressHex = address.toHexString();
    let user = findOrCreateUser(eventOwners[i].toHexString());
    // let userId = user.id;
    owners.push(user.id);
  }

  split.owners = owners;
  split.save();
  // log.info("These are the owners: {}", [owners.toString()]);
  // log.info("Proxy at {}: owners saved successfully", [split.id]);
}

/**
 * Handler called when the `AddedOwner` Event is emitted on a Proxy
 * @eventParam owner: new owner
 */
export function handleAddedOwner(event: AddedOwner): void {
  // load entities
  let split = Split.load(event.address.toHexString())!;
  // log.info("Handling Event: AddedOwner at {}...", [split.id]);

  // get formatted variables
  // let newOwner = event.params.owner.toHexString();
  let user = findOrCreateUser(event.params.owner.toHexString());
  split.owners.push(user.id);

  split.save();
  // log.info("Added Owner: {} to Proxy at {}", [user.id, split.id]);
}

/**
 * Handler called when the `RemovedOwner` Event is emitted on a Proxy
 * @eventParam owner: ex owner
 */
export function handleRemovedOwner(event: RemovedOwner): void {
  // load entities
  let split = Split.load(event.address.toHexString())!;
  // log.info("Handling Event: RemovedOwner at {}...", [split.id]);

  // get formatted variables
  // let exOwner = event.params.owner.toHexString();
  let user = findOrCreateUser(event.params.owner.toHexString());

  let index = split.owners.indexOf(user.id);
  let owners = split.owners;
  owners.splice(index, 1);
  split.owners = owners;

  split.save();
  // log.info("Removed Owner: {} from Proxy at {}", [user.id, split.id]);
}

/**
 * Handler called when the `NameChanged` Event is emitted on a Proxy
 * @eventParam newName: new nickname for split
 */
export function handleNameChanged(event: NameChanged): void {
  // load entities
  let split = Split.load(event.address.toHexString())!;
  // log.info("Handling Event: NameChanged at {}...", [split.id]);

  // get formatted variables
  let newNickname = event.params.newName;
  split.nickname = newNickname;

  split.save();
  // log.info("New Nickname: {} for Proxy at {}", [newNickname, split.id]);
}

/**
 * Handler called when the `ETHReceived` Event is emitted on a Proxy
 * @eventParam address origin: tx.origin of transaction
 * @eventParam address sender: address of the sender of the ETH/WETH
 * @eventParam uint256 value: the amount of ETH/WETH Received
 */
export function handleETHReceived(event: ETHReceived): void {
  // load entities
  let split = Split.load(event.address.toHexString())!;
  // log.info("Handling Event: ETHReceived at {}...", [split.id]);

  // Recipients that want to claim after this tx should also increment the window now
  split.needsIncremented = true;

  // get formatted variables
  let value = event.params.value;
  let beforeETH = split.ETH;
  let afterETH: BigInt;

  if (beforeETH.gt(BigInt.fromI32(0))) {
    afterETH = beforeETH.plus(value);
  } else {
    afterETH = value;
  }
  split.ETH = afterETH;

  let recipients = split.recipients;
  for (let i = 0; i < split.recipients.length; i++) {
    // let recipientId = recipients[i];
    let recipient = Recipient.load(recipients[i])!;

    // let allocationString = recipient.allocation;

    /* Example:
    BalanceForWindow = 100 ETH // Allocation = 2%
    To find out the amount we use, for example: (100 * 200) / (100 * 100)
    which returns 2 -- i.e. 2% of the 100 ETH balance.
    */
    let allocation = BigInt.fromString(recipient.allocation);
    let scaledAmount = value.times(allocation);
    let hundredMillion = BigInt.fromI32(100000000);
    let recipientAllocation = scaledAmount.div(hundredMillion);

    let currentClaimable = recipient.claimableETH;
    let newClaimable = currentClaimable.plus(recipientAllocation);
    recipient.claimableETH = newClaimable;
    recipient.save();

    // log.debug("Recipient {} now has {} ETH available to claim.", [
    //   recipient.id,
    //   newClaimable.toString(),
    // ]);
  }

  split.save();
  // log.info("{} sent {} Ether. Balance {} -> {}", [
  //   event.params.sender.toHexString(),
  //   value.toString(),
  //   beforeETH ? beforeETH.toString() : "0",
  //   afterETH.toString(),
  // ]);
}

/**
 * Handler called when the `WindowIncremented` Event is emitted on a Proxy
 * no parameters
 */
export function handleWindowIncremented(event: WindowIncremented): void {
  // load entities
  let split = Split.load(event.address.toHexString())!;
  // log.info("Handling Event: WindowIncremented at {}...", [split.id]);

  // Window won't need incremented until more ETH is received
  split.needsIncremented = false;
  split.save();
}

/**
 * Handler called when the `TransferETH` Event is emitted on a Proxy
 * @eventParam success: boolean
 * @eventParam account: user that received eth
 * @eventParam amount: value of eth received
 */
export function handleTransferETH(event: TransferETH): void {
  // check that tx was successful
  let success = event.params.success;
  if (success) {
    // load entities
    let split = Split.load(event.address.toHexString())!;
    // log.info("Handling Event: TransferETH at {}...", [split.id]);

    // get formatted variables for updating split entity
    let amount = event.params.amount;
    let amountBefore = split.ETH;
    split.ETH = amountBefore.minus(amount);
    split.save();

    // get formatted variable for updating User entity's total claimedETH
    let user = User.load(event.params.account.toHexString())!;
    let claimedBefore = user.claimedETH;
    let newClaimed = claimedBefore.plus(amount);
    user.claimedETH = newClaimed;
    user.save();

    // get formatted variable for updating Recipient entity's ethClaimable/claimedETH
    let recipient = Recipient.load(`${split.id}-${user.id}`)!;
    let beforeCLAIMABLE = recipient.claimableETH;
    let afterCLAIMABLE = beforeCLAIMABLE.minus(amount);
    recipient.claimableETH = afterCLAIMABLE;
    let beforeCLAIMED = recipient.claimedETH;
    let afterCLAIMED = beforeCLAIMED.plus(amount);
    recipient.claimedETH = afterCLAIMED;
    recipient.save();
  }
}

/**
 * Handler called when the `TransferERC20` Event is emitted on a Proxy
 * @eventParam token: contract for ERC20
 * @eventParam amount: total ERC20s sent to ALL recipients
 * @dev unlike TransferETH, this event is only triggered if all of the transfers were successful
 */
export function handleTransferERC20(event: TransferERC20): void {
  // load entities
  let split = Split.load(event.address.toHexString())!;
  // log.info("Handling Event: TransferERC20 at {}...", [split.id]);

  // get formatted variables
  let tokenAddress = event.params.token.toHexString();
  let amount = event.params.amount;
  let txHash = event.transaction.hash.toHexString();

  // let transferId = `${txHash}-${split.id}`;
  let transfer = new ERC20Transfer(`${txHash}-${split.id}`);
  transfer.split = split.id;
  transfer.transactionHash = txHash;
  transfer.contract = tokenAddress;
  transfer.amount = amount;

  transfer.save();
}

/**
 * Handler called when the `ZNFTMinted` Event is emitted on a Proxy.
 * @eventParam uint256 tokenId: tokenId of the Zora ERC721
 */
export function handleZNFTMinted(event: ZNFTMinted): void {
  // get formatted variables
  let split = Split.load(event.address.toHexString())!;
  let tokenId = event.params.tokenId.toString();
  let transactionHash = event.transaction.hash.toHexString();

  let newZNFT = new SplitZNFT(tokenId);
  newZNFT.creator = split.id;
  newZNFT.transactionHash = transactionHash;
  newZNFT.save();
}

/**
 * Handler called when the `EditionCreated` Event is emitted on a Proxy
 * @eventParam address editionAddress: The newly deployed Edition Contract
 * @eventParam string name: Name of the edition contract
 * @eventParam string symbol: Symbol of the edition contract
 * @eventParam string description: Metadata: Description of the edition entry
 * @eventParam string animationUrl: Metadata: Animation url (optional) of the edition entry
 * @eventParam string imageUrl: Metadata: Image url (semi-required) of the edition entry
 * @eventParam uint256 editionSize: Total size of the edition (number of possible editions)
 * @eventParam uint256 royaltyBPS: BPS amount of royalty
 */
export function handleEditionCreated(event: EditionCreated): void {
  let newEdition = new SplitEdition(event.params.editionAddress.toHexString());
  newEdition.creator = event.address.toHexString();
  newEdition.name = event.params.name;
  newEdition.symbol = event.params.symbol;
  newEdition.description = event.params.description;
  newEdition.animationUrl = event.params.animationUrl;
  newEdition.imageUrl = event.params.imageUrl;
  newEdition.editionSize = event.params.editionSize;
  newEdition.royaltyBPS = event.params.royaltyBPS;

  newEdition.save();
}
