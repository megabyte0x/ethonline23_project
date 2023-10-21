import Image from "next/image";
import React from "react";
import dummyNFT from "@/assets/dummyNFT.jpeg";

const YourNFTs = () => {
  return (
    <div className="bg-[#C8E6C9] p-12 h-fit rounded-2xl grid gap-6 inSh">
      <h1 className="text-white text-3xl font-semibold">Your Holdings</h1>
      {/* Holdings nfts*/}
      <div className="grid grid-cols-3 gap-4">
        {/* NFT claim */}
        <div className="grid grid-flow-row gap-1">
          <Image
            src={dummyNFT}
            height={210}
            width={210}
            alt="nft"
            className="rounded-xl bg-[#F3B4B4] outSh place-self-center"
          />
          <h4 className="rounded-xl bg-[#D9CBFF] p-6 outSh text-center font-extrabold text-xls text-white">
            MINT
          </h4>
        </div>{" "}
        <div className="grid grid-flow-row gap-1">
          <Image
            src={dummyNFT}
            height={210}
            width={210}
            alt="nft"
            className="rounded-xl bg-[#F3B4B4] outSh place-self-center"
          />
          <h4 className="rounded-xl bg-[#D9CBFF] p-6 outSh text-center font-extrabold text-xls text-white">
            MINT
          </h4>
        </div>{" "}
        <div className="grid grid-flow-row gap-1">
          <Image
            src={dummyNFT}
            height={210}
            width={210}
            alt="nft"
            className="rounded-xl bg-[#F3B4B4] outSh place-self-center"
          />
          <h4 className="rounded-xl bg-[#D9CBFF] p-6 outSh text-center font-extrabold text-xls text-white">
            MINT
          </h4>
        </div>{" "}
        <div className="grid grid-flow-row gap-1">
          <Image
            src={dummyNFT}
            height={210}
            width={210}
            alt="nft"
            className="rounded-xl bg-[#F3B4B4] outSh place-self-center"
          />
          <h4 className="rounded-xl bg-[#D9CBFF] p-6 outSh text-center font-extrabold text-xls text-white">
            MINT
          </h4>
        </div>{" "}
        <div className="grid grid-flow-row gap-1">
          <Image
            src={dummyNFT}
            height={210}
            width={210}
            alt="nft"
            className="rounded-xl bg-[#F3B4B4] outSh place-self-center"
          />
          <h4 className="rounded-xl bg-[#D9CBFF] p-6 outSh text-center font-extrabold text-xls text-white">
            MINT
          </h4>
        </div>{" "}
        <div className="grid grid-flow-row gap-1">
          <Image
            src={dummyNFT}
            height={210}
            width={210}
            alt="nft"
            className="rounded-xl bg-[#F3B4B4] outSh place-self-center"
          />
          <h4 className="rounded-xl bg-[#D9CBFF] p-6 outSh text-center font-extrabold text-xls text-white">
            MINT
          </h4>
        </div>{" "}
      </div>
    </div>
  );
};

export default YourNFTs;
