import { ethers } from "ethers";
import { useRpc } from "./RpcProviderContext";  // Update with your actual path

export const useContractExecutor = () => {
    const { provider } = useRpc();

    const executeContractFunction = async (
        contractAddress: string,
        abi: any,
        functionName: string,
        inputs: any[],
        isWrite: boolean = false // ✅ Default to false for read calls like balanceOf
    ) => {
        if (!provider) {
            console.error("No provider available");
            return;
        }

        try {
            let contract;

            if (isWrite) {
                // Write mode (uses signer for transactions)
                const signer = await provider.getSigner();
                if (!signer) {
                    console.error("No signer found");
                    return;
                }
                contract = new ethers.Contract(contractAddress, abi, signer);
            } else {
                // Read mode (uses provider for view functions like balanceOf)
                contract = new ethers.Contract(contractAddress, abi, provider);
            }

            if (!contract[functionName]) {
                console.error(`Function ${functionName} not found in contract`);
                return;
            }


            if (isWrite) {
                // Transaction flow
                const tx = await contract[functionName](...inputs);
                console.log("Transaction sent:", tx.hash);

                const receipt = await tx.wait();
                console.log("Transaction confirmed:", receipt);

                return receipt;
            } else {
                // Read call flow (balanceOf, etc.)
                const result = await contract[functionName](...inputs);
                console.log(`${functionName} result:`, result);

                return result;
            }
        } catch (error) {
            console.error("Error executing contract function:", error);
        }
    };

    return { executeContractFunction };
};
