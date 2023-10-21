// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {zkMysticSender} from "../src/zkMysticSender.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployzkMysticSender is Script {
    HelperConfig public helperConfig = new HelperConfig();

    function deployMysticSender(address _bridgeAddress, uint32 _destinationid) public returns (address) {
        vm.startBroadcast();
        zkMysticSender sender = new zkMysticSender(_bridgeAddress, _destinationid);
        vm.stopBroadcast();

        console.log("zkMysticSender deployed at address: %s", address(sender));
        return address(sender);
    }

    function deployUsingConfigs() public returns (address) {
        address bridgeAddress = helperConfig.POLYGON_ZK_EVM_BRIDGE();
        uint32 destinationId;
        if (block.chainid == 1442) {
            destinationId = 0;
        } else if (block.chainid == 5) {
            destinationId = 1;
        } else {
            revert("Invalid chain id");
        }

        return deployMysticSender(bridgeAddress, destinationId);
    }

    function run() public returns (address senderAddress) {
        return deployUsingConfigs();
    }
}
