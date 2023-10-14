import Image from "next/image";
import { ConnectWallet, MintModal, Minted, YourNFTs } from "./views";

export default function Home() {
  return (
    <>
      <ConnectWallet />
      <div>
        <YourNFTs />
        <Minted />
      </div>
      <div>
        <MintModal />
      </div>
    </>
  );
}
