import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ethers } from "ethers";
import { Eip1193Provider } from "ethers";
import { networks, NetworkType } from "../DataTypes/enums";

// Define the type for the context value
interface RpcContextType {
    networkName: NetworkType;
    connected: boolean;
    rpcUrl: string;
    provider: ethers.JsonRpcProvider | ethers.BrowserProvider | null;
    connectToRpc: (customNetworkName: NetworkType, customRpcUrl?: string) => Promise<void>;
}

// Create a default context value
const defaultRpcContextValue: RpcContextType = {
    networkName: "polygon",
    connected: false,
    rpcUrl: "",
    provider: null,
    connectToRpc: async () => { },
};

// Create the context with the default value
const RpcContext = createContext<RpcContextType>(defaultRpcContextValue);
const RPC_ENDPOINT = import.meta.env.VITE_RPC_ENDPOINT;

console.log(RPC_ENDPOINT);

// Provider component
interface RpcProviderProps {
    children: ReactNode;
}

export const RpcProvider = ({ children }: RpcProviderProps) => {
    const [connected, setConnected] = useState<boolean>(false);
    const [rpcUrl, setRpcUrl] = useState<string>(RPC_ENDPOINT);
    const [networkName, setNetworkName] = useState<NetworkType>("polygon");
    const [provider, setProvider] = useState<ethers.JsonRpcProvider | ethers.BrowserProvider | null>(null);

    // Define connectToRpc function
    const connectToRpc = async (customNetworkName: NetworkType, customRpcUrl?: string) => {
        try {
            if (customRpcUrl) {
                // Use the custom RPC URL
                const customProvider = new ethers.JsonRpcProvider(customRpcUrl);
                setProvider(customProvider);
                setRpcUrl(customRpcUrl);
                setConnected(true);
                setNetworkName(customNetworkName);
            } else {
                // Default to Polygon's network or MetaMask provider
                const defaultProvider = window.ethereum
                    ? new ethers.BrowserProvider(window.ethereum as Eip1193Provider)
                    : null;

                if (defaultProvider) {
                    try {
                        // Attempt to switch to the Polygon network
                        await window.ethereum.request({
                            method: "wallet_switchEthereumChain",
                            params: [{ chainId: networks[customNetworkName].chainId }],
                        });
                    } catch (switchError) {
                        // If network isn't added, add it
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        if ((switchError as any).code === 4902) {
                            await window.ethereum.request({
                                method: "wallet_addEthereumChain",
                                params: [
                                    {
                                        ...networks[customNetworkName],
                                    },
                                ],
                            });
                        } else {
                            throw switchError; // Re-throw if it's a different error
                        }
                    }

                    setProvider(defaultProvider);
                    setRpcUrl(RPC_ENDPOINT);
                    setConnected(true);
                    setNetworkName("polygon");
                } else {
                    console.warn("No provider found. Please install MetaMask or provide a valid RPC URL.");
                    setConnected(false);
                }
            }
        } catch (error) {
            console.error("Error connecting to RPC:", error);
            setConnected(false);
        }
    };

    // Use effect to call connectToRpc whenever networkName or rpcUrl changes
    useEffect(() => {
        connectToRpc(networkName);
    }, [networkName, rpcUrl]); // Dependencies ensure connectToRpc runs whenever networkName or rpcUrl changes

    return (
        <RpcContext.Provider value={{ networkName, connected, rpcUrl, provider, connectToRpc }}>
            {children}
        </RpcContext.Provider>
    );
};

// Hook to use the RPC context
export const useRpc = () => {
    return useContext(RpcContext);
};
