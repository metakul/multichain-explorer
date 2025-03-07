import { ethers } from "ethers";

export const useReadContract = (provider: ethers.Provider | ethers.Signer) => {
    const readContract = async (contractAddress: string, abi: any, functionName: string, inputs: any[] = []) => {
        const contract = new ethers.Contract(contractAddress, abi, provider);
        if (!contract[functionName]) throw new Error(`Function ${functionName} not found`);

        const result = await contract[functionName](...inputs);
        return result;
    };

    return { readContract };
};
