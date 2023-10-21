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
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

contract zkMysticSender {
    error ZkMystics__InvalidBridgeMessageSender();
    error ZkMystics__InvalidZkMyticsReceiverAddress();
    error ZkMystics__ZeroAddress();

    event ZkMystics__NFTMinted(address indexed userAddress);
    event ZkMystics__StatusFailed(address indexed userAddress);
    event ZkMystics__CheckStatusRequestCreated(address indexed userAddress, address indexed assetAddress);
    event ZkMystics__CheckStatusRequestCreatedUsingChainlink(
        address indexed userAddress, address indexed assetAddress, bytes32 indexed messageId
    );
    event ZkMystics__StatusChecked(
        address indexed userAddress, address indexed assetAddress, uint8 assetType, bool indexed result
    );

    IPolygonZkEVMBridge public immutable i_polygonZkEVMBridge;
    uint32 public immutable i_destinationId;
    address public immutable i_router;

    address public s_zkMysticsReceiverAddress;
    uint64 public s_destinationChainSelector;

    constructor(address _polygonZkEVMBridge, uint32 _destinationId, address _router) {
        i_polygonZkEVMBridge = IPolygonZkEVMBridge(_polygonZkEVMBridge);
        i_destinationId = _destinationId;
        i_router = _router;
    }

    modifier isZeroAddress(address _address) {
        if (_address == address(0)) revert ZkMystics__ZeroAddress();
        _;
    }

    function setReceiver(address _receiverAddress) external {
        s_zkMysticsReceiverAddress = _receiverAddress;
    }

    function setDestinationChainSelector(uint64 _destinationChainSelector) external {
        s_destinationChainSelector = _destinationChainSelector;
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

    function checkAssetStatusUsingChainlink(address _assetAddress, uint8 _assetType)
        external
        isZeroAddress(_assetAddress)
    {
        bytes memory messageData = abi.encode(msg.sender, _assetAddress, _assetType);
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(s_zkMysticsReceiverAddress),
            data: messageData,
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: address(0)
        });

        uint256 fee = IRouterClient(i_router).getFee(s_destinationChainSelector, message);

        bytes32 messageId = IRouterClient(i_router).ccipSend{value: fee}(s_destinationChainSelector, message);

        emit ZkMystics__CheckStatusRequestCreatedUsingChainlink(msg.sender, _assetAddress, messageId);
    }

    receive() external payable {}
}
