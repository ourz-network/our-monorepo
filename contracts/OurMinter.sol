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
    address public constant ZORA_MEDIA =
        0x7C2668BD0D3c050703CEcC956C11Bd520c26f7d4;
    address public constant ZORA_MARKET =
        0x85e946e1Bd35EC91044Dc83A5DdAB2B6A262ffA6;
    address public constant ZORA_AH =
        0xE7dd1252f50B3d845590Da0c5eADd985049a03ce;
    address public constant ZORA_EDITIONS =
        0x5d6E1357Acc8BF654979f3b24fdef8C5549A491e;
    address public constant MIRROR_CROWDFUND =
        0xeac226B370D77f436b5780b4DD4A49E59e8bEA37;

    //======== Subgraph =========
    event ZNFTMinted(uint256 tokenId);
    event EditionCreated(uint256 editionId, uint256 editionSize);

    /**======== IZora =========
     * @notice Various functions allowing a Split to interact with Zora Protocol
     * @dev see IZora.sol
     * Media -> Market -> AH -> Editions -> QoL Functions
     */

    /** Media
     * @notice Mint new Zora NFT for Split Contract.
     */
    function mintZNFT(
        IZora.MediaData calldata mediaData,
        IZora.BidShares calldata bidShares
    ) external onlyOwners {
        IZora(ZORA_MEDIA).mint(mediaData, bidShares);
        emit ZNFTMinted(_getID());
    }

    /** Media
     * @notice EIP-712 mintWithSig. Mints new new Zora NFT for a creator on behalf of split contract.
     */
    function mintZNFTWithSig(
        address creator,
        IZora.MediaData calldata mediaData,
        IZora.BidShares calldata bidShares,
        IZora.EIP712Signature calldata sig
    ) external onlyOwners {
        IZora(ZORA_MEDIA).mintWithSig(creator, mediaData, bidShares, sig);
        emit ZNFTMinted(_getID());
    }

    /** Media
     * @notice Update the token URIs for a Zora NFT owned by Split Contract
     */
    function updateZNFTURIs(
        uint256 tokenId,
        string calldata tokenURI,
        string calldata metadataURI
    ) external onlyOwners {
        IZora(ZORA_MEDIA).updateTokenURI(tokenId, tokenURI);
        IZora(ZORA_MEDIA).updateTokenMetadataURI(tokenId, metadataURI);
    }

    /** Media
     * @notice Update the token URI
     */
    function updateZNFTTokenURI(uint256 tokenId, string calldata tokenURI)
        external
        onlyOwners
    {
        IZora(ZORA_MEDIA).updateTokenURI(tokenId, tokenURI);
    }

    /** Media
     * @notice Update the token metadata uri
     */
    function updateZNFTMetadataURI(uint256 tokenId, string calldata metadataURI)
        external
    {
        IZora(ZORA_MEDIA).updateTokenMetadataURI(tokenId, metadataURI);
    }

    /** Market
     * @notice Update zora/core/market bidShares (NOT zora/auctionHouse)
     */
    function setZMarketBidShares(
        uint256 tokenId,
        IZora.BidShares calldata bidShares
    ) external {
        IZora(ZORA_MARKET).setBidShares(tokenId, bidShares);
    }

    /** Market
     * @notice Update zora/core/market ask
     */
    function setZMarketAsk(uint256 tokenId, IZora.Ask calldata ask)
        external
        onlyOwners
    {
        IZora(ZORA_MARKET).setAsk(tokenId, ask);
    }

    /** Market
     * @notice Remove zora/core/market ask
     */
    function removeZMarketAsk(uint256 tokenId) external onlyOwners {
        IZora(ZORA_MARKET).removeAsk(tokenId);
    }

    /** Market
     * @notice Accept zora/core/market bid
     */
    function acceptZMarketBid(uint256 tokenId, IZora.Bid calldata expectedBid)
        external
        onlyOwners
    {
        IZora(ZORA_MARKET).acceptBid(tokenId, expectedBid);
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
        IZora(ZORA_AH).createAuction(
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
    function setZAuctionApproval(uint256 auctionId, bool approved)
        external
        onlyOwners
    {
        IZora(ZORA_AH).setAuctionApproval(auctionId, approved);
    }

    /** AuctionHouse
     * @notice Set an Auction's reserve price
     */
    function setZAuctionReservePrice(uint256 auctionId, uint256 reservePrice)
        external
        onlyOwners
    {
        IZora(ZORA_AH).setAuctionReservePrice(auctionId, reservePrice);
    }

    /** AuctionHouse
     * @notice Cancel an Auction before any bids have been placed
     */
    function cancelZAuction(uint256 auctionId) external onlyOwners {
        IZora(ZORA_AH).cancelAuction(auctionId);
    }

    /** NFT-Editions
     * @notice Creates a new edition contract as a factory with a deterministic address
     */
    function createZoraEdition(
        string memory name,
        string memory symbol,
        string memory description,
        string memory animationUrl,
        bytes32 animationHash,
        string memory imageUrl,
        bytes32 imageHash,
        uint256 editionSize,
        uint256 royaltyBPS
    ) external onlyOwners {
        uint256 editionId = IZora(ZORA_EDITIONS).createEdition(
            name,
            symbol,
            description,
            animationUrl,
            animationHash,
            imageUrl,
            imageHash,
            editionSize,
            royaltyBPS
        );

        emit EditionCreated(editionId, editionSize);
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
        IZora(ZORA_EDITIONS).setApprovedMinter(minter, allowed);
    }

    /** NFT-Editions
      @dev Allows for updates of edition urls by the owner of the edition.
           Only URLs can be updated (data-uris are supported), hashes cannot be updated.
     */
    function setEditionURLs(string memory imageUrl, string memory animationUrl)
        external
        onlyOwners
    {
        IZora(ZORA_EDITIONS).updateEditionURLs(imageUrl, animationUrl);
    }

    /** QoL
     * @notice Approve the Zora Auction House to manage Split's ERC-721s
     * @dev Called internally in Proxy's Constructo
     */
    /* solhint-disable ordering */
    function _setApprovalForAH() internal {
        IERC721(ZORA_MEDIA).setApprovalForAll(ZORA_AH, true);
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
        IZora(ZORA_MEDIA).mint(mediaData, bidShares);

        uint256 tokenId_ = _getID();
        emit ZNFTMinted(tokenId_);

        IZora(ZORA_AH).createAuction(
            tokenId_,
            ZORA_MEDIA,
            duration,
            reservePrice,
            payable(address(this)),
            0,
            address(0)
        );
    }

    //======== /IZora =========
    /* solhint-enable ordering */

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
        IMirror(MIRROR_CROWDFUND).createCrowdfund(
            name,
            symbol,
            operator,
            fundingRecipient,
            fundingCap,
            operatorPercent
        );
    }

    //======== /IMirror =========

    // /**======== IPartyBid =========
    //  * @notice Starts a Party Bid
    //  * @dev see IPartyBid.sol
    //  */
    // function startSplitParty(
    //     address marketWrapper,
    //     address nftContract,
    //     uint256 tokenId,
    //     uint256 auctionId,
    //     string memory name,
    //     string memory symbol
    // ) external onlyOwners {
    //     IPartyBid(_partyBid).startParty(
    //         marketWrapper,
    //         nftContract,
    //         tokenId,
    //         auctionId,
    //         name,
    //         symbol
    //     );
    // }

    // //======== /IPartyBid =========

    /**======== IERC721 =========
     * NOTE: Althought OurMinter.sol is generally implemented to work with Zora,
     * the functions below allow a Split to work with any ERC-721 spec'd platform (except minting)
     * @dev see IERC721.sol
     */

    /**
     * NOTE: Marked as >> untrusted << Use caution when supplying tokenContract_
     * @dev In case non-Zora ERC721 gets stuck in Account.
     * @notice safeTransferFrom(address from, address to, uint256 tokenId)
     */
    function untrustedSafeTransferERC721(
        address tokenContract_,
        address newOwner_,
        uint256 tokenId_
    ) external onlyOwners {
        IERC721(tokenContract_).safeTransferFrom(
            address(this),
            newOwner_,
            tokenId_
        );
    }

    /**
     * NOTE: Marked as >> untrusted << Use caution when supplying tokenContract_
     * @dev sets approvals for non-Zora ERC721 contract
     * @notice setApprovalForAll(address operator, bool approved)
     */
    function untrustedSetApprovalERC721(
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
    function untrustedBurnERC721(address tokenContract_, uint256 tokenId_)
        external
        onlyOwners
    {
        IERC721(tokenContract_).burn(tokenId_);
    }

    //======== /IERC721 =========

    /**
     * NOTE: Marked as >> untrusted << Use caution when interacting with external contracts. For advanced users only
     * @dev allows a Split Contract to call functions of any other contract
     * @notice This function is added for 'future-proofing' capabilities and will not be implemented into the
     *         OURZ frontend. In the interest of securing the Split's funds, the value is hardcoded
     *         to zero. The intent is to support the use of custom creator contracts.
     */
    function untrustedExecuteTransaction(address to, bytes memory data)
        external
        onlyOwners
        returns (bool success)
    {
        // solhint-disable-next-line no-inline-assembly
        assembly {
            success := call(gas(), to, 0, add(data, 0x20), mload(data), 0, 0)
        }
    }

    /// @dev calculates tokenID of newly minted ZNFT
    function _getID() private returns (uint256 id) {
        id = IZora(ZORA_MEDIA).tokenByIndex(
            IZora(ZORA_MEDIA).totalSupply() - 1
        );
    }
}
