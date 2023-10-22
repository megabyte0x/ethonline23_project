"use client";
import { useAccountAbstraction } from "@/Context/accountAbstractionContext";
import { useNFTMinting } from "@/Context/mintingContext";
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import push from "@/assets/pushlogo.webp";
import ape from "@/assets/apelogo.png";
import loader from "@/assets/ethrev.gif";
import tick from "@/assets/tick.svg";
import { ethers } from "ethers";
import * as ccipSender from "@/abis/zkMystics_sender.json";
import {
  ASSET_ADDRESS_GOERLI,
  ASSET_ADDRESS_SEPOLIA,
  SENDER_MUMBAI,
  SENDER_ZKEVM,
} from "@/constant/constants";
import axios from "axios";

const BtnL1 = ({ text }) => {
  const ethersInterface = new ethers.utils.Interface(ccipSender.abi);

  // Use null as an initial state
  const [loading, setLoading] = useState(false);
  const { setIsMintable, isValid, setIsValid } = useNFTMinting();

  const query = `
  query MyQuery {
    zkMysticsStatusCheckeds(
      where: {assetAddress: "0x685d3F5e89Af1cf1eAe92AC4280Cd0699c4a98F8", userAddress: $ownerAddress}
    ) {
      id
      result
    }
  }
`;

  const fetchGraph = useCallback(async () => {
    try {
      const res = await axios.post(apiUrl, {
        query,
        variables: { ownerAddress },
      });
      console.log(
        ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
        res.data.data.zkMysticsStatusCheckeds[0]?.result,
        "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
      );
      return res.data.data.zkMysticsStatusCheckeds[0]?.result;
    } catch (error) {
      console.log("Error fetching graph:", error);
      return null;
    }
  }, []);

  const apiUrl =
    "https://api.studio.thegraph.com/query/48418/ethonline_sepolia/v0.0.1";

  const pollForClaimStatus = async () => {
    console.log("poll");
    setLoading(true);
    const interval = setInterval(async () => {
      const result = await fetchGraph();
      if (result !== null) {
        setIsValid(result);
        clearInterval(interval); // Stop polling once you have a result
      }
    }, 5000); // Poll every 5 seconds
  };

  useEffect(() => {
    if (isValid === null || isValid === undefined) {
      pollForClaimStatus(); // Start polling when isValid is null
    }
  }, [isValid]);

  const handleClickmum = async () => {
    const txn = [
      {
        to: SENDER_MUMBAI,
        data: ethersInterface.encodeFunctionData(
          "checkAssetStatusUsingChainlink",
          [ASSET_ADDRESS_SEPOLIA, 1]
        ),
        value: "0",
      },
    ];
    relayTransaction(txn);
    await pollForClaimStatus();
    setIsMintable(true);
  };
  const handleClickZK = () => {
    const txn = [
      {
        to: SENDER_ZKEVM,
        data: ethersInterface.encodeFunctionData("checkAssetStatus", [
          ASSET_ADDRESS_GOERLI,
          true,
          1,
        ]),
        value: "0",
      },
    ];
    relayTransaction(txn);
  };
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
  return (
    <>
      {text == "push" && (
        <div className="self-center bg-gradient-to-r font-bold from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] place-self-start grid p-[1.5px]">
          <div className="bg-[#9D39A399] grid grid-flow-col h-full w-full px-6 py-3">
            <h3 className="place-self-center text-3xl">Go To</h3>
            <Image
              src={push}
              height={90}
              width={120}
              className="place-self-center"
            />
            <h3 className="pl-1 place-self-center text-3xl"> chat</h3>
          </div>
        </div>
      )}
      {text == "zkevm" && (
        <>
          <div
            onClick={handleClickZK}
            className="hover:cursor-pointer self-center bg-gradient-to-br font-bold from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] place-self-start grid p-[1.5px]"
          >
            <div className="bg-[#9D39A399] grid grid-flow-col h-full w-full px-3 py-3">
              {gelatoTaskId ? (
                <>
                  <Image
                    src={ape}
                    height={60}
                    width={60}
                    className="place-self-center"
                  />
                  <h3 className="pl-1 place-self-center text-lg">
                    ApeCoin Holdings Verified
                  </h3>
                  <Image
                    src={tick}
                    height={90}
                    width={90}
                    className="place-self-center"
                  />
                </>
              ) : isRelayerLoading ? (
                <>
                  <Image
                    src={loader}
                    height={60}
                    width={60}
                    className="place-self-center"
                  />
                  <h3 className="place-self-center text-xl">Verifying</h3>
                  <Image
                    src={ape}
                    height={60}
                    width={60}
                    className="place-self-center"
                  />
                  <h3 className="pl-1 place-self-center text-xl">
                    ApeCoin Holdings
                  </h3>
                </>
              ) : (
                <>
                  <h3 className="place-self-center text-xl">Verify</h3>
                  <Image
                    src={ape}
                    height={60}
                    width={60}
                    className="place-self-center"
                  />
                  <h3 className="pl-1 place-self-center text-xl">
                    ApeCoin Holdings
                  </h3>
                </>
              )}
            </div>
          </div>
          {gelatoTaskId && (
            <Link
              href={`https://relay.gelato.digital/tasks/status/${gelatoTaskId}`}
              className="underline mt-[-6px] place-self-center"
              target="_blank"
            >
              Transaction Link
            </Link>
          )}
        </>
      )}
      {text == "mumbai" && (
        <div className="grid grid-flow-row self-center place-self-start">
          <div
            onClick={handleClickmum}
            className="hover:cursor-pointer self-center bg-gradient-to-br font-bold from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] place-self-start grid p-[1.5px]"
          >
            <div className="bg-[#9D39A399] grid grid-flow-col h-full w-full px-3 py-3">
              {gelatoTaskId ? (
                <>
                  <Image
                    src={ape}
                    height={60}
                    width={60}
                    className="place-self-center"
                  />
                  <h3 className="pl-1 place-self-center text-lg">
                    ApeCoin Holdings Verified
                  </h3>
                  <Image
                    src={tick}
                    height={90}
                    width={90}
                    className="place-self-center"
                  />
                </>
              ) : isRelayerLoading ? (
                <>
                  <Image
                    src={loader}
                    height={60}
                    width={60}
                    className="place-self-center"
                  />
                  <h3 className="place-self-center text-xl">Verifying</h3>
                  <Image
                    src={ape}
                    height={60}
                    width={60}
                    className="place-self-center"
                  />
                  <h3 className="pl-1 place-self-center text-xl">
                    ApeCoin Holdings
                  </h3>
                </>
              ) : (
                <>
                  <h3 className="place-self-center text-xl">Verify</h3>
                  <Image
                    src={ape}
                    height={60}
                    width={60}
                    className="place-self-center"
                  />
                  <h3 className="pl-1 place-self-center text-xl">
                    ApeCoin Holdings
                  </h3>
                </>
              )}
            </div>
          </div>
          <span className="place-self-center">
            {gelatoTaskId && (
              <Link
                href={`https://relay.gelato.digital/tasks/status/${gelatoTaskId}`}
                className="underline mt-[-6px] place-self-center"
                target="_blank"
              >
                Transaction Link
              </Link>
            )}
          </span>
        </div>
      )}
    </>
  );
};

export default BtnL1;
