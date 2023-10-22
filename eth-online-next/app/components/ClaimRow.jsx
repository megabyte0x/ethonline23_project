"use client";
import { useAccountAbstraction } from "@/Context/accountAbstractionContext";
import { useNFTMinting } from "@/Context/mintingContext";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BtnL2 } from ".";
import { ethers } from "ethers";
import { ZKEVM_BRIDGE_TESTNET } from "@/constant/constants";
import * as zkEvmBridge from "@/abis/zkEvm_bridge.json";

const ClaimRow = ({ claim }) => {
  const [isValid, setIsValid] = useState(false); // Use null as an initial state
  const [loading, setLoading] = useState(false);
  const { setIsMintable } = useNFTMinting();
  const { ownerAddress, isAuthenticated, signer } = useAccountAbstraction();
  const bridgeContractZkevm = new ethers.Contract(
    ZKEVM_BRIDGE_TESTNET,
    zkEvmBridge.abi,
    signer
  );
  console.log(`bridgeContract: ${bridgeContractZkevm}`);

  const {
    ready_for_claim,
    claim_tx_hash,
    tx_hash,
    deposit_cnt,
    orig_net,
    orig_addr,
    dest_net,
    dest_addr,
    amount,
    metadata,
  } = claim;
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

  const zkEvmTransaction = async () => {
    if (ready_for_claim) {
      const baseURL = "https://bridge-api.public.zkevm-test.net";
      const proofAxios = await axios.get(`${baseURL}/merkle-proof`, {
        params: {
          deposit_cnt,
          net_id: orig_net,
        },
      });
      const { proof } = proofAxios.data;
      console.log(`proof:${proof}`);
      const claimTx = await bridgeContractZkevm.claimMessage(
        proof.merkle_proof,
        deposit_cnt,
        proof.main_exit_root,
        proof.rollup_exit_root,
        orig_net,
        orig_addr,
        dest_net,
        dest_addr,
        amount,
        metadata
      );
      console.log(`hash:${claimTx.hash}`);
      await claimTx.wait();
    }
  };
  console.log("out handlde");
  const handleClaim = async () => {
    console.log("insidd handlde");
    await zkEvmTransaction();
    console.log("txn completed");
    await pollForClaimStatus();
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
  console.log(tx_hash);
  return (
    <>
      {isAuthenticated &&
        (claim_tx_hash ? (
          <div className="place-self-center grid grid-flow-col gap-6">
            {" "}
            <h1 className="place-self-center text-xl">
              {claim_tx_hash.slice(0, 5)}...{claim_tx_hash.slice(38, 44)}
            </h1>
            <BtnL2 text="CLAIMED" />
          </div>
        ) : ready_for_claim ? (
          <div className="place-self-center grid grid-flow-col gap-6">
            {" "}
            <h1 className="place-self-center text-xl">
              {" "}
              {tx_hash.slice(0, 5)}...{tx_hash.slice(38, 44)}
            </h1>
            <div
              onClick={() => {
                console.log("CLICKEDCLICKED");
                handleClaim();
              }}
            >
              {" "}
              <BtnL2 text="CLAIM" />
            </div>
          </div>
        ) : (
          <div className="place-self-center grid grid-flow-col gap-6 ">
            {" "}
            <h1 className="place-self-center text-xl">
              {" "}
              {tx_hash.slice(0, 5)}...{tx_hash.slice(38, 44)}
            </h1>
            <div className="hover:cursor-not-allowed">
              {" "}
              <BtnL2 text="Waiting..." />
            </div>
          </div>
        ))}
    </>
  );
};

export default ClaimRow;
