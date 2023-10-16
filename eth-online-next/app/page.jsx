import Image from "next/image";
import {
  AboutUs,
  ClaimList,
  ConnectWallet,
  MintModal,
  Minted,
  YourNFTs,
} from "./views";

export default function Home() {
  return (
    <>
      <main className="rounded-[33px] h-[100%] w-[100%] bg-[#ffffff] p-9 grid gap-6 bgSh">
        <AboutUs />
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 grid gap-6 h-fit">
            <ClaimList />
            <YourNFTs />
          </div>
          <div className="col-span-1 grid gap-6 h-fit">
            <ConnectWallet />
            <Minted />
          </div>
        </div>
      </main>
      <MintModal />
    </>
  );
}
