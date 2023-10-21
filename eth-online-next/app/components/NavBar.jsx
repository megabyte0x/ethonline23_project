import React from "react";
import { ConWallet, DropDown } from ".";
import chains from "@/chains/chains";

const NavBar = () => {
  return (
    <div className="absolute top-0 w-[100vw] grid grid-flow-col px-6 py-3 gap-3">
      <h1 className="self-center place-self-start font-black text-3xl">
        ZK Mystics
      </h1>
      <DropDown chainId={chain} />
      <ConWallet />
    </div>
  );
};

export default NavBar;
const chain = "0x5a2";
