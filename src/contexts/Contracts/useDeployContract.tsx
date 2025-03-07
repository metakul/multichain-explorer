import { ethers } from "ethers";

export const useDeployContract = (signer: ethers.Signer) => {
    const deployContract = async (abi: any, bytecode: string, constructorArgs: any[] = []) => {
        const factory = new ethers.ContractFactory(abi, bytecode, signer);
        const deployedContract = await factory.deploy(...constructorArgs);

           // Wait for the deployment to finish and get the address
               const address =await deployedContract.getAddress()
                return {
                    address: address,
                    deployedContract,
                };
    };

    return { deployContract };
};


