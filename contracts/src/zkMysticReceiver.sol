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
import {IInterchainGasPaymaster} from "@hyperlane-xyz/core/contracts/interfaces/IInterchainGasPaymaster.sol";
import {IMailbox} from "@hyperlane-xyz/core/contracts/interfaces/IMailbox.sol";

contract zkMysticReceiver is IBridgeMessageReceiver {
    error ZkMystics__InvalidBridgeMessageSender();
    error ZkMystics__InvalidZkMyticsAddress();
    error ZkMystics__InvalidMailbox();
    error ZkMystics__ZeroAddress();
    error zkMysticReceiver__InsufficientAmountForInterchainGasPayment(uint256 _amount, uint256 _quote);

    event ZkMystics__CheckStatusRequestCreated(
        address indexed userAddress, address indexed assetAddress, uint32 indexed destinationNetwork
    );
    event ZkMystics__StatusChecked(
        address indexed userAddress, address indexed assetAddress, uint8 assetType, bool indexed result
    );
    event ZkMystics__RequestReceived(address indexed userAddress, address indexed assetAddress, uint32 indexed origin);

    IPolygonZkEVMBridge public immutable i_polygonZkEVMBridge;
    address public immutable i_zkMysticsSenderAddress;
    address public immutable i_mailbox;
    address public immutable i_gasPaymaster;

    uint32 public constant ZKEVM_DESTINATION_NETWORK_ID = 1;
    uint32 public constant ZKEVM_DESTINATION_NETWORK_ID_FOR_HYPERLANE = 1442;

    mapping(address => bool) public userAddressToMintNFT;

    constructor(address _polygonZkEVMBridge, address _zkMysticsSenderAddress, address _mailbox, address _gasPaymaster) {
        i_polygonZkEVMBridge = IPolygonZkEVMBridge(_polygonZkEVMBridge);
        i_zkMysticsSenderAddress = _zkMysticsSenderAddress;
        i_mailbox = _mailbox;
        i_gasPaymaster = _gasPaymaster;
    }

    function onMessageReceived(address originAddress, uint32 originNetwork, bytes memory data) external payable {
        if (msg.sender == address(i_polygonZkEVMBridge)) revert ZkMystics__InvalidBridgeMessageSender();
        if (i_zkMysticsSenderAddress == originAddress) revert ZkMystics__InvalidBridgeMessageSender();

        (address userAddress, address assetAddress, uint8 assetType) = abi.decode(data, (address, address, uint8));

        bool result;
        uint256 balance;
        bool _forceUpdateGlobalExitRoot = true;
        bytes memory messageData;

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

        messageData = abi.encode(userAddress, result);

        i_polygonZkEVMBridge.bridgeMessage(
            ZKEVM_DESTINATION_NETWORK_ID, i_zkMysticsSenderAddress, _forceUpdateGlobalExitRoot, messageData
        );
    }

    function handle(uint32 _origin, bytes32 _sender, bytes memory data) external payable {
        if (msg.sender != i_mailbox) revert ZkMystics__InvalidMailbox();

        (address userAddress, address assetAddress, uint8 assetType) = abi.decode(data, (address, address, uint8));

        emit ZkMystics__RequestReceived(userAddress, assetAddress, _origin);
        sendResposeToSender(userAddress, assetAddress, assetType, _origin);
    }

    function sendResposeToSender(address _userAddress, address _assetAddress, uint8 _assetType, uint32 _destinationId)
        internal
    {
        bytes memory messageData;

        bool result = holdAsset(_assetAddress, _userAddress, _assetType);

        emit ZkMystics__StatusChecked(_userAddress, _assetAddress, _assetType, result);

        messageData = abi.encode(_userAddress, result);

        bytes32 messageId =
            IMailbox(i_mailbox).dispatch(_destinationId, addressToBytes32(i_zkMysticsSenderAddress), messageData);
        uint256 quote = IInterchainGasPaymaster(i_gasPaymaster).quoteGasPayment(_destinationId, 1500000);
        if (msg.value < quote) revert zkMysticReceiver__InsufficientAmountForInterchainGasPayment(msg.value, quote);
        IInterchainGasPaymaster(i_gasPaymaster).payForGas{value: quote}(
            messageId, _destinationId, 1500000, _userAddress
        );
    }

    // converts address to bytes32
    function addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }

    function holdAsset(address _asset, address _user, uint8 _assetType) public returns (bool) {
        uint256 balance;
        if (_assetType == 1) {
            balance = IERC20(_asset).balanceOf(_user);
        } else if (_assetType == 2) {
            balance = IERC721(_asset).balanceOf(_user);
        }

        if (balance > 0) {
            userAddressToMintNFT[_user] = true;
            emit ZkMystics__StatusChecked(_user, _asset, _assetType, true);

            return true;
        } else {
            emit ZkMystics__StatusChecked(_user, _asset, _assetType, false);

            return false;
        }
    }

    receive() external payable {}

    fallback() external payable {}
}
