import React from "react";
import { BtnL1, LowerHeading, NftDisplay } from "../components";

const MumbaiTestnet = () => {
  return (
    <div className="grid grid-flow-col px-16 h-[45vh]">
      <LowerHeading text="Polygon Mumbai Testnet" />
      <NftDisplay text={nft.text} imag={nft.imag} />
      <BtnL1 text="push" />
    </div>
  );
};

export default MumbaiTestnet;

const nft = {
  text: "NFT Name",
  imag: "",
};
