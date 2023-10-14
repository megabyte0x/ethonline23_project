// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {zkMysticNFT} from "../src/zkMysticNFT.sol";

contract DeployzkMysticNFT is Script {
    function run() public returns (address) {
        zkMysticNFT nft = new zkMysticNFT();
        return address(nft);
    }
}
