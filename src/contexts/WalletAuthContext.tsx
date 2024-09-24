// AuthContext.js
import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import { Eip1193Provider } from "ethers";

// Define the type for the context value
interface AuthContextType {
    connected: boolean;
    walletAddress: string;
    connectWallet: () => Promise<void>;
}

// Create a default context value
const defaultAuthContextValue: AuthContextType = {
    connected: false,
    walletAddress: "",
    connectWallet: async () => { },
};

// Create the context with the default value
const WalletAuthContext = createContext<AuthContextType>(defaultAuthContextValue);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WalletAuthProvider = ({ children }:any) => {
    const [connected, setConnected] = useState<boolean>(false);
    const [walletAddress, setWalletAddress] = useState<string>("");

    const connectWallet = async () => {
        console.log("connecting");
        
        if (typeof window.ethereum !== "undefined") {
            if (!connected) {
                try {
                    if (typeof window.ethereum.request !== "undefined") {
                        await window.ethereum.request({ method: "eth_requestAccounts" });
                    }

                    const provider = new ethers.BrowserProvider(window.ethereum as Eip1193Provider);
                    const signer = await provider.getSigner();
                    const _walletAddress = await signer.getAddress();

                    setConnected(true);
                    setWalletAddress(_walletAddress);
                } catch (error) {
                    console.error("Error connecting wallet:", error);
                }
            } else {
                setConnected(false);
                setWalletAddress("");
            }
        } else {
            alert("Please install MetaMask!");
        }
    };

    return (
        <WalletAuthContext.Provider value={{ connected, walletAddress, connectWallet }}>
            {children}
        </WalletAuthContext.Provider>
    );
};

export const useWalletAuth = () => {
    return useContext(WalletAuthContext);
};
