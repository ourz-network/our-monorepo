import { BigInt, Address } from "@graphprotocol/graph-ts"
import { OwnershipTransferred, TokenReceived, ETHReceived } from "../../generated/templates/OurProxy/OurProxy"
import { OurProxy, User, NFTContract, ERC721 } from "../../generated/schema"

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

/**
 * Find or Create a User entity with `id` and return it
 * @param id
 */
function findOrCreateERC721(tokenId: string, creator: OurProxy, NFTContract: NFTContract, transactionHash: string): ERC721 {
  let id = `${tokenId}-${NFTContract.id}`
  let erc721 = ERC721.load(id)

  if (erc721 == null) {
    erc721 = new ERC721(id)
    erc721.creator = creator
    erc721.tokenId = tokenId
    erc721.NFTContract = NFTContract
    erc721.transactionHash = transactionHash
    erc721.save()
  }

  return erc721 as ERC721
}

/**
 * Find or Create a User entity with `id` and return it
 * @param id
 */
function findOrCreateNFTContract(contractAddress: string): NFTContract {
  let id = `${tokenId}-${NFTContract.id}`
  let erc721 = ERC721.load(id)

  if (erc721 == null) {
    erc721 = new ERC721(id)
    erc721.creator = creator
    erc721.tokenId = tokenId
    erc721.NFTContract = NFTContract
    erc721.transactionHash = transactionHash
    erc721.save()
  }

  return erc721 as ERC721
}

//event TokenReceived(address operator, address from, uint256 tokenId, bytes data);
export function handleTokenReceived(event: TokenReceived): void {
  console.log(`handleTokenReceived event params:\n`, event.params)
  let ourProxy = OurProxy.load(event.address.toHexString())
  let tokenId = event.params.tokenId.toString()
  let transactionHash = event.transaction.hash.toHexString()
  let contractAddress = event.params.operator.toHexString()

  let NFTContract = findOrCreateNFTContract(contractAddress)
  
  let erc721 = findOrCreateERC721(tokenId, contractAddress, ourProxy, NFTContract, transactionHash)

  erc721.save()
}
//event ETHReceived(address origin, address sender, uint value);
export function handleETHReceived(event: ETHReceived): void {
  let newOwner = findOrCreateUser(event.params.newOwner.toHexString())

  let ourProxy = OurProxy.load(event.address.toHexString())

  ourProxy.owner = newOwner.id

  ourProxy.save()
}

//event OwnershipTransferred(address indexed oldOwner, address indexed newOwner);
export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let newOwner = findOrCreateUser(event.params.newOwner.toHexString())

  let ourProxy = OurProxy.load(event.address.toHexString())

  ourProxy.owner = newOwner.id

  ourProxy.save()
}