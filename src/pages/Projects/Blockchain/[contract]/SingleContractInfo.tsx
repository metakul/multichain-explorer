/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchContractByName } from "../../../../redux/slices/BackendSlices/Blockchain/ContractApiSlice";
import { selectContractDetails } from "../../../../redux/slices/BackendSlices/Blockchain/ContractSlice";
import { AppDispatch } from "../../../../redux/store";
import { Box, Text } from "@radix-ui/themes";
import ContractInfoCard from "../../../../Components/Cards/ContractCard/ContractInfoCard";
import { ethers } from "ethers";

const SingleContractPage: React.FC = () => {
    const { contractName } = useParams<{ contractName: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const contract = useSelector(selectContractDetails);

    // Fetch the single contract when the component mounts
    useEffect(() => {
        if (contractName) {
            dispatch(fetchContractByName(contractName));
        }
    }, [dispatch, contractName]);

    // Handle loading or error cases
    if (!contract) {
        return <Text>Loading contract data...</Text>;
    }

    // Function to deploy contract
    const deployContract = async (constructorParams: any[]) => {
        try {
            if (!window.ethereum) throw new Error("No Ethereum wallet detected");

            // Request wallet connection
            if (window && window.ethereum && window.ethereum.request){

                await window?.ethereum.request({ method: "eth_requestAccounts" });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer =await provider.getSigner();
                
                // Prepare contract for deployment
                const factory = new ethers.ContractFactory(contract.abi, contract.bytecode, signer);
                
                // Deploy the contract
                const deployedContract = await factory.deploy(...constructorParams);
                
                console.log("Contract deployed at:", deployedContract.getAddress());
            }
        } catch (error) {
            console.error("Deployment error:", error);
        }
    };

    
    return (
        <Box>
            <ContractInfoCard
                contractInfo={contract}
                cardType="single"
                buttonText="Deploy"
                handleButtonClick={deployContract} // Pass deploy function
            />
        </Box>
    );
};

export default SingleContractPage;
