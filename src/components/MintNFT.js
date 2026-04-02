import React, { useState} from "react";
import { ethers } from "ethers";
import { getNFTContract } from "../utils/connect_ethers.js";

const MintNFT = () => {

  const [payableAmount, setPayableAmount] = useState(""); // amount of wei we send to safeMint() function of the contract

  const mintNFT = async () => {
    if (!window.ethereum) {
      alert("Metamask was not detected!");
      return;
    }
    

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = getNFTContract().connect(signer);
  
    try {
      const tx = await contract.safeMint(await signer.getAddress(), { value: ethers.parseUnits(payableAmount, "wei") });
      await tx.wait();
      alert("NFT minted successfully");
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Transaction failed: unable to mint NFT");
    }
  };

  return (
    <div>
      <h2>Mint Your NFT</h2>
      <label>Specify the amount of wei you want to send with transaction:</label>
      <br />
      <input
        type="number"
        placeholder="Payable Amount (wei)"
        value={payableAmount}
        onChange={(e) => setPayableAmount(e.target.value)}
      /> wei
      <br />
      <button onClick={mintNFT}>Mint NFT</button>
    </div>
  );
};

export default MintNFT;