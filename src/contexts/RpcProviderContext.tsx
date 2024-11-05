/* eslint-disable @typescript-eslint/no-explicit-any */
// RpcProviderContext.ts
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ethers } from "ethers";
import { networks, NetworkType } from "../DataTypes/enums";

interface RpcContextType {
    networkName: NetworkType;
    connected: boolean;
    rpcUrl: string;
    provider: ethers.JsonRpcProvider | ethers.BrowserProvider | null;
    connectToRpc: (customNetworkName: NetworkType, customRpcUrl?: string) => Promise<void>;
}

const defaultRpcContextValue: RpcContextType = {
    networkName: "Polygon",
    connected: false,
    rpcUrl: "",
    provider: null,
    connectToRpc: async () => { },
};

const RpcContext = createContext<RpcContextType>(defaultRpcContextValue);
const RPC_ENDPOINT = import.meta.env.VITE_RPC_ENDPOINT;

export const RpcProvider = ({ children }: { children: ReactNode }) => {
    const [connected, setConnected] = useState(false);
    const [rpcUrl, setRpcUrl] = useState(RPC_ENDPOINT);
    const [networkName, setNetworkName] = useState<NetworkType>("Polygon");
    const [provider, setProvider] = useState<ethers.JsonRpcProvider | ethers.BrowserProvider | null>(null);

    const connectToRpc = async (customNetworkName: NetworkType, customRpcUrl?: string) => {
        try {
            // Create a new provider using the custom RPC URL if provided
            const customProvider = customRpcUrl ? new ethers.JsonRpcProvider(customRpcUrl) : undefined;

            if (customProvider) {
                // Attempt to switch the network in MetaMask
                if (window.ethereum) {
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: networks[customNetworkName].chainId }],
                    }).catch(async (switchError: any) => {
                        if ((switchError as any).code === 4902) {
                            // If the network isn't available in MetaMask, add it
                            await window.ethereum.request({
                                method: "wallet_addEthereumChain",
                                params: [{
                                    ...networks[customNetworkName],
                                    rpcUrls: [customRpcUrl], // Update the RPC URLs to include the custom one
                                }],
                            });
                        } else throw switchError;
                    });
                } else {
                    setConnected(false);
                    return;
                }

                // Set the provider and network details
                setProvider(customProvider);
                setRpcUrl(customRpcUrl);
                setNetworkName(customNetworkName);
                setConnected(true);
            } else {
                // Fallback: switch using MetaMask without a custom RPC URL
                if (window.ethereum) {
                    const defaultProvider = new ethers.BrowserProvider(window.ethereum );
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: networks[customNetworkName].chainId }],
                    }).catch(async (switchError: any) => {
                        if ((switchError as any).code === 4902) {
                            // Add the network if not available
                            await window.ethereum.request({
                                method: "wallet_addEthereumChain",
                                params: [{ ...networks[customNetworkName] }],
                            });
                        } else throw switchError;
                    });

                    setProvider(defaultProvider);
                    setRpcUrl(networks[customNetworkName].rpcUrls[0]);
                    setNetworkName(customNetworkName);
                    setConnected(true);
                } else {
                    setConnected(false);
                }
            }
        } catch (error) {
            setConnected(false);
        }
    };


    useEffect(() => {
        connectToRpc(networkName);
    }, [networkName]);

    return (
        <RpcContext.Provider value={{ networkName, connected, rpcUrl, provider, connectToRpc }}>
            {children}
        </RpcContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRpc = () => useContext(RpcContext);
