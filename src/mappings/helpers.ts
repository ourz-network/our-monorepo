import { BigInt, Address } from "@graphprotocol/graph-ts"
import { ProxyCreated } from "../../generated/OurFactory/OurFactory"
import { TokenReceived, ETHReceived } from "../../generated/OurPylon/OurPylon"
import { OurProxy, User, NFTContract } from "../../generated/schema"

export const zeroAddress = '0x0000000000000000000000000000000000000000'

/**
 * Find or Create a User entity with `id` and return it
 * @param id
 */
export function findOrCreateUser(id: string): User {
  let user = User.load(id)

  if (user == null) {
    user = new User(id)
    user.ethClaimed = BigInt.fromI32(0);
    user.save()
  }

  return user as User
}

/**
 * Find or Create a User entity with `id` and return it
 * @param id
 */
 export function findOrCreateNFTContract(contractAddress: string): NFTContract {
  let id = `${contractAddress}`
  let nftContract = NFTContract.load(id)

  if (nftContract == null) {
    nftContract = new NFTContract(id)
    nftContract.save()
  }

  return nftContract as NFTContract
}

