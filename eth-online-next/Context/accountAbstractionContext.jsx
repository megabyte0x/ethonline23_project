"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ethers, utils } from "ethers";
import { initialChain } from "../chains/chains";
import getChain from "@/utils/getChains";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthModalPack } from "@safe-global/auth-kit";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import { GelatoRelayPack } from "@safe-global/relay-kit";
import usePolling from "@/hooks/usePolling";
import * as posNftContract from "@/abis/pos_zkNysticNFT.json";
import * as zkEvmNftContract from "@/abis/zkEvm_zkMysticNFT.json";
import AccountAbstraction from "@safe-global/account-abstraction-kit-poc";

// type accountAbstractionContextValue = {
//   ownerAddress?: string
//   chainId: string
//   chain?: Chain
//   isAuthenticated: boolean
//   web3Provider?: ethers.providers.Web3Provider
//   loginWeb3Auth: () => void
//   logoutWeb3Auth: () => void
//   setChainId: (chainId: string) => void
//   isRelayerLoading: boolean
//   relayTransaction: () => Promise<void>
//   gelatoTaskId?: string
// }

const initialState = {
  isAuthenticated: false,
  loginWeb3Auth: () => {},
  logoutWeb3Auth: () => {},
  relayTransaction: async () => {},
  setChainId: () => {},
  chainId: initialChain.id,
  isRelayerLoading: true,
};

const accountAbstractionContext = createContext(initialState);

const useAccountAbstraction = () => {
  const context = useContext(accountAbstractionContext);

  if (!context) {
    throw new Error(
      "useAccountAbstraction should be used within a AccountAbstraction Provider"
    );
  }

  return context;
};

const AccountAbstractionProvider = ({ children }) => {
  const [ownerAddress, setOwnerAddress] = useState("");

  const [chainId, setChainId] = useState(initialChain.id);

  const [web3Provider, setWeb3Provider] = useState();
  const [signer, setSigner] = useState();

  const isAuthenticated = !!ownerAddress && !!chainId;
  const chain = getChain(chainId) || initialChain;

  useEffect(() => {
    setOwnerAddress("");
    setChainId(chain.id);
    setWeb3Provider(undefined);
    setSigner(undefined);
  }, [chain]);

  const [web3AuthModalPack, setWeb3AuthModalPack] = useState();

  useEffect(() => {
    (async () => {
      const options = {
        clientId:
          process.env.REACT_APP_WEB3AUTH_CLIENT_ID ||
          "BCb4Pq0KXBtSEjWoF0DzfNbxidIbQMnOqqA4LEUFz-2FUVpla-NIzGu-5hc0rdiH_ZU7YrmT2G5hNOXlvLqOSpw",
        web3AuthNetwork: "testnet",
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: chain.id,
          rpcTarget: chain.rpcUrl,
        },
        uiConfig: {
          theme: "dark",
          loginMethodsOrder: ["google", "facebook"],
        },
      };

      const modalConfig = {
        [WALLET_ADAPTERS.TORUS_EVM]: {
          label: "torus",
          showOnModal: false,
        },
        [WALLET_ADAPTERS.METAMASK]: {
          label: "metamask",
          showOnDesktop: true,
          showOnMobile: false,
        },
      };

      const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
          mfaLevel: "mandatory",
        },
        adapterSettings: {
          uxMode: "popup",
          whiteLabel: {
            name: "Safe",
          },
        },
      });

      const web3AuthModalPack = new Web3AuthModalPack({
        txServiceUrl: chain.transactionServiceUrl,
      });

      await web3AuthModalPack.init({
        options,
        adapters: [openloginAdapter],
        modalConfig,
      });

      setWeb3AuthModalPack(web3AuthModalPack);
    })();
  }, [chain]);

  // auth-kit implementation
  const loginWeb3Auth = useCallback(async () => {
    // if (!web3AuthModalPack) return;

    try {
      const { safes, eoa } = await web3AuthModalPack.signIn();
      const provider = web3AuthModalPack.getProvider();

      // we set react state with the provided values: owner (eoa address), chain, safes owned & web3 provider
      console.log(">>>>>>>>>>>>....safes", safes);
      setChainId(chain.id);
      setOwnerAddress(eoa);
      setWeb3Provider(new ethers.providers.Web3Provider(provider));
      setSigner(await provider.getSigner());
    } catch (error) {
      console.log("error: ", error);
    }
  }, [chain, web3AuthModalPack]);

  useEffect(() => {
    if (web3AuthModalPack && web3AuthModalPack.getProvider()) {
      (async () => {
        await loginWeb3Auth();
      })();
    }
  }, [web3AuthModalPack, loginWeb3Auth]);

  const logoutWeb3Auth = () => {
    web3AuthModalPack?.signOut();
    setOwnerAddress("");
    setChainId(chain.id);
    setWeb3Provider(undefined);
    setGelatoTaskId(undefined);
    setSigner(undefined);
  };

  const fetchBalance = useCallback(async () => {
    const balance = await web3Provider?.getBalance(ownerAddress);

    return balance?.toString();
  }, [web3Provider, ownerAddress]);

  const balance = usePolling(fetchBalance);

  // Relayering logic
  const [isRelayerLoading, setIsRelayerLoading] = useState(false);
  const [gelatoTaskId, setGelatoTaskId] = useState();

  // refresh the Gelato task id
  useEffect(() => {
    setIsRelayerLoading(false);
    setGelatoTaskId(undefined);
  }, [chainId]);
  // relay-kit implementation using Gelato
  const relayTransaction = async (transactions) => {
    if (web3Provider) {
      setIsRelayerLoading(true);
      console.log(chainId);

      const signer = await web3Provider.getSigner();
      // "DgdrbSLi2cbRQl183fc9vGOaU2nWjTZ5eObObc2u9PM_"
      // "ddcXzsrjsxUva1AkAwPu2jSxnPZ1bVUzYt2AT87p9xE_"
      const relayPack = new GelatoRelayPack(
        "DgdrbSLi2cbRQl183fc9vGOaU2nWjTZ5eObObc2u9PM_"
      );

      const safeAccountAbstraction = new AccountAbstraction(signer);

      await safeAccountAbstraction.init({ relayPack });
      const safeAddress = await safeAccountAbstraction.getSafeAddress();
      console.log("safeAdd:", safeAddress);

      // const destinationAddress = '0x6C5B323C02E01218689D59f250BBdA6283edd3f7'
      // const withdrawAmount = ethers.utils.parseEther('0.00005').toString()
      // console.log("withdraw:",withdrawAmount, signer)

      // const contractAddress = "0x07ab44c33cE8953a1dEA9398cc902E43fd111cd5";
      // const etherInterface = new ethers.utils.Interface(posNftContract.abi);
      const contractAddress = "0xB04081c91f5eF0d4c7dA1E3f0D8E933B15aC6261";
      const etherInterface = new ethers.utils.Interface(zkEvmNftContract.abi);

      // Create a transactions array with one transaction object
      // const transactions = [
      //   {
      //     to: contractAddress,
      //     data: etherInterface.encodeFunctionData("mintNFT", [ownerAddress]),
      //     // data:"0x",
      //     value: "0",
      //   },
      // ];
      const options = {
        isSponsored: false,
        //      gasLimit: '600000', // in this alfa version we need to manually set the gas limit
        // gasToken: ethers.constants.AddressZero // native token
      };

      const gelatoTaskId = await safeAccountAbstraction.relayTransaction(
        transactions,
        options
      );

      // const ethAdapter = new EthersAdapter({
      //     ethers,
      //     signerOrProvider: signer || web3Provider
      // })

      // const safeSDK = await Safe.create({
      //     ethAdapter,
      //     ownerAddress
      // })

      // const safeTransaction = await relayPack.createRelayedTransaction({
      //     safe: safeSDK,
      //     transactions,
      //     options
      // })
      // console.log("owner",await safeSDK.getOwners())
      // console.log("check")
      // const signedSafeTransaction = await safeSDK.signTransaction(safeTransaction)
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>",signedSafeTransaction)

      // const response = await relayPack.executeRelayTransaction(signedSafeTransaction, safeSDK, options)

      console.log(
        `Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${gelatoTaskId}`
      );

      setIsRelayerLoading(false);
      setGelatoTaskId(gelatoTaskId);
    }
  };

  const state = {
    ownerAddress,
    chainId,
    chain,
    balance,
    isAuthenticated,
    web3Provider,
    signer,
    loginWeb3Auth,
    logoutWeb3Auth,
    setChainId,
    isRelayerLoading,
    relayTransaction,
    gelatoTaskId,
  };
  return (
    <accountAbstractionContext.Provider value={state}>
      {children}
    </accountAbstractionContext.Provider>
  );
};

export { useAccountAbstraction, AccountAbstractionProvider };
