import React, { useState } from "react";
import MobileTabNavigation from "../../UI/Tabs/MobileTabNavigation";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import ContractInteraction from "./ContractInteraction";

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
                <MobileTabNavigation
                    tabs={[
                        { value: "Read", label: "Read", content: renderFunctions(readFunctions) },
                        { value: "Write", label: "Write", content: renderFunctions(writeFunctions) }
                    ]}
                />
            </Box>
            {selectedFunction && (
                      <ContractInteraction selectedFunction={selectedFunction} />
            )}
        </Box>
    );
};

export default ContractFunctions;
