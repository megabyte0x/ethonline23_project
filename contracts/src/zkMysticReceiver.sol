// SPDX-License-Identifier: MIT

// Layout of Contract:
// version
// imports
// interfaces, libraries, contracts`
// errors
// Events
// Type declarations
// State variables
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// internal & private view & pure functions
// external & public view & pure functions

pragma solidity 0.8.17;

import {IBasePolygonZkEVMGlobalExitRoot} from "./polygonZKEVMContracts/interfaces/IBasePolygonZkEVMGlobalExitRoot.sol";
import {IBridgeMessageReceiver} from "./polygonZKEVMContracts/interfaces/IBridgeMessageReceiver.sol";
import {IPolygonZkEVMBridge} from "./polygonZKEVMContracts/interfaces/IPolygonZkEVMBridge.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract zkMysticReceiver is IBridgeMessageReceiver {
    error ZkMystics__InvalidBridgeMessageSender();
    error ZkMystics__InvalidZkMyticsAddress();
    error ZkMystics__ZeroAddress();

    event ZkMystics__CheckStatusRequestCreated(
        address indexed userAddress, address indexed assetAddress, uint32 indexed destinationNetwork
    );
    event ZkMystics__StatusChecked(
        address indexed userAddress, address indexed assetAddress, uint8 assetType, bool indexed result
    );

    IPolygonZkEVMBridge public immutable i_polygonZkEVMBridge;
    address public immutable i_zkMysticsSenderAddress;

    constructor(address _polygonZkEVMBridge, address _zkMysticsSenderAddress) {
        i_polygonZkEVMBridge = IPolygonZkEVMBridge(_polygonZkEVMBridge);
        i_zkMysticsSenderAddress = _zkMysticsSenderAddress;
    }

    function onMessageReceived(address originAddress, uint32 originNetwork, bytes memory data) external payable {
        if (msg.sender != address(i_polygonZkEVMBridge)) revert ZkMystics__InvalidBridgeMessageSender();
        if (i_zkMysticsSenderAddress != originAddress) revert ZkMystics__InvalidBridgeMessageSender();

        (address userAddress, address assetAddress, uint8 assetType) = abi.decode(data, (address, address, uint8));

        bool result;
        uint256 balance;

        if (assetType == 1) {
            balance = IERC20(assetAddress).balanceOf(userAddress);
        } else if (assetType == 2) {
            balance = IERC721(assetAddress).balanceOf(userAddress);
        }
        if (balance > 0) {
            result = true;
        } else {
            result = false;
        }

        emit ZkMystics__StatusChecked(userAddress, assetAddress, assetType, result);
    }
}
