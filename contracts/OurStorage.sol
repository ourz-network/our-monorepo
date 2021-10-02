// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.4;

/**
 * @title OurStorage
 * @author Nick Adamson - nickadamson@pm.me
 *
 * Building on the work from:
 * @author Mirror       @title Splits   https://github.com/mirror-xyz/splits
 * @author Gnosis       @title Safe     https://github.com/gnosis/safe-contracts
 * & of course, @author OpenZeppelin
 */
contract OurStorage {
    bytes32 public merkleRoot;
    uint256 public currentWindow;

    address internal _pylon;

    /// @notice RINKEBY ADDRESS
    address public constant weth = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    uint256[] public balanceForWindow;
    mapping(bytes32 => bool) internal claimed;
    uint256 internal depositedInWindow;
}
