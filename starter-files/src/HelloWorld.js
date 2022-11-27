import React from "react";
import { useEffect, useState } from "react";
import {
  helloWorldContract,
  connectWallet,
  sendEth,
  sendToken,
  loadContractOwner,
  getCurrentWalletConnected,
} from "./util/interact.js";

import alchemylogo from "./alchemylogo.svg";

const HelloWorld = () => {
  //state variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [owner, setOwner] = useState("No connection to the network."); //default message
  const [recipient_addresses, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [token_address, setTokenAddress] = useState(""); // USDC (decimal=6) on Goerli 0x07865c6E87B9F70255377e024ace6630C1Eaa37F

  //called only once
  useEffect(() => {
    async function fetchMessage() {
      const owner = await loadContractOwner();
      setOwner(owner);
    }
    fetchMessage();
    addSmartContractListener();
  
    async function fetchWallet() {
      const {address, status} = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status); 
    }
    fetchWallet();
  }, []);

  function addSmartContractListener() { //TODO: implement
    
  }

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Provide recipients and amount above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onSendEthPressed = async () => {
    const { status } = await sendEth(walletAddress, recipient_addresses, amount);
    setStatus(status);
  };

  const onSendTokenPressed = async () => {
    const { status } = await sendToken(walletAddress, token_address, recipient_addresses, amount);
    setStatus(status);
  };

  //the UI of our component
  return (
    <div id="container">
      <img id="logo" src={alchemylogo}></img>
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <h2 style={{ paddingTop: "50px" }}>Contract Owner:</h2>
      <p>{owner}</p>

      <div>
        <h3 style={{ paddingTop: "18px" }}>Recipient Addresses (comma separated):</h3>
        <input
          type="text"
          placeholder="Recipient Addresses"
          onChange={(e) => setRecipientAddress(e.target.value)}
          value={recipient_addresses}
        />
        <h3 style={{ paddingTop: "18px" }}>Send Amount (Wei):</h3>
         <input
          type="text"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
       <p id="status">{status}</p>

        <button id="send_eth" onClick={onSendEthPressed}>
          SendEth
        </button>
        <h3 style={{ paddingTop: "18px" }}>Token Contract:</h3>
        <input
          type="text"
          placeholder="Token Contract"
          onChange={(e) => setTokenAddress(e.target.value)}
          value={token_address}
        />
        <p id="new line"> </p>
        <button id="send_token" onClick={onSendTokenPressed}>
          SendToken
        </button>
      </div>
    </div>
  );
};

export default HelloWorld;
