// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import {Script} from "forge-std/Script.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";

contract HelperConfig is Script {
    address public constant POLYGON_ZK_EVM_BRIDGE = 0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7;

    function getZkMysticNFTAddress() public returns (address) {
        return DevOpsTools.get_most_recent_deployment("zkMysticNFT", block.chainid);
    }

    function getZkMysticSenderAddress() public returns (address) {
        return DevOpsTools.get_most_recent_deployment("zkMysticSender", block.chainid);
    }
}
