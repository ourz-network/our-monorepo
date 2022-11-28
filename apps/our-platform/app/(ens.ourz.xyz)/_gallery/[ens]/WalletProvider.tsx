'use client'

import { css } from '@emotion/react'
import { Web3ConfigProvider } from '@zoralabs/simple-wallet-provider'

const WalletProvider = ({ children }: { children: React.ReactNode }) => (
  <Web3ConfigProvider
    rpcUrl={undefined}
    networkId={1}
    theme={{
      modalWrapper: css`
        margin: auto;
      ` as unknown as string,
      walletOption: css`
        color: #000 !important;
        position: relative;
        width: 100%;
        padding: 20px;
        margin-bottom: 20px;
        cursor: pointer;
        &:last-child {
          margin-bottom: 0;
        }
      ` as unknown as string,
    }}
  >
    {children}
  </Web3ConfigProvider>
)

export default WalletProvider
