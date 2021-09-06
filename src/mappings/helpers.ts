import { BigInt, Address, JSONValue, JSONValueKind, BigDecimal, ByteArray } from "@graphprotocol/graph-ts"
import { ProxyCreated } from "../../generated/OurFactory/OurFactory"
import { ERC721Received, ETHReceived } from "../../generated/templates/OurPylon/OurPylon"
import { OurProxy, User, NFTContract, SplitRecipient } from "../../generated/schema"

export const zeroAddress = '0x0000000000000000000000000000000000000000'

/**
 * Find or Create a User entity with `id` and return it
 * @param id
 */
export function findOrCreateUser(id: string): User {
  let user = User.load(id)

  if (user == null) {
    user = new User(id)
    user.ethClaimed = BigInt.fromI32(0) 
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

/**
 * Make sure the given JSONValue is an array of strings and returns
 * It optimistically skips over any values that are not string within the array
 * Returns blank array otherwise
 */
 export function jsonToArrayString(val: JSONValue | null): Array<string> {
  if (val != null && val.kind === JSONValueKind.ARRAY) {
    let valArray = val.toArray()
    let result: Array<string>
    for (let i = 0; i < valArray.length; i++) {
      if (valArray[i].kind === JSONValueKind.STRING) result.push(valArray[i].toString())
    }
    return result
  }
  return []
}

/**
 * Make sure the given JSONValue is a string and returns string it contains.
 * Returns blank string otherwise.
 */
 export function jsonToString(val: JSONValue | null): string {
  if (val != null && val.kind === JSONValueKind.STRING) {
    return val.toString()
  }
  return ''
}

/**
 * Make sure the given JSONValue is a string and returns string it contains.
 * Returns blank string otherwise.
 */
 export function jsonToBigInt(val: JSONValue | null): BigInt {
  if (val != null && val.kind === JSONValueKind.STRING) {
    let valString = val.toString()
    return BigInt.fromString(valString)
  }
  return BigInt.fromI32(0)
}



/**
 * Parses Split Recipients on Proxy Creation
 */
// export function parseRecipients(splitArray: Array<Object>): Split {
  
// }