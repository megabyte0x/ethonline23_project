"use client";
import { useAccountAbstraction } from "@/Context/accountAbstractionContext";

import Image from "next/image";
import {
  AboutUs,
  ClaimList,
  ConnectWallet,
  MeetTeam,
  Minted,
  MumbaiTestnet,
  YourNFTs,
  ZkTestnet,
} from "./views";

export default function Home() {
  const {
    loginWeb3Auth,
    isAuthenticated,
    balance,
    chainId,
    relayTransaction,
    isRelayerLoading,
    gelatoTaskId,
    ownerAddress,
  } = useAccountAbstraction();
  console.log(isAuthenticated);
  return (
    <>
      <main className="">
        {!isAuthenticated && <MeetTeam />}
        {isAuthenticated && chainId == "0x13881" && <MumbaiTestnet />}
        {isAuthenticated && chainId == "0x5a2" && <ZkTestnet />}
        {/* <AboutUs />
        {isAuthenticated && (
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
              <ConnectWallet ape={apeCoin.stat} lens={lensNFT.stat} />
              <Minted />
            </div>
          </div>
        )}

        {!isAuthenticated && <ConnectWallet />} */}
      </main>
      {/* <MintModal /> */}
    </>
  );
}

// const walletAdd = "0x27923CAB90564c5C195BbFb98f7DA8d3D4F751Fb";

const chain = "0x13881";
