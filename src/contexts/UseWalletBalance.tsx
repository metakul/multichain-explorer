import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useRpc } from "./RpcProviderContext";

export const useWalletBalance = () => {
  const { walletAddress, provider } = useRpc(); // Get wallet address and provider from context
  const [userBalance, setUserBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!walletAddress || !provider) {
        setIsError(true);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const balance = await provider.getBalance(walletAddress);
        setUserBalance(ethers.formatEther(balance)); // Formatting balance
      } catch (error) {
        console.error("Error fetching balance:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [walletAddress, provider]); // Dependencies to refetch if wallet or provider changes

  return { userBalance, isLoading, isError };
};
