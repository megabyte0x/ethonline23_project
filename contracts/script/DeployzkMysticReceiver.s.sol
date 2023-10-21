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
    uint256 SEPOLIA_CHAIN_ID = 11155111;
    uint256 MUMBAI_CHAIN_ID = 80001;

    function deployMysticReceiver(address _bridgeAddress, address _senderAddress, address _router)
        public
        returns (address)
    {
        vm.startBroadcast();
        zkMysticReceiver receiver = new zkMysticReceiver(_bridgeAddress, _senderAddress, _router);
        vm.stopBroadcast();

        console.log("zkMysticReceiver deployed at address: %s", address(receiver));
        return address(receiver);
    }

    function deployUsingConfigs() public returns (address) {
        address senderAddress;
        address router;
        if (block.chainid == GOERLI_CHAIN_ID) {
            senderAddress = helperConfig.getZkMysticSenderAddress(POLYGON_ZKEVM_CHAIN_ID);
            router = helperConfig.GOERLI_ROUTER();
        } else if (block.chainid == POLYGON_ZKEVM_CHAIN_ID) {
            senderAddress = helperConfig.getZkMysticSenderAddress(GOERLI_CHAIN_ID);
            router = helperConfig.ZKEVM_ROUTER();
        } else if (block.chainid == SEPOLIA_CHAIN_ID) {
            senderAddress = helperConfig.getZkMysticSenderAddress(MUMBAI_CHAIN_ID);
            router = helperConfig.SEPOLIA_ROUTER();
        } else {
            revert("Invalid chain id");
        }
        address bridgeAddress = helperConfig.POLYGON_ZK_EVM_BRIDGE();

        return deployMysticReceiver(bridgeAddress, senderAddress, router);
    }

    function run() public returns (address receiverAddress) {
        return deployUsingConfigs();
    }
}
