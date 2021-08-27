import { BigInt, Address } from "@graphprotocol/graph-ts"
import { OwnershipTransferred } from "../../generated/templates/OurProxy/OurProxy"
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


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let newOwner = findOrCreateUser(event.params.newOwner.toHexString())

  let ourProxy = OurProxy.load(event.address.toHexString())

  ourProxy.owner = newOwner.id

  ourProxy.save()
}
