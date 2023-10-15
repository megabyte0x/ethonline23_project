// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Script} from "forge-std/Script.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";

contract HelperConfig is Script {
    address public constant POLYGON_ZK_EVM_BRIDGE = 0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7;
    // https://testnet-zkevm.polygonscan.com/address/0x8107b2e64c34ab015ac86ab724553feef75da25d
    address public constant ERC20_ADDRESS = 0x8107b2e64C34ab015Ac86aB724553feEF75dA25D;
    // https://testnet-zkevm.polygonscan.com/token/0x942a12c996534eb29e7ea2120340e2c284845e5d?a=0x1Cb30cb181D7854F91c2410BD037E6F42130e860
    address public constant ERC721_ADDRESS = 0x942A12c996534EB29E7ea2120340e2c284845e5D;

    uint256 public constant POLYGON_ZKEVM_CHAIN_ID = 1442;
    uint256 public constant GOERLI_CHAIN_ID = 5;

    function getZkMysticNFTAddress() public returns (address) {
        return DevOpsTools.get_most_recent_deployment("zkMysticNFT", POLYGON_ZKEVM_CHAIN_ID);
    }

    function getZkMysticSenderAddress() public returns (address) {
        return DevOpsTools.get_most_recent_deployment("zkMysticSender", POLYGON_ZKEVM_CHAIN_ID);
    }

    function getZkMysticReceiverAddress() public returns (address) {
        return DevOpsTools.get_most_recent_deployment("zkMysticReceiver", GOERLI_CHAIN_ID);
    }
}
