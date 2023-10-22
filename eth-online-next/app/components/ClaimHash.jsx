"use client";
import { useAccountAbstraction } from "@/Context/accountAbstractionContext";
import usePolling from "@/hooks/usePolling";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BtnL2, RowClaim, ClaimRow } from ".";

const ClaimHash = ({ hash, stat }) => {
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
  const [claimList, setClaimList] = useState([]);

  const fetchClaims = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://bridge-api.public.zkevm-test.net/bridges/0x787EBF7861186BF46eC7e4635dfD9786e3B137C5"
      );
      console.log(res.data.deposits);
      return res.data.deposits;
    } catch (error) {
      console.log("Error while poling zkEvm-api:", error);
      return null;
    }
  }, []);

  const claimListResults = usePolling(fetchClaims, 5_000);

  useEffect(() => {
    if (claimListResults != null) {
      setClaimList(claimListResults);
      console.log(claimList.length);
    }
  }, [claimListResults]);

  useEffect(() => {
    fetchClaims();
  }, []);

  return (
    <>
      {gelatoTaskId === undefined && (
        <div className="blur-sm bg-gradient-to-r from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] self-center place-self-start grid p-[0.9px]">
          <div className="bg-[#564458] grid grid-flow-row h-full w-full px-12 py-3 gap-6">
            <h1 className="place-self-center text-4xl">0x058140cea</h1>
            <BtnL2 text="CLAIM" />
          </div>
        </div>
      )}
      {gelatoTaskId && (
        <div className=" bg-gradient-to-br from-[#F43CD9] via-[#8F00FF] to-[#36B8E1] self-center place-self-start grid p-[0.9px]">
          <div className="bg-[#564458] grid grid-flow-row h-full w-full px-12 py-3 gap-2">
            {claimList.length > 0 ? (
              claimList.map((claim, index) => <ClaimRow />)
            ) : (
              <h1> Fetching claim list.... </h1>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ClaimHash;
