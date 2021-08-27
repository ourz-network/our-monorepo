import { BigInt, Address } from "@graphprotocol/graph-ts"
import { TransferETH, WindowIncremented } from "../../generated/templates/OurProxy/OurSplitter"
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


// export function handleTransferETH(event: TransferETH): void {
//   let recipient = findOrCreateUser(event.params.account.toHexString())
//   let amount = event.params.amount
//   let success = event.params.success
  
//   let ourProxy = OurProxy.load(event.address)
//   if (success) {
//     let amountBefore = ourProxy.ETH
//     ourProxy.ETH = BigInt.fromI32(Number(amountBefore) - Number(amount))
//     ourProxy.save()
//   }
// }

// export function handleWindowIncremented(event: WindowIncremented): void {
//   let newOwner = findOrCreateUser(event.params.newOwner.toHexString())

//   let ourProxy = OurProxy.load(event.address)

//   ourProxy.owner = newOwner.id

//   ourProxy.save()
// }
