// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {zkMysticSender} from "../src/zkMysticSender.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployzkMysticSender is Script {
    HelperConfig public helperConfig = new HelperConfig();

    function deployMysticSender(address _bridgeAddress) public returns (address) {
        vm.startBroadcast();
        zkMysticSender sender = new zkMysticSender(_bridgeAddress);
        vm.stopBroadcast();

        console.log("zkMysticSender deployed at address: %s", address(sender));
        return address(sender);
    }

    function deployUsingConfigs() public returns (address) {
        address bridgeAddress = helperConfig.POLYGON_ZK_EVM_BRIDGE();

        return deployMysticSender(bridgeAddress);
    }

    function run() public returns (address senderAddress) {
        return deployUsingConfigs();
    }
}
