import { ethers } from "ethers";
import { ContractABI } from "./contractABI.js";

const provider = new ethers.JsonRpcProvider(process.env.REACT_APP_INFURA_API_URL);
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const nftContract = new ethers.Contract(contractAddress, ContractABI, provider);

export const getNFTContract = () => nftContract;