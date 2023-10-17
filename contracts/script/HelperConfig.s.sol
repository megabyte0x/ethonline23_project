// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Script} from "forge-std/Script.sol";
import {DevOpsTools} from "foundry-devops/src/DevOpsTools.sol";

contract HelperConfig is Script {
    struct NetworkConfig {
        address erc20Address;
        address erc721Address;
        address mailbox;
        address gasPaymaster;
        address iqsRouter;
    }

    address public constant POLYGON_ZK_EVM_BRIDGE = 0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7;
    uint256 public constant POLYGON_ZKEVM_CHAIN_ID = 1442;
    uint256 public constant GOERLI_CHAIN_ID = 5;
    uint256 public constant MUMBAI_CHAIN_ID = 80001;
    uint256 public constant GAS_PAYMENT = 1e16;
    uint256 public constant SEPOLIA_CHAIN_ID = 11155111;

    NetworkConfig public networkConfig;

    constructor() {
        if (block.chainid == POLYGON_ZKEVM_CHAIN_ID) {
            networkConfig = getZKEVMNetworkConfig();
        } else if (block.chainid == GOERLI_CHAIN_ID) {
            networkConfig = getGoerliNetworkConfig();
        } else if (block.chainid == MUMBAI_CHAIN_ID) {
            networkConfig = getMumbaiNetworkConfig();
        } else if (block.chainid == SEPOLIA_CHAIN_ID) {
            networkConfig = getSepoliaNetworkConfig();
        } else {
            revert("Invalid chain id");
        }
    }

    function getZKEVMNetworkConfig() public pure returns (NetworkConfig memory) {
        return NetworkConfig({
            erc20Address: 0x8107b2e64C34ab015Ac86aB724553feEF75dA25D,
            erc721Address: 0x942A12c996534EB29E7ea2120340e2c284845e5D,
            mailbox: 0x942A12c996534EB29E7ea2120340e2c284845e5D,
            gasPaymaster: 0x942A12c996534EB29E7ea2120340e2c284845e5D,
            iqsRouter: address(0)
        });
    }

    function getGoerliNetworkConfig() public pure returns (NetworkConfig memory) {
        return NetworkConfig({
            erc20Address: 0x75Ab5AB1Eef154C0352Fc31D2428Cef80C7F8B33,
            erc721Address: 0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85,
            mailbox: 0xCC737a94FecaeC165AbCf12dED095BB13F037685,
            gasPaymaster: 0xF90cB82a76492614D07B82a7658917f3aC811Ac1,
            iqsRouter: 0x46A2B1C3E8a93C3613Ebf326235FbD3e2f65660F
        });
    }

    function getMumbaiNetworkConfig() public pure returns (NetworkConfig memory) {
        return NetworkConfig({
            erc20Address: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB,
            erc721Address: 0x836522BE88F1A5E30479d382c598e1E0fAEAA3c5,
            mailbox: 0xCC737a94FecaeC165AbCf12dED095BB13F037685,
            gasPaymaster: 0xF90cB82a76492614D07B82a7658917f3aC811Ac1,
            iqsRouter: 0xD786eC480Da58792175c9DDEdD99802Badf1037E
        });
    }

    function getSepoliaNetworkConfig() public pure returns (NetworkConfig memory) {
        return NetworkConfig({
            erc20Address: 0x779877A7B0D9E8603169DdbD7836e478b4624789,
            erc721Address: 0x836522BE88F1A5E30479d382c598e1E0fAEAA3c5,
            mailbox: 0xCC737a94FecaeC165AbCf12dED095BB13F037685,
            gasPaymaster: 0xF987d7edcb5890cB321437d8145E3D51131298b6,
            iqsRouter: 0x507C18fa4e3b0ce6beBD494488D62d1ed0fB0555
        });
    }

    function getZkMysticNFTAddress(uint256 _destinationId) public returns (address) {
        return DevOpsTools.get_most_recent_deployment("zkMysticNFT", _destinationId);
    }

    function getZkMysticSenderAddress(uint256 _destinationId) public returns (address) {
        return DevOpsTools.get_most_recent_deployment("zkMysticSender", _destinationId);
    }

    function getZkMysticReceiverAddress(uint256 _destinationId) public returns (address) {
        return DevOpsTools.get_most_recent_deployment("zkMysticReceiver", _destinationId);
    }
}
