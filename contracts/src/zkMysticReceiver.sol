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
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

contract zkMysticReceiver is IBridgeMessageReceiver, CCIPReceiver {
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

    constructor(address _polygonZkEVMBridge, address _zkMysticsSenderAddress, address _router) CCIPReceiver(_router) {
        i_polygonZkEVMBridge = IPolygonZkEVMBridge(_polygonZkEVMBridge);
        i_zkMysticsSenderAddress = _zkMysticsSenderAddress;
    }

    function onMessageReceived(address originAddress, uint32 originNetwork, bytes memory data) external payable {
        if (msg.sender != address(i_polygonZkEVMBridge)) revert ZkMystics__InvalidBridgeMessageSender();
        if (i_zkMysticsSenderAddress != originAddress) revert ZkMystics__InvalidBridgeMessageSender();

        (address userAddress, address assetAddress, uint8 assetType) = abi.decode(data, (address, address, uint8));

        _checkHoldings(userAddress, assetAddress, assetType);
    }

    function _ccipReceive(Client.Any2EVMMessage memory message) internal override {
        (address userAddress, address assetAddress, uint8 assetType) =
            abi.decode(message.data, (address, address, uint8));
        _checkHoldings(userAddress, assetAddress, assetType);
    }

    function _checkHoldings(address _userAddress, address _assetAddress, uint8 _assetType) internal {
        bool result;
        uint256 balance;

        if (_assetType == 1) {
            balance = IERC20(_assetAddress).balanceOf(_userAddress);
        } else if (_assetType == 2) {
            balance = IERC721(_assetAddress).balanceOf(_userAddress);
        }
        if (balance > 0) {
            result = true;
        } else {
            result = false;
        }

        emit ZkMystics__StatusChecked(_userAddress, _assetAddress, _assetType, result);
    }

    receive() external payable {}
}
