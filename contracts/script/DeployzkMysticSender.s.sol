// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {zkMysticSender} from "../src/zkMysticSender.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployzkMysticSender is Script {
    function deployMysticSender(
        address _bridgeAddress,
        address _nftAddress,
        address _mailbox,
        address _gasPaymaster,
        address _iqsRouter
    ) public returns (address) {
        vm.startBroadcast();
        zkMysticSender sender = new zkMysticSender(_bridgeAddress, _nftAddress, _mailbox, _gasPaymaster, _iqsRouter);
        vm.stopBroadcast();

        console.log("zkMysticSender deployed on chainId %s at address: %s", block.chainid, address(sender));
        return address(sender);
    }

    function deployUsingConfigs() public returns (address) {
        HelperConfig helperConfig = new HelperConfig();

        (,, address mailbox, address gasPaymaster, address iqsRouter) = helperConfig.networkConfig();
        address nftAddress = helperConfig.getZkMysticNFTAddress(block.chainid);
        address bridgeAddress = helperConfig.POLYGON_ZK_EVM_BRIDGE();

        return deployMysticSender(bridgeAddress, nftAddress, mailbox, gasPaymaster, iqsRouter);
    }

    function run() public returns (address senderAddress) {
        senderAddress = deployUsingConfigs();
    }
}
