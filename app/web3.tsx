/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import WalletConnectProvider from "@walletconnect/web3-provider"; // WalletConnectProvider (Web3Modal)
import {
  // generateMetadata,
  constructBidShares,
  constructMediaData,
  sha256FromBuffer,
  Zora,
} from "@zoralabs/zdk"; // Zora provider
import { BigNumberish, ethers, providers, Signer } from "ethers"; // Ethers
import { NFTStorage } from "nft.storage";
import { useCallback, useEffect, useState } from "react"; // State management
import { createContainer } from "unstated-next"; // Unstated-next containerization
import Web3Modal from "web3modal"; // Web3Modal
import BalanceTree from "@/ethereum/merkle-tree/balance-tree"; // Creates merkle tree for splits
import pylonJSON from "@/ethereum/abis/OurPylon.json";
import proxyJSON from "@/ethereum/abis/OurProxy.json";
import factoryJSON from "@/ethereum/abis/OurFactory.json";
import { SplitRecipient } from "@/modules/subgraphs/ourz/types";
import { FormSplitRecipient } from "@/modules/Create/types/types";

type FormValues = {
  id: string | number;
  account: string;
  name: string;
  role: string;
  shares: number;
};
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

interface Modal extends Web3Modal {
  connect(): Promise<providers.ExternalProvider>;
}

function useWeb3() {
  // ====== State ======
  const [modal, setModal] = useState<Modal | undefined>(undefined); // Web3Modal
  const [address, setAddress] = useState<string | undefined>(undefined); // User's ETH address
  const [network, setNetwork] = useState<providers.Network | undefined>(undefined); // Connected ChainID
  const [injectedProvider, setInjectedProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >(undefined); // Ethers Provider
  const [signer, setSigner] = useState<Signer | undefined>(undefined); // User's Wallet Instance
  const [zora, setZora] = useState<Zora | undefined>(undefined); // Zora provider
  const [zoraQuery, setZoraQuery] = useState<Zora | undefined>(undefined); // Zora provider for homepage queries

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
    const web3Provider = await modal.connect();
    // await web3Provider.enable();

    // Generate ethers provider
    const provider = new providers.Web3Provider(web3Provider);
    setInjectedProvider(provider);

    // User Login
    const web3Signer = provider.getSigner();
    const signature = await web3Signer.signMessage(
      `Instead of remembering a password, \njust sign this message to verify your \naccount ownership.`
    );

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
    modal.clearCachedProvider();
    // setInjectedProvider(null);
    setNetwork(null);
    setAddress(null);
    setSigner(null);
  };

  // ====== Event Subscription ======
  const loadWeb3Modal = useCallback(async () => {
    const provider = (await modal.connect()) as Web3Modal;
    // await provider.enable();

    // setInjectedProvider(new providers.Web3Provider(provider));

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    provider.on("chainChanged", async () => {
      const web3provider = new providers.Web3Provider(provider as providers.ExternalProvider);
      const Network = await web3provider.getNetwork();
      setNetwork(Network);
      setInjectedProvider(
        new ethers.providers.Web3Provider(provider as providers.ExternalProvider)
      );
    });

    provider.on("accountsChanged", () => {
      setAddress(null);
      setSigner(null);
      setInjectedProvider(
        new ethers.providers.Web3Provider(provider as providers.ExternalProvider)
      );
    });

    provider.on("disconnect", () => {
      disconnectWeb3();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal, setInjectedProvider]);

  useEffect(() => {
    if (modal?.cachedProvider) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      loadWeb3Modal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadWeb3Modal]);

  // ====== Sign Message Via Metamask ======
  const verifyAPIpost = async (message: string) => {
    const signature = await signer.signMessage(
      `Please sign this message to verify your account ownership. \nMessage:\n${message}`
    );
    if (signature) {
      return true;
    }
    return false;
  };

  // Relocate these
  // Create instances of Zora Contracts (from ZDK) for querying and txs
  useEffect(() => {
    function getZoraQuery() {
      const ZoraQuery = new Zora(injectedProvider, 4);
      setZoraQuery(ZoraQuery);
    }
    function getZora() {
      const zoraInstance = new Zora(signer, 4);
      setZora(zoraInstance);
    }

    if (injectedProvider) {
      getZoraQuery();
    }
    if (signer) {
      getZora();
    }
  }, [signer, injectedProvider]);

  /** Format data received from react-hook-form
   * Formats for: merkleTree to use when calling OurFactory,
   * & metadata for zNFT's and Subgraph.
   */
  const formatSplits = (formData: FormValues[]) => {
    // see https://github.com/mirror-xyz/splits
    let splitsForMerkle = []; // Required Format: [{account: '0x..', allocation: #}]

    // splitsForMeta will be JSON.stringify'd and emitted in an event during eth tx
    // this allows the information to be stored on the Subgraph rather than MongoDB
    let splitsForMeta = []; // [{address: '0x/ENS', name: 'name', role: 'role', shares: #}]

    splitsForMeta = formData.map(({ id, ...keepAttrs }) => keepAttrs); // remove id

    // change property names + add allocations for ease of use when claiming funds
    // webassembly in subgraph is tricky... hence toString() of Numbers. BigInt, more like BigBye
    splitsForMeta = splitsForMeta.map((split: SplitRecipient & { account: string }) => ({
      address: split.account,
      name: split.name,
      role: split.role,
      shares: split.shares.toString(),
      allocation: Number((Number(split.shares) * 1000000).toFixed(0)).toString(),
    }));

    // Format splits[] for merkle-tree. WILL NOT WORK if ENS names aren't translated to 0x0
    // keep address and allocation
    splitsForMerkle = splitsForMeta.map(({ name, role, shares, ...keepAttrs }) => keepAttrs);
    // Change 'address' -> 'account'
    splitsForMerkle = splitsForMerkle.map((split) => ({
      account: split.address,
      allocation: Number(split.allocation),
    }));

    // Create Merkle Tree for Split
    const tree = new BalanceTree(splitsForMerkle);
    const rootHash = tree.getHexRoot();

    return { rootHash, splitsForMeta };
  };

  /** Prepare Media for minting on Zora, storing on IPFS and Arweave
   *
   */
  const createCryptomedia = async (cryptomedia: {
    title: string;
    description: string;
    mediaKind: string;
    splitMetadata: JSON;
    mediaBlob: Blob | ArrayBuffer | { valueOf(): ArrayBuffer | SharedArrayBuffer };
    creatorBidShare: number;
  }) => {
    // Generate metadataJSON
    // const metadata = {
    //   version: "zora-20210101",
    //   name: cryptomedia.title,
    //   description: cryptomedia.description,
    //   mimeType: cryptomedia.mediaKind,
    // };
    // const metadataJSON = generateMetadata(metadata.version, metadata)
    const metadata = {
      version: "zora-20210604",
      name: cryptomedia.title,
      description: cryptomedia.description,
      mimeType: cryptomedia.mediaKind,
      external_url: "www.ourz.network",
      attributes: cryptomedia.splitMetadata,
    };
    const metadataJSON = JSON.stringify(metadata); // unordered

    // Upload files to nft.storage
    // Or other IPFS pinning service
    const endpoint = "https://api.nft.storage" as unknown as URL; // the default
    const token = `${process.env.NEXT_PUBLIC_NFT_STORAGE_KEY}`;

    const storage = new NFTStorage({ endpoint, token });
    // Collect mediaCID and metadataCID from nft.storage
    const mediaCID = await storage.storeBlob(cryptomedia.mediaBlob);
    const metadataCID = await storage.storeBlob(metadataJSON as unknown as Blob);
    // Save fileUrl and metadataUrl
    const mediaUrl = `https://${mediaCID}.ipfs.dweb.link`;
    const metadataUrl = `https://${metadataCID}.ipfs.dweb.link`;
    // const status = await storage.status(mediaCID);

    // if (cryptomedia.mediaKind.includes("image")) {
    //   const arweaveMedia = await axios.post(`https://ipfs2arweave.com/permapin/${mediaCID}`);
    //   if (arweaveMedia) {
    //   }
    // }

    // Generate content hashes
    const contentHash = sha256FromBuffer(Buffer.from(cryptomedia.mediaBlob));
    const metadataHash = sha256FromBuffer(Buffer.from(metadataJSON));

    // Construct mediaData object
    const mediaData = constructMediaData(mediaUrl, metadataUrl, contentHash, metadataHash);

    /** Construct bidShares object
     * Note: this is for future royalties on NFT sale,
     * which is > then < divided up via splits.
     */
    const bidShares = constructBidShares(
      Number(cryptomedia.creatorBidShare),
      100 - Number(cryptomedia.creatorBidShare),
      0 // Previous owner share. Always 0 when minting
    );

    return { mediaData, bidShares };
  };

  const mintZoraSplit = async ({ formData, proxyAddress }) => {
    // Upload file to IPFS
    const cryptomedia = formData;
    const { mediaData, bidShares } = await createCryptomedia(cryptomedia);

    // init Proxy instance as OurPylon, so owner can call Mint
    const pylonABI = pylonJSON.abi;
    const proxyPylon = new ethers.Contract(
      proxyAddress, // rinkeby
      pylonABI,
      signer
    );

    // Mint to Zora Protocol
    if (mediaData && bidShares) {
      // Make transaction
      const mintTx = await proxyPylon.mintZora(mediaData, bidShares);

      // Wait for Tx to process
      const mintReceipt = await mintTx.wait();

      if (mintReceipt) {
        const tokenId = parseInt(mintReceipt.events[0].topics[3], 16);
        return tokenId;
      }
      return -1;
    }
    return -1;
  };

  const createZoraAuction = async ({
    proxyAddress,
    tokenId,
    tokenContract,
    duration,
    reservePrice,
    curator,
    curatorFeePercentage,
    auctionCurrency,
  }) => {
    // init Proxy instance as OurPylon, so owner can call Mint
    const pylonABI = pylonJSON.abi;
    const proxyPylon = new ethers.Contract(
      proxyAddress, // rinkeby
      pylonABI,
      signer
    );

    /** Make transaction
     *  uint256 tokenId
     *  address tokenContract
     *  uint256 duration (time in seconds)
     *  uint256 reservePrice
     *  address curator (0x00 or owner address if no curator)
     *  uint8 curatorFeePercentage
     *  address auctionCurrency (must be 0x00 or WETH)
     */
    const ReservePrice: BigNumberish = ethers.utils.parseUnits(reservePrice.toString(), "ether");
    const auctionTx = await proxyPylon.createZoraAuction(
      tokenId,
      // zora media rinkeby
      tokenContract,
      duration,
      // parseUnits(`${reservePrice}`, "ether"),
      // ethers.BigNumber.from(reservePrice),
      ReservePrice,
      curator || proxyAddress,
      curatorFeePercentage || Number(0),
      auctionCurrency || "0x0000000000000000000000000000000000000000"
    );

    // Wait for Tx to process
    const auctionReceipt = await auctionTx.wait();

    if (auctionReceipt) {
      const auctionId = parseInt(auctionReceipt.events[3].topics[1], 16);
      return auctionId;
    }
    return -1;
  };

  const mintZoraSolo = async ({ formData }) => {
    // Upload file to IPFS
    const cryptomedia = formData;
    const { mediaData, bidShares } = await createCryptomedia(cryptomedia);

    // Mint to Zora Protocol
    if (mediaData && bidShares) {
      // Make transaction
      const mintTx = await zora.mint(mediaData, bidShares);

      // Wait for Tx to process
      const mintReceipt = await mintTx.wait();

      if (mintReceipt) {
        const tokenId = parseInt(mintReceipt.events[0].topics[3], 16);
        return tokenId;
      }
    }
    return -1;
  };

  const newProxy = async (formData: FormSplitRecipient[], nickname: string) => {
    /** Step 1)
     * If user defined splits other than their own royalties,
     * format them for merkle tree & metadata
     * */
    const { rootHash, splitsForMeta } = formatSplits(formData);

    // change
    const owners = [address];
    // change

    // init contract
    const factoryABI = factoryJSON.abi; // RINKEBY
    const factoryWrite = new ethers.Contract(process.env.NEXT_PUBLIC_FACTORY_4, factoryABI, signer);

    const pylonABI = pylonJSON.abi;
    const pylonWrite = new ethers.Contract(process.env.NEXT_PUBLIC_PYLON_4, pylonABI, signer);

    const deployData = pylonWrite.interface.encodeFunctionData("setup", [owners]);

    if (splitsForMeta && rootHash) {
      // Make transaction
      const proxyTx = await factoryWrite.createSplit(
        rootHash,
        deployData,
        JSON.stringify(splitsForMeta),
        nickname
      );

      const proxyReceipt = await proxyTx.wait();

      // determine address of new proxy
      const proxyBytecode = proxyJSON.bytecode;
      const constructorArgs = ethers.utils.defaultAbiCoder.encode(["bytes32"], [rootHash]);
      const salt = ethers.utils.keccak256(constructorArgs);
      const codeHash = ethers.utils.keccak256(proxyBytecode);
      const proxyAddress = ethers.utils.getCreate2Address(
        process.env.NEXT_PUBLIC_FACTORY_4,
        salt,
        codeHash
      );

      if (proxyReceipt) {
        return proxyAddress;
      }
    }
    return -1;
  };

  const claimFunds = async ({
    splits,
    proxyAddress,
  }: {
    splits: SplitRecipient[];
    proxyAddress: string;
  }) => {
    // Format splits[] for merkle-tree. WILL NOT WORK if ENS names aren't translated to 0x0
    // keep address and allocation
    let splitsForMerkle = splits.map(
      ({ name, role, shares, __typename, ...keepAttrs }) => keepAttrs
    );
    // Change 'address' -> 'account'
    splitsForMerkle = splitsForMerkle.map(
      (split: { user: { id: string }; allocation: string }) => ({
        account: split.user.id,
        allocation: Number(split.allocation),
      })
    );

    const signersSplit = splitsForMerkle.find(
      (split: { account: string }) => split.account === address.toString().toLowerCase()
    );
    const { account, allocation } = signersSplit;

    // Create Merkle Tree for Split and then get proof
    const tree = new BalanceTree(splitsForMerkle);
    const proof = tree.getProof(account, allocation);

    const pylonABI = pylonJSON.abi;
    const proxyWrite = new ethers.Contract(proxyAddress, pylonABI, signer);
    const windowTx = await proxyWrite.incrementWindow();
    const windowReceipt = await windowTx.wait();

    if (windowReceipt) {
      const claimTx = await proxyWrite.claimETHForAllWindows(account, allocation, proof);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const claimReceipt = await claimTx.wait();
    }

    // try to claim without incrementing window, if ethers errors estimating gas, increment window then claim
    // try {
    //   const claimTx = await proxyWrite.claimETHForAllWindows(account, allocation, proof);
    //   const claimReceipt = await claimTx.wait();

    //   if (claimReceipt) {
    //   }
    // } catch (error) {
    //   const windowTx = await proxyWrite.incrementWindow();
    //   const windowReceipt = await windowTx.wait();

    //   if (windowReceipt) {
    //     const claimTx = await proxyWrite.claimETHForAllWindows(account, allocation, proof);
    //     const claimReceipt = await claimTx.wait();

    //     if (claimReceipt) {
    //     }
    //   }
    // }
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
    zora,
    zoraQuery,
    mintZoraSplit,
    mintZoraSolo,
    newProxy,
    createZoraAuction,
    claimFunds,
  };
}

// Create unstate-next container
const web3 = createContainer(useWeb3);
export default web3;
