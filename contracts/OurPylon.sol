// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.4;

import {OurSplitter} from "./OurSplitter.sol";
import {OurMinter} from "./OurMinter.sol";
import {OurIntrospector} from "./OurIntrospector.sol";

/**
 * @title OurPylon
 * @author Nick Adamson - nickadamson@pm.me
 *
 * Building on the work from:
 * @author Mirror       @title Splits   https://github.com/mirror-xyz/splits
 * @author Gnosis       @title Safe     https://github.com/gnosis/safe-contracts
 * & of course, @author OpenZeppelin
 */
contract OurPylon is OurSplitter, OurMinter, OurIntrospector {
    // Disables modification of Pylon after deployment
    constructor() {
        threshold = 1;
    }

    /**
     * @dev Setup function sets initial storage of Poxy.
     * @param owners_ List of addresses that can execute transactions other than claiming funds.
     * @notice see OurManagement.sol -> setupOwners()
     * @notice approves Zora AH to handle Zora ERC721s
     */
    function setup(address[] calldata owners_) external {
        setupOwners(owners_);
        emit ProxySetup(owners_);

        // Approve Zora AH
        setApprovalForAH();
    }
}
