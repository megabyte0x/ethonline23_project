import React from "react";

const ClaimRow = ({ hash, stat }) => {
  return (
    <>
      {!stat && (
        <div className="grid grid-flow-col gap-4">
          <h1 className="rounded-xl bg-[#F3B4B4] py-4 px-6 outSh">{hash}</h1>
          <h4 className="rounded-xl bg-[#F3B4B4] py-4 px-6 outSh text-center">
            CLAIM
          </h4>
        </div>
      )}
      {stat && (
        <div className="grid grid-flow-col gap-4">
          <h1 className="rounded-xl bg-[#D8F3B4] py-4 px-6 outSh">{hash}</h1>
          <h4 className="rounded-xl bg-[#D8F3B4] py-4 px-6 outSh text-center">
            CLAIMED
          </h4>
        </div>
      )}
    </>
  );
};

export default ClaimRow;
