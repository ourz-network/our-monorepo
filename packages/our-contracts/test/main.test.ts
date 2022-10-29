import chai, { expect } from 'chai'
import { Signer, Wallet, BigNumber, Contract, BigNumberish } from 'ethers'
import asPromised from 'chai-as-promised'
import { ethers, waffle } from 'hardhat'
import { OurPylon, OurProxy, FakeERC20, FakeERC721, OurFactory } from '../typechain'
import AllocationTree from '../merkle-tree/balance-tree'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

import scenarios from './scenarios.json'
import { Provider } from '@ethersproject/providers'

const deployPylon = async () => {
  const OurPylon = await ethers.getContractFactory('OurPylon')
  const ourPylon = await OurPylon.deploy()
  return await ourPylon.deployed()
}

const deployFactory = async (pylonAddress: string) => {
  const OurFactory = await ethers.getContractFactory('OurFactory')
  const ourFactory = await OurFactory.deploy(pylonAddress)
  return await ourFactory.deployed()
}

const deployFake20 = async (funderAddress: string) => {
  const FAKE20 = await ethers.getContractFactory('FakeERC20')
  const fake20 = await FAKE20.deploy(funderAddress)
  return await fake20.deployed()
}
const deployFake721 = async () => {
  const FAKE721 = await ethers.getContractFactory('FakeERC721')
  const fake721 = await FAKE721.deploy()
  return await fake721.deployed()
}

const PERCENTAGE_SCALE = 1000000
const NULL_BYTES = '0x0000000000000000000000000000000000000000000000000000000000000000'

describe('SplitProxy via Factory', () => {
  console.log(
    'NOTICE: If tests are failing...' +
      '\n Go to OurPylon.sol and comment out _setApprovalForAH().' +
      "This repo's tests have not had Zora local tests integrated."
  )

  describe('basic test', () => {
    let proxyFactory, proxyPylonByOwner: Contract, pylon, auctionHouse, proxy: Contract, proxyPylonByAnyone: Contract
    let splitCreator: SignerWithAddress,
      fakeWETH,
      fake20,
      fake721,
      account1: SignerWithAddress,
      account2: SignerWithAddress,
      funder: SignerWithAddress,
      transactionHandler: SignerWithAddress
    let allocations, tree: AllocationTree

    describe('when there is a 50-50 allocation', () => {
      beforeEach(async () => {
        ;[splitCreator, fakeWETH, account1, account2, funder, transactionHandler] = await ethers.getSigners()

        const claimers = [account1, account2]

        const allocationPercentages = [50000000, 50000000]
        allocations = allocationPercentages.map((percentage, index) => {
          return {
            account: claimers[index].address,
            allocation: BigNumber.from(percentage),
          }
        })
        tree = new AllocationTree(allocations)
        const rootHash = tree.getHexRoot()

        pylon = await deployPylon()

        proxyFactory = await deployFactory(pylon.address)

        const owners_ = [splitCreator.address, account2.address]

        const deployData = pylon.interface.encodeFunctionData('setup', [owners_])

        const deployTx = await proxyFactory
          .connect(splitCreator)
          .createSplit(rootHash, deployData, JSON.stringify(allocations), 'nickname')

        // Compute address.
        const constructorArgs = ethers.utils.defaultAbiCoder.encode(['bytes32'], [rootHash])
        const salt = ethers.utils.keccak256(constructorArgs)
        const proxyBytecode = (await ethers.getContractFactory('OurProxy')).bytecode
        const codeHash = ethers.utils.keccak256(proxyBytecode)
        const proxyAddress = await ethers.utils.getCreate2Address(proxyFactory.address, salt, codeHash)

        proxy = await (await ethers.getContractAt('OurProxy', proxyAddress)).deployed()

        proxyPylonByOwner = await (await ethers.getContractAt('OurPylon', proxy.address, splitCreator)).deployed()

        proxyPylonByAnyone = await (
          await ethers.getContractAt('OurPylon', proxy.address, transactionHandler)
        ).deployed()

        //====== ERC ======
        fake20 = await deployFake20(funder.address)

        fake721 = await deployFake721()
      })

      describe('#OurManagement', () => {
        it('Owners are set correctly', async () => {
          const creatorIsOwner = await proxyPylonByAnyone.isOwner(splitCreator.address)
          const account2IsOwner = await proxyPylonByAnyone.isOwner(account2.address)

          // account 1 was not included in deployData
          const account1IsOwner = await proxyPylonByAnyone.isOwner(account1.address)
          expect(creatorIsOwner).to.eq(true)
          expect(account2IsOwner).to.eq(true)
          expect(account1IsOwner).to.eq(false)
        })

        it('successfully swaps Owners', async () => {
          const swapAccountsAsOwners = await proxyPylonByOwner.swapOwner(
            splitCreator.address,
            account2.address,
            account1.address
          )
          await swapAccountsAsOwners.wait()

          const account2IsOwner = await proxyPylonByAnyone.isOwner(account2.address)
          const account1IsOwner = await proxyPylonByAnyone.isOwner(account1.address)

          expect(account1IsOwner).to.eq(true)
          expect(account2IsOwner).to.eq(false)
        })

        it('does not allow a non-Owner to swap Owners', async () => {
          await expect(
            proxyPylonByAnyone.swapOwner(splitCreator.address, account1.address, account2.address)
          ).revertedWith('Caller is not a whitelisted owner of this Split')
        })
      })

      describe('and 1 ETH is deposited and the window is incremented', () => {
        beforeEach(async () => {
          const fundTx = await funder.sendTransaction({
            to: proxy.address,
            value: ethers.utils.parseEther('1'),
          })
          const fundReceipt = await fundTx.wait()
          if (fundReceipt) {
            await proxyPylonByAnyone.incrementWindow()
          }
        })

        describe('and one account claims on the first window', () => {
          let amountClaimed: BigNumber,
            allocation: any,
            claimTx: { wait: () => PromiseLike<{ gasUsed: any }> | { gasUsed: any } }
          beforeEach(async () => {
            // Setup.
            const window = 0
            const account = account1.address
            allocation = BigNumber.from('50000000')
            const proof = tree.getProof(account, allocation)
            const accountBalanceBefore = await waffle.provider.getBalance(account)
            claimTx = await proxyPylonByAnyone.connect(account1).claimETH(window, account, allocation, proof)

            const accountBalanceAfter = await waffle.provider.getBalance(account)

            amountClaimed = accountBalanceAfter.sub(accountBalanceBefore)
          })

          it('it returns 1 ETH for balanceForWindow[0]', async () => {
            expect(await proxyPylonByAnyone.balanceForWindow(0)).to.eq(ethers.utils.parseEther('1').toString())
          })

          it('gets 0.5 ETH from scaleAmountByPercentage', async () => {
            expect(
              await proxyPylonByAnyone.scaleAmountByPercentage(allocation, ethers.utils.parseEther('1').toString())
            ).to.eq(ethers.utils.parseEther('0.5').toString())
          })

          it('allows them to successfully claim 0.5 ETH', async () => {
            expect(amountClaimed).to.be.gt(ethers.utils.parseEther('0.4999'))
          })

          // 2k less gas than original splits
          it('costs ~69500 gas', async () => {
            const { gasUsed } = await claimTx.wait()
            expect(gasUsed).to.be.gt(69000)
            expect(gasUsed).to.be.lt(70000)
          })

          describe('and another 1 ETH is added, and the window is incremented', () => {
            beforeEach(async () => {
              await funder.sendTransaction({
                to: proxy.address,
                value: ethers.utils.parseEther('1'),
              })

              await proxyPylonByAnyone.incrementWindow()
            })

            describe('and the other account claims on the second window', () => {
              let amountClaimedBySecond: { toString: () => any }
              beforeEach(async () => {
                // Setup.
                const window = 1
                const account = account2.address
                const allocation = BigNumber.from('50000000')
                const proof = tree.getProof(account, allocation)
                const accountBalanceBefore = await waffle.provider.getBalance(account)

                await proxyPylonByAnyone.connect(transactionHandler).claimETH(window, account, allocation, proof)

                const accountBalanceAfter = await waffle.provider.getBalance(account)

                amountClaimedBySecond = accountBalanceAfter.sub(accountBalanceBefore)
              })

              // there seems to be a small (~0.00007 ETH) loss of funds, likely due to logic in fallback
              it('allows them to successfully claim 0.5 ETH', async () => {
                expect(amountClaimedBySecond.toString()).to.eq(ethers.utils.parseEther('0.5').toString())
              })
            })

            describe('and the other account claims on the first window', () => {
              let amountClaimedBySecond: { toString: () => any }
              beforeEach(async () => {
                // Setup.
                const window = 0
                const account = account2.address
                const allocation = BigNumber.from('50000000')
                const proof = tree.getProof(account, allocation)
                const accountBalanceBefore = await waffle.provider.getBalance(account)

                await proxyPylonByAnyone.connect(transactionHandler).claimETH(window, account, allocation, proof)

                const accountBalanceAfter = await waffle.provider.getBalance(account)

                amountClaimedBySecond = accountBalanceAfter.sub(accountBalanceBefore)
              })

              it('allows them to successfully claim 0.5 ETH', async () => {
                expect(amountClaimedBySecond.toString()).to.eq(ethers.utils.parseEther('0.5').toString())
              })
            })

            describe('and the first account claims on the second window', () => {
              let amountClaimedBySecond: { toString: () => any }
              beforeEach(async () => {
                // Setup.
                const window = 1
                const account = account1.address
                const allocation = BigNumber.from('50000000')
                const proof = tree.getProof(account, allocation)
                const accountBalanceBefore = await waffle.provider.getBalance(account)

                await proxyPylonByAnyone.connect(transactionHandler).claimETH(window, account, allocation, proof)

                const accountBalanceAfter = await waffle.provider.getBalance(account)

                amountClaimedBySecond = accountBalanceAfter.sub(accountBalanceBefore)
              })

              it('allows them to successfully claim 0.5 ETH', async () => {
                expect(amountClaimedBySecond.toString()).to.eq(ethers.utils.parseEther('0.5').toString())
              })
            })
          })
        })
      })
    })
  })

  describe('scenario tests', () => {
    for (let scenarioIndex = 0; scenarioIndex < scenarios.length; scenarioIndex++) {
      const { allocationPercentages, firstDepositFirstWindow, secondDepositSecondWindow } = scenarios[scenarioIndex]
      const scaledPercentages = allocationPercentages.map((p) => p / PERCENTAGE_SCALE)

      let splitCreator: SignerWithAddress
      let secondFunder: { sendTransaction: (arg0: { to: any; value: BigNumber }) => any }
      let thirdFunder: { sendTransaction: (arg0: { to: any; value: BigNumber }) => any }
      let fourthFunder
      let ourFunder: { sendTransaction: (arg0: { to: any; value: BigNumber }) => any }
      let fakeWETH
      let account1: SignerWithAddress
      let account2: SignerWithAddress
      let account3: SignerWithAddress
      let account4: SignerWithAddress
      let account5: SignerWithAddress
      let account6: SignerWithAddress
      let account7: SignerWithAddress
      let account8: SignerWithAddress
      let account9: SignerWithAddress
      let account10: SignerWithAddress
      let account11: SignerWithAddress
      // Setup
      let proxy: Contract
      let proxyAddress: string
      let splitter
      let minter
      let pylon: Contract
      let rootHash: string
      let proxyFactory: Contract
      let proxyPylonByOwner: Contract
      let deployTx: { wait: () => any }
      let proxyPylonByAnyone: Contract
      let allocations: any[]
      let tree: AllocationTree
      let claimers: { address: any }[]
      let funder: SignerWithAddress
      let transactionHandler: SignerWithAddress
      let fake20: Contract, fake721
      let splitBalanceBefore, splitBalanceAfter
      let addresses: any[] = []
      let allocs: any[] = []
      let proofs: { merkleProof: string[] }[] = []

      beforeEach(async () => {
        ;[
          splitCreator,
          secondFunder,
          thirdFunder,
          fourthFunder,
          ourFunder,
          // Use a different account for transactions, to simplify gas accounting.
          transactionHandler,
          funder,
          fakeWETH,
          account1,
          account2,
          account3,
          account4,
          account5,
          account6,
          account7,
          account8,
          account9,
          account10,
          account11,
        ] = await ethers.getSigners()

        claimers = [
          account1,
          account2,
          account3,
          account4,
          account5,
          account6,
          account7,
          account8,
          account9,
          account10,
          account11,
        ]
      })

      describe('#createSplit', () => {
        describe(`when the allocation is ${scaledPercentages.join('%, ')}%`, () => {
          beforeEach(async () => {
            allocations = allocationPercentages.map((percentage, index) => {
              return {
                account: claimers[index].address,
                allocation: BigNumber.from(percentage),
              }
            })

            tree = new AllocationTree(allocations)
            rootHash = tree.getHexRoot()

            addresses = []
            allocs = []
            proofs = []
            allocationPercentages.map((percentage, index) => {
              addresses.push(claimers[index].address)
              allocs.push(BigNumber.from(percentage))
              proofs.push({ merkleProof: tree.getProof(addresses[index], allocs[index]) })
            })

            pylon = await deployPylon()
            proxyFactory = await deployFactory(pylon.address)

            const owners = [splitCreator.address]
            const deployData = pylon.interface.encodeFunctionData('setup', [owners])

            deployTx = await proxyFactory
              .connect(splitCreator)
              .createSplit(rootHash, deployData, JSON.stringify(allocations), 'nickname')

            // Compute address.
            const constructorArgs = ethers.utils.defaultAbiCoder.encode(['bytes32'], [rootHash])
            const salt = ethers.utils.keccak256(constructorArgs)
            const proxyBytecode = (await ethers.getContractFactory('OurProxy')).bytecode
            const codeHash = ethers.utils.keccak256(proxyBytecode)

            proxyAddress = await ethers.utils.getCreate2Address(proxyFactory.address, salt, codeHash)

            // connect proxy to owner and non owner signers
            proxy = await (await ethers.getContractAt('OurProxy', proxyAddress)).deployed()
            proxyPylonByAnyone = await (
              await ethers.getContractAt('OurPylon', proxy.address, transactionHandler)
            ).deployed()
            proxyPylonByOwner = await (await ethers.getContractAt('OurPylon', proxy.address, splitCreator)).deployed()

            //====== ERC ======
            fake20 = await deployFake20(funder.address)
            fake721 = await deployFake721()
          })

          it('sets the root hash', async () => {
            expect(await proxy.merkleRoot()).to.eq(rootHash)
          })

          it('deletes the merkleRoot from the factory', async () => {
            const factoryMerkle = await proxyFactory.merkleRoot()
            expect(factoryMerkle).to.eq(NULL_BYTES)
          })

          // NOTE: Gas cost is around 495k on rinkeby/mainnet, due to constructor approval calls.
          it('costs around ~325k gas to deploy the proxy', async () => {
            const gasUsed = (await deployTx.wait()).gasUsed
            // console.log(`It cost ${gasUsed} gas to deploy a proxy.`)
            expect(gasUsed).to.be.gt(300000)
            expect(gasUsed).to.be.lt(350000)
          })

          it('costs around ~4M gas to deploy the Pylon', async () => {
            const gasUsed = (await pylon.deployTransaction.wait()).gasUsed
            // console.log(`It cost ${gasUsed} gas to deploy the Pylon.`)
            expect(gasUsed).to.be.gt(3750000)
            expect(gasUsed).to.be.lt(4250000)
          })

          it('costs around ~450k gas to deploy the Factory', async () => {
            const gasUsed = (await proxyFactory.deployTransaction.wait()).gasUsed
            // console.log(`It cost ${gasUsed} gas to deploy the Factory.`)
            expect(gasUsed).to.be.gt(425000)
            expect(gasUsed).to.be.lt(475000)
          })

          describe('#ERC20', async () => {
            let splitBalanceBefore: BigNumberish
            let splitBalanceAfter: BigNumberish
            let gasUsed

            describe('When someone sends ERC20 Tokens to the split', () => {
              beforeEach(async () => {
                splitBalanceBefore = await fake20.balanceOf(proxy.address)
                gasUsed = BigNumber.from(0)

                // const transferERC20s = await fake20.connect(funder).transfer(proxyAddress, 100000000)
                const transferERC20s = await fake20
                  .connect(funder)
                  .transfer(proxyAddress, ethers.utils.parseUnits('9.999999999999999999', 18))
                const mintMoreToFunder = await fake20.connect(funder).mint()
                splitBalanceAfter = await fake20.balanceOf(proxy.address)
              })

              describe('and the split receives', () => {
                // it('100000000 tokens', async () => {
                it('9.999999999999999999 tokens', async () => {
                  expect(splitBalanceBefore.toString()).to.eq(BigNumber.from(0).toString())
                  expect(ethers.utils.formatUnits(splitBalanceAfter).toString()).to.eq('9.999999999999999999')
                })

                describe('Which are only accessible via claimERC20ForAllSplits', () => {
                  describe('allows anyone to call', async () => {
                    beforeEach(async () => {
                      const claimERC20Tx = await proxyPylonByAnyone.claimERC20ForAll(
                        fake20.address,
                        addresses,
                        allocs,
                        proofs
                      )

                      // const gasUsed = (await claimERC20Tx.wait()).gasUsed
                      // console.log(`Gas Used to Claim ERC20s: ${gasUsed}`)
                    })

                    it('and should complete transaction successfully', async () => {
                      const splitBalanceAfterClaim = await fake20.connect(transactionHandler).balanceOf(proxy.address)
                      expect(splitBalanceAfterClaim.toString()).to.eq(BigNumber.from(0).toString())
                    })
                    describe('with correct amounts being sent', () => {
                      for (let accountIndex = 0; accountIndex < allocationPercentages.length; accountIndex++) {
                        it(`to Account ${accountIndex + 1}`, async () => {
                          const allocatedAmount =
                            Number(allocationPercentages[accountIndex] * 9999999999999999999) / (100 * 1000000)

                          const accountBalance: BigNumber = await fake20.balanceOf(`${addresses[accountIndex]}`)

                          // expect(accountBalance.toString()).to.eq(allocatedAmount.toString());
                          expect(Number(accountBalance.toString())).to.be.gte(allocatedAmount - 100)
                          expect(Number(accountBalance.toString())).to.be.lte(allocatedAmount + 100)
                        })
                      }
                    })
                  })
                })
              })
            })
          })

          describe('when there is 100 ETH in the account', () => {
            beforeEach(async () => {
              await ourFunder.sendTransaction({
                to: proxy.address,
                value: ethers.utils.parseEther('100'),
              })
            })

            for (let accountIndex = 0; accountIndex < allocationPercentages.length; accountIndex++) {
              describe(`and account ${accountIndex + 1} tries to incrementThenClaimAll`, async () => {
                let gasUsed

                it('successfully increments and claims', async () => {
                  const ref = allocations[accountIndex]
                  const { account, allocation } = ref
                  const proof = tree.getProof(account, allocation)
                  const accountBalanceBefore = await waffle.provider.getBalance(account)
                  const tx = await proxyPylonByAnyone.incrementThenClaimAll(account, allocation, proof)
                  gasUsed = (await tx.wait()).gasUsed
                  const accountBalanceAfter = await waffle.provider.getBalance(account)

                  const amountClaimed = accountBalanceAfter.sub(accountBalanceBefore)

                  expect(amountClaimed).to.eq(ethers.utils.parseEther(firstDepositFirstWindow[accountIndex].toString()))
                })
              })
            }
          })

          describe('when there is 100 ETH in the account and a window has been incremented', () => {
            beforeEach(async () => {
              await secondFunder.sendTransaction({
                to: proxy.address,
                value: ethers.utils.parseEther('100'),
              })

              await proxyPylonByAnyone.incrementWindow()
            })

            for (let accountIndex = 0; accountIndex < allocationPercentages.length; accountIndex++) {
              describe(`and account ${accountIndex + 1} tries to claim ${firstDepositFirstWindow[
                accountIndex
              ].toString()} ETH on the first window with the correct allocation`, () => {
                let gasUsed: { toString: () => any }

                it('successfully claims', async () => {
                  const window = 0
                  const ref = allocations[accountIndex]
                  const { account, allocation } = ref
                  const proof = tree.getProof(account, allocation)
                  const accountBalanceBefore = await waffle.provider.getBalance(account)
                  const tx = await proxyPylonByAnyone.claimETH(window, account, allocation, proof)
                  gasUsed = (await tx.wait()).gasUsed
                  const accountBalanceAfter = await waffle.provider.getBalance(account)

                  const amountClaimed = accountBalanceAfter.sub(accountBalanceBefore)
                  expect(amountClaimed.toString()).to.eq(
                    ethers.utils.parseEther(firstDepositFirstWindow[accountIndex].toString())
                  )
                })

                // NOTE: Gas cost is around 73k, but depends slightly.
                it('costs ~73k gas', async () => {
                  expect(Number(gasUsed.toString())).to.be.gt(71000)
                  expect(Number(gasUsed.toString())).to.be.lt(75000)
                })
              })

              describe('and another 100 ETH is added, and the window is been incremented', () => {
                beforeEach(async () => {
                  await secondFunder.sendTransaction({
                    to: proxy.address,
                    value: ethers.utils.parseEther('100'),
                  })

                  await proxyPylonByAnyone.incrementWindow()
                })

                describe(`and account ${accountIndex + 1} tries to claim ${secondDepositSecondWindow[
                  accountIndex
                ].toString()} ETH on the second window with the correct allocation`, () => {
                  let gasUsed: { toString: () => any }

                  it('successfully claims', async () => {
                    const window = 1
                    const ref = allocations[accountIndex]
                    const { account, allocation } = ref
                    const proof = tree.getProof(account, allocation)
                    const accountBalanceBefore = await waffle.provider.getBalance(account)
                    const tx = await proxyPylonByAnyone.claimETH(window, account, allocation, proof)
                    gasUsed = (await tx.wait()).gasUsed
                    const accountBalanceAfter = await waffle.provider.getBalance(account)
                    const amountClaimed = accountBalanceAfter.sub(accountBalanceBefore)
                    expect(amountClaimed.toString()).to.eq(
                      ethers.utils.parseEther(secondDepositSecondWindow[accountIndex].toString())
                    )
                  })

                  // NOTE: Gas cost is around 73k, but depends slightly on the size of the
                  // allocation. Can check by uncommenting this and running the test.
                  it('costs ~73k gas', async () => {
                    expect(Number(gasUsed.toString())).to.be.gt(71000)
                    expect(Number(gasUsed.toString())).to.be.lt(75000)
                  })
                })
              })

              describe(`and account ${accountIndex + 1} tries to claim with a higher allocation`, () => {
                it("reverts with 'Invalid proof'", async () => {
                  const index = 0
                  const window = 0
                  const ref = allocations[index]
                  const { account, allocation } = ref
                  const incorrectAllocation = allocation + 1
                  const proof = tree.getProof(account, allocation)
                  await expect(proxyPylonByAnyone.claimETH(window, account, incorrectAllocation, proof)).revertedWith(
                    'Invalid proof'
                  )
                })
              })
            }

            describe("and an account without an allocation tries to claim with account1's proof", () => {
              it("reverts with 'Invalid proof'", async () => {
                const index = 0
                const window = 0
                const ref = allocations[index]
                const { account, allocation } = ref
                const proof = tree.getProof(account, allocation)
                await expect(
                  proxyPylonByAnyone.claimETH(
                    window,
                    // Here we change the address!
                    account4.address,
                    allocation,
                    proof
                  )
                ).revertedWith('Invalid proof')
              })
            })

            describe('and account 1 tries to claim twice in one window', () => {
              it('reverts on the second attempt', async () => {
                const index = 0
                const window = 0
                const ref = allocations[index]
                const { account, allocation } = ref
                const proof = tree.getProof(account, allocation)
                await proxyPylonByAnyone.connect(transactionHandler).claimETH(window, account, allocation, proof)
                await expect(proxyPylonByAnyone.claimETH(window, account, allocation, proof)).revertedWith(
                  'Account already claimed the given window'
                )
              })
            })
          })

          describe('when there is 200 ETH in the account across 2 windows', () => {
            beforeEach(async () => {
              // First Window
              await funder.sendTransaction({
                to: proxy.address,
                value: ethers.utils.parseEther('100'),
              })
              await proxyPylonByAnyone.incrementWindow()
              // Second Window
              await thirdFunder.sendTransaction({
                to: proxy.address,
                value: ethers.utils.parseEther('100'),
              })
              await proxyPylonByAnyone.connect(transactionHandler).incrementWindow()
            })

            for (let accountIndex = 0; accountIndex < allocationPercentages.length; accountIndex++) {
              describe(`and account ${accountIndex + 1} tries to claim twice in one window`, () => {
                it('reverts on the second attempt', async () => {
                  const window = 0
                  const ref = allocations[accountIndex]
                  const { account, allocation } = ref
                  const proof = tree.getProof(account, allocation)
                  await proxyPylonByAnyone.connect(transactionHandler).claimETH(window, account, allocation, proof)
                  await expect(
                    proxyPylonByAnyone.connect(transactionHandler).claimETH(window, account, allocation, proof)
                  ).revertedWith('Account already claimed the given window')
                })
              })

              describe(`and account ${accountIndex + 1} tries to claim using claimForAllWindows`, () => {
                let tx: { wait: () => any }
                it('successfully claims', async () => {
                  const ref = allocations[accountIndex]
                  const { account, allocation } = ref
                  const proof = tree.getProof(account, allocation)
                  const accountBalanceBefore = await waffle.provider.getBalance(account)
                  tx = await proxyPylonByAnyone
                    .connect(transactionHandler)
                    .claimETHForAllWindows(account, allocation, proof)
                  const accountBalanceAfter = await waffle.provider.getBalance(account)

                  const amountClaimed = accountBalanceAfter.sub(accountBalanceBefore).toString()
                  const claimExpected = ethers.utils
                    // Use the appropriate account.
                    .parseEther(scaledPercentages[accountIndex].toString())
                    // Multiply 2 because there are two windows.
                    .mul(2)
                    .toString()
                  expect(amountClaimed).to.eq(claimExpected)
                })

                // NOTE: Gas cost is around 98k, but depends slightly on the size of the
                // allocation. Can check by uncommenting this and running the test.
                it('costs ~99k gas', async () => {
                  const receipt = await tx.wait()
                  expect(Number(receipt.gasUsed.toString())).to.be.gt(97000)
                  expect(Number(receipt.gasUsed.toString())).to.be.lt(101000)
                })
              })

              describe(`and account ${accountIndex + 1} tries to claim twice across both windows`, () => {
                it('successfully claims on each window', async () => {
                  for (let window = 0; window < 2; window++) {
                    const ref = allocations[accountIndex]
                    const { account, allocation } = ref
                    const proof = tree.getProof(account, allocation)
                    const accountBalanceBefore = await waffle.provider.getBalance(account)
                    const tx = await proxyPylonByAnyone
                      .connect(transactionHandler)
                      .claimETH(window, account, allocation, proof)
                    const accountBalanceAfter = await waffle.provider.getBalance(account)

                    const amountClaimed = accountBalanceAfter.sub(accountBalanceBefore).toString()
                    const claimExpected = ethers.utils.parseEther(scaledPercentages[accountIndex].toString()).toString()
                    expect(amountClaimed).to.eq(claimExpected)
                  }
                })
              })
            }
          })
        })
      })
    }
  })
})
