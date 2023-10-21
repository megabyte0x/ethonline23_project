"use client";

import { useAccountAbstraction } from "@/Context/accountAbstractionContext";
import React, { useState } from "react";
import loader from "@/assets/ethrev.gif";
import Image from "next/image";

const ConWallet = () => {
  const [isLoading, SetIsLoading] = useState(false);
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
  console.log(ownerAddress);
  return (
    <>
      {!isAuthenticated && !chainId && (
        <div className="blur-sm hover:cursor-not-allowed  bg-gradient-to-br from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] self-center place-self-start grid p-[1.5px]">
          <div className="hover:cursor-not-allowed bg-[#9D39A399] grid h-full w-full px-6 py-3">
            <h1 className="place-self-center">Connect Wallet</h1>
          </div>
        </div>
      )}
      {!isAuthenticated && chainId && !isLoading && (
        <div
          onClick={() => {
            loginWeb3Auth();
            SetIsLoading(true);
          }}
          className="hover:cursor-pointer  bg-gradient-to-r from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] self-center place-self-start grid p-[1.5px]"
        >
          <div className="hover:cursor-pointer hover:bg-[#9e39a30d] bg-[#9D39A399] grid h-full w-full px-6 py-3">
            <h1 className="place-self-center">Connect Wallet</h1>
          </div>
        </div>
      )}
      {isLoading && !isAuthenticated && (
        <div className="bg-gradient-to-r from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] self-center place-self-start grid p-[1.5px]">
          <div className="bg-[#9D39A399] flex h-full w-full px-4 py-1">
            <Image src={loader} height={36} width={36} alt="eth-loader" />
            <h1 className="place-self-center">Verifying Address...</h1>
          </div>
        </div>
      )}
      {isAuthenticated && (
        <div className="bg-gradient-to-r from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] self-center place-self-start grid p-[1.5px]">
          <div className="bg-[#9D39A399] grid h-full w-full px-6 py-3">
            <h1 className="place-self-center">
              {ownerAddress.slice(0, 5)}...{ownerAddress.slice(38, 44)}
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default ConWallet;
