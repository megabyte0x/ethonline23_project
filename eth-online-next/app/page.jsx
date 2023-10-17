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
        {walletAdd && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 grid gap-6 h-fit">
              {apeCoin.stat && (
                <ClaimList listType="APE Coin" list={apeCoin.claimList} />
              )}
              {lensNFT.stat && (
                <ClaimList listType="Lens NFT" list={lensNFT.claimList} />
              )}
              <YourNFTs />
            </div>

            <div className="col-span-1 grid gap-6 h-fit">
              <ConnectWallet
                walletAdd={walletAdd}
                ape={apeCoin.stat}
                lens={lensNFT.stat}
              />
              <Minted />
            </div>
          </div>
        )}
        {!walletAdd && <ConnectWallet walletAdd={walletAdd} />}
      </main>
      <MintModal />
    </>
  );
}

const walletAdd = "0x27923CAB90564c5C195BbFb98f7DA8d3D4F751Fb";
// const walletAdd = "";

const apeCoin = {
  stat: true,
  claimList: [
    {
      hash: "0x27923CAB90564c5C19",
      claimStat: true,
    },
    {
      hash: "0x27923CAB90564c5C19",
      claimStat: false,
    },
    {
      hash: "0x27923CAB90564c5C19",
      claimStat: false,
    },
  ],
};

const lensNFT = {
  stat: true,
  claimList: [
    {
      hash: "0x27923CAB90564c5C19",
      claimStat: true,
    },
    {
      hash: "0x27923CAB90564c5C19",
      claimStat: false,
    },
    {
      hash: "0x27923CAB90564c5C19",
      claimStat: false,
    },
  ],
};
