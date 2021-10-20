import { useState, useEffect } from "react";

const useOwners = ({
  address,
  splitOwners,
}: {
  address: string | undefined;
  splitOwners: string[];
}) => {
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    setIsOwner(false);
    splitOwners.forEach((owner) => {
      if (owner === address?.toLowerCase()) setIsOwner(true);
    });
  }, [address, splitOwners]);

  return { isOwner };
};

export default useOwners;
