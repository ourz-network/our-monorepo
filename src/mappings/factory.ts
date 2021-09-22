import {
  BigInt,
  ByteArray,
  Bytes,
  Address,
  log,
  json,
  JSONValue,
  JSONValueKind,
  Value,
} from "@graphprotocol/graph-ts";
import { ProxyCreated } from "../../generated/OurFactory/OurFactory";
import { OurPylon } from "../../generated/templates";
import { OurProxy, SplitRecipient } from "../../generated/schema";
import {
  findOrCreateUser,
  jsonToString,
  jsonToBigInt,
  jsonToArrayString,
} from "./helpers";
import { JSON } from "assemblyscript-json";

/**
 * Handler called when the `ProxyCreated` Event is emitted on OurFactory
 * @eventParam address ourProxy: address of the newly created contract
 * @eventParam address proxyOwner: address of the user who created and now manages the proxy
 * @eventParam string splitRecipients: JSON.stringify(Array<Object>) of the Split's recipients
 */
export function handleProxyCreated(event: ProxyCreated): void {
  log.info("Handling Event: ProxyCreated...", []);
  OurPylon.create(event.params.ourProxy);

  let proxyAddress = event.params.ourProxy.toHexString();
  let creatorAddress = event.params.proxyCreator.toHexString();
  let creator = findOrCreateUser(creatorAddress);
  let nickname = event.params.nickname;

  let ourProxy = new OurProxy(proxyAddress);
  ourProxy.nickname = nickname;
  ourProxy.transactionHash = event.transaction.hash.toHexString();
  ourProxy.createdAtTimestamp = event.block.timestamp;
  ourProxy.createdAtBlockNumber = event.block.number;
  ourProxy.proxyOwners = [];
  ourProxy.creator = creator.id;
  ourProxy.transfers = BigInt.fromI32(0);
  ourProxy.ETH = BigInt.fromI32(0);
  ourProxy.needsIncremented = false;

  ourProxy.save();
  log.info(
    "Created succesfully! Subgraph now monitoring contract at {}; created by {}.",
    [proxyAddress, creatorAddress]
  );

  // Parse Split Recipients (JSON array of objects)
  let splitRecipients = event.params.splitRecipients;
  log.debug("Incoming SplitRecipients: {}", [splitRecipients]);
  log.info("Attempting to parse JSON...", []);

  let splitArr: JSON.Arr = <JSON.Arr>JSON.parse(splitRecipients);

  if (splitArr != null) {
    log.debug("Parsed. New stringified version: {}", [splitArr.toString()]);

    let splitArray = splitArr._arr;
    log.debug("Accessing _arr: {}", [splitArray.toString()]);

    let splitLength = splitArray.length;
    log.debug("Length of SplitRecipients array is {}.", [`${splitLength}`]);

    for (let i = 0; i < splitArray.length; i++) {
      log.info("Beginning Recipient #{}...", [`${i}`]);
      let splitObject: JSON.Obj = <JSON.Obj>splitArray[i];

      if (splitObject != null) {
        log.debug("splitObject #{} toString: {}", [
          `${i}`,
          splitObject.toString(),
        ]);

        let addressOrNull: JSON.Str | null = splitObject.getString("address");
        let nameOrNull: JSON.Str | null = splitObject.getString("name");
        let roleOrNull: JSON.Str | null = splitObject.getString("role");
        let sharesOrNull: JSON.Str | null = splitObject.getString("shares");
        let allocationOrNull: JSON.Str | null =
          splitObject.getString("allocation");

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
          let recipientId = proxyAddress + "-" + addressHex;

          let recipient = new SplitRecipient(recipientId);
          recipient.user = user.id;
          recipient.splitProxy = ourProxy.id;

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
            }
          }

          if (allocationOrNull != null) {
            allocation = allocationOrNull.valueOf();
            if (allocation != null) {
              recipient.allocation = allocation;
            }
          }

          // log.debug('Recipient #{} -- Address: {}, Name: {}, Role: {}, Shares: {}, Allocation: {}', [`${i}`, address, name, role, shares, allocation])

          recipient.claimableETH = BigInt.fromI32(0);
          recipient.ethClaimed = BigInt.fromI32(0);

          recipient.save();
          log.info("Recipient #{} saved successfully!", [`${i}`]);
        }
      }
    }
  }
}
