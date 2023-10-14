// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {zkMysticSender} from "../src/zkMysticSender.sol";

contract SetReceiver is Script {
    HelperConfig public helperConfig = new HelperConfig();

    function setReceiver(address _receiver, address _sender) public {
        vm.startBroadcast();
        zkMysticSender(_sender).setReceiver(_receiver);
        vm.stopBroadcast();
    }

    function setReceiverUsingConfigs() public {
        address receiverAddress = helperConfig.getZkMysticReceiverAddress();
        address senderAddress = helperConfig.getZkMysticSenderAddress();
        setReceiver(receiverAddress, senderAddress);
    }

    function run() external {
        setReceiverUsingConfigs();
    }
}

contract CheckStatusForERC20 is Script {
    HelperConfig public helperConfig = new HelperConfig();

    function checkStatusForERC20(address _sender, address _asset, bool _forceUpdateGlobalExitRoot) public {
        vm.startBroadcast();
        zkMysticSender(_sender).checkStatusForERC20(_asset, _forceUpdateGlobalExitRoot);
        vm.stopBroadcast();
    }

    function checkStatusForERC20UsingConfigs() public {
        address senderAddress = helperConfig.getZkMysticSenderAddress();
        address assetAddress = helperConfig.ERC20_ADDRESS();
        console.log("senderAddress: %s", senderAddress);
        console.log("assetAddress: %s", assetAddress);
        bool forceUpdateGlobalExitRoot = true;

        checkStatusForERC20(senderAddress, assetAddress, forceUpdateGlobalExitRoot);
    }

    function run() external {
        checkStatusForERC20UsingConfigs();
    }
}
