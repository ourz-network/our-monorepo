import { useMemo, useState } from "react";

const useUserSigner = (injectedProvider) => {
  const [signer, setSigner] = useState(null);

  useMemo(async () => {
    if (injectedProvider) {
      console.log("🦊 Using injected provider");
      const injectedSigner = injectedProvider.getSigner();
      const signature = await injectedSigner.signMessage(
        `Instead of remembering a password, \njust sign this message to verify your \naccount ownership.`
      );

      if (signature) {
        setSigner(injectedSigner);
      }
    }
  }, [injectedProvider]);

  return signer;
};

export default useUserSigner;
