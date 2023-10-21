// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {zkMysticReceiver} from "../src/zkMysticReceiver.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployzkMysticReceiver is Script {
    HelperConfig public helperConfig = new HelperConfig();
    uint256 POLYGON_ZKEVM_CHAIN_ID = 1442;
    uint256 GOERLI_CHAIN_ID = 5;

    function deployMysticReceiver(address _bridgeAddress, address _senderAddress) public returns (address) {
        vm.startBroadcast();
        zkMysticReceiver receiver = new zkMysticReceiver(_bridgeAddress, _senderAddress);
        vm.stopBroadcast();

        console.log("zkMysticReceiver deployed at address: %s", address(receiver));
        return address(receiver);
    }

    function deployUsingConfigs() public returns (address) {
        address senderAddress;
        if (block.chainid == GOERLI_CHAIN_ID) {
            senderAddress = helperConfig.getZkMysticSenderAddress(POLYGON_ZKEVM_CHAIN_ID);
        } else {
            senderAddress = helperConfig.getZkMysticSenderAddress(GOERLI_CHAIN_ID);
        }
        address bridgeAddress = helperConfig.POLYGON_ZK_EVM_BRIDGE();

        return deployMysticReceiver(bridgeAddress, senderAddress);
    }

    function run() public returns (address receiverAddress) {
        return deployUsingConfigs();
    }
}
