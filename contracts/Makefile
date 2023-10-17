-include .env

.PHONY: all test clean deploy fund help install snapshot format anvil 

DEFAULT_ANVIL_KEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

help:
	@echo "Usage:"
	@echo "  make deploy [ARGS=...]\n    example: make deploy ARGS=\"--network sepolia\""
	@echo ""
	@echo "  make fund [ARGS=...]\n    example: make deploy ARGS=\"--network sepolia\""

all: clean remove install update build

# Clean the repo
clean  :; forge clean

# Remove modules
remove :; rm -rf .gitmodules && rm -rf .git/modules/* && rm -rf lib && touch .gitmodules && git add . && git commit -m "modules"

install :; forge install cyfrin/foundry-devops@0.0.11 --no-commit && forge install foundry-rs/forge-std@v1.5.3 --no-commit && forge install openzeppelin/openzeppelin-contracts@v4.8.2 --no-commit && forge install openzeppelin/openzeppelin-contracts-upgradeable@v4.8.2 --no-commit

# Update Dependencies
update:; forge update

build:; forge build

test :; forge test 

coverage :; forge coverage --report debug > coverage-report.txt

snapshot :; forge snapshot

format :; forge fmt

anvil :; anvil -m 'test test test test test test test test test test test junk' --steps-tracing --block-time 1

NETWORK_ARGS := --rpc-url http://localhost:8545 --private-key $(DEFAULT_ANVIL_KEY) --broadcast

ifeq ($(findstring --network goerli,$(ARGS)),--network goerli)
	NETWORK_ARGS := --rpc-url $(GOERLI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY)
endif

ifeq ($(findstring --network mumbai,$(ARGS)),--network mumbai)
	NETWORK_ARGS := --rpc-url $(MUMBAI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(POLYGON_SCAN_API_KEY)
endif

ifeq ($(findstring --network zkevm,$(ARGS)),--network zkevm)
	NETWORK_ARGS := --rpc-url $(POLYGON_ZKEVM_TESTNET_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(POLYGON_ZKEVM_SCAN_API_KEY)
endif

ifeq ($(findstring --network sepolia,$(ARGS)),--network sepolia)
	NETWORK_ARGS := --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY)
endif

# Commands for Local

deployNFT:
	@forge script script/DeployzkMysticNFT.s.sol:DeployzkMysticNFT $(NETWORK_ARGS)

deploySender:
	@forge script script/DeployzkMysticSender.s.sol:DeployzkMysticSender $(NETWORK_ARGS)

deployReceiver:
	@forge script script/DeployzkMysticReceiver.s.sol:DeployzkMysticReceiver $(NETWORK_ARGS)
	
setReceiver:
	@forge script script/Interaction.s.sol:SetReceiver $(NETWORK_ARGS)


setUp:
	make deployNFT && make deploySender && make deployReceiver && make setReceiver 

checkStatusForERC20:
	@forge script script/Interaction.s.sol:CheckStatusForERC20  $(NETWORK_ARGS)


# Commands for Testnet

deployNFTOnzkEVM:
	@forge script script/DeployzkMysticNFT.s.sol:DeployzkMysticNFT --rpc-url $(POLYGON_ZKEVM_TESTNET_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(POLYGON_ZKEVM_SCAN_API_KEY)

deploySenderOnzkEVM:
	@forge script script/DeployzkMysticSender.s.sol:DeployzkMysticSender --rpc-url $(POLYGON_ZKEVM_TESTNET_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(POLYGON_ZKEVM_SCAN_API_KEY)

deployReceiverOnGoerli:
	@forge script script/DeployzkMysticReceiver.s.sol:DeployzkMysticReceiver --rpc-url $(GOERLI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY)

setReceiverOnzkEVM:
	@forge script script/Interaction.s.sol:SetReceiver --rpc-url $(POLYGON_ZKEVM_TESTNET_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast

setUpOnChainForZKEVM:
	make deployNFTOnzkEVM && make deploySenderOnzkEVM && make deployReceiverOnGoerli && make setReceiverOnzkEVM

checkStatusForERC20OnzkEVM:
	@forge script script/Interaction.s.sol:CheckStatusForERC20 --rpc-url $(POLYGON_ZKEVM_TESTNET_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast
checkStatusForERC721OnzkEVM:
	@forge script script/Interaction.s.sol:CheckStatusForERC721 --rpc-url $(POLYGON_ZKEVM_TESTNET_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast -vvvvv


deployNFTOnGoerli:
	@forge script script/DeployzkMysticNFT.s.sol:DeployzkMysticNFT --rpc-url $(GOERLI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY)

deploySenderOnGoerli:
	@forge script script/DeployzkMysticSender.s.sol:DeployzkMysticSender --rpc-url $(GOERLI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY)

deployReceiverOnzkEVM:
	@forge script script/DeployzkMysticReceiver.s.sol:DeployzkMysticReceiver --rpc-url $(POLYGON_ZKEVM_TESTNET_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(POLYGON_ZKEVM_SCAN_API_KEY)

setReceiverOnGoerli:
	@forge script script/Interaction.s.sol:SetReceiver --rpc-url $(GOERLI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast

setUpOnChainForGoerli:
	make deployNFTOnGoerli && make deploySenderOnGoerli && make deployReceiverOnzkEVM && make setReceiverOnGoerli

checkStatusForERC20OnGoerli:
	@forge script script/Interaction.s.sol:CheckStatusForERC20 --rpc-url $(GOERLI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast
checkStatusForERC721OnGoerli:
	@forge script script/Interaction.s.sol:CheckStatusForERC721 --rpc-url $(GOERLI_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast -vvvvv



newSetUp:
	make deployNFT ARGS="--network sepolia" && make deploySender ARGS="--network sepolia" && make deployReceiver ARGS="--network goerli" && make setReceiver ARGS="--network sepolia" && make checkStatusForERC20 ARGS="--network sepolia"