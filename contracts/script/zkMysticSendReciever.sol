// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {IPolygonZkEVMBridge} from "../src/interfaces/IPolygonZkEVMBridge";
import {DeployzkMysticReceiver} from "./DeployzkMysticReceiver";

contract zkMysticSendReciever is Script {
    IPolygonZkEVMBridge public  i_polygonZkEVMBridge = IPolygonZkEVMBridge(0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7);
    DeployzkMysticReceiver deployzkMysticReciever = new DeployzkMysticReceiver();

    uint32 NETWORK_ID_zkEVM = 1;
    address zkMYSTIC_RECIEVER = deployzkMysticReciever.run();
    address USER = makeaddress("user");

    function run() public {
        vm.deal(USER,100 ether);
        bytes memory pingMessage = abi.encode("This is the ping message from Sender.");

        vm.prank(USER);
        i_polygonZkEVMBridge.bridgeMessage(NETWORK_ID_zkEVM, zkMYSTIC_RECIEVER, true, pingMessage);

        console.log("Message has been sent.");
    }

}
