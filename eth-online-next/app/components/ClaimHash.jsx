"use client";
import { useAccountAbstraction } from "@/Context/accountAbstractionContext";

import React from "react";
import { BtnL2, RowClaim } from ".";

const ClaimHash = ({ hash, stat }) => {
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
      {gelatoTaskId && (
        <div className="blur-sm bg-gradient-to-r from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] self-center place-self-start grid p-[0.9px]">
          <div className="bg-[#564458] grid grid-flow-row h-full w-full px-12 py-3 gap-6">
            <h1 className="place-self-center text-4xl">0x058140cea</h1>
            <BtnL2 text="CLAIM" />
          </div>
        </div>
      )}
      {!gelatoTaskId && (
        <div className=" bg-gradient-to-br from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] self-center place-self-start grid p-[0.9px]">
          <div className="bg-[#564458] grid grid-flow-row h-full w-full px-12 py-3 gap-2">
            <RowClaim stat={stat} hash={hash} />
            <RowClaim stat={stat} hash={hash} />
            <RowClaim stat={stat} hash={hash} />
          </div>
        </div>
      )}
    </>
  );
};

export default ClaimHash;
