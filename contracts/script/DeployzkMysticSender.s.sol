// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {zkMysticSender} from "../src/zkMysticSender.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployzkMysticSender is Script {
    HelperConfig public helperConfig = new HelperConfig();
    uint256 POLYGON_ZKEVM_CHAIN_ID = 1442;
    uint256 GOERLI_CHAIN_ID = 5;
    uint256 SEPOLIA_CHAIN_ID = 11155111;
    uint256 MUMBAI_CHAIN_ID = 80001;

    function deployMysticSender(address _bridgeAddress, uint32 _destinationid, address _router)
        public
        returns (address)
    {
        vm.startBroadcast();
        zkMysticSender sender = new zkMysticSender(_bridgeAddress, _destinationid, _router);
        vm.stopBroadcast();

        console.log("zkMysticSender deployed at address: %s", address(sender));
        return address(sender);
    }

    function deployUsingConfigs() public returns (address) {
        address bridgeAddress = helperConfig.POLYGON_ZK_EVM_BRIDGE();
        address router;
        uint32 destinationId;
        if (block.chainid == POLYGON_ZKEVM_CHAIN_ID) {
            destinationId = 0;
            router = helperConfig.ZKEVM_ROUTER();
        } else if (block.chainid == GOERLI_CHAIN_ID) {
            destinationId = 1;
            router = helperConfig.GOERLI_ROUTER();
        } else if (block.chainid == MUMBAI_CHAIN_ID) {
            destinationId = 2;
            router = helperConfig.MUMBAI_ROUTER();
        } else {
            revert("Invalid chain id");
        }

        return deployMysticSender(bridgeAddress, destinationId, router);
    }

    function run() public returns (address senderAddress) {
        return deployUsingConfigs();
    }
}
