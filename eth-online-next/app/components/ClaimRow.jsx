"use client"
import axios from "axios";
import { useCallback, useEffect, useState } from "react";


const ClaimRow = () => {
      
    const [isClaimed, setIsClaimed] = useState(false); // Use null as an initial state
    
    const query = `
  query MyQuery {
    zkMysticsStatusCheckeds(
      where: {assetAddress: "0x75ab5ab1eef154c0352fc31d2428cef80c7f8b33", userAddress: "0x1cb30cb181d7854f91c2410bd037e6f42130e860"}
    ) {
      id
      result
    }
  }
`;

    const fetchGraph = useCallback(async () => {
        try {
            const res = await axios.post(apiUrl, { query });
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',res.data.data.zkMysticsStatusCheckeds[0].result,'<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
            return res.data.data.zkMysticsStatusCheckeds[0].result;
        } catch (error) {
            console.log('Error fetching graph:', error);
            return null;
        }
    }, []);

    const apiUrl = 'https://api.studio.thegraph.com/query/48418/ethonline_goerli/v0.0.1';

    const pollForClaimStatus = async () => {
        console.log("poll")
        const interval = setInterval(async () => {
            const result = await fetchGraph();
            if (result !== null) {
                setIsClaimed(result);
                clearInterval(interval); // Stop polling once you have a result
            }
        }, 5000); // Poll every 5 seconds
    };

    useEffect(() => {
        if (isClaimed === null) {
            pollForClaimStatus(); // Start polling when isClaimed is null
        }
    }, [isClaimed]);
  return (
    <div>ClaimRow</div>
  )
}

export default ClaimRow