// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {zkMysticReceiver} from "../src/zkMysticReceiver.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployzkMysticReceiver is Script {
    HelperConfig public helperConfig = new HelperConfig();

    function deployMysticSender(address _bridgeAddress, address _senderAddress) public returns (address) {
        vm.startBroadcast();
        zkMysticSender receiver = new zkMysticReceiver(_bridgeAddress, _senderAddress);
        vm.stopBroadcast();

        console.log("zkMysticReceiver deployed at address: %s", address(receiver));
        return address(receiver);
    }

    function deployUsingConfigs() public returns (address) {
        address senderAddress = helperConfig.getZkMysticSenderAddress();
        address bridgeAddress = helperConfig.POLYGON_ZK_EVM_BRIDGE();

        deployMysticReceiver(bridgeAddress, senderAddress);
    }

    function run() public returns (address) {
        return deployUsingConfigs();
    }
}
