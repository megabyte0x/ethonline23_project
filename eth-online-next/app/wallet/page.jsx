"use client";

import { useAccountAbstraction } from "@/Context/accountAbstractionContext";

const Wallet = () => {
  const { loginWeb3Auth, isAuthenticated, balance, chainId, relayTransaction, isRelayerLoading, gelatoTaskId, ownerAddress } = useAccountAbstraction()

  // setChainId('0x5')
  console.log(">>>>..............", balance, chainId, ownerAddress)



  return (
    <>
        <div>WalletConnect</div>
        <button className="bg-blue-500 rounded-full text-white px-6 py-3" onClick={loginWeb3Auth}>
            Connect
        </button>
        { isAuthenticated ? 
          <h1>User is Authenticated</h1> :
          <h1>Not Authenticated</h1>
        }

        <button className="bg-blue-500 rounded-full text-white px-6 py-3" onClick={relayTransaction}>
            Transact
        </button>
        {gelatoTaskId? <h1>Id for txn: {gelatoTaskId}</h1> : isRelayerLoading? <h1>relay txnx is loading</h1> : <h1>Initiate the transaction</h1>}
         
    </>
  )
}

export default Wallet