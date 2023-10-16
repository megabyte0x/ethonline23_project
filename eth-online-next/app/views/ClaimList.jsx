import React from "react";

const ClaimList = () => {
  return (
    <div className="bg-[#D9CBFF] p-12 h-fit rounded-3xl grid gap-6 inSh">
      <h1 className="text-white text-3xl font-semibold">Claim List</h1>
      {/* claim list */}
      <div className="grid gap-4">
        {/* claim items */}
        <div className="grid grid-flow-col gap-4">
          <h1 className="rounded-2xl bg-[#F3B4B4] p-6 outSh">
            0x2uygfwf289r3b9uob3k2pdn
          </h1>
          <h4 className="rounded-2xl bg-[#F3B4B4] p-6 outSh text-center">
            CLAIM
          </h4>
        </div>{" "}
        <div className="grid grid-flow-col gap-4">
          <h1 className="rounded-2xl bg-[#F3B4B4] p-6 outSh">
            0x2uygfwf289r3b9uob3k2pdn
          </h1>
          <h4 className="rounded-2xl bg-[#F3B4B4] p-6 outSh text-center">
            CLAIM
          </h4>
        </div>{" "}
        <div className="grid grid-flow-col gap-4">
          <h1 className="rounded-2xl bg-[#F3B4B4] p-6 outSh">
            0x2uygfwf289r3b9uob3k2pdn
          </h1>
          <h4 className="rounded-2xl bg-[#F3B4B4] p-6 outSh text-center">
            CLAIM
          </h4>
        </div>{" "}
        <div className="grid grid-flow-col gap-4">
          <h1 className="rounded-2xl bg-[#F3B4B4] p-6 outSh">
            0x2uygfwf289r3b9uob3k2pdn
          </h1>
          <h4 className="rounded-2xl bg-[#F3B4B4] p-6 outSh text-center">
            CLAIM
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ClaimList;
