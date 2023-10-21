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

    address public constant MUMBAI_ERC20_ADDRESS = address(0);
    address public constant MUMBAI_ERC721_ADDRESS = address(0);

    address public constant SEPOLIA_ERC20_ADDRESS = 0x685d3F5e89Af1cf1eAe92AC4280Cd0699c4a98F8;
    address public constant SEPOLIA_ERC721_ADDRESS = address(0);

    uint256 public constant POLYGON_ZKEVM_CHAIN_ID = 1442;
    uint256 public constant GOERLI_CHAIN_ID = 5;
    uint256 public constant MUMBAI_CHAIN_ID = 80001;
    uint256 public constant SEPOLIA_CHAIN_ID = 11155111;

    address public constant ZKEVM_ROUTER = address(0);
    address public constant GOERLI_ROUTER = address(0);
    address public constant SEPOLIA_ROUTER = 0xD0daae2231E9CB96b94C8512223533293C3693Bf;
    address public constant MUMBAI_ROUTER = 0x70499c328e1E2a3c41108bd3730F6670a44595D1;

    uint64 public constant SEPOLIA_DESTINATION_SELECTOR = 16015286601757825753;
    uint64 public constant MUMBAI_DESTINATION_SELECTOR = 12532609583862916517;

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
        } else if (chainid == MUMBAI_CHAIN_ID) {
            return DevOpsTools.get_most_recent_deployment("zkMysticSender", MUMBAI_CHAIN_ID);
        } else if (chainid == SEPOLIA_CHAIN_ID) {
            return DevOpsTools.get_most_recent_deployment("zkMysticSender", SEPOLIA_CHAIN_ID);
        } else {
            revert("invalid chainid");
        }
    }

    function getZkMysticReceiverAddress(uint256 chainid) public returns (address) {
        if (chainid == GOERLI_CHAIN_ID) {
            return DevOpsTools.get_most_recent_deployment("zkMysticReceiver", GOERLI_CHAIN_ID);
        } else if (chainid == POLYGON_ZKEVM_CHAIN_ID) {
            return DevOpsTools.get_most_recent_deployment("zkMysticReceiver", POLYGON_ZKEVM_CHAIN_ID);
        } else if (chainid == MUMBAI_CHAIN_ID) {
            return DevOpsTools.get_most_recent_deployment("zkMysticReceiver", MUMBAI_CHAIN_ID);
        } else if (chainid == SEPOLIA_CHAIN_ID) {
            return DevOpsTools.get_most_recent_deployment("zkMysticReceiver", SEPOLIA_CHAIN_ID);
        } else {
            revert("invalid chainid");
        }
    }
}
