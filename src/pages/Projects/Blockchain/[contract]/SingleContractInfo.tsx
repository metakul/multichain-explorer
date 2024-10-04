/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // To extract contractName from URL
import { fetchContractByName } from "../../../../redux/slices/BackendSlices/Blockchain/ContractApiSlice"; // Assuming the correct import path
import { selectContractDetails } from "../../../../redux/slices/BackendSlices/Blockchain/ContractSlice";
import { AppDispatch } from "../../../../redux/store";
import { Box, Text } from "@radix-ui/themes";
import ContractInfoCard from "../../../../Components/Cards/ContractInfoCard";

const SingleContractPage: React.FC = () => {
    const { contractName } = useParams<{ contractName: string }>(); // Extract contractName from URL
    const dispatch = useDispatch<AppDispatch>();

    const contract = useSelector(selectContractDetails); // Assuming this selector filters based on contractName

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

    // Render the contract information using ContractInfoCard
    
    return (
        <Box>
            <ContractInfoCard
                contractInfo={contract}
                cardType="single"
                buttonText="Deploy"
                handleButtonClick={() => console.log("Interact with contract")}
            />
        </Box>
    );
};

export default SingleContractPage;
