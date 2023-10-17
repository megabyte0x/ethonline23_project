import React from "react";

const AboutUs = () => {
  return (
    <div className="rounded-3xl text-3xl font-semibold w-[100%] grid text-white">
      <div className="bg-[#D9CBFF] p-12 h-[100%] rounded-t-3xl grid gap-0 inSh">
        <h1 className="self-end place-self-center text-start pr-20">ZK</h1>
        <h1 className="self-start place-self-center text-end pl-20 mt-[-14px]">
          MYSTICS
        </h1>
        <p className="text-justify text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo commodi
          esse harum vel quam quae ut fugiat dignissimos, quaerat quas impedit
          provident quia voluptatem facere expedita ad cupiditate? Quisquam, ut?
        </p>
      </div>
      <div className="h-[100%] bg-[#DBE8CA] rounded-b-3xl p-16 inSh"></div>
    </div>
  );
};

export default AboutUs;
