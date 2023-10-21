import React from "react";
import { LowerHeading, NftDisplay } from "../components";
import megabyte from "@/assets/team/megabyte.png";
import lilith from "@/assets/team/lilith.png";
import lucifer from "@/assets/team/lucifer.png";
import mayank from "@/assets/team/mayank.png";

const MeetTeam = () => {
  return (
    <div className="grid grid-flow-col gap-6 px-16">
      <LowerHeading text="Meet The Team" />
      <NftDisplay
        text="MegaByte"
        imag={megabyte}
        link="https://github.com/megabyte0x"
      />
      <NftDisplay
        text="Lucifer"
        imag={lucifer}
        link="https://github.com/Lucifer0x17"
      />
      <NftDisplay
        text="Lilith"
        imag={lilith}
        link="https://github.com/L-Pircy"
      />
      <NftDisplay text="Mayank" imag={mayank} link="" />
    </div>
  );
};

export default MeetTeam;
