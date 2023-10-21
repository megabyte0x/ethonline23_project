import React from "react";

const AboutUs = () => {
  return (
    <div className="pt-20 grid grid-flow-row px-20 h-[50vh] place-self-center">
      <div className=" grid grid-cols-2 place-self-center gap-16">
        <h1 className="text-6xl">Verify assets seamlessly</h1>
        <p className="self-center place-self-end text-justify text-2xl">
          A Dapp which allows a user to verify assets on Polygon chains and
          Ethereum using Polygon Zkevm and Lx -Ly bridge through our mint logic
          and tamper - proof gateway
        </p>
      </div>
      <div className="py-[0.6px] w-[90%] bg-[#ffffff] place-self-center"></div>
    </div>
  );
};

export default AboutUs;
