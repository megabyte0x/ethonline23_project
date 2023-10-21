// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {zkMysticSender} from "../src/zkMysticSender.sol";

contract SetReceiver is Script {
    HelperConfig public helperConfig = new HelperConfig();
    uint256 POLYGON_ZKEVM_CHAIN_ID = 1442;
    uint256 GOERLI_CHAIN_ID = 5;

    function setReceiver(address _receiver, address _sender) public {
        vm.startBroadcast();
        zkMysticSender(_sender).setReceiver(_receiver);
        vm.stopBroadcast();
    }

    function setReceiverUsingConfigs() public {
        address senderAddress;
        address receiverAddress;
        if (block.chainid == POLYGON_ZKEVM_CHAIN_ID) {
            senderAddress = helperConfig.getZkMysticSenderAddress(POLYGON_ZKEVM_CHAIN_ID);
            receiverAddress = helperConfig.getZkMysticReceiverAddress(GOERLI_CHAIN_ID);
        } else if (block.chainid == GOERLI_CHAIN_ID) {
            senderAddress = helperConfig.getZkMysticSenderAddress(GOERLI_CHAIN_ID);
            receiverAddress = helperConfig.getZkMysticReceiverAddress(POLYGON_ZKEVM_CHAIN_ID);
        } else {
            revert("Invalid chain id");
        }
        setReceiver(receiverAddress, senderAddress);
    }

    function run() external {
        setReceiverUsingConfigs();
    }
}

contract CheckStatusForERC20 is Script {
    HelperConfig public helperConfig = new HelperConfig();
    uint256 POLYGON_ZKEVM_CHAIN_ID = 1442;
    uint256 GOERLI_CHAIN_ID = 5;

    function checkStatusForERC20(address _sender, address _asset, bool _forceUpdateGlobalExitRoot, uint8 _assetType)
        public
    {
        vm.startBroadcast();
        zkMysticSender(_sender).checkAssetStatus(_asset, _forceUpdateGlobalExitRoot, _assetType);
        vm.stopBroadcast();
    }

    function checkStatusForERC20UsingConfigs() public {
        address senderAddress;
        address assetAddress;
        bool forceUpdateGlobalExitRoot = true;
        uint8 assetType = 1;

        if (block.chainid == POLYGON_ZKEVM_CHAIN_ID) {
            senderAddress = helperConfig.getZkMysticSenderAddress(POLYGON_ZKEVM_CHAIN_ID);
            assetAddress = helperConfig.GOERLI_ERC20_ADDRESS();
        } else if (block.chainid == GOERLI_CHAIN_ID) {
            senderAddress = helperConfig.getZkMysticSenderAddress(GOERLI_CHAIN_ID);
            assetAddress = helperConfig.ZKEVM_ERC20_ADDRESS();
        } else {
            revert("Invalid chain id");
        }
        console.log("senderAddress: %s", senderAddress);
        console.log("assetAddress: %s", assetAddress);

        checkStatusForERC20(senderAddress, assetAddress, forceUpdateGlobalExitRoot, assetType);
    }

    function run() external {
        checkStatusForERC20UsingConfigs();
    }
}

contract CheckStatusForERC721 is Script {
    HelperConfig public helperConfig = new HelperConfig();
    uint256 POLYGON_ZKEVM_CHAIN_ID = 1442;
    uint256 GOERLI_CHAIN_ID = 5;

    function checkStatus(address _sender, address _asset, bool _forceUpdateGlobalExitRoot, uint8 _assetType) public {
        vm.startBroadcast();
        zkMysticSender(_sender).checkAssetStatus(_asset, _forceUpdateGlobalExitRoot, _assetType);
        vm.stopBroadcast();
    }

    function checkStatusForERC721UsingConfigs() public {
        address senderAddress;
        address assetAddress;
        bool forceUpdateGlobalExitRoot = true;
        uint8 assetType = 2;

        if (block.chainid == POLYGON_ZKEVM_CHAIN_ID) {
            senderAddress = helperConfig.getZkMysticSenderAddress(POLYGON_ZKEVM_CHAIN_ID);
            assetAddress = helperConfig.GOERLI_ERC721_ADDRESS();
        } else if (block.chainid == GOERLI_CHAIN_ID) {
            senderAddress = helperConfig.getZkMysticSenderAddress(GOERLI_CHAIN_ID);
            assetAddress = helperConfig.ZKEVM_ERC721_ADDRESS();
        } else {
            revert("Invalid chain id");
        }

        checkStatus(senderAddress, assetAddress, forceUpdateGlobalExitRoot, assetType);
    }

    function run() external {
        checkStatusForERC721UsingConfigs();
    }
}
