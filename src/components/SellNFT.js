import React, { useState } from "react";
import { ethers } from "ethers";
import { getNFTContract } from "../utils/connect_ethers.js";

const SellNFT = () => {
    const [tokenId, setTokenId] = useState("");
    const [price, setPrice] = useState("");
    const [message, setMessage] = useState("");

    const sellingNFT = async() => {
        if (window.ethereum){
            try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = getNFTContract().connect(signer);

            // accept that contract will transfer NFT
            const approveTx = await contract.approve(contract.target, tokenId);
            await approveTx.wait();

            // listing NFT for sale
            const sellTx = await contract.sellNFT(tokenId, price);
            await sellTx.wait();

            setMessage(`NFT №${tokenId} is going to be listed for sale at ${price} wei.`);
        } catch (error) {
            console.error("Sell NFT error:", error);
            setMessage("Error listing NFT for sale");
        }
    }
}
    return (
        <div>
            <h2>Sell Your NFT</h2>
            <input type="number" placeholder="Token ID" value={tokenId} onChange={(e) => setTokenId(e.target.value)} />
            <input type="text" placeholder="Price (wei)" value={price} onChange={(e) => setPrice(e.target.value)} />
            <button onClick={sellingNFT}>Sell NFT</button>
            {message && <p>{message}</p>}
        </div>
    );
};
export default SellNFT;