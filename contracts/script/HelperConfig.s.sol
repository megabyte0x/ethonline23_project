// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Script} from "forge-std/Script.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";

contract HelperConfig is Script {
    address public constant POLYGON_ZK_EVM_BRIDGE = 0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7;
    // https://testnet-zkevm.polygonscan.com/address/0x8107b2e64c34ab015ac86ab724553feef75da25d
    address public constant ERC20_ADDRESS = 0x8107b2e64C34ab015Ac86aB724553feEF75dA25D;

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
