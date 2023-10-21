// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Script} from "forge-std/Script.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";

contract HelperConfig is Script {
    address public constant POLYGON_ZK_EVM_BRIDGE = 0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7;

    address public constant ZKEVM_ERC20_ADDRESS = 0x8107b2e64C34ab015Ac86aB724553feEF75dA25D;
    address public constant ZKEVM_ERC721_ADDRESS = 0x942A12c996534EB29E7ea2120340e2c284845e5D;

    address public constant GOERLI_ERC20_ADDRESS = 0x75Ab5AB1Eef154C0352Fc31D2428Cef80C7F8B33;
    address public constant GOERLI_ERC721_ADDRESS = 0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85;

    uint256 public constant POLYGON_ZKEVM_CHAIN_ID = 1442;
    uint256 public constant GOERLI_CHAIN_ID = 5;

    function getZkMysticNFTAddress(uint256 chainid) public returns (address) {
        if (chainid == GOERLI_CHAIN_ID) {
            return DevOpsTools.get_most_recent_deployment("zkMysticNFT", GOERLI_CHAIN_ID);
        } else if (chainid == POLYGON_ZKEVM_CHAIN_ID) {
            return DevOpsTools.get_most_recent_deployment("zkMysticNFT", POLYGON_ZKEVM_CHAIN_ID);
        } else {
            revert("invalid chainid");
        }
    }

    function getZkMysticSenderAddress(uint256 chainid) public returns (address) {
        if (chainid == GOERLI_CHAIN_ID) {
            return DevOpsTools.get_most_recent_deployment("zkMysticSender", GOERLI_CHAIN_ID);
        } else if (chainid == POLYGON_ZKEVM_CHAIN_ID) {
            return DevOpsTools.get_most_recent_deployment("zkMysticSender", POLYGON_ZKEVM_CHAIN_ID);
        } else {
            revert("invalid chainid");
        }
    }

    function getZkMysticReceiverAddress(uint256 chainid) public returns (address) {
        if (chainid == GOERLI_CHAIN_ID) {
            return DevOpsTools.get_most_recent_deployment("zkMysticReceiver", GOERLI_CHAIN_ID);
        } else if (chainid == POLYGON_ZKEVM_CHAIN_ID) {
            return DevOpsTools.get_most_recent_deployment("zkMysticReceiver", POLYGON_ZKEVM_CHAIN_ID);
        } else {
            revert("invalid chainid");
        }
    }
}
