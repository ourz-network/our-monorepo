import { HardhatUserConfig } from 'hardhat/config'
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-solhint'
import 'tsconfig-paths/register'

const { alchemyAPIKey, deployerPrivateKey } = require('./env.json')

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
      {
        version: '0.6.8',
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
    ],
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  networks: {
    rinkeby: {
      url: `http://eth-rinkeby.alchemyapi.io/v2/${alchemyAPIKey}`,
      accounts: [deployerPrivateKey],
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${alchemyAPIKey}`,
      accounts: [deployerPrivateKey],
    },
  },
}

export default config
