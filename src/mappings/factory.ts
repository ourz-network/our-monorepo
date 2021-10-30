import { BigInt, Address, log } from "@graphprotocol/graph-ts";
import { SplitCreated } from "../../generated/OurFactory/OurFactory";
import { OurPylon } from "../../generated/templates";
import { Split, Recipient } from "../../generated/schema";
import { findOrCreateUser } from "./helpers";
import { JSON } from "assemblyscript-json";

/**
 * Handler called when the `SplitCreated` Event is emitted on OurFactory
 * @eventParam address split: address of the newly created contract
 * @eventParam address proxyOwner: address of the user who created and now manages the proxy
 * @eventParam string splitRecipients: JSON.stringify(Array<Object>) of the Split's recipients
 */
export function handleSplitCreated(event: SplitCreated): void {
  // log.info("Handling Event: SplitCreated...", []);
  // initialize split instance from Data Source Template
  OurPylon.create(event.params.ourProxy);

  // let creatorAddress = event.params.proxyCreator.toHexString();
  // let proxyAddress = event.params.split.toHexString();
  let creator = findOrCreateUser(event.params.proxyCreator.toHexString());
  let nickname = event.params.nickname;

  let split = new Split(event.params.ourProxy.toHexString());
  split.nickname = nickname;
  split.transactionHash = event.transaction.hash.toHexString();
  split.createdAtTimestamp = event.block.timestamp;
  split.createdAtBlockNumber = event.block.number;
  split.owners = [];
  split.creator = creator.id;
  split.ETH = BigInt.fromI32(0);
  split.needsIncremented = false;

  // Parse Split Recipients (JSON array of objects)
  let splitRecipients = event.params.splitRecipients;
  // log.debug("Incoming SplitRecipients: {}", [splitRecipients]);
  // log.info("Attempting to parse JSON...", []);

  let splitArr: JSON.Arr = <JSON.Arr>JSON.parse(splitRecipients);

  let recipients: Array<string> = [];
  if (splitArr != null) {
    // log.debug("Parsed. New stringified version: {}", [splitArr.toString()]);

    let splitArray = splitArr._arr;
    // log.debug("Accessing _arr: {}", [splitArray.toString()]);

    let splitLength = splitArray.length;
    // log.debug("Length of SplitRecipients array is {}.", [`${splitLength}`]);

    for (let i = 0; i < splitArray.length; i++) {
      // log.info("Beginning Recipient #{}...", [`${i}`]);
      let splitObject: JSON.Obj = <JSON.Obj>splitArray[i];

      if (splitObject != null) {
        // log.debug("splitObject #{} toString: {}", [`${i}`, splitObject.toString()]);

        let addressOrNull: JSON.Str | null = splitObject.getString("address");
        let nameOrNull: JSON.Str | null = splitObject.getString("name");
        let roleOrNull: JSON.Str | null = splitObject.getString("role");
        let sharesOrNull: JSON.Str | null = splitObject.getString("shares");
        let allocationOrNull: JSON.Str | null = splitObject.getString("allocation");

        let address: string;
        let name: string;
        let role: string;
        let shares: string;
        let allocation: string;

        if (addressOrNull != null) {
          address = addressOrNull.valueOf();
        }

        if (address != null) {
          let Addr = Address.fromString(address);
          let addressHex = Addr.toHexString();

          let user = findOrCreateUser(addressHex);

          // "0xContract-0xEOA"
          let recipientId = split.id + "-" + addressHex;

          let recipient = new Recipient(recipientId);
          recipient.user = user.id;
          recipient.split = split.id;

          if (nameOrNull != null) {
            name = nameOrNull.valueOf();
            if (name != null) {
              recipient.name = name;
            }
          }

          if (roleOrNull != null) {
            role = roleOrNull.valueOf();
            if (role != null) {
              recipient.role = role;
            }
          }

          if (sharesOrNull != null) {
            shares = sharesOrNull.valueOf();
            if (shares != null) {
              recipient.shares = shares;
            } else recipient.shares = "0";
          }

          if (allocationOrNull != null) {
            allocation = allocationOrNull.valueOf();
            if (allocation != null) {
              recipient.allocation = allocation;
            } else recipient.allocation = "0";
          }

          // log.debug(
          //   "Recipient #{} -- Address: {}, Name: {}, Role: {}, Shares: {}, Allocation: {}",
          //   [`${i}`, address, name, role, shares, allocation]
          // );

          recipient.claimableETH = BigInt.fromI32(0);
          recipient.claimedETH = BigInt.fromI32(0);

          recipients.push(recipientId);
          recipient.save();
          // log.info("Recipient #{} saved successfully!", [`${i}`]);
        }
      }
    }
  }

  split.recipients = recipients;
  split.save();
  // log.info("Created succesfully! Subgraph now monitoring contract at {}; created by {}.", [
  //   split.id,
  //   creator.id,
  // ]);
}
