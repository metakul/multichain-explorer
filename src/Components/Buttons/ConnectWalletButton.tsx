import { useState } from "react";
import { ethers } from "ethers";
import { Eip1193Provider } from "ethers";
import "./Button.css";

function ConnectWalletButton() {
    // State to store the connection status of the wallet
    const [connected, setConnected] = useState(false);
    // State to store the connected wallet address
    const [walletAddress, setWalletAddress] = useState("");

    async function connectWallet() {
        // Check if window.ethereum is available
        if (typeof window.ethereum !== "undefined") {
            // If not connected, connect the wallet
            if (!connected) {
                try {
                    // Request account access
                    await window.ethereum.request({ method: "eth_requestAccounts" });

                    const provider = new ethers.BrowserProvider(window.ethereum as Eip1193Provider);
                    const signer = await provider.getSigner();
                    const _walletAddress = await signer.getAddress();

                    setConnected(true);
                    setWalletAddress(_walletAddress);
                } catch (error) {
                    console.error("Error connecting wallet:", error);
                }
            } else {
                // If connected, disconnect the wallet
                setConnected(false);
                setWalletAddress("");
            }
        } else {
            alert("Please install MetaMask!");
        }
    }

    return (
        <div className="app">
            <div className="main">
                <button className="btn" onClick={connectWallet}>
                    {connected ? "Disconnect Wallet" : "Connect Wallet"}
                </button>
                <h3>Address</h3>
                <h4 className="wal-add">{walletAddress}</h4>
            </div>
        </div>
    );
}

export default ConnectWalletButton;
