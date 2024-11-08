/* eslint-disable @typescript-eslint/no-explicit-any */
// RpcProviderContext.ts
import { createContext, useContext, useState, ReactNode } from "react";
import { ethers } from "ethers";
import { networks, NetworkType } from "../DataTypes/enums";

interface RpcContextType {
    networkName: NetworkType;
    connected: boolean;
    rpcUrl: string;
    provider: ethers.JsonRpcProvider | ethers.BrowserProvider | null;
    walletAddress: string | null;
    connectToRpc: (customNetworkName: NetworkType, customRpcUrl?: string) => Promise<void>;
    setRpc: (customNetworkName: NetworkType, customRpcUrl?: string) => void;
    disconnectWallet: () => void;
}

const defaultRpcContextValue: RpcContextType = {
    networkName: "Polygon",
    connected: false,
    rpcUrl: "",
    provider: null,
    walletAddress: null,
    connectToRpc: async () => { },
    setRpc: () => { },
    disconnectWallet: () => { },
};

const RpcContext = createContext<RpcContextType>(defaultRpcContextValue);
const RPC_ENDPOINT = import.meta.env.VITE_RPC_ENDPOINT;

export const RpcProvider = ({ children }: { children: ReactNode }) => {
    const [connected, setConnected] = useState(false);
    const [rpcUrl, setRpcUrl] = useState(RPC_ENDPOINT);
    const [networkName, setNetworkName] = useState<any>("Polygon");
    const [provider, setProvider] = useState<ethers.JsonRpcProvider | ethers.BrowserProvider | null>(null);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    // Function to set RPC provider and network
    const setRpc = (customNetworkName: NetworkType | "Users_Chain", customRpcUrl?: string) => {
        try {
            const customProvider = customRpcUrl ? new ethers.JsonRpcProvider(customRpcUrl) : undefined;

            // Set the RPC provider
            if (customProvider) {
                setProvider(customProvider);
                setRpcUrl(customRpcUrl);
            } else {
                // Default provider (MetaMask)
                const defaultProvider = new ethers.BrowserProvider(window.ethereum);
                setProvider(defaultProvider);
                setRpcUrl(customNetworkName === "Users_Chain" ? customRpcUrl : networks[customNetworkName || "Polygon"].rpcUrls[0]);
            }

            // Set network
            setNetworkName(customNetworkName || "Polygon");
        } catch (error) {
            setConnected(false);
            console.error("Error setting RPC:", error);
        }
    };

    const connectToRpc = async (customNetworkName: NetworkType, customRpcUrl?: string) => {
        try {
            if (window.ethereum) {
                // Attempt to switch the network in MetaMask
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: networks[customNetworkName].chainId }],
                }).catch(async (switchError: any) => {
                    if (switchError.code === 4902) {
                        await window.ethereum.request({
                            method: "wallet_addEthereumChain",
                            params: [{
                                ...networks[customNetworkName],
                                rpcUrls: [customRpcUrl || networks[customNetworkName].rpcUrls[0]],
                            }],
                        });
                    } else throw switchError;
                });

                // Retrieve wallet address
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
                setConnected(true);
            } else {
                setConnected(false);
                console.error("Ethereum provider not available");
            }
        } catch (error) {
            setConnected(false);
            console.error("Error connecting to wallet:", error);
        }
    };

    // Function to disconnect wallet
    const disconnectWallet = () => {
        setWalletAddress(null);
        setConnected(false);
    };


    return (
        <RpcContext.Provider value={{ networkName, connected, rpcUrl, provider, walletAddress, connectToRpc: connectToRpc, setRpc, disconnectWallet }}>
            {children}
        </RpcContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRpc = () => useContext(RpcContext);
