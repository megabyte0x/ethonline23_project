"use client";
import { useAccountAbstraction } from "@/Context/accountAbstractionContext";
import { useNFTMinting } from "@/Context/mintingContext";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const ClaimRow = ({ ready_for_claim, claim_tx_hash, tx_hash }) => {
  const [isValid, setIsValid] = useState(false); // Use null as an initial state
  const [loading, setLoading] = useState(false);
  const { setIsMintable } = useNFTMinting();
  const { ownerAddress, isAuthenticated } = useAccountAbstraction();

  const query = `
  query MyQuery {
    zkMysticsStatusCheckeds(
      where: {assetAddress: "0x75ab5ab1eef154c0352fc31d2428cef80c7f8b33", userAddress: $ownerAddress}
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
    "https://api.studio.thegraph.com/query/48418/ethonline_goerli/v0.0.1";

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
    if (isValid == true) {
      setIsMintable(true);
      setLoading(false);
    }
  }, [isValid]);
  return (
    <>
      {isAuthenticated &&
        (claim_tx_hash ? (
          <div className="place-self-center grid grid-flow-col gap-6">
            {" "}
            <h1 className="place-self-center text-xl">{claim_tx_hash}</h1>
            <BtnL2 text="CLAIMED" />
          </div>
        ) : ready_for_claim ? (
          <div className="place-self-center grid grid-flow-col gap-6">
            {" "}
            <h1 className="place-self-center text-xl">{tx_hash}</h1>
            <BtnL2 text="CLAIM" onClick={pollForClaimStatus} />
          </div>
        ) : (
          <div className="place-self-center grid grid-flow-col gap-6">
            {" "}
            <h1 className="place-self-center text-xl">{tx_hash}</h1>
            <BtnL2 text="Claiming..." className="hover:cursor-not-allowed" />
          </div>
        ))}
    </>
  );
};

export default ClaimRow;
