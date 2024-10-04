/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Text } from "@radix-ui/themes";
import { selectAllContracts } from "../../redux/slices/BackendSlices/Blockchain/AllContractsSlice"; // Assuming the correct import path
import ContractInfoCard from "../../Components/Cards/ContractInfoCard";
import { fetchAllContracts } from "../../redux/slices/BackendSlices/Blockchain/ContractApiSlice";
import { AppDispatch } from "../../redux/store";
import Grid from "../../Components/Grid";
import { useNavigate } from "react-router-dom";

const ContractsGrid: React.FC = () => {
    const dispatch = useDispatch();
    const contracts = useSelector(selectAllContracts);
    const navigate = useNavigate()
    // Fetch contracts when the component mounts
    useEffect(() => {
        (dispatch as AppDispatch)(fetchAllContracts());
    }, [dispatch]);

    const navigateUser = (contract: { contractName: any; }) => {
        navigate(`/contract/${contract.contractName}`)
    }
    // Render contracts in a grid layout
    return (

        <Grid columns="2" gap="3" width="auto" rows="repeat(3, 164px)">
            {contracts && contracts.length > 0 ? (
                contracts.map((contract: any, index: any) => (
                    <Box
                        key={index}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "16px",
                        }}
                    >
                        <ContractInfoCard buttonText="Deploy" handleButtonClick={() => navigateUser(contract)} contractInfo={contract} cardType={"multiple"} />
                    </Box>
                ))
            ) : (
                <Text>No contracts available.</Text>
            )}
        </Grid>
    );
};

export default ContractsGrid;
