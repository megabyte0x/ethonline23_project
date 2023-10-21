import React from "react";
import { ClaimRow } from "../components";

const ClaimList = ({ listType, list }) => {
  return (
    <div className="bg-[#D9CBFF] py-12 px-6 h-fit rounded-3xl grid gap-6 inSh">
      <h1 className="text-white text-3xl font-semibold">
        {listType} Claim List
      </h1>
      {/* claim list */}
      <div className="grid gap-4">
        {/* claim items */}
        {list.map((item) => (
          <ClaimRow hash={item.hash} stat={item.claimStat} />
        ))}
      </div>
    </div>
  );
};

export default ClaimList;
