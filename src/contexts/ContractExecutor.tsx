import { useRpc } from "./RpcProviderContext";
import { useReadContract } from "./Contracts/useReadContract";
import { useContractWrite } from "./Contracts/useContractWrite";
import { useDeployContract } from "./Contracts/useDeployContract";

export const useContractExecutor = () => {
    const { provider } = useRpc();

    const executeContract = async (params: {
        operation: "read" | "write" | "deploy";
        contractAddress?: string;
        abi?: any;
        bytecode?: string;
        functionName?: string;
        inputs?: any[];
    }) => {
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
            return await readContract(contractAddress!, abi!, functionName!, inputs);
        }
        await window?.ethereum.request({ method: "eth_requestAccounts" });

        const signer = await provider.getSigner();

        if (!signer) throw new Error("No signer available");

        if (operation === "write") {
            const { writeContract } = useContractWrite(signer);
            return await writeContract(contractAddress!, abi!, functionName!, inputs);
        }

        if (operation === "deploy") {
            const { deployContract } = useDeployContract(signer);
            console.log("deploying");
            
            return await deployContract(abi!, bytecode!, inputs);
        }
    };

    return { executeContract };
};
