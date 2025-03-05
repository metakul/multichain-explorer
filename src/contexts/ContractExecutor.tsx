import { ethers } from "ethers";
import { useRpc } from "./RpcProviderContext";  // Update with the actual path

export const useContractExecutor = () => {
    const { provider, walletAddress } = useRpc();

    const executeContractFunction = async (
        contractAddress: string,
        abi: any,
        functionName: string,
        inputs: any[]
    ) => {
        if (!provider) {
            console.error("No provider available");
            return;
        }

        try {
            // Ensure provider can sign (we need signer, not just provider for transactions)
            const signer = await provider.getSigner();

            if (!signer) {
                console.error("No signer found");
                return;
            }

            const contract = new ethers.Contract(contractAddress, abi, signer);

            if (!contract[functionName]) {
                console.error(`Function ${functionName} not found in contract`);
                return;
            }

            console.log(`Executing ${functionName} with inputs:`, inputs,abi);

            // Send transaction
            const tx = await contract[functionName](...inputs);
            console.log("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            console.log("Transaction confirmed:", receipt);
        } catch (error) {
            console.error("Error executing contract function:", error);
        }
    };

    return { executeContractFunction };
};
