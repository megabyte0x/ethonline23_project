import React from "react";
import { BtnL2 } from ".";
import Image from "next/image";
import loader from "@/assets/ethrev.gif";
import { useNFTMinting } from "@/Context/mintingContext";
import { useAccountAbstraction } from "@/Context/accountAbstractionContext";
import imag2 from "@/assets/nftD.jpeg";

const NftDisplay = ({ text, imag, link }) => {
  const { isMintable, setIsMintable, isValid, setIsValid } = useNFTMinting();
  const { gelatoTaskId, ownerAddress } = useAccountAbstraction();
  console.log(gelatoTaskId);
  return (
    <>
      {text != "mintZk" && text != "mintMum" && (
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
      {text == "mintZk" && (
        <div className="bg-[#564458] grid grid-flow-row p-2 w-fit gap-2">
          <Image
            src={imag2}
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
      {text == "mintMum" && (
        <div className="bg-[#564458] grid grid-flow-row p-2 w-fit gap-2">
          <Image
            src={imag2}
            height={210}
            width={210}
            className="place-self-center shadow-2xl"
          />
          {isMintable && isValid && (
            <BtnL2
              type="mintMum"
              text="MINT"
              className="hover:cursor-pointer place-self-center"
            />
          )}
          {isMintable && !isValid && !gelatoTaskId && (
            <div className="flex hover:cursor-not-allowed place-self-center ">
              <Image
                src={loader}
                height={60}
                width={60}
                className="place-self-center"
              />
              <BtnL2 type="mintMum" text="Mint" className="place-self-center" />{" "}
            </div>
          )}
          {isMintable && !isValid && gelatoTaskId && (
            <div className="hover:cursor-not-allowed place-self-center ">
              <BtnL2
                type="mintMum"
                text="Not Eligible"
                className="place-self-center"
              />{" "}
            </div>
          )}
          {!isMintable && (
            <div className="hover:cursor-not-allowed place-self-center blur-sm">
              <BtnL2 type="mintMum" text="mint" className="place-self-center" />{" "}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NftDisplay;
