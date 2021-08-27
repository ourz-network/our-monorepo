import { BigInt, Address } from "@graphprotocol/graph-ts"
import { ProxyCreated } from "../../generated/OurFactory/OurFactory"
import { OurProxy, User } from "../../generated/schema"

/**
 * Find or Create a User entity with `id` and return it
 * @param id
 */
function findOrCreateUser(id: string): User {
  let user = User.load(id)

  if (user == null) {
    user = new User(id)
    user.save()
  }

  return user as User
}

export function handleProxyCreated(event: ProxyCreated): void {
  let proxyAddress = event.params.ourProxy.toHexString()
  let owner = findOrCreateUser(event.params.proxyManager.toHexString())
  let splitRecipients = event.params.splitRecipients


  let ourProxy = new OurProxy(proxyAddress)

  ourProxy.transactionHash = event.transaction.hash.toHexString()
  ourProxy.createdAtTimestamp = event.block.timestamp
  ourProxy.createdAtBlockNumber = event.block.number
  ourProxy.owner = owner.id
  ourProxy.creator = owner.id
  ourProxy.splitRecipients = splitRecipients
  ourProxy.ETH = BigInt.fromI32(0)
  ourProxy.WETH = BigInt.fromI32(0)


  ourProxy.save()
}
