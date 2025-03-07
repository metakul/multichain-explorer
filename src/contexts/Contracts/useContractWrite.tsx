import { ethers } from "ethers";

export const useContractWrite = (signer: ethers.Signer) => {
    const writeContract = async (contractAddress: string, abi: any, functionName: string, inputs: any[] = []) => {
        const contract = new ethers.Contract(contractAddress, abi, signer);
        if (!contract[functionName]) throw new Error(`Function ${functionName} not found`);

        const tx = await contract[functionName](...inputs);
        const receipt = await tx.wait();

        return {
            transactionHash: tx.hash,
            receipt,
        };
    };

    return { writeContract };
};
