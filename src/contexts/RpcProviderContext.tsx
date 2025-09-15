/* eslint-disable @typescript-eslint/no-explicit-any */
// RpcProviderContext.ts
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ethers } from "ethers";
import { networks, NetworkType } from "../DataTypes/enums";

interface RpcContextType {
  networkName: NetworkType;
  connected: boolean;
  rpcUrl: string;
  provider: ethers.JsonRpcProvider | ethers.BrowserProvider | null;
  walletAddress: string | null;
  signer: ethers.JsonRpcSigner | null;
  connectToRpc: (
    customNetworkName: NetworkType,
    customRpcUrl?: string
  ) => Promise<void>;
  setRpc: (customNetworkName: NetworkType, customRpcUrl?: string) => void;
  disconnectWallet: () => void;
}

const defaultRpcContextValue: RpcContextType = {
  networkName: "Polygon",
  connected: false,
  rpcUrl: "",
  provider: null,
  walletAddress: null,
  signer: null,
  connectToRpc: async () => {},
  setRpc: () => {},
  disconnectWallet: () => {},
};

const RpcContext = createContext<RpcContextType>(defaultRpcContextValue);

export const RpcProvider = ({
  children,
  initialNetworkType,
  initialRpcUrl,
}: {
  children: ReactNode;
  initialNetworkType: NetworkType;
  initialRpcUrl: string;
}) => {
  const [connected, setConnected] = useState(false);
  const [rpcUrl, setRpcUrl] = useState<string>(initialRpcUrl);
  const [networkName, setNetworkName] = useState<any>(initialNetworkType);
  const [provider, setProvider] = useState<
    ethers.JsonRpcProvider | ethers.BrowserProvider | null
  >(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

  useEffect(() => {
    setRpc(initialNetworkType, initialRpcUrl);
  }, [initialNetworkType, initialRpcUrl]);

  // Function to set RPC provider and network
  const setRpc = (
    customNetworkName: NetworkType | "Users_Chain",
    customRpcUrl?: string
  ) => {
    try {
      if (customRpcUrl) {
        // Use a direct JsonRpcProvider for custom RPC
        const customProvider = new ethers.JsonRpcProvider(customRpcUrl);
        setProvider(customProvider);
        setRpcUrl(customRpcUrl);
      } else {
        // Use MetaMask if available
        if (typeof window !== "undefined" && (window as any).ethereum) {
          const metamaskProvider = new ethers.BrowserProvider(
            (window as any).ethereum
          );
          setProvider(metamaskProvider);
          setRpcUrl(
            customNetworkName === "Users_Chain"
              ? customRpcUrl || ""
              : networks[customNetworkName || "Polygon"].rpcUrls[0]
          );
        } else {
          console.warn("No injected wallet provider (MetaMask) found");
          setProvider(null);
          setRpcUrl("");
          setConnected(false);
          return;
        }
      }

      setNetworkName(customNetworkName);
    } catch (error) {
      setConnected(false);
      console.error("Error setting RPC:", error);
    }
  };

  const connectToRpc = async (
    customNetworkName: NetworkType,
    customRpcUrl?: string
  ) => {
    try {
      let selectedProvider:
        | ethers.JsonRpcProvider
        | ethers.BrowserProvider
        | null = null;

      // If a custom RPC URL is provided, use JsonRpcProvider
      if (customRpcUrl) {
        selectedProvider = new ethers.JsonRpcProvider(customRpcUrl);

        if (typeof window !== "undefined" && (window as any).ethereum) {
          try {
            await (window as any).ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: networks[customNetworkName].chainId }],
            });
          } catch (switchError: any) {
            if (switchError.code === 4902) {
              // If the chain is not added in MetaMask, add it
              await (window as any).ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    ...networks[customNetworkName],
                    rpcUrls: [customRpcUrl],
                  },
                ],
              });
            } else {
              throw switchError;
            }
          }
        }

        setRpcUrl(customRpcUrl);
        setNetworkName(customNetworkName);
        setConnected(true);
      } else {
        // If no custom RPC, fall back to MetaMask (BrowserProvider)
        if (typeof window !== "undefined" && (window as any).ethereum) {
          selectedProvider = new ethers.BrowserProvider(
            (window as any).ethereum
          );

          try {
            await (window as any).ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: networks[customNetworkName].chainId }],
            });
          } catch (switchError: any) {
            if (switchError.code === 4902) {
              await (window as any).ethereum.request({
                method: "wallet_addEthereumChain",
                params: [{ ...networks[customNetworkName] }],
              });
            } else {
              throw switchError;
            }
          }

          setRpcUrl(networks[customNetworkName].rpcUrls[0]);
          setNetworkName(customNetworkName);
          setConnected(true);
        } else {
          alert("No injected wallet provider (MetaMask) found.");
          setConnected(false);
          return;
        }
      }

      // Save provider to state
      if (selectedProvider) {
        setProvider(selectedProvider);

        // Request accounts from MetaMask (if available)
        if (typeof window !== "undefined" && (window as any).ethereum) {
          const accounts = await (window as any).ethereum.request({
            method: "eth_requestAccounts",
          });
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        }

        // Set signer only if it's a BrowserProvider (MetaMask)
        if (selectedProvider instanceof ethers.BrowserProvider) {
          const signer = await selectedProvider.getSigner();
          setSigner(signer);
        }
      }
    } catch (error) {
      console.error("Error connecting to RPC:", error);
      setConnected(false);
    }
  };

  // Function to disconnect wallet
  const disconnectWallet = () => {
    setWalletAddress(null);
    setConnected(false);
    setSigner(null);
  };

  return (
    <RpcContext.Provider
      value={{
        networkName,
        connected,
        rpcUrl,
        provider,
        walletAddress,
        signer,
        connectToRpc: connectToRpc,
        setRpc,
        disconnectWallet,
      }}
    >
      {children}
    </RpcContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRpc = () => useContext(RpcContext);
