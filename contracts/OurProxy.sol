// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.4;

import {OurStorage} from "./OurStorage.sol";

interface IOurFactory {
    function pylon() external returns (address);

    function merkleRoot() external returns (bytes32);
}

/**
 * @title OurProxy
 * @author Nick Adamson - nickadamson@pm.me
 *
 * Building on the work from:
 * @author Mirror       @title Splits   https://github.com/mirror-xyz/splits
 * @author Gnosis       @title Safe     https://github.com/gnosis/safe-contracts
 * & of course, @author OpenZeppelin
 */
contract OurProxy is OurStorage {
    constructor() {
        _pylon = IOurFactory(msg.sender).pylon();
        merkleRoot = IOurFactory(msg.sender).merkleRoot();
    }

    // solhint-disable-next-line no-complex-fallback
    fallback() external payable {
        address impl = pylon();
        // solhint-disable-next-line no-inline-assembly
        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize())
            let result := delegatecall(gas(), impl, ptr, calldatasize(), 0, 0)
            let size := returndatasize()
            returndatacopy(ptr, 0, size)

            switch result
            case 0 {
                revert(ptr, size)
            }
            default {
                return(ptr, size)
            }
        }
    }

    function pylon() public view returns (address) {
        return _pylon;
    }
}
