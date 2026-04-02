import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getNFTContract } from "../utils/connect_ethers.js";
import WalletConnect from "./WalletConnect.js";

const BuyNFT = () => {
    const [listedNFTs, setListedNFTs] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getListedNFT();
    }, []);
const getListedNFT = async() => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum); //connects frontend with blockchain
            const contract = getNFTContract().connect(provider);
            
            let nftsForSale = [];
            for (let tokenId = 0; tokenId < 28; tokenId++) { // totalSupply = 28
                const price = await contract.tokenPrices(tokenId);
                if (price > 0) {
                    const tokenURI = await contract.tokenURI(tokenId);
                    nftsForSale.push({
                        tokenId,
                        price: price,
                        tokenURI,
                    });
                }
            }

            setListedNFTs(nftsForSale);
        } catch (error) {
            console.error("Error fetching NFTs for sale", error);
        }
    };// end of get listed nft


    const buyNFT = async (tokenId, price) => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner(); 
            const contract = getNFTContract().connect(signer);

            const buyTx = await contract.buyNFT(tokenId, { value: ethers.parseUnits(price.toString(), "wei") }); // Convert price to wei
            await buyTx.wait();

            setMessage(`You successfully purchased NFT №${tokenId}`);
            WalletConnect();
            getListedNFT(); // Refresh the list
        } catch (error) {
            console.error("Buy NFT error:", error);
            setMessage("Error purchasing NFT");
        }
    };


    return (
        <div>
            <h2>Buy NFTs</h2>
            <button onClick={getListedNFT}>Refresh NFTs</button> 
            {listedNFTs.length === 0 ? (
                <p>No NFTs are currently listed for sale</p>
            ) : (
                <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f2f2f2" }}>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Token ID</th>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Price (wei)</th>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Token URI</th>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listedNFTs.map((nft) => (
                            <tr key={nft.tokenId}>
                                <td style={{ padding: "8px", border: "1px solid #ddd", textAlign: "center" }}>{nft.tokenId}</td>
                                <td style={{ padding: "8px", border: "1px solid #ddd", textAlign: "center" }}>{nft.price} wei</td>
                                <td style={{ padding: "8px", border: "1px solid #ddd", textAlign: "center" }}>
                                    <a href={nft.tokenURI} target="_blank" rel="noopener noreferrer">
                                        View Metadata
                                    </a>
                                </td>
                                <td style={{ padding: "8px", border: "1px solid #ddd", textAlign: "center" }}>
                                    <button onClick={() => buyNFT(nft.tokenId, nft.price)} style={{ padding: "5px 15px", cursor: "pointer" }}>
                                        Buy
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {message && <p style={{ color: message.includes("successfully") ? "green" : "red", marginTop: "15px" }}>{message}</p>}
        </div>
        );    
};
export default BuyNFT;

