# NFT of Train Pictures
**Decentralized application (dApp) for creating and promoting NFTs,** made by 
Mikhail Pilipov




**I.** **Smart Contract**


My smart contract allows to mint, promote and sell NFTs.


My NFTs are pictures of different trains, the pictures themselves are saved at IPFS storage
Filebase, as well as metadata which is necessary to create NFTs out of these pictures.


IPFS is a decentralized and distributed file storage system. IPFS works by breaking down
files into smaller pieces called “blocks” and storing them across multiple nodes in the
network.


To store the pictures and metadata I used IPFS storage Filebase, in the created bucket
trains-nft:

<img width="778" height="220" alt="image" src="https://github.com/user-attachments/assets/ed1ea6bd-6042-44a3-be82-5e1775486df3" />



On this bucket I uploaded a folder with all the pictures I use to mint NFTs:

<img width="600" height="310" alt="image" src="https://github.com/user-attachments/assets/b3ff3865-2cc2-4eeb-91a8-3834ffcabcd5" />



At the same bucket I uploaded a folder which contains all metadata files for my NFTs:

<img width="620" height="311" alt="image" src="https://github.com/user-attachments/assets/47b3d69c-d6b2-4d84-91d0-3150d0ace9d1" />



Here you can see an example of metadata file of one of my NFTs:

<img width="810" height="336" alt="image" src="https://github.com/user-attachments/assets/062555f9-f50f-4b99-b62e-918d5edbb1e1" />

The example of photo which was used as a base for NFT token:

<img width="900" height="676" alt="image" src="https://github.com/user-attachments/assets/a52b8ef8-31e7-4161-b8fd-942915d29cc3" />





Every metadata file contains the following fields:


  - Name – a basic name for every NFT

  - Description – a short description of what is on the photo and where

  - Image – a link to IPFS storage where the picture is stored

  - Attributes – the attributes which describe some details of the picture, as well as the
creator of the picture and initial price of it


Main functionality of the contract (the methods which were implemented):


1) Contract deployment- to deploy it’s necessary to specify:

     - an address of the contract owner,

     - mint price – how much ethers will be used to mint a particular NFT,

     - max supply – the maximum number of NFTs which can be minted with this
contract

     - base URI – a link for the folder with all the metadata
2) SafeMint – for minting the NFTs
3) tokenURI – allows to get URI of the specific NFT by tokenId
4) setBaseURI – allows to change the base URI of metadata files


5) setMintPrice – to change the mint price to mint a NFT.
6) sellNFT – allows to promote and sell the NFTs that the user has
7) buyNFT – allows to buy NFTs by other users which are available


The deployed contract on Etherscan:

<img width="943" height="550" alt="image" src="https://github.com/user-attachments/assets/18ecccc8-a976-4d51-8f41-d4951a5c4808" />



**II.** **Frontend of the dApp**


My NFT decentralized application has a React-based frontend which interacts with the
Ethereum blockchain using ethers.js. UI allows users to provide a functional for minting,
buying, and managing NFTs which they own.


Main functionality:


1) Connect_ethers.js – allows to centralize interactions with the blockchain in this

dApp. Other modules of the web application use this file, it initializes the
connection between frontend and the blockchain
2) UserNFT.js – it allows to receive and display all the NFTs which the user owns in

table format:

<img width="981" height="276" alt="image" src="https://github.com/user-attachments/assets/881ac38f-5174-41b8-b2fd-6e9ab9b96e34" />


3) MintNFT.js is responsible to allow users to mint new NFTs on the smart contract. It

provides a form where users can specify a price for minting an NFT and then users
can send a transaction to the blockchain in order to mint an NFT.

<img width="432" height="132" alt="image" src="https://github.com/user-attachments/assets/6a4e7387-72c5-4af6-9f27-3962f110f542" />



4) SellNFT.js allows users to list their NFTs for sale on the smart contract. It allows

users to set the price for the NFT they want to sell and a tokenID of the NFT they
want to sell.

<img width="539" height="162" alt="image" src="https://github.com/user-attachments/assets/da4209e2-9403-4aea-a74b-15a815ad42b9" />



5) BuyNFT.js allows to purchase NFTs which are listing for sale on the smart contract.

It interacts with the blockchain to handle the transaction and to transfer ownership
of the chosen NFT

<img width="750" height="192" alt="image" src="https://github.com/user-attachments/assets/4369e71e-a49b-46cf-8f2e-b511461c2abe" />


6) All these modules are being called in the App.js file:

   <img width="433" height="378" alt="image" src="https://github.com/user-attachments/assets/8e8c7e7c-b4be-4787-8b06-11d2493504e5" />



7) Here you can see the basic structure of the project:

<img width="429" height="565" alt="image" src="https://github.com/user-attachments/assets/061abd6c-70d4-4755-bc43-e837a7708152" />

