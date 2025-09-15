import { useState } from "react";
import { useRpc } from "./RpcProviderContext";
import { useReadContract } from "./Contracts/useReadContract";
import { useContractWrite } from "./Contracts/useContractWrite";
import { useDeployContract } from "./Contracts/useDeployContract";

type ExecuteParams = {
    operation: "read" | "write" | "deploy";
    contractAddress?: string;
    abi?: any;
    bytecode?: string;
    functionName?: string;
    inputs?: any[];
};

export const useContractExecutor = () => {
    const { provider, signer } = useRpc();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const executeContract = async (params: ExecuteParams) => {
        setLoading(true);
        setError(null);

        try {
            if (!provider) throw new Error("No provider available");

            const {
                operation,
                contractAddress,
                abi,
                bytecode,
                functionName,
                inputs = [],
            } = params;

            if (operation === "deploy" && (!abi || !bytecode)) {
                throw new Error("ABI and bytecode are required for deployment");
            }

            if ((operation === "read" || operation === "write") && (!contractAddress || !abi || !functionName)) {
                throw new Error("Contract address, ABI, and function name are required for read/write");
            }
            
            if (operation === "read") {
                const { readContract } = useReadContract(provider);
                
                const result = await readContract(contractAddress!, abi!, functionName!, inputs);
                setLoading(false);
                return result;
            }

            if (!signer) throw new Error("No signer available");

            if (operation === "write") {
                const { writeContract } = useContractWrite(signer);
                const result = await writeContract(contractAddress!, abi!, functionName!, inputs);
                setLoading(false);
                return result;
            }

            if (operation === "deploy") {
                const { deployContract } = useDeployContract(signer);
                const result = await deployContract(abi!, bytecode!, inputs);
                setLoading(false);
                return result;
            }
        } catch (err: any) {
            setLoading(false);
            setError(err.message || "Unknown error occurred");
            throw err;  // This ensures the caller can still handle errors if needed
        }
    };

    return { executeContract, loading, error };
};
