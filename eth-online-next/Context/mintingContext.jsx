"use client";

import { createContext, useCallback, useContext, useEffect, useState } from 'react'


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
  isMintable: false
}


const mintingContext = createContext(initialState);

const useNFTMinting = () => {
    const context = useContext(mintingContext)

    if (!context) {
        throw new Error('useNFTMinting should be used within a AccountAbstraction Provider')
    }

    return context
}

const MintingProvider = ({children}) => {
    const [isMintable, setIsMintable] = useState(false)

    const state = {
        isMintable,
        setIsMintable
    }
    return (
        <mintingContext.Provider value={state}>
            {children}
        </mintingContext.Provider>
    );
}

export { useNFTMinting, MintingProvider}