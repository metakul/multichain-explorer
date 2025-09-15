import React, { useEffect, useState } from "react";
import { getColors } from "../../../layout/Theme/themes";
import Box from "../../UI/Box";
import Text from "../../UI/Text";
import { Paper, Table, TableBody, TableContainer, TextField } from "@mui/material";
import { CustomTableBody, CustomTableCell, CustomTableHeader, CustomTableRow } from "../../UI/Table";
import { useContractExecutor } from "../../../contexts/ContractExecutor";
import SubmitTransactionButton from "../../Buttons/SubmitButton";

interface ContractInteractionProps {
    abi:any
    selectedFunction: any;
    deployedAddress?: string;
}

const ContractInteraction: React.FC<ContractInteractionProps> = ({ selectedFunction, deployedAddress ,abi}) => {
    const { executeContract, loading,error } = useContractExecutor();

    const [inputValues, setInputValues] = useState<string[]>([]);
    const [lastResult, setLastResult] = useState<any>("");

    if (!selectedFunction) return null;

    const handleInputChange = (index: number, value: string) => {
        const updatedInputs = [...inputValues];
        updatedInputs[index] = value;
        setLastResult("")
        setInputValues(updatedInputs);
    };

    useEffect(() => {
        setInputValues(Array(selectedFunction?.inputs?.length).fill(""));
    }, [selectedFunction]);
    

    const handleExecute = async() => {
        if (deployedAddress) {
    
            // Convert object to array of values only
            const valuesOnly = Object.values(inputValues);
    
            // Call the function with only values
            const result=await executeContract({operation:"read", contractAddress:deployedAddress, abi, functionName:selectedFunction.name,inputs: valuesOnly});
         // Convert BigInt result to a string if applicable
         setLastResult(typeof result === "bigint" ? result.toString() : result);
        }
    };
    


    return (
        <Box flex={1} p={3} border={1} borderRadius={2} sx={{
            background: getColors().secondary[900],
        }}>
            <Text variant="h6" mb={2}>{selectedFunction.name} ({selectedFunction.stateMutability})</Text>

            {selectedFunction?.inputs.length > 0 && (
                <Box sx={{
                    background: getColors().secondary[900],
                }}>
                    <Text variant="body1" mt={2}>Inputs</Text>
                    <TableContainer component={Paper} sx={{
                        background: getColors().blueAccent[900],
                    }}>
                        <Table>
                            <CustomTableHeader>
                                <CustomTableRow>
                                    <CustomTableCell><strong>Name</strong></CustomTableCell>
                                    <CustomTableCell><strong>Type</strong></CustomTableCell>
                                    <CustomTableCell><strong>Value</strong></CustomTableCell>
                                </CustomTableRow>
                            </CustomTableHeader>
                            <CustomTableBody>
                                {selectedFunction.inputs.map((input: any, index: number) => (
                                    <CustomTableRow key={index}>
                                        <CustomTableCell>{input.name || "-"}</CustomTableCell>
                                        <CustomTableCell>{input.type}</CustomTableCell>
                                        <CustomTableCell>
                                            <TextField
                                                size="small"
                                                variant="outlined"
                                                sx={{ background: getColors().secondary[800] }}
                                                value={inputValues[index] || ""}
                                                onChange={(e) => handleInputChange(index, e.target.value)}
                                            />
                                        </CustomTableCell>
                                    </CustomTableRow>
                                ))}
                            </CustomTableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
            {deployedAddress && (
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                }}>
                    <SubmitTransactionButton loading={loading}  onClick={handleExecute}>
                        Execute
                    </SubmitTransactionButton>
                </Box>
            )}
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                    color:getColors().redAccent[200]
                }}>
                  {lastResult}
                </Box>
                {error &&
                   <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2,
                    color:getColors().redAccent[200]
                }}>
                  {error}
                </Box>
}
            {selectedFunction?.outputs.length > 0 && (
                <>
                    <Text variant="body1" mt={2}>Return Types</Text>
                    <TableContainer component={Paper} sx={{
                        background: getColors().blueAccent[900],
                    }}>
                        <Table>
                            <CustomTableHeader>
                                <CustomTableRow>
                                    <CustomTableCell><strong>Type</strong></CustomTableCell>
                                </CustomTableRow>
                            </CustomTableHeader>
                            <TableBody>
                                {selectedFunction.outputs.map((output: any, index: number) => (
                                    <CustomTableRow key={index}>
                                        <CustomTableCell>{output.type}</CustomTableCell>
                                    </CustomTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </Box>
    );
};

export default ContractInteraction;
