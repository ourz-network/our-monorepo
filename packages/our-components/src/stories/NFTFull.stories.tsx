import { Story, Meta } from '@storybook/react'
import { NFTFullPage } from '../nft-full/NFTFullPage'
import { MediaConfiguration } from '../context/MediaConfiguration'
import { Networks } from '@zoralabs/nft-hooks'

export default {
  title: 'Renderer/NFTFull',
  component: NFTFullPage,
} as Meta

const Template: Story<typeof NFTFullPage> = (args) => (
  <MediaConfiguration
    networkId={(args as any).testnet ? Networks.RINKEBY : Networks.MAINNET}
  >
    {/* @ts-ignore */}
    <NFTFullPage {...args} />
  </MediaConfiguration>
)

export const Image = Template.bind({})
Image.args = {
  id: '3366',
  contract: '0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7',
  config: {
    showPerpetual: false,
    allowOffer: false,
  },
  refreshInterval: 5000,
}

export const Video = Template.bind({})
Video.args = {
  id: '1',
  contract: '0x92d21dc7a37727ac8589160f4a896de65310d2f2',
  config: { allowOffer: false },
}
// Video.args = {
//   id: '2411',
//   config: { allowOffer: false },
//   contract: '0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7',
// }

export const GIF = Template.bind({})
GIF.args = {
  id: '2671',
  config: { allowOffer: false },
  contract: '0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7',
}

export const Audio = Template.bind({})
Audio.args = {
  id: '1',
  config: { allowOffer: false },
  contract: '0xb6fa203230ab041dc7433c315871cf551f776070',
}
// Audio.args = {
//   id: '3092',
//   config: { allowOffer: false },
//   contract: '0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7',
// }

export const Text = Template.bind({})
Text.args = {
  id: '3079',
  config: { allowOffer: false },
  contract: '0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7',
}

export const PDF = Template.bind({})
PDF.args = {
  id: '3327',
  config: { allowOffer: false },
  contract: '0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7',
}

export const HTML = Template.bind({})
HTML.args = {
  id: '3609',
  config: { allowOffer: false },
  contract: '0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7',
}

export const VideoCustom = Template.bind({})
VideoCustom.args = {
  id: '1',
  config: { allowOffer: false },
  contract: '0x9De3512D6997Bb37ED084f4F030D4E7d3CF86501',
}

export const NonZoraImage = Template.bind({})
NonZoraImage.args = {
  id: '5683',
  useBetaIndexer: true,
  config: { allowOffer: false },
  contract: '0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6',
}

export const ArtBlocks = Template.bind({})
ArtBlocks.args = {
  id: '83000067',
  config: { allowOffer: false },
  contract: '0x152eee3dcc5526efd646e9b45c9a9672bffcc097',
  testnet: true,
}

export const ModelViewer = Template.bind({})
ModelViewer.args = {
  id: '3591',
  testnet: true,
  config: { allowOffer: false },
}

export const CryptoKitty = Template.bind({})
CryptoKitty.args = {
  id: '556',
  config: { allowOffer: false },
  contract: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
}

export const CryptovoxelsParcel = Template.bind({})
CryptovoxelsParcel.args = {
  id: '10',
  config: { allowOffer: false },
  contract: '0x79986aF15539de2db9A5086382daEdA917A9CF0C',
}
