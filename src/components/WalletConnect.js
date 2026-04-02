import React, {useState} from "react";
import {ethers} from "ethers";
import { getNFTContract} from "../utils/connect_ethers.js";
import UserNFTs from "./UserNFT.js";

const WalletConnect=()=>{
    const [walletAddress, setWalletAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // connection the user's wallet - it's using in BuyNFT.js
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setWalletAddress(address);
                setErrorMessage("");
            } catch (error) {
                console.error("Wallet connection error:", error);
                setErrorMessage("An error occurred while connecting to the wallet.");
            }
        } else {
            setErrorMessage("Metamask is not detected, you have to install it");
        }
    };


    return (
        <div>
    
          {walletAddress && (
            <>
              <p><strong>Connected to:</strong> {walletAddress}</p>
              <UserNFTs userAddress={walletAddress} />
            </>
          )}
    
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      );
};

export default WalletConnect;