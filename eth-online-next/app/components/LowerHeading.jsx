import React from "react";

const LowerHeading = ({ text }) => {
  return (
    <div className="place-self-center text-4xl bg-gradient-to-r from-[#4C2C4F] to-[#00000000] px-3 py-3 h-fit">
      {text}
    </div>
  );
};

export default LowerHeading;
