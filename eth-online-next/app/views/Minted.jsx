import Image from "next/image";
import React from "react";
import dummyNFT from "@/assets/dummyNFT.jpeg";
import tick from "@/assets/tick.svg";

const Minted = () => {
  return (
    <div className="bg-[#C8E6C9] p-12 h-fit rounded-2xl grid gap-6 inSh ">
      <h1 className="text-white text-3xl font-semibold">Your Holdings</h1>
      {/* Holdings nfts*/}
      <div className="grid grid-flow-row gap-4">
        {/* NFT claim */}
        <div className="grid grid-flow-row gap-1">
          <Image
            src={dummyNFT}
            height={210}
            width={210}
            alt="nft"
            className="rounded-xl bg-[#F3B4B4] outSh place-self-center"
          />
          <div className="rounded-xl bg-[#D9CBFF] px-6 py-3 outSh  grid grid-flow-col text-white">
            <h1 className="font-semibold text-center self-center text-xl place-self-end">
              MINTED
            </h1>
            <Image
              src={tick}
              height={45}
              width={45}
              className="self-center place-self-start"
            />
          </div>
        </div>{" "}
        <div className="grid grid-flow-row gap-1">
          <Image
            src={dummyNFT}
            height={210}
            width={210}
            alt="nft"
            className="rounded-xl bg-[#F3B4B4] outSh place-self-center"
          />
          <div className="rounded-xl bg-[#D9CBFF] px-6 py-3 outSh  grid grid-flow-col text-white">
            <h1 className="font-semibold text-center self-center text-xl place-self-end">
              MINTED
            </h1>
            <Image
              src={tick}
              height={45}
              width={45}
              className="self-center place-self-start"
            />
          </div>
        </div>{" "}
        <div className="grid grid-flow-row gap-1">
          <Image
            src={dummyNFT}
            height={210}
            width={210}
            alt="nft"
            className="rounded-xl bg-[#F3B4B4] outSh place-self-center"
          />
          <div className="rounded-xl bg-[#D9CBFF] px-6 py-3 outSh  grid grid-flow-col text-white">
            <h1 className="font-semibold text-center self-center text-xl place-self-end">
              MINTED
            </h1>
            <Image
              src={tick}
              height={45}
              width={45}
              className="self-center place-self-start"
            />
          </div>
        </div>{" "}
        <div className="grid grid-flow-row gap-1">
          <Image
            src={dummyNFT}
            height={210}
            width={210}
            alt="nft"
            className="rounded-xl bg-[#F3B4B4] outSh place-self-center"
          />
          <div className="rounded-xl bg-[#D9CBFF] px-6 py-3 outSh  grid grid-flow-col text-white">
            <h1 className="font-semibold text-center self-center text-xl place-self-end">
              MINTED
            </h1>
            <Image
              src={tick}
              height={45}
              width={45}
              className="self-center place-self-start"
            />
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Minted;
