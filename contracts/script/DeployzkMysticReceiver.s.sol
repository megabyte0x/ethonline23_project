// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {zkMysticReceiver} from "../src/zkMysticReceiver.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployzkMysticReceiver is Script {
    function deployMysticReceiver(
        address _bridgeAddress,
        address _senderAddress,
        address _mailbox,
        address _gasPaymaster
    ) public returns (address) {
        vm.startBroadcast();
        zkMysticReceiver receiver = new zkMysticReceiver(_bridgeAddress, _senderAddress, _mailbox, _gasPaymaster);
        (bool success,) = address(receiver).call{value: 1e10}("");
        if (success) {
            console.log("zkMysticReceiver funded");
        }
        vm.stopBroadcast();

        console.log("zkMysticReceiver deployed on chainid %s at address: %s", block.chainid, address(receiver));
        return address(receiver);
    }

    function deployUsingConfigs() public returns (address) {
        HelperConfig helperConfig = new HelperConfig();

        (,, address mailbox, address gasPaymaster,) = helperConfig.networkConfig();
        address bridgeAddress = helperConfig.POLYGON_ZK_EVM_BRIDGE();
        uint256 chainId = helperConfig.SEPOLIA_CHAIN_ID();
        address senderAddress = helperConfig.getZkMysticSenderAddress(chainId);

        return deployMysticReceiver(bridgeAddress, senderAddress, mailbox, gasPaymaster);
    }

    function run() public returns (address receiverAddress) {
        return deployUsingConfigs();
    }
}
