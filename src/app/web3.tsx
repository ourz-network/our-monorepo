import WalletConnectProvider from "@walletconnect/web3-provider"; // WalletConnectProvider (Web3Modal)
import { BigNumberish, ethers, Signer } from "ethers"; // Ethers
import { useCallback, useEffect, useState } from "react"; // State management
import { createContainer } from "unstated-next"; // Unstated-next containerization
import Web3Modal, { providers } from "web3modal"; // Web3Modal

// ====== Web3Modal Config ======
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      // bridge: "https://polygon.bridge.walletconnect.org",
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID, // Inject Infura
      rpc: {
        1: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
        4: `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
      },
    },
  },
};

function useWeb3() {
  // ====== State ======
  const [modal, setModal] = useState<Web3Modal>(); // Web3Modal
  const [address, setAddress] = useState<string>(); // User's ETH address
  const [network, setNetwork] = useState<ethers.providers.Network>(); // Connected ChainID
  const [injectedProvider, setInjectedProvider] = useState<ethers.providers.Web3Provider>(); // Ethers Provider
  const [signer, setSigner] = useState<Signer>(); // User's Wallet Instance

  // ====== Setup Web3Modal on Page Load ======
  useEffect(() => {
    function setupWeb3Modal() {
      // Create new
      const web3Modal = new Web3Modal({
        network: "rinkeby", // optional
        cacheProvider: true, // optional
        // theme:"dark", // optional. Change to "dark" for a dark theme.
        providerOptions,
      });
      // Save to state
      setModal(web3Modal);
    }

    setupWeb3Modal();
  }, []);

  // ====== Connect (get web3 Signer) ======
  const authenticate = async () => {
    // Initiate web3Modal
    const web3Provider: ethers.providers.ExternalProvider = await modal?.connect();

    // Generate ethers provider
    const provider = new ethers.providers.Web3Provider(web3Provider);
    setInjectedProvider(provider);

    // User Login
    const web3Signer = provider.getSigner();
    const signature = await web3Signer.signMessage(
      `Instead of remembering a password, \njust sign this message to verify your \naccount ownership.`
    );

    // Sign message to verify account ownership
    if (signature) {
      setSigner(web3Signer);

      const Address = await web3Signer.getAddress();
      setAddress(Address);

      // Detects Network ID from user wallet
      const Network = await provider.getNetwork();
      setNetwork(Network);
    }
  };

  // ====== Disconnect Wallet ======
  const disconnectWeb3 = () => {
    modal?.clearCachedProvider();
    setInjectedProvider(undefined);
    setNetwork(undefined);
    setAddress(undefined);
    setSigner(undefined);
  };

  // ====== Event Subscription ======
  const loadWeb3Modal = useCallback(async () => {
    const provider: Web3Modal = await modal?.connect();
    // await provider.enable();

    // setInjectedProvider(new providers.Web3Provider(provider));

    // if (!provider) {
    //   return;
    // }

    provider?.on("chainChanged", (chainId: number) => {
      const network = ethers.providers.getNetwork(chainId);
      setNetwork(network);
      // setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    provider?.on("accountsChanged", (accounts: string[]) => {
      // eslint-disable-next-line no-console
      console.log("Web3 Accounts Changed:\n", accounts);
      // setAddress(undefined);
      // setSigner(undefined);
      // setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    provider?.on("disconnect", (error: { code: number; message: string }) => {
      // eslint-disable-next-line no-console
      console.log(`Web3 Disconnected - Message:\n`, error);
      disconnectWeb3();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal, setInjectedProvider]);

  useEffect(() => {
    if (modal?.cachedProvider) {
      loadWeb3Modal().then(
        () => {},
        () => {}
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadWeb3Modal]);

  // ====== Sign Message Via Metamask ======
  const verifyAPIpost = async (message: string) => {
    const signature = await signer?.signMessage(
      `Please sign this message to verify your account ownership. \nMessage:\n${message}`
    );
    if (signature) {
      return true;
    }
    return false;
  };

  // On load events
  // useEffect(setupWeb3Modal, []);

  return {
    authenticate,
    network,
    verifyAPIpost,
    injectedProvider,
    address,
    signer,
    disconnectWeb3,
  };
}

// Create unstate-next container
const web3 = createContainer(useWeb3);
export default web3;
