"use client";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
// import { useAccountAbstraction } from "../Context/accountAbstractionContext"
import { Web3AuthModalPack } from "@safe-global/auth-kit";
import { useCallback, useEffect, useState } from "react";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";

function WalletConnect() {
  // const { loginWeb3Auth, isAuthenticated } = useAccountAbstraction()
   const [web3AuthModalPack, setWeb3AuthModalPack] = useState()

    useEffect(() => {
        ;(async () => {
            const options = {
                clientId: process.env.REACT_APP_WEB3AUTH_CLIENT_ID || 'BCb4Pq0KXBtSEjWoF0DzfNbxidIbQMnOqqA4LEUFz-2FUVpla-NIzGu-5hc0rdiH_ZU7YrmT2G5hNOXlvLqOSpw',
                web3AuthNetwork: 'testnet',
                chainConfig: {
                chainNamespace: CHAIN_NAMESPACES.EIP155,
                chainId: '0x5',
                rpcTarget: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
                },
                uiConfig: {
                theme: 'dark',
                loginMethodsOrder: ['google', 'facebook']
                }
            }

            const modalConfig = {
                [WALLET_ADAPTERS.TORUS_EVM]: {
                label: 'torus',
                showOnModal: false
                },
                [WALLET_ADAPTERS.METAMASK]: {
                label: 'metamask',
                showOnDesktop: true,
                showOnMobile: false
                }
            }

            const openloginAdapter = new OpenloginAdapter({
                    loginSettings: {
                    mfaLevel: 'mandatory'
                    },
                    adapterSettings: {
                    uxMode: 'popup',
                    whiteLabel: {
                        name: 'Safe'
                    }
                }
            })

            const web3AuthModalPack = new Web3AuthModalPack({
                txServiceUrl: 'https://safe-transaction-goerli.safe.global'
            })

            await web3AuthModalPack.init({
                options,
                adapters: [openloginAdapter],
                modalConfig
            })

            setWeb3AuthModalPack(web3AuthModalPack)
        })()
    }, [])

    const loginWeb3Auth = useCallback(async () => {
        // if (!web3AuthModalPack) return;

        try {
            const { safes, eoa } = await web3AuthModalPack.signIn()
            const provider = web3AuthModalPack.getProvider()

            // we set react state with the provided values: owner (eoa address), chain, safes owned & web3 provider
            console.log(safes, eoa)
            console.log(provider)

        } catch (error) {
        console.log('error: ', error)
        }
    }, [ web3AuthModalPack])

  return (
    <>
        <div>WalletConnect</div>
        <button className="bg-blue-500 rounded-full text-white px-6 py-3" onClick={loginWeb3Auth}>
            Connect
        </button>
        {/* { isAuthenticated ? 
          <h1>User is Authenticated</h1> :
          <h1>Not Authenticated</h1>
        } */}
    </>
  )
}

export default WalletConnect