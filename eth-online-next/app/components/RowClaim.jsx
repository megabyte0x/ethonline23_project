import React from "react";
import { BtnL2 } from ".";

const RowClaim = ({ hash, stat }) => {
  return (
    <>
      {" "}
      <div className="place-self-center grid grid-flow-col gap-6">
        {" "}
        <h1 className="place-self-center text-xl">{hash}</h1>
        {!stat && <BtnL2 text="CLAIM" />}
        {stat && <BtnL2 text="CLAIMED" />}
      </div>
      <div className="pb-[0.3px] w-[90%] bg-[#ffffff] place-self-center"></div>
    </>
  );
};

export default RowClaim;
