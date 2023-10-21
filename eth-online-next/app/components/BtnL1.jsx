"use client";
import { useAccountAbstraction } from "@/Context/accountAbstractionContext";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import push from "@/assets/pushlogo.webp";
import ape from "@/assets/apelogo.png";
import loader from "@/assets/ethrev.gif";
import tick from "@/assets/tick.svg";

const BtnL1 = ({ text }) => {
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
      {text == "push" && (
        <div className="self-center bg-gradient-to-r font-bold from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] place-self-start grid p-[1.5px]">
          <div className="bg-[#9D39A399] grid grid-flow-col h-full w-full px-6 py-3">
            <h3 className="place-self-center text-3xl">Go To</h3>
            <Image
              src={push}
              height={90}
              width={120}
              className="place-self-center"
            />
            <h3 className="pl-1 place-self-center text-3xl"> chat</h3>
          </div>
        </div>
      )}
      {text == "zkevm" && (
        <div
          onClick={relayTransaction}
          className="hover:cursor-pointer self-center bg-gradient-to-br font-bold from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] place-self-start grid p-[1.5px]"
        >
          <div className="bg-[#9D39A399] grid grid-flow-col h-full w-full px-3 py-3">
            {gelatoTaskId ? (
              <>
                <Image
                  src={ape}
                  height={60}
                  width={60}
                  className="place-self-center"
                />
                <h3 className="pl-1 place-self-center text-lg">
                  ApeCoin Holdings Verified
                </h3>
                <Image
                  src={tick}
                  height={90}
                  width={90}
                  className="place-self-center"
                />
              </>
            ) : isRelayerLoading ? (
              <>
                <Image
                  src={loader}
                  height={60}
                  width={60}
                  className="place-self-center"
                />
                <h3 className="place-self-center text-xl">Verifying</h3>
                <Image
                  src={ape}
                  height={60}
                  width={60}
                  className="place-self-center"
                />
                <h3 className="pl-1 place-self-center text-xl">
                  ApeCoin Holdings
                </h3>
              </>
            ) : (
              <>
                <h3 className="place-self-center text-xl">Verify</h3>
                <Image
                  src={ape}
                  height={60}
                  width={60}
                  className="place-self-center"
                />
                <h3 className="pl-1 place-self-center text-xl">
                  ApeCoin Holdings
                </h3>
              </>
            )}
          </div>
        </div>
      )}
      {gelatoTaskId && (
        <Link
          href={`https://relay.gelato.digital/tasks/status/${gelatoTaskId}`}
          className="underline mt-[-6px] place-self-center"
          target="_blank"
        >
          Transaction Link
        </Link>
      )}
    </>
  );
};

export default BtnL1;
