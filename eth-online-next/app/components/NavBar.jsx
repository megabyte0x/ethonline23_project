import React from "react";
import { ConWallet, DropDown } from ".";

const NavBar = () => {
  return (
    <div className="absolute top-0 w-[100vw] grid grid-flow-col px-6 py-3">
      <h1 className="self-center place-self-start">Logo Here</h1>
      <DropDown />
      <ConWallet />
    </div>
  );
};

export default NavBar;
