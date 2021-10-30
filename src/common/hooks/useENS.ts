import { useState, useLayoutEffect } from "react";
import { ethers } from "ethers";

const queryProvider = ethers.providers.getDefaultProvider("homestead", {
  infura: process.env.NEXT_PUBLIC_INFURA_ID,
  alchemy: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
  pocket: process.env.NEXT_PUBLIC_POKT_ID,
  etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_KEY,
});

const useENS = ({ address }: { address: string }) => {
  // all user's splits
  const [addressOrENS, setAddressOrENS] = useState(
    `${address.substr(0, 4)}…${address.substr(address.length - 3, address.length)}`
  );

  useLayoutEffect(() => {
    async function getENS() {
      if (address) {
        const ENS = await queryProvider.lookupAddress(address);
        if (ENS) setAddressOrENS(`${ENS}`);
      }
    }

    getENS().then(
      () => {},
      () => {}
    );
  }, [address]);

  return {
    addressOrENS,
  };
};

export default useENS;
