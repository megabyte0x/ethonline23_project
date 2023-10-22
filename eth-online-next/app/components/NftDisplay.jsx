import React from "react";
import { BtnL2 } from ".";
import Image from "next/image";
import { useNFTMinting } from "@/Context/mintingContext";

const NftDisplay = ({ text, imag, link }) => {
  const { isMintable, setIsMintable } = useNFTMinting();
  return (
    <>
      {text != "mint" && (
        <div className="bg-[#564458] grid grid-flow-row p-2 w-fit gap-2">
          <Image
            src={imag}
            height={210}
            width={210}
            className="place-self-center shadow-2xl"
          />
          <BtnL2 text={text} link={link} className="place-self-center" />
        </div>
      )}
      {text == "mint" && (
        <div className="bg-[#564458] grid grid-flow-row p-2 w-fit gap-2">
          <Image
            src={imag}
            height={210}
            width={210}
            className="place-self-center shadow-2xl"
          />
          {isMintable && (
            <BtnL2
              text={text}
              link={link}
              className="hover:cursor-pointer place-self-center"
            />
          )}
          {!isMintable && (
            <div className="hover:cursor-not-allowed place-self-center blur-sm">
              <BtnL2 text={text} link={link} className="place-self-center" />{" "}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NftDisplay;
