import { useState, useEffect } from "react";

const useOwners = ({
  address,
  splitOwners,
  ownerAddress,
}: {
  address: string | undefined;
  splitOwners: string[] | undefined;
  ownerAddress: string | undefined;
}) => {
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    setIsOwner(false);

    if (splitOwners && address) {
      splitOwners.forEach((owner) => {
        if (owner === address.toLowerCase()) {
          setIsOwner(true);
        }
      });
    }

    if (ownerAddress && address) {
      setIsOwner(ownerAddress.toLowerCase() === address.toLowerCase());
    }
  }, [address, splitOwners, ownerAddress]);

  return { isOwner };
};

export default useOwners;
