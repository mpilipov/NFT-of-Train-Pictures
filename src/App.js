import './App.css';
import React from "react";
import WalletConnect from "./components/WalletConnect.js";
import MintNFT from "./components/MintNFT.js";
import SellNFT from "./components/SellNFT.js";
import BuyNFT from "./components/BuyNFT.js";
import UserNFT from "./components/UserNFT.js";

function App() {
  return (
    <div className="App">
      <h1>Trains photos NFT dApp</h1>
      <WalletConnect />
      <UserNFT />
      <MintNFT />
      <SellNFT />
      <BuyNFT />
    </div>
  );
}

export default App;
