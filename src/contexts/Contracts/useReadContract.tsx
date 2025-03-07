import { ethers } from "ethers";

export const useReadContract = (provider: ethers.Provider | ethers.Signer) => {
    const readContract = async (contractAddress: string, abi: any, functionName: string, inputs: any[] = []) => {

        console.log(contractAddress,abi,functionName,inputs);
        
        const iface = new ethers.Interface(abi);
        if (!iface.getFunction(functionName)) {
            throw new Error(`Function ${functionName} does not exist in provided ABI`);
        }

        const contract = new ethers.Contract(contractAddress, abi, provider);
        console.log(contract);
        
        if (!contract[functionName]) {
            throw new Error(`Function ${functionName} not found on contract instance`);
        }
        const decimals = await contract.decimals();  // Directly call to see if this works
        console.log("Decimals:", decimals);
        console.log(`Calling ${functionName} with inputs:`, inputs);
        const result = await contract[functionName](...inputs);

        return result;
    };

    return { readContract };
};
