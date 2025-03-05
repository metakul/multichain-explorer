import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { getColors } from "../../../layout/Theme/themes";

interface ContractInteractionProps {
    selectedFunction: any;
}

const ContractInteraction: React.FC<ContractInteractionProps> = ({ selectedFunction }) => {
    if (!selectedFunction) return null;

    return (
        <Box flex={1} p={3} border={1} borderRadius={2} sx={{
            background:getColors().secondary[900],
        }}>
            <Typography variant="h6" mb={2}>{selectedFunction.name} ({selectedFunction.stateMutability})</Typography>
            
            {selectedFunction?.inputs.length > 0 && (
                <Box sx={{
                    background:getColors().secondary[900],
                }}>
                    <Typography variant="body1" mt={2}>Inputs</Typography>
                    <TableContainer component={Paper} sx={{
            background:getColors().blueAccent[900],
        }}>
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
                </Box>
            )}

            {selectedFunction?.outputs.length > 0 && (
                <>
                    <Typography variant="body1" mt={2}>Return Types</Typography>
                    <TableContainer component={Paper} sx={{
            background:getColors().blueAccent[900],
        }}>
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
    );
};

export default ContractInteraction;
