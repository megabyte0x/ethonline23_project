"use client";

import { useAccountAbstraction } from "@/Context/accountAbstractionContext";
import Image from "next/image";
import meta from "@/assets/metamask.png";
import tick from "@/assets/tick.svg";
import React, { useState } from "react";

const ConnectWallet = ({ ape, lens }) => {
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
  const [verifyAPE, SetVerifyAPE] = useState(false);
  const [verifylens, SetVerifylens] = useState(true);
  return (
    <>
      {/* wallet NOT connected */}
      {!isAuthenticated && (
        <div
          onClick={loginWeb3Auth}
          className="hover:cursor-pointer hover:bg-[#c9b6ff] place-self-center py-3 px-6 bg-[#D9CBFF] rounded-3xl inSh grid grid-flow-col h-fit"
        >
          <Image src={meta} height={90} width={90} />
          <h1 className="text-[#ffffff] text-3xl font-medium text-end self-center">
            Connect Wallet
          </h1>
        </div>
      )}
      {/* Wallet Connected */}
      {isAuthenticated && (
        <div className="py-3 px-4 bg-[#D9CBFF] rounded-3xl inSh grid h-fit">
          <div className="grid grid-flow-col">
            {" "}
            <Image
              src={meta}
              height={60}
              width={60}
              alt="metamask"
              className="place-self-end"
            />
            <h1 className="text-[#ffffff] text-xl font-medium text-start self-center">
              {ownerAddress.slice(0, 5)}...{ownerAddress.slice(38, 44)}
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* Ape verified */}
            {ape && (
              <div className="rounded-2xl bg-[#D8F3B4] px-3 py-4 outSh">
                <div className="grid grid-flow-col">
                  {" "}
                  <h1 className="self-center place-self-end font-bold">
                    Verified
                  </h1>
                  <Image src={tick} height={30} width={30} alt="" />
                </div>
                <h3 className="text-xs text-center font-bold">
                  APE Coin Holdings
                </h3>
              </div>
            )}
            {/* Ape not verified */}
            {!ape && (
              <div className="rounded-2xl bg-[#F3B4B4] px-3 py-4 outSh grid grid-flow-row">
                <h1 className="self-center text-xs place-self-center font-bold">
                  Verify
                </h1>
                <h3 className="text-xs text-center font-semibold">
                  APE Coin Holdings
                </h3>
              </div>
            )}
            {/* Lens verified */}
            {lens && (
              <div className="rounded-2xl bg-[#D8F3B4] px-3 py-4 outSh">
                <div className="grid grid-flow-col">
                  {" "}
                  <h1 className="self-center place-self-end font-bold">
                    Verified
                  </h1>
                  <Image src={tick} height={30} width={30} alt="" />
                </div>
                <h3 className="text-xs text-center font-bold">
                  Lens NFT Holdings
                </h3>
              </div>
            )}
            {/* Lens not verified */}
            {!lens && (
              <div className="rounded-2xl bg-[#F3B4B4] px-3 py-4 outSh grid grid-flow-row">
                <h1 className="self-center text-xs place-self-center font-bold">
                  Verify
                </h1>
                <h3 className="text-xs text-center font-semibold">
                  Lens NFT Holdings
                </h3>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ConnectWallet;
