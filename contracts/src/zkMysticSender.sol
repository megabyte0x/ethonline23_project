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
import {IPolygonZkEVMBridge} from "./polygonZKEVMContracts/interfaces/IPolygonZkEVMBridge.sol";

contract zkMysticSender {
    error ZkMystics__InvalidBridgeMessageSender();
    error ZkMystics__InvalidZkMyticsReceiverAddress();
    error ZkMystics__ZeroAddress();

    event ZkMystics__NFTMinted(address indexed userAddress);
    event ZkMystics__StatusFailed(address indexed userAddress);
    event ZkMystics__CheckStatusRequestCreated(address indexed userAddress, address indexed assetAddress);
    event ZkMystics__StatusChecked(
        address indexed userAddress, address indexed assetAddress, uint8 assetType, bool indexed result
    );

    IPolygonZkEVMBridge public immutable i_polygonZkEVMBridge;
    uint32 public immutable i_destinationId;

    address public s_zkMysticsReceiverAddress;

    constructor(address _polygonZkEVMBridge, uint32 _destinationId) {
        i_polygonZkEVMBridge = IPolygonZkEVMBridge(_polygonZkEVMBridge);
        i_destinationId = _destinationId;
    }

    modifier isZeroAddress(address _address) {
        if (_address == address(0)) revert ZkMystics__ZeroAddress();
        _;
    }

    function setReceiver(address _receiverAddress) external {
        s_zkMysticsReceiverAddress = _receiverAddress;
    }

    function checkAssetStatus(address _assetAddress, bool _forceUpdateGlobalExitRoot, uint8 _assetType)
        external
        isZeroAddress(_assetAddress)
    {
        /**
         * ERC20 => 1
         * ERC721 => 2
         */
        uint8 assetType = _assetType;

        bytes memory messageData = abi.encode(msg.sender, _assetAddress, assetType);

        i_polygonZkEVMBridge.bridgeMessage(
            i_destinationId, s_zkMysticsReceiverAddress, _forceUpdateGlobalExitRoot, messageData
        );

        emit ZkMystics__CheckStatusRequestCreated(msg.sender, _assetAddress);
    }
}
