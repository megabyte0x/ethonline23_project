"use client";
import usePolling from "@/hooks/usePolling";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {ClaimRow} from "../components";

const graphPage = () => {
    
    const [claimList, setClaimList] = useState([]);
    
    const fetchClaims = useCallback( async () => {
        try {
            const res = await axios.get("https://bridge-api.public.zkevm-test.net/bridges/0x787EBF7861186BF46eC7e4635dfD9786e3B137C5")
            console.log(res.data.deposits)
            return res.data.deposits;
        } catch (error) {
            console.log("Error while poling zkEvm-api:",error);
            return null;
        }
    },[])
    
    const claimListResults = usePolling(fetchClaims, 5_000);
    
    useEffect(() => {
        if(claimListResults != null) {
            setClaimList(claimListResults)
            console.log(claimList.length)
        }
    },[claimListResults])
    
    useEffect(() => {
        fetchClaims();
    },[])

  return (
    <>
    {claimList.length > 0 ? claimList.map((claim,index) => (
        <ClaimRow/>
    )) :(<h1> Fetching claim list.... </h1>)}
    </>
  );
}

export default graphPage