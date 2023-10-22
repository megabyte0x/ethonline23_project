import { NFT_MUMBAI } from "@/constant/constants";
import Link from "next/link";
import React from "react";
import * as nftContract from "@/abis/zkNysticNFT.json";
import { ethers } from "ethers";
import { useAccountAbstraction } from "@/Context/accountAbstractionContext";

const BtnL2 = ({ text, link, type }) => {
  const ethersInterface = new ethers.utils.Interface(nftContract.abi);

  const { relayTransaction, gelatoTaskId, ownerAddress } =
    useAccountAbstraction();
  const handleMumClick = async () => {
    const txn = [
      {
        to: NFT_MUMBAI,
        data: ethersInterface.encodeFunctionData("mintNFT", [ownerAddress]),
        value: "0",
      },
    ];
    relayTransaction(txn);
  };

  return (
    <>
      {link && (
        <Link
          href={link}
          target="_blank"
          className="hover:cursor-pointer hover:p-3"
        >
          <div className=" self-end place-self-center w-full text-xl bg-gradient-to-br from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] px-6 py-3 text-center h-fit">
            {text}
          </div>
        </Link>
      )}
      {!link && (
        <>
          {type == "mintMum" && (
            <>
              {text == "MINT" && (
                <div
                  onClick={handleMumClick}
                  className="self-end place-self-center w-full text-xl bg-gradient-to-br from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] px-6 py-3 text-center h-fit"
                >
                  {text}
                </div>
              )}
              {text != "MINT" && (
                <div className="self-end place-self-center w-full text-xl bg-gradient-to-br from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] px-6 py-3 text-center h-fit">
                  {text}
                </div>
              )}
            </>
          )}
          {type == "mintZk" && (
            <>
              {text == "MINT" && (
                <div
                  onClick={handleZKClick}
                  className="self-end place-self-center w-full text-xl bg-gradient-to-br from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] px-6 py-3 text-center h-fit"
                >
                  {text}
                </div>
              )}
              {text != "MINT" && (
                <div className="self-end place-self-center w-full text-xl bg-gradient-to-br from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] px-6 py-3 text-center h-fit">
                  {text}
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default BtnL2;
