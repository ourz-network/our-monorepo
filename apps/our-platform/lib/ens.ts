import { getDefaultProvider } from 'ethers'

const provider = getDefaultProvider('homestead', {
  alchemy: process.env.ALCHEMY_KEY,
})

export const getENSFromAddress = async (address: string) => {
  if (!address.startsWith('0x') || address.length !== 42) {
    return address
  }

  const ens = await provider.lookupAddress(address)
  return ens
}

export const getAddressFromENS = async (ens?: string) => {
  if (!ens) return '0x00'
  if (ens.startsWith('0x') && ens.length === 42) {
    return ens
  }
  const address = await provider.resolveName(`${ens}.eth`)
  return address ?? '0x00'
}
