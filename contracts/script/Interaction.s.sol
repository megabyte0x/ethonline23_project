// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {zkMysticSender} from "../src/zkMysticSender.sol";

contract SetReceiver is Script {
    HelperConfig public helperConfig = new HelperConfig();

    function setReceiver(address _receiver, address _sender) public {
        vm.startBroadcast();
        zkMysticSender(_sender).setReceiver(_receiver);
        vm.stopBroadcast();
        console2.log(
            "\u26A1\ufe0f \u26A1\ufe0f \u26A1\ufe0f \u26A1\ufe0f \u26A1\ufe0f Receiver set \u26A1\ufe0f \u26A1\ufe0f \u26A1\ufe0f \u26A1\ufe0f"
        );
    }

    function setReceiverUsingConfigs() public {
        uint256 GOERLI_CHAIN_ID = 5;
        address receiverAddress = helperConfig.getZkMysticReceiverAddress(GOERLI_CHAIN_ID);
        address senderAddress = helperConfig.getZkMysticSenderAddress(block.chainid);
        setReceiver(receiverAddress, senderAddress);
    }

    function run() external {
        setReceiverUsingConfigs();
    }
}

contract CheckStatusForERC20 is Script {
    function checkStatusForERC20(
        address _sender,
        uint32 _destinationId,
        address _asset,
        bool _forceUpdateGlobalExitRoot,
        uint256 _gasAmount
    ) public {
        vm.startBroadcast();
        zkMysticSender(_sender).checkStatusForERC20{value: _gasAmount}(
            _asset, _destinationId, _forceUpdateGlobalExitRoot
        );
        vm.stopBroadcast();
    }

    function checkStatusForERC20UsingConfigs() public {
        HelperConfig helperConfig = new HelperConfig();
        (address erc20Address,,,,) = helperConfig.networkConfig();
        uint32 destinationId = uint32(helperConfig.GOERLI_CHAIN_ID());
        address senderAddress = helperConfig.getZkMysticSenderAddress(block.chainid);
        bool forceUpdateGlobalExitRoot = true;
        uint256 gasAmount = 8e16;

        checkStatusForERC20(senderAddress, destinationId, erc20Address, forceUpdateGlobalExitRoot, gasAmount);
    }

    function run() external {
        checkStatusForERC20UsingConfigs();
    }
}

// contract CheckStatusForERC721 is Script {
//     function checkStatus(address _sender, uint32 _destinationId, address _asset, bool _forceUpdateGlobalExitRoot)
//         public
//     {
//         vm.startBroadcast();
//         zkMysticSender(_sender).checkStatusForERC721(_asset, _destinationId, _forceUpdateGlobalExitRoot);
//         vm.stopBroadcast();
//     }

//     function checkStatusForERC721UsingConfigs() public {
//         HelperConfig helperConfig = new HelperConfig();
//         (address erc721Address,,,) = helperConfig.networkConfig();
//         address senderAddress = helperConfig.getZkMysticSenderAddress(block.chainid);
//         uint32 destinationId = uint32(block.chainid);
//         bool forceUpdateGlobalExitRoot = true;

//         checkStatus(senderAddress, destinationId, erc721Address, forceUpdateGlobalExitRoot);
//     }

//     function run() external {
//         checkStatusForERC721UsingConfigs();
//     }
// }
