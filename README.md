# OURZ Split Contracts

## These contracts enable **creators**, **builders**, and **collaborators of all kind** to receive royalties for their collective work, forever

_For a less-technical overview of these contracts, take a look at the introductory [Substack article](https://ourz.substack.com/p/coming-soon)_

---

First, a quick summary of the original Split contracts by [Mirror](https://github.com/mirror-xyz/splits):

"Allows deployment of a minimal proxy contract that specifies a Merkle root describing an allocation across a number of different addreses. Once ETH has been deposited, `incrementWindow` can be called, and members of the split can claim their allocation."

While simple and effective, the original contracts don't provide any mechanism for split royalties - many ERC-721's allow for secondary sale royalties, but typically only for one address (the creator/minter)which is usually hardcoded to be the msg.sender. This fork solves that, and more.

### What are these contracts?

1. `OurMinter`
   This contract allows a Split Contract to mint NFTs, therefore enabling secondary sale royalties to be claimed by split recipients. It also provides the Split Contract an interface to the entire Zora Protocol (1/1s, Auction House, & Editions) and Mirror's Crowdfunds.
2. `OurManagement`
   Thanks to [Gnosis' Safe Contracts](https://github.com/gnosis/safe-contracts), this contract provides access-control to the Minting functions. This allows artists to include split recipients that they do not trust to mint on their behalf. Think of the split owners as the Whitelisted Creators. WL Creators do not necessarily have to be recipients either.
3. `OurIntrospector`
   Another contract from Gnosis, allowing Split Contract to receive and hold ERC-721/1155 tokens.
4. `OurSplitter`
   Is `Splitter.sol` from the original contracts, with the added ability to transfer recipients their allocated share of ERC-20s as well. _The original contracts did not have this and any ERC-20s sent to a Split would be lost._
5. `OurStorage`
   Is the same as `SplitStorage.sol` from the original contracts. Avoids storage collision in proxy contracts.
6. `OurPylon`
   Inherits all of the above contracts and will be the central contract address for the minimal proxies' fallback function.
7. `OurFactory`
   Allows deploying a Split contract with all of the above capabilities at minimal cost.
8. `OurProxy`
   A [minimal proxy](https://blog.openzeppelin.com/deep-dive-into-the-minimal-proxy-contract/).

### How do I create a new Split contract?

1. Find the `OurFactory` contract on the desired network below, or deploy the `OurPylon` contract, then `OurFactory` yourself.
2. Call `createSplit` on `OurFactory` with the given arguments:

- nickname\_: A human-readable name for the Split.
- splitRecipients\_: A JSON stringified array of the Split Recipients containing their address, name, role in project, and allocated shares.
- merkleRoot\_: The root hash of a merkle tree consisting of the Split Recipients addresses & allocations
- data: The encoded function data to call setup() and initialize the split with Owners.

3. After that you will be able to use Zora just like you're used to, now through the Split Proxy. Encode the desired function data from OurPylon's ABI.

### Where are the contracts deployed?

Currently the contracts are deployed on **Rinkeby** only:

[Rinkeby Factory](https://rinkeby.etherscan.io/address/0x48Da174d7Fc4850544B34608AE52108f19de488e)

[Rinkeby Pylon](https://rinkeby.etherscan.io/address/0x58622031f61D212115a9B8C29E515e35cA9410c6)

### Benefits of these contracts

- Splits funds securely & efficiently
- Built for Zora. Need I say more? Supports 1/1 unique NFTs & the new Editions contracts. [Read more](https://github.com/ourzora/nft-editions)
- Royalties received from ERC-721 secondary sales can be split
- Protocol Agnostic: Splits act as an extension/add-on for any NFT protocol implementing ERC-721/777/1155 standard
- Supports minting/selling on other protocols via Gnosis Safe's [execTransaction()](https://github.com/gnosis/safe-contracts/blob/main/contracts/base/Executor.sol), while still guaranteeing ETH in the split is only claimable by recipients.
- This enables potentially endless possibilities, including using custom ManifoldXYZ creator contracts if Zora doesn't fulfill your needs.

### Potential use cases for these contracts

- Any group of creative collaborators looking to split the funds received from NFT's
- Solo creators who wish to donate NFT sales to various charities
- Retroactive Public Good Funding by minting NFT's representing the public good with funds going to those who put in the work

### Setting up locally

Create a .env.json with your Etherscan & Alchemy API Keys, as well as a private key for an EOA with rinkeby ETH. (Metamask -> ... -> Account Details -> Export Private Key.)

`yarn install`

`yarn tsc`

`yarn test`

---

## ⚠️ The contracts in this repository are not audited ⚠️

## **Do not consider them safe for mainnet yet.**

---

[Subgraph](https://thegraph.com/legacy-explorer/subgraph/nickadamson/ourzrinkebyv1)

[Discord](https://discord.gg/GmmaBszDTK)

### Critiques, ideas, and any other feedback are greatly appreciated
