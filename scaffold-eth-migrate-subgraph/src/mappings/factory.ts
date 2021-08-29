import { BigInt } from "@graphprotocol/graph-ts"
import { ProxyCreated } from "../../generated/OurFactory/OurFactory"
import { OurProxy } from "../../generated/schema"
import { findOrCreateUser } from "./helpers";

/**
 * Handler called when the `ProxyCreated` Event is emitted on OurFactory
 * @eventParam address ourProxy: address of the newly created contract
 * @eventParam address proxyOwner: address of the user who created and now manages the proxy
 * @eventParam string splitRecipients: JSON.stringify([array]) of the Split's recipients
 */
export function handleProxyCreated(event: ProxyCreated): void {
  let proxyAddress = event.params.ourProxy.toHexString();
  let owner = findOrCreateUser(event.params.proxyOwner.toHexString());
  let splitRecipients = event.params.splitRecipients;

  let ourProxy = new OurProxy(proxyAddress);

  ourProxy.transactionHash = event.transaction.hash.toHexString();
  ourProxy.createdAtTimestamp = event.block.timestamp;
  ourProxy.createdAtBlockNumber = event.block.number;
  ourProxy.proxyOwner = owner.id;
  ourProxy.proxyCreator = owner.id;
  ourProxy.transfers = BigInt.fromI32(0);
  ourProxy.splitRecipients = splitRecipients;
  ourProxy.ETH = BigInt.fromI32(0);

  ourProxy.save()
}
