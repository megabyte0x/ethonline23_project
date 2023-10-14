// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Script} from "forge-std/Script.sol";
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
