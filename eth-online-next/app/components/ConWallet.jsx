"use client";

import { useAccountAbstraction } from "@/Context/accountAbstractionContext";
import React from "react";

const ConWallet = () => {
  const {
    loginWeb3Auth,
    isAuthenticated,
    balance,
    chainId,
    relayTransaction,
    isRelayerLoading,
    gelatoTaskId,
    ownerAddress,
  } = useAccountAbstraction();
  return (
    <>
      {!isAuthenticated && (
        <div className="bg-gradient-to-r from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] place-self-end grid p-[1.5px]">
          <div className="bg-[#9D39A399] grid h-full w-full px-6 py-3">
            <h1 className="place-self-center">Connect Wallet</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default ConWallet;
