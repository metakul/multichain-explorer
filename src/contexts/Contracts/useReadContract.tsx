import { ethers } from "ethers";

export const useReadContract = (provider: ethers.Provider | ethers.Signer) => {
    const readContract = async (contractAddress: string, abi: any, functionName: string, inputs: any[] = []) => {

        
        const iface = new ethers.Interface(abi);
        if (!iface.getFunction(functionName)) {
            throw new Error(`Function ${functionName} does not exist in provided ABI`);
        }

        const contract = new ethers.Contract(contractAddress, abi, provider);
        
        if (!contract[functionName]) {
            throw new Error(`Function ${functionName} not found on contract instance`);
        }
        const result = await contract[functionName](...inputs);

        return result;
    };

    return { readContract };
};
