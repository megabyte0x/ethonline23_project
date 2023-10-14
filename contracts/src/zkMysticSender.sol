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
import {zkMysticNFT} from "./zkMysticNFT.sol";

contract zkMysticSender is IBridgeMessageReceiver {
    error ZkMystics__InvalidBridgeMessageSender();
    error ZkMystics__InvalidZkMyticsReceiverAddress();
    error ZkMystics__ZeroAddress();

    event ZkMystics__CheckStatusRequestCreated(
        address indexed userAddress, address indexed assetAddress, uint32 indexed destinationNetwork
    );
    event ZkMystics__StatusChecked(
        address indexed userAddress, address indexed assetAddress, uint8 assetType, bool indexed result
    );

    IPolygonZkEVMBridge public immutable i_polygonZkEVMBridge;
    // uint32 public immutable i_networkID;
    address public immutable i_zkMysticsNFTAddress;
    address public s_zkMysticsReceiverAddress;

    constructor(address _polygonZkEVMBridge, address _zkMysticNFT) {
        i_polygonZkEVMBridge = IPolygonZkEVMBridge(_polygonZkEVMBridge);
        // i_networkID = i_polygonZkEVMBridge.networkID();
        i_zkMysticsNFTAddress = _zkMysticNFT;
    }

    modifier isZeroAddress(address _address) {
        if (_address != address(0)) revert ZkMystics__ZeroAddress();
        _;
    }

    function setReceiver(address _receiverAddress) external {
        s_zkMysticsReceiverAddress = _receiverAddress;
    }

    function checkStatusForERC20(address _assetAddress, uint32 _destinationNetwork, bool _forceUpdateGlobalExitRoot)
        external
        isZeroAddress(_assetAddress)
    {
        /**
         * ERC20 => 1
         * ERC721 => 2
         */
        uint8 assetType = 1;

        bytes memory messageData = abi.encode(msg.sender, _assetAddress, assetType);

        i_polygonZkEVMBridge.bridgeMessage(
            _destinationNetwork, s_zkMysticsReceiverAddress, _forceUpdateGlobalExitRoot, messageData
        );

        emit ZkMystics__CheckStatusRequestCreated(msg.sender, _assetAddress, _destinationNetwork);
    }

    function checkStatusForERC721(address _assetAddress, uint32 _destinationNetwork, bool _forceUpdateGlobalExitRoot)
        external
        isZeroAddress(_assetAddress)
    {
        /**
         * ERC20 => 1
         * ERC721 => 2
         */
        uint8 assetType = 2;

        bytes memory messageData = abi.encode(msg.sender, _assetAddress, assetType);

        i_polygonZkEVMBridge.bridgeMessage(
            _destinationNetwork, s_zkMysticsReceiverAddress, _forceUpdateGlobalExitRoot, messageData
        );

        emit ZkMystics__CheckStatusRequestCreated(msg.sender, _assetAddress, _destinationNetwork);
    }

    function onMessageReceived(address originAddress, uint32 originNetwork, bytes memory data) external payable {
        if (msg.sender == address(i_polygonZkEVMBridge)) revert ZkMystics__InvalidBridgeMessageSender();
        if (s_zkMysticsReceiverAddress == originAddress) revert ZkMystics__InvalidZkMyticsReceiverAddress();

        (address userAddress, bool result) = abi.decode(data, (address, bool));

        if (result) {
            zkMysticNFT(i_zkMysticsNFTAddress).mintNFT(userAddress);
        }
    }
}
