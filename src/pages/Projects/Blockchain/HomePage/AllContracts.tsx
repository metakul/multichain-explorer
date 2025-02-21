/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllContracts } from "../../../../redux/slices/BackendSlices/Blockchain/AllContractsSlice";
import ContractInfoCard from "../../../../Components/Cards/ContractCard/ContractInfoCard";
import { fetchAllContracts } from "../../../../redux/slices/BackendSlices/Blockchain/ContractApiSlice";
import { AppDispatch } from "../../../../redux/store";
import Grid from "../../../../Components/UI/Grid";
import { useNavigate } from "react-router-dom";
import { ContractType, PROJECTS } from "../../../../DataTypes/enums";
import Box from "../../../../Components/UI/Box";
import Text from "../../../../Components/UI/Text";
import { useRpc } from "../../../../contexts/RpcProviderContext";

const ContractsGrid: React.FC = () => {
    const dispatch = useDispatch();
    const contractsByCategory = useSelector(selectAllContracts); // Now an object with categorized contracts
    const navigate = useNavigate();
    const { networkName } = useRpc();

    useEffect(() => {
        (dispatch as AppDispatch)(fetchAllContracts());
    }, []);

    console.log(contractsByCategory);

    const navigateUser = (contract: { contractName: string }) => {
        const path = `${PROJECTS.SINGLE_CONTRACT.replace(':contractName', contract.contractName)}/${networkName}`;
        navigate(path);
    };

    return (
        <Box>
            {contractsByCategory && Object.keys(contractsByCategory).length > 0 ? (
                Object.entries(contractsByCategory).map(([category, contracts]) => (
                    <Box key={category} style={{ marginBottom: "2px" }}>
                        <Text  style={{ marginBottom: "12px" }}>{category}</Text>
                        <Grid >
                            {contracts && contracts?.map((contract: any, index: number) => (
                                <Box
                                    key={index}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "8px",
                                        padding: "16px",
                                    }}
                                >
                                    <ContractInfoCard
                                        contractType={ContractType.Deploy}
                                        buttonText="Deploy"
                                        handleButtonClick={() => navigateUser(contract)}
                                        contractInfo={contract}
                                        cardType={"multiple"}
                                    />
                                </Box>
                            ))}
                        </Grid>
                    </Box>
                ))
            ) : (
                <Text>No contracts available.</Text>
            )}
        </Box>
    );
};

export default ContractsGrid;
