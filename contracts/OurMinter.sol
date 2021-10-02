// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.4;
pragma experimental ABIEncoderV2;

import {OurManagement} from "./OurManagement.sol";
import {IZora} from "./interfaces/IZora.sol";
import {IMirror} from "./interfaces/IMirror.sol";
import {IPartyBid} from "./interfaces/IPartyBid.sol";
import {IERC721} from "./interfaces/IERC721.sol";

/**
 * @title OurMinter
 * @author Nick Adamson - nickadamson@pm.me
 *
 * Building on the work from:
 * @author Mirror       @title Splits   https://github.com/mirror-xyz/splits
 * @author Gnosis       @title Safe     https://github.com/gnosis/safe-contracts
 * & of course, @author OpenZeppelin
 *
 * @notice Some functions are marked as 'untrusted'Function. Use caution when interacting
 * with these, as any contracts you supply could be potentially unsafe.
 * 'Trusted' functions on the other hand -- implied by the absence of 'untrusted' --
 * are hardcoded to use the Zora Protocol/MirrorXYZ/PartyDAO addresses.
 * https://consensys.github.io/smart-contract-best-practices/recommendations/#mark-untrusted-contracts
 */
contract OurMinter is OurManagement {
    /// @notice RINKEBY ADDRESSES
    address public constant _zoraMedia =
        0x7C2668BD0D3c050703CEcC956C11Bd520c26f7d4;
    address public constant _zoraMarket =
        0x85e946e1Bd35EC91044Dc83A5DdAB2B6A262ffA6;
    address public constant _zoraAH =
        0xE7dd1252f50B3d845590Da0c5eADd985049a03ce;
    address public constant _zoraEditions =
        0x7E335506443252196cd5A61bd4a1906D79791Fc6;
    address public constant _mirrorCrowdfund =
        0xeac226B370D77f436b5780b4DD4A49E59e8bEA37;
    address public constant _partyBid =
        0xB725682D5AdadF8dfD657f8e7728744C0835ECd9;

    //======== Subgraph =========
    event ZNFTMinted(uint256 tokenId);
    event EditionCreated(uint256 editionId, uint256 editionSize);

    function getID() private returns (uint256 id) {
        id = IZora(_zoraMedia).tokenByIndex(
            IZora(_zoraMedia).totalSupply() - 1
        );
    }

    /**======== IZora =========
     * @notice Various functions allowing a Split to interact with Zora Protocol
     * @dev see IZora.sol
     * Media -> Market -> AH -> Editions -> QoL Functions
     */

    /** Media
     * @notice Mint new Zora NFT for Split Contract.
     */
    function mintZora(
        IZora.MediaData calldata mediaData,
        IZora.BidShares calldata bidShares
    ) external onlyOwners {
        IZora(_zoraMedia).mint(mediaData, bidShares);
        emit ZNFTMinted(getID());
    }

    /** Media
     * @notice EIP-712 mintWithSig. Mints new new Zora NFT for a creator on behalf of split contract.
     */
    function mintZoraWithSig(
        address creator,
        IZora.MediaData calldata mediaData,
        IZora.BidShares calldata bidShares,
        IZora.EIP712Signature calldata sig
    ) external onlyOwners {
        IZora(_zoraMedia).mintWithSig(creator, mediaData, bidShares, sig);
        emit ZNFTMinted(getID());
    }

    /** Media
     * @notice Update the token URIs for a Zora NFT owned by Split Contract
     */
    function updateZoraMediaURIs(
        uint256 tokenId,
        string calldata tokenURI,
        string calldata metadataURI
    ) external onlyOwners {
        IZora(_zoraMedia).updateTokenURI(tokenId, tokenURI);
        IZora(_zoraMedia).updateTokenMetadataURI(tokenId, metadataURI);
    }

    /** Media
     * @notice Update the token URI
     */
    function updateZoraMediaTokenURI(uint256 tokenId, string calldata tokenURI)
        external
        onlyOwners
    {
        IZora(_zoraMedia).updateTokenURI(tokenId, tokenURI);
    }

    /** Media
     * @notice Update the token metadata uri
     */
    function updateZoraMediaMetadataURI(
        uint256 tokenId,
        string calldata metadataURI
    ) external {
        IZora(_zoraMedia).updateTokenMetadataURI(tokenId, metadataURI);
    }

    /** Market
     * @notice Update zora/core/market bidShares (NOT zora/auctionHouse)
     */
    function setZoraMarketBidShares(
        uint256 tokenId,
        IZora.BidShares calldata bidShares
    ) external {
        IZora(_zoraMarket).setBidShares(tokenId, bidShares);
    }

    /** Market
     * @notice Update zora/core/market ask
     */
    function setZoraMarketAsk(uint256 tokenId, IZora.Ask calldata ask)
        external
        onlyOwners
    {
        IZora(_zoraMarket).setAsk(tokenId, ask);
    }

    /** Market
     * @notice Remove zora/core/market ask
     */
    function removeZoraMarketAsk(uint256 tokenId) external onlyOwners {
        IZora(_zoraMarket).removeAsk(tokenId);
    }

    /** Market
     * @notice Accept zora/core/market bid
     */
    function acceptZoraMarketBid(
        uint256 tokenId,
        IZora.Bid calldata expectedBid
    ) external onlyOwners {
        IZora(_zoraMarket).acceptBid(tokenId, expectedBid);
    }

    /** AuctionHouse
     * @notice Create auction on Zora's AuctionHouse for an owned/approved NFT
     * @dev reccomended auctionCurrency: ETH or WETH
     *      ERC20s may not be split perfectly. If the amount is indivisible
     *      among ALL recipients, the remainder will be sent to a single recipient.
     */
    function createZoraAuction(
        uint256 tokenId,
        address tokenContract,
        uint256 duration,
        uint256 reservePrice,
        address payable curator,
        uint8 curatorFeePercentage,
        address auctionCurrency
    ) external onlyOwners {
        IZora(_zoraAH).createAuction(
            tokenId,
            tokenContract,
            duration,
            reservePrice,
            curator,
            curatorFeePercentage,
            auctionCurrency
        );
    }

    /** AuctionHouse
     * @notice Approves an Auction proposal that requested the Split be the curator
     */
    function setZoraAuctionApproval(uint256 auctionId, bool approved)
        external
        onlyOwners
    {
        IZora(_zoraAH).setAuctionApproval(auctionId, approved);
    }

    /** AuctionHouse
     * @notice Set an Auction's reserve price
     */
    function setZoraAuctionReservePrice(uint256 auctionId, uint256 reservePrice)
        external
        onlyOwners
    {
        IZora(_zoraAH).setAuctionReservePrice(auctionId, reservePrice);
    }

    /** AuctionHouse
     * @notice Cancel an Auction before any bids have been placed
     */
    function cancelZoraAuction(uint256 auctionId) external onlyOwners {
        IZora(_zoraAH).cancelAuction(auctionId);
    }

    /** NFT-Editions
     * @notice Creates a new edition contract as a factory with a deterministic address
     */
    function createZoraEdition(
        string memory _name,
        string memory _symbol,
        string memory _description,
        string memory _animationUrl,
        bytes32 _animationHash,
        string memory _imageUrl,
        bytes32 _imageHash,
        uint256 _editionSize,
        uint256 _royaltyBPS
    ) external onlyOwners {
        uint256 editionId = IZora(_zoraEditions).createEdition(
            _name,
            _symbol,
            _description,
            _animationUrl,
            _animationHash,
            _imageUrl,
            _imageHash,
            _editionSize,
            _royaltyBPS
        );

        emit EditionCreated(editionId, _editionSize);
    }

    /** NFT-Editions
      @param minter address to set approved minting status for
      @param allowed boolean if that address is allowed to mint
      @dev Sets the approved minting status of the given address.
           This requires that msg.sender is the owner of the given edition id.
           If the ZeroAddress (address(0x0)) is set as a minter,
           anyone will be allowed to mint.
           This setup is similar to setApprovalForAll in the ERC721 spec.
     */
    function setEditionMinter(address minter, bool allowed)
        external
        onlyOwners
    {
        IZora(_zoraEditions).setApprovedMinter(minter, allowed);
    }

    /** NFT-Editions
      @dev Allows for updates of edition urls by the owner of the edition.
           Only URLs can be updated (data-uris are supported), hashes cannot be updated.
     */
    function setEditionURLs(
        string memory _imageUrl,
        string memory _animationUrl
    ) external onlyOwners {
        IZora(_zoraEditions).updateEditionURLs(_imageUrl, _animationUrl);
    }

    /** QoL
     * @notice Approve the Zora Auction House to manage Split's ERC-721s
     * @dev Called internally in Proxy's Constructo
     */

    function setApprovalForAH() internal {
        IERC721(_zoraMedia).setApprovalForAll(_zoraAH, true);
    }

    /** QoL
     * @notice Mints a Zora NFT with this Split as the Creator,
     * and then list it on AuctionHouse for ETH
     */
    function mintToAuctionForETH(
        IZora.MediaData calldata mediaData,
        IZora.BidShares calldata bidShares,
        uint256 duration,
        uint256 reservePrice
    ) external onlyOwners {
        IZora(_zoraMedia).mint(mediaData, bidShares);

        uint256 tokenId_ = getID();
        emit ZNFTMinted(tokenId_);

        IZora(_zoraAH).createAuction(
            tokenId_,
            _zoraMedia,
            duration,
            reservePrice,
            payable(address(this)),
            0,
            address(0)
        );
    }

    //======== /IZora =========

    /**======== IMirror =========
     * @notice Create a Crowdfund
     * @dev see IMirror.sol
     */
    function createMirrorCrowdfund(
        string calldata name,
        string calldata symbol,
        address payable operator,
        address payable fundingRecipient,
        uint256 fundingCap,
        uint256 operatorPercent
    ) external onlyOwners {
        IMirror(_mirrorCrowdfund).createCrowdfund(
            name,
            symbol,
            operator,
            fundingRecipient,
            fundingCap,
            operatorPercent
        );
    }

    //======== /IMirror =========

    /**======== IPartyBid =========
     * @notice Starts a Party Bid
     * @dev see IPartyBid.sol
     */
    function startSplitParty(
        address marketWrapper,
        address nftContract,
        uint256 tokenId,
        uint256 auctionId,
        string memory name,
        string memory symbol
    ) external onlyOwners {
        IPartyBid(_partyBid).startParty(
            marketWrapper,
            nftContract,
            tokenId,
            auctionId,
            name,
            symbol
        );
    }

    //======== /IPartyBid =========

    /**======== IERC721 =========
     * NOTE: Althought OurMinter.sol is generally implemented to work with Zora (or Mirror),
     * the functions below allow a Split to work with any ERC-721 spec'd platform
     * @dev see IERC721.sol
     */

    /**
     * NOTE: Marked as >> untrusted << Use caution when supplying tokenContract_
     * this should be changed if you know you will be using a different protocol.
     * @dev mint non-Zora ERC721 with one parameter, eg Foundation.app. See IERC721.sol
     * @dev mint(string contentURI/IPFSHash || address to_ || etc...)
     */
    //   function untrustedMint721(address tokenContract_, string contentURI_ || address to_ || etc...)
    //       external
    //   {
    //       IERC721(tokenContract_).mint(contentURI_ || address to_ || etc...);
    //   }

    /**
     * NOTE: Marked as >> untrusted << Use caution when supplying tokenContract_
     * @dev In case non-Zora ERC721 gets stuck in Account.
     * @notice safeTransferFrom(address from, address to, uint256 tokenId)
     */
    function untrustedSafeTransfer721(
        address tokenContract_,
        address newOwner_,
        uint256 tokenId_
    ) external onlyOwners {
        IERC721(tokenContract_).safeTransferFrom(
            address(msg.sender),
            newOwner_,
            tokenId_
        );
    }

    /**
     * NOTE: Marked as >> untrusted << Use caution when supplying tokenContract_
     * @dev sets approvals for non-Zora ERC721 contract
     * @notice setApprovalForAll(address operator, bool approved)
     */
    function untrustedSetApproval721(
        address tokenContract_,
        address operator_,
        bool approved_
    ) external onlyOwners {
        IERC721(tokenContract_).setApprovalForAll(operator_, approved_);
    }

    /**
     * NOTE: Marked as >> untrusted << Use caution when supplying tokenContract_
     * @dev burns non-Zora ERC721 that Split contract owns/isApproved
     * @notice setApprovalForAll(address operator, bool approved)
     */
    function untrustedBurn721(address tokenContract_, uint256 tokenId_)
        external
        onlyOwners
    {
        IERC721(tokenContract_).burn(tokenId_);
    }
    //======== /IERC721 =========
}
