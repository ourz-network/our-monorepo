import { getDefaultProvider } from "ethers";

const provider = getDefaultProvider("homestead", {
  infura: process.env.NEXT_PUBLIC_INFURA_ID,
  alchemy: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
  pocket: process.env.NEXT_PUBLIC_POKT_ID,
  etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_KEY,
});

export const getENSFromAddress = async (address) => {
  if (!address.startsWith("0x") || address.length !== 42) {
    return address;
  }

  const ens = await provider.lookupAddress(address);
  return ens;
};

export const getAddressFromENS = async (ens) => {
  if (ens.startsWith("0x") && ens.length === 42) {
    return ens;
  }
  const address = await provider.resolveName(`${ens}.eth`);
  return address;
};
