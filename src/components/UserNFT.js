import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getNFTContract } from "../utils/connect_ethers.js";

const UserNFTs = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userNFTs, setUserNFTs] = useState([]); // list of the NFTs that user has
  const [nftCount, setNftCount] = useState(0);

  const connectWallet = async () => {
    setUserNFTs([]);  // to empty user NFTs
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);

        const contract = getNFTContract().connect(signer);

        // to get total balance of NFTs owned by user
        const balance = await contract.balanceOf(address);
        const ownedNFTs = [];

        // maximum number of possibly minted nfts
        const maxSupply = 28;  

        for (let tokenId = 0; tokenId < maxSupply; tokenId++) {
          try {
            // checking  owner of the tokenId
            const owner = await contract.ownerOf(tokenId);

            // if owner matches with connected wallet address - it's owned by user
            if (owner.toLowerCase() === address.toLowerCase()) {
              const tokenURI = await contract.tokenURI(tokenId);
              ownedNFTs.push({
                tokenId: tokenId.toString(),
                owner: address,
                tokenURI: tokenURI,
//              type: "minted",
              });
            }
          } catch (error) {
            // to get an error if the tokenId doesn't exist
            console.log(`Token ${tokenId} does not exist or is not owned by the user.`);
          }
        }

        setUserNFTs(ownedNFTs);
        setNftCount(ownedNFTs.length);
        setErrorMessage("");
      } catch (error) {
        console.error("Wallet connection error:", error);
        setErrorMessage("An error occurred while connecting to the wallet.");
        setUserNFTs([]);
      }
    } else {
      setErrorMessage("Metamask is not detected, you have to install it");
      setUserNFTs([]);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {"Connect Wallet"}
      </button>

      {/* to show "Loading..." text if userNFTs is empty */}
      {userNFTs.length === 0 && <p>Loading...</p>}

      {walletAddress && userNFTs.length > 0 && (
        <>
          <p><strong>Connected to:</strong> {walletAddress}</p>
          <p><strong>You own {nftCount} NFTs from this contract</strong></p>

          <h3>Your NFTs</h3>

          {userNFTs.length === 0 ? (
            <p>You don't have any NFTs</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <th style={{ padding: "8px", border: "1px solid #ddd" }}>Token ID</th>
                  <th style={{ padding: "8px", border: "1px solid #ddd" }}>Owner</th>
                  <th style={{ padding: "8px", border: "1px solid #ddd" }}>Token URI</th>
                  {/* <th style={{ padding: "8px", border: "1px solid #ddd" }}>Type</th> */}
                </tr>
              </thead>
              <tbody>
                {userNFTs.map((nft) => (
                  <tr key={nft.tokenId}>
                    <td style={{ padding: "8px", border: "1px solid #ddd", textAlign: "center" }}>
                      {nft.tokenId}
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                      {nft.owner}
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                      <a href={nft.tokenURI} target="_blank" rel="noopener noreferrer">
                        View Metadata
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default UserNFTs;
