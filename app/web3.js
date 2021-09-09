import Web3Modal from "web3modal"; // Web3Modal
import { ethers, providers } from "ethers"; // Ethers
import { useState, useEffect, useCallback } from "react"; // State management
import { createContainer } from "unstated-next"; // Unstated-next containerization
import WalletConnectProvider from "@walletconnect/web3-provider"; // WalletConnectProvider (Web3Modal)
import {
  Zora,
  constructMediaData,
  sha256FromBuffer,
  generateMetadata,
  constructBidShares,
} from "@zoralabs/zdk"; // Zora provider
import { NFTStorage } from "nft.storage";
import BalanceTree from "@/ethereum/merkle-tree/balance-tree.ts"; // Creates merkle tree for splits
import factoryJSON from "@/ethereum/abis/OurFactory.json";
import proxyJSON from "@/ethereum/abis/OurProxy.json";
import pylonJSON from "@/ethereum/abis/OurPylon.json";

//====== Web3Modal Config ======
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
  //====== State ======
  const [modal, setModal] = useState(); // Web3Modal
  const [address, setAddress] = useState(null); // User's ETH address
  const [network, setNetwork] = useState(); // Connected ChainID
  const [injectedProvider, setInjectedProvider] = useState(null); // Ethers Provider
  const [signer, setSigner] = useState(null); // User's Wallet Instance
  const [zora, setZora] = useState(null); // Zora provider
  const [zoraQuery, setZoraQuery] = useState(null); // Zora provider for homepage queries

  //====== Setup Web3Modal on Page Load ======
  useEffect(() => {
    async function setupWeb3Modal() {
      // console.log(`setupweb3modal`);
      // Create new
      const web3Modal = new Web3Modal({
        network: "rinkeby", // optional
        cacheProvider: true, // optional
        // theme:"dark", // optional. Change to "dark" for a dark theme.
        providerOptions: providerOptions,
      });
      // Save to state
      setModal(web3Modal);
    }
    setupWeb3Modal();
  }, []);

  //====== Connect (get web3 Signer) ======
  const authenticate = async () => {
    // Initiate web3Modal
    const web3Provider = await modal.connect();
    await web3Provider.enable();

    // Generate ethers provider
    const provider = new providers.Web3Provider(web3Provider);
    setInjectedProvider(provider);

    // User Login
    const signer = provider.getSigner();
    const signature = await signer.signMessage(
      `Instead of remembering a password, \njust sign this message to verify your \naccount ownership.`
    );

    if (signature) {
      setSigner(signer);

      const address = await signer.getAddress();
      setAddress(address);

      // Detects Network ID from user wallet
      const network = await provider.getNetwork();
      setNetwork(network);
    }
  };

  //====== Event Subscription ======
  const loadWeb3Modal = useCallback(async () => {
    // console.log(`modal: `, modal);
    const provider = await modal.connect();
    await provider.enable();

    setInjectedProvider(new providers.Web3Provider(provider));

    provider.on("chainChanged", async (chainId) => {
      console.log(`chain changed to ${chainId}! updating providers`);
      const web3provider = new providers.Web3Provider(provider);
      const network = await web3provider.getNetwork();
      setNetwork(network);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    provider.on("accountsChanged", () => {
      console.log(`account changed!`);
      setAddress(null);
      setSigner(null);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    provider.on("disconnect", (code, reason) => {
      console.log(code, reason);
      disconnectWeb3();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal, setInjectedProvider]);

  useEffect(() => {
    if (modal?.cachedProvider) {
      loadWeb3Modal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadWeb3Modal]);

  //====== Sign Message Via Metamask ======
  const verifyAPIpost = async (message) => {
    const signature = await signer.signMessage(
      `Please sign this message to verify your account ownership. \nMessage:\n${message}`
    );
    if (signature) {
      return true;
    }
  };

  //====== Disconnect Wallet ======
  const disconnectWeb3 = async () => {
    if (injectedProvider.close) {
      await injectedProvider.close();
    }
    if (
      injectedProvider &&
      injectedProvider.provider &&
      typeof injectedProvider.provider.disconnect == "function"
    ) {
      await injectedProvider.provider.disconnect();
    }
    await modal.clearCachedProvider();
    // setInjectedProvider(null);
    setNetwork(null);
    setAddress(null);
    setSigner(null);
  };

  // Relocate these
  // Create instances of Zora Contracts (from ZDK) for querying and txs
  useEffect(() => {
    async function getZoraQuery() {
      const zoraQuery = new Zora(injectedProvider, 4);
      setZoraQuery(zoraQuery);
    }

    async function getZora() {
      const zora = new Zora(signer, 4);
      setZora(zora);
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
  const formatSplits = (formData) => {
    console.log(`fromatSplits - formData\n`, formData);
    // see https://github.com/mirror-xyz/splits
    let splitsForMerkle = []; // Required Format: [{account: '0x..', allocation: #}]
    let tree; // for Mirror Splits
    let rootHash; // for Mirror Splits see next comment

    // splitsForMeta will be JSON.stringify'd and emitted in an event during eth tx
    // this allows the information to be stored on the Subgraph rather than MongoDB
    let splitsForMeta = []; // [{address: '0x/ENS', name: 'name', role: 'role', shares: #}]

    splitsForMeta = formData.map(({ id, ...keepAttrs }) => keepAttrs); // remove id

    // change property names + add allocations for ease of use when claiming funds
    // webassembly in subgraph is tricky... hence toString() of Numbers. BigInt, more like BigBye
    splitsForMeta = splitsForMeta.map(function (split) {
      return {
        address: split.account,
        name: split.name,
        role: split.role,
        shares: split.shares.toString(),
        allocation: Number((split.shares * 1000000).toFixed(0)).toString(),
      };
    });
    console.log(`fromatSplits - splitsForMeta\n`, splitsForMeta);

    // Format splits[] for merkle-tree. WILL NOT WORK if ENS names aren't translated to 0x0
    // keep address and allocation
    splitsForMerkle = splitsForMeta.map(
      ({ name, role, shares, ...keepAttrs }) => keepAttrs
    );
    // Change 'address' -> 'account'
    splitsForMerkle = splitsForMerkle.map(function (split) {
      return {
        account: split.address,
        allocation: Number(split.allocation),
      };
    });
    console.log(`fromatSplits - splitsForMerkle\n`, splitsForMerkle);

    // Create Merkle Tree for Split
    tree = new BalanceTree(splitsForMerkle);
    rootHash = tree.getHexRoot();
    console.log(`formatSplits - rootHash\n`, rootHash);

    return { rootHash, splitsForMeta };
  };

  /** Prepare Media for minting on Zora, storing on IPFS and Arweave
   *
   */
  const createCryptomedia = async (cryptomedia) => {
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

    // console.log(`--- web3.js - mintNFT() ----- \nmetadataJSON: `, metadataJSON);
    // Upload files to nft.storage
    // Or other IPFS pinning service
    const endpoint = "https://api.nft.storage"; // the default
    const token = `${process.env.NEXT_PUBLIC_NFT_STORAGE_KEY}`;

    const storage = new NFTStorage({ endpoint, token });
    // Collect mediaCID and metadataCID from nft.storage
    const mediaCID = await storage.storeBlob(cryptomedia.mediaBlob);
    // console.log({ mediaCID });
    const metadataCID = await storage.storeBlob(metadataJSON);
    // console.log({ metadataCID });
    // Save fileUrl and metadataUrl
    const mediaUrl = `https://${mediaCID}.ipfs.dweb.link`;
    const metadataUrl = `https://${metadataCID}.ipfs.dweb.link`;
    const status = await storage.status(mediaCID);
    console.log(`--- web3.js - mintNFT() ----- \nstatus: `, status);

    // if (cryptomedia.mediaKind.includes("image")) {
    //   const arweaveMedia = await axios.post(`https://ipfs2arweave.com/permapin/${mediaCID}`);
    //   if (arweaveMedia) {
    //     console.log(`Saved image to Arweave.`);
    //   }
    // }

    // Generate content hashes
    const contentHash = sha256FromBuffer(Buffer.from(cryptomedia.mediaBlob));
    const metadataHash = sha256FromBuffer(Buffer.from(metadataJSON));

    // Construct mediaData object
    const mediaData = constructMediaData(
      mediaUrl,
      metadataUrl,
      contentHash,
      metadataHash
    );

    /** Construct bidShares object
     * Note: this is for future royalties on NFT sale,
     * which is > then < divided up via splits.
     */
    const bidShares = constructBidShares(
      Number(cryptomedia.creatorBidShare),
      100 - Number(cryptomedia.creatorBidShare),
      0 // Previous owner share. Always 0 when minting
    );

    console.log("mediaData", mediaData);
    console.log("bidShares", bidShares);
    return { mediaData, bidShares };
  };

  const mintZoraSplit = async ({ formData, proxyAddress }) => {
    console.log(`\n formData`, formData, `\n proxyAddress`, proxyAddress);
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
    }
  };

  const createZoraAuction = async ({ proxyAddress, tokenId, tokenContract, duration, reservePrice, curator, curatorFeePercentage, auctionCurrency }) => {
    console.log(`proxyAddress ${proxyAddress}\n tokenId: ${tokenId}`);
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
    const auctionTx = await proxyPylon.createZoraAuction(
      tokenId, 
      //zora media rinkeby
      "0x7C2668BD0D3c050703CEcC956C11Bd520c26f7d4", 
      // ethers.BigNumber.from(duration), 
      parseUnits(`${reservePrice}`, "ether"), 
      // ethers.BigNumber.from(reservePrice), 
      parseUnits(`${reservePrice}`, "ether"), 
      curator || proxyAddress,
      curatorFeePercentage || Number(0),
      auctionCurrency || "0x0000000000000000000000000000000000000000"
    );

    // Wait for Tx to process
    const auctionReceipt = await auctionTx.wait();

    if (auctionReceipt) {
      console.log(`AUCTION RECEIPT: `, auctionReceipt);
      console.log(`AUCTION RECEIPT JSON: `, JSON.stringify(auctionReceipt));
      const auctionId = parseInt(auctionReceipt.events[3].topics[1], 16);
      return auctionId;
    }
  };

  const mintZoraSolo = async ({ formData }) => {
    // Upload file to IPFS
    const cryptomedia = formData;
    const { mediaData, bidShares } = await createCryptomedia(cryptomedia);

    // Mint to Zora Protocol
    if (mediaData && bidshares) {
      // Make transaction
      const mintTx = await zora.mint(mediaData, bidShares);

      // Wait for Tx to process
      const mintReceipt = await mintTx.wait();

      if (mintReceipt) {
        const tokenId = parseInt(mintReceipt.events[0].topics[3], 16);
        return tokenId;
      }
    }
  };

  const newProxy = async (formData) => {
    /** Step 1)
     * If user defined splits other than their own royalties,
     * format them for merkle tree & metadata
     * */
    const { rootHash, splitsForMeta } = await formatSplits(formData);

    //change
    const owners = [address];
    //change

    // init contract
    const factoryABI = factoryJSON.abi; // RINKEBY
    const factory_WRITE = new ethers.Contract(
      process.env.NEXT_PUBLIC_FACTORY_4,
      factoryABI,
      signer
    );

    const pylonABI = pylonJSON.abi;
    const pylon_WRITE = new ethers.Contract(
      process.env.NEXT_PUBLIC_PYLON_4,
      pylonABI,
      signer
    );

    const deployData = pylon_WRITE.interface.encodeFunctionData("setup", [
      owners,
    ]);

    if (splitsForMeta && rootHash) {
      // Make transaction
      const proxyTx = await factory_WRITE.createSplit(
        rootHash,
        deployData,
        JSON.stringify(splitsForMeta),
        "NicknameHere"
      );

      const proxyReceipt = await proxyTx.wait();

      // determine address of new proxy
      const proxyBytecode = proxyJSON.bytecode;
      const constructorArgs = ethers.utils.defaultAbiCoder.encode(
        ["bytes32"],
        [rootHash]
      );
      const salt = ethers.utils.keccak256(constructorArgs);
      const codeHash = ethers.utils.keccak256(proxyBytecode);
      const proxyAddress = await ethers.utils.getCreate2Address(
        process.env.NEXT_PUBLIC_FACTORY_4,
        salt,
        codeHash
      );

      if (proxyReceipt) {
        return proxyAddress;
      }
    }
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
    createZoraAuction
  };
}

// Create unstate-next container
const web3 = createContainer(useWeb3);
export default web3;
