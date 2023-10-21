import React from "react";
import { BtnL1, LowerHeading, NftDisplay } from "../components";
import Image from "next/image";
import loader from "@/assets/ethrev.gif";

const MumbaiTestnet = () => {
  return (
    <div className="grid grid-flow-col px-16 h-[45vh]">
      <LowerHeading text="Polygon Mumbai Testnet" />
      {/* <Image src={loader} height={150} width={150} alt="loader" /> */}
      <NftDisplay text={nft.text} imag={nft.imag} />
      {/* <BtnL1 text="push" /> */}
    </div>
  );
};

export default MumbaiTestnet;

const nft = {
  text: "NFT Name",
  imag: "",
};
