import { createContext, useContext, useState, ReactNode } from "react";
import { ethers } from "ethers";
import { Eip1193Provider } from "ethers";

// Define the type for the context value
interface RpcContextType {
    connected: boolean;
    rpcUrl: string;
    provider: ethers.JsonRpcProvider | ethers.BrowserProvider | null;
    connectToRpc: (rpcUrl?: string) => Promise<void>;
}

// Create a default context value
const defaultRpcContextValue: RpcContextType = {
    connected: false,
    rpcUrl: "",
    provider: null,
    connectToRpc: async () => { },
};

// Create the context with the default value
const RpcContext = createContext<RpcContextType>(defaultRpcContextValue);

// Provider component
interface RpcProviderProps {
    children: ReactNode;
}

export const RpcProvider = ({ children }: RpcProviderProps) => {
    const [connected, setConnected] = useState<boolean>(false);
    const [rpcUrl, setRpcUrl] = useState<string>("");
    const [provider, setProvider] = useState<ethers.JsonRpcProvider | ethers.BrowserProvider | null>(null);

    // Function to connect to either a custom RPC or MetaMask (if available)
    const connectToRpc = async (customRpcUrl?: string) => {
        try {
            if (customRpcUrl) {
                
                // Use the custom RPC URL
                const customProvider = new ethers.JsonRpcProvider(customRpcUrl);
                setProvider(customProvider);
                setRpcUrl(customRpcUrl);
                setConnected(true);
            } else if (typeof window.ethereum !== "undefined") {
                // Default to MetaMask provider
                const browserProvider = new ethers.BrowserProvider(window.ethereum as Eip1193Provider);
                setProvider(browserProvider);
                setConnected(true);
            } else {
                console.warn("No provider found. Please install MetaMask or provide a valid RPC URL.");
                setConnected(false);
            }
        } catch (error) {
            console.error("Error connecting to RPC:", error);
            setConnected(false);
        }
    };

    return (
        <RpcContext.Provider value={{ connected, rpcUrl, provider, connectToRpc }}>
            {children}
        </RpcContext.Provider>
    );
};

// Hook to use the RPC context
export const useRpc = () => {
    return useContext(RpcContext);
};
