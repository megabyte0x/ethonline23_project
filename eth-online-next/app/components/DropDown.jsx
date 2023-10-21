"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import polygon from "@/assets/polygonlogo.svg";
import drop from "@/assets/dropArrow.svg";
import { useAccountAbstraction } from "@/Context/accountAbstractionContext";

const DropDown = () => {
  const { chainId, setChainId } = useAccountAbstraction();
  console.log(chainId);
  return (
    <div className="dropdown w-fit self-center place-self-end">
      <div className="grid grid-flow-col gap-1 rounded-sm lgLink">
        {!chainId && <h6>Choose Chain...</h6>}
        {chainId == "0x13881" && <h6>Mumbai Testnet</h6>}
        {chainId == "0x5a2" && <h6>ZK EVM Testnet</h6>}
        <Image
          src={drop}
          height={15}
          width={15}
          className="place-self-center"
        />
      </div>
      <div className="dropdown-content hidden absolute mt-0 grid-flow-row z-10 text-center inherit bg-[#eeeeee] text-[#212121] rounded-md gap-2 p-1 font-light">
        <h2
          onClick={() => setChainId("0x5a2")}
          className="hover:bg-[#dddddd] w-[100%] px-6 rounded-t-md flex"
        >
          <Image src={polygon} alt="polygon" height={45} width={45} />
          ZK EVM Testnet
        </h2>
        <h2
          onClick={() => setChainId("0x13881")}
          className="hover:bg-[#dddddd] w-[100%] px-6 rounded-t-md flex"
        >
          <Image src={polygon} alt="polygon" height={45} width={45} />
          Mumbai Testnet
        </h2>
      </div>
    </div>
  );
};

export default DropDown;
