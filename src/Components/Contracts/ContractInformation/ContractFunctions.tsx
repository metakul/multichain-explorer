import React, { useState } from "react";
import MobileTabNavigation2 from "../../../pages/Projects/Blockchain/[contracts]";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

interface ContractFunctionProps {
    abi: any;
}

const ContractFunctions: React.FC<ContractFunctionProps> = ({ abi }) => {
    const [selectedFunction, setSelectedFunction] = useState<any>(null);
    
    const readFunctions = abi.filter((item: any) => item.type === "function" && item.stateMutability === "view");
    const writeFunctions = abi.filter((item: any) => item.type === "function" && item.stateMutability !== "view");

    const handleFunctionClick = (func: any) => {
        setSelectedFunction(func);
    };

    const renderFunctions = (functions: any[]) => (
        <Box>
            {functions.map((func: any) => (
                <Box key={func.name} sx={{ mb: 1, cursor: "pointer" }} onClick={() => handleFunctionClick(func)}>
                    <Typography variant="body1">{func.name}</Typography>
                </Box>
            ))}
        </Box>
    );

    return (
        <Box display="flex" gap={1}>
            <Box flex={1}>
                <MobileTabNavigation2
                    tabs={[
                        { value: "Read", label: "Read", content: renderFunctions(readFunctions) },
                        { value: "Write", label: "Write", content: renderFunctions(writeFunctions) }
                    ]}
                />
            </Box>
            {selectedFunction && (
                <Box flex={1} p={3} border={1} borderRadius={2}>
                    <Typography variant="h5" mb={2}>{selectedFunction.name} ({selectedFunction.stateMutability})</Typography>
                    
                    {selectedFunction?.inputs.length > 0 && (
                        <>
                            <Typography variant="body1" mt={2}>Inputs</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Name</strong></TableCell>
                                            <TableCell><strong>Type</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedFunction.inputs.map((input: any, index: number) => (
                                            <TableRow key={index}>
                                                <TableCell>{input.name || "-"}</TableCell>
                                                <TableCell>{input.type}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    )}

                    {selectedFunction?.outputs.length > 0 && (
                        <>
                            <Typography variant="body1" mt={2}>Return Types</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Type</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedFunction.outputs.map((output: any, index: number) => (
                                            <TableRow key={index}>
                                                <TableCell>{output.type}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default ContractFunctions;
