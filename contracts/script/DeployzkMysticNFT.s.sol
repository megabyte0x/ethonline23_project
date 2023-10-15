// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {zkMysticNFT} from "../src/zkMysticNFT.sol";

contract DeployzkMysticNFT is Script {
    function deployNFT() public returns (address) {
        vm.startBroadcast();
        zkMysticNFT nft = new zkMysticNFT();
        vm.stopBroadcast();
        return address(nft);
    }

    function run() public returns (address nftAddress) {
        return deployNFT();
    }
}
