import React from "react";
import { BtnL2 } from ".";
import Image from "next/image";

const NftDisplay = ({ text, imag, link }) => {
  return (
    <div className="bg-[#564458] grid grid-flow-row p-2 w-fit gap-2">
      <Image
        src={imag}
        height={210}
        width={210}
        className="place-self-center shadow-2xl"
      />
      <BtnL2 text={text} link={link} className="place-self-center" />
    </div>
  );
};

export default NftDisplay;
