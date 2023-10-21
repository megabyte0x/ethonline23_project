import React from "react";
import { BtnL1, ClaimHash, LowerHeading, NftDisplay } from "../components";

const ZkTestnet = () => {
  return (
    <div className="grid px-16 grid-flow-col gap-6">
      <div className="self-center place-self-start grid grid-flow-row gap-6 w-fit">
        <LowerHeading text="ZK EVM Testnet" />
        <BtnL1 text="zkevm" />
      </div>
      <ClaimHash hash={claimH.hash} stat={claimH.stat} />
      <div className="blur-sm">
        <NftDisplay text="mint" imag={nft.imag} />
      </div>
    </div>
  );
};

export default ZkTestnet;

const claimH = {
  hash: "0xw2e13b1924riqcy34it4",
  stat: false,
};

const nft = {
  text: "NFT Name",
  imag: "",
};
