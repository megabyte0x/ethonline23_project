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
import {IInterchainGasPaymaster} from "@hyperlane-xyz/core/contracts/interfaces/IInterchainGasPaymaster.sol";
import {IMailbox} from "@hyperlane-xyz/core/contracts/interfaces/IMailbox.sol";

/**
 * @title zkMysticSender
 * @author Megabyte
 * @notice This contract is reponsible for sending the message to the receiver contract on the Goerli Testnet and others.
 * @notice The base chain for this contract is the Polygon zkEVM Testnet.
 */
contract zkMysticSender is IBridgeMessageReceiver {
    error ZkMystics__InvalidBridgeMessageSender();
    error ZkMystics__InvalidZkMyticsReceiverAddress();
    error ZkMystics__ZeroAddress();
    error ZkMystics__InvalidMailbox();
    error zkMysticSender__InsufficientAmountForInterchainGasPayment(uint256 _amount, uint256 _quote);

    event ZkMystics__NFTMinted(address indexed userAddress);
    event ZkMystics__StatusFailed(address indexed userAddress);
    event ZkMystics__CheckStatusRequestCreated(address indexed userAddress, address indexed assetAddress);
    event ZkMystics__StatusChecked(
        address indexed userAddress, address indexed assetAddress, uint8 assetType, bool indexed result
    );

    uint32 public constant GOERLI_DESTINATION_NETWORK_ID = 0;
    uint256 public constant GOERLI_CHAIN_ID = 5;
    uint256 public constant POLYGON_ZKEVM_TESTNET_CHAIN_ID = 1442;

    IPolygonZkEVMBridge public immutable i_polygonZkEVMBridge;
    address public immutable i_zkMysticsNFTAddress;
    address public immutable i_mailbox;
    address public immutable i_gasPaymaster;

    address public s_zkMysticsReceiverAddress;

    constructor(address _polygonZkEVMBridge, address _zkMysticNFT, address _mailbox, address _gasPaymaster) {
        i_polygonZkEVMBridge = IPolygonZkEVMBridge(_polygonZkEVMBridge);
        i_zkMysticsNFTAddress = _zkMysticNFT;
        i_mailbox = _mailbox;
        i_gasPaymaster = _gasPaymaster;
    }

    modifier isZeroAddress(address _address) {
        if (_address == address(0)) revert ZkMystics__ZeroAddress();
        _;
    }

    function setReceiver(address _receiverAddress) external {
        s_zkMysticsReceiverAddress = _receiverAddress;
    }

    function checkStatusForERC20(address _assetAddress, uint32 _destinationId, bool _forceUpdateGlobalExitRoot)
        external
        payable
        isZeroAddress(_assetAddress)
    {
        /**
         * ERC20 => 1
         * ERC721 => 2
         */
        uint8 assetType = 1;

        bytes memory messageData = abi.encode(msg.sender, _assetAddress, assetType);
        if (block.chainid == POLYGON_ZKEVM_TESTNET_CHAIN_ID && _destinationId == GOERLI_CHAIN_ID) {
            i_polygonZkEVMBridge.bridgeMessage(
                GOERLI_DESTINATION_NETWORK_ID, s_zkMysticsReceiverAddress, _forceUpdateGlobalExitRoot, messageData
            );
        } else {
            bytes32 messageId =
                IMailbox(i_mailbox).dispatch(_destinationId, addressToBytes32(s_zkMysticsReceiverAddress), messageData);
            uint256 quote = IInterchainGasPaymaster(i_gasPaymaster).quoteGasPayment(_destinationId, 1500000);
            if (msg.value < quote) revert zkMysticSender__InsufficientAmountForInterchainGasPayment(msg.value, quote);
            IInterchainGasPaymaster(i_gasPaymaster).payForGas{value: quote}(
                messageId, _destinationId, 1500000, msg.sender
            );
        }
        emit ZkMystics__CheckStatusRequestCreated(msg.sender, _assetAddress);
    }

    function checkStatusForERC721(address _assetAddress, uint32 _destinationId, bool _forceUpdateGlobalExitRoot)
        external
        payable
        isZeroAddress(_assetAddress)
    {
        /**
         * ERC20 => 1
         * ERC721 => 2
         */
        uint8 assetType = 2;

        bytes memory messageData = abi.encode(msg.sender, _assetAddress, assetType);

        if (block.chainid == POLYGON_ZKEVM_TESTNET_CHAIN_ID && _destinationId == GOERLI_CHAIN_ID) {
            i_polygonZkEVMBridge.bridgeMessage(
                GOERLI_DESTINATION_NETWORK_ID, s_zkMysticsReceiverAddress, _forceUpdateGlobalExitRoot, messageData
            );
        } else {
            bytes32 messageId =
                IMailbox(i_mailbox).dispatch(_destinationId, addressToBytes32(s_zkMysticsReceiverAddress), messageData);
            uint256 quote = IInterchainGasPaymaster(i_gasPaymaster).quoteGasPayment(_destinationId, 1500000);
            IInterchainGasPaymaster(i_gasPaymaster).payForGas{value: quote}(
                messageId, _destinationId, 1500000, msg.sender
            );
        }

        emit ZkMystics__CheckStatusRequestCreated(msg.sender, _assetAddress);
    }

    function onMessageReceived(address originAddress, uint32 originNetwork, bytes memory data) external payable {
        if (msg.sender == address(i_polygonZkEVMBridge)) revert ZkMystics__InvalidBridgeMessageSender();
        if (s_zkMysticsReceiverAddress == originAddress) revert ZkMystics__InvalidZkMyticsReceiverAddress();

        (address userAddress, bool result) = abi.decode(data, (address, bool));

        if (result) {
            emit ZkMystics__NFTMinted(userAddress);
            zkMysticNFT(i_zkMysticsNFTAddress).mintNFT(userAddress);
        } else {
            emit ZkMystics__StatusFailed(userAddress);
        }
    }

    function handle(uint32 _origin, bytes32 _sender, bytes memory data) external {
        if (msg.sender != i_mailbox) revert ZkMystics__InvalidMailbox();

        (address userAddress, bool result) = abi.decode(data, (address, bool));

        if (result) {
            emit ZkMystics__NFTMinted(userAddress);
            zkMysticNFT(i_zkMysticsNFTAddress).mintNFT(userAddress);
        } else {
            emit ZkMystics__StatusFailed(userAddress);
        }
    }

    // converts address to bytes32
    function addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }
}
