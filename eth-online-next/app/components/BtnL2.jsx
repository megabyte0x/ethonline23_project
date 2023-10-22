import Link from "next/link";
import React from "react";

const BtnL2 = ({ text, link }) => {
  return (
    <>
      {link && (
        <Link
          href={link}
          target="_blank"
          className="hover:cursor-pointer hover:p-3"
        >
          <div className=" self-end place-self-center w-full text-xl bg-gradient-to-br from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] px-6 py-3 text-center h-fit">
            {text}
          </div>
        </Link>
      )}
      {!link && (
        <Link href="./">
          <div className="self-end place-self-center w-full text-xl bg-gradient-to-br from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] px-6 py-3 text-center h-fit">
            {text}
          </div>
        </Link>
      )}
    </>
  );
};

export default BtnL2;
