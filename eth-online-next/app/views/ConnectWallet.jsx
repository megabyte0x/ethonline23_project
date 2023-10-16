import Image from "next/image";
import meta from "@/assets/metamask.png";
import React from "react";

const ConnectWallet = () => {
  return (
    <div className="py-3 px-6 bg-[#D9CBFF] rounded-3xl inSh grid grid-flow-col h-fit">
      <Image src={meta} height={90} width={90} />
      <h1 className="text-[#ffffff] text-3xl font-medium text-end self-center">
        Connect Wallet
      </h1>
    </div>
  );
};

export default ConnectWallet;
