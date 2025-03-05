import React from "react";
import { Table, TableHead,  TableRow, TableCell, TableProps, TableContainer, Paper, TableBody } from "@mui/material";
import { getColors } from "../../../layout/Theme/themes";

interface CustomTableProps extends TableProps {
    children: React.ReactNode;
}

const CustomTable: React.FC<CustomTableProps> = ({ children, ...props }) => {
    return (
        <TableContainer component={Paper} sx={{
            background:getColors().primary[900]
        }}>
            <Table {...props}>
                {children}
            </Table>
        </TableContainer>
    );
};

export const CustomTableHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <TableHead>
            <TableRow>{children}</TableRow>
        </TableHead>
    );
};
export const CustomTableBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <TableBody>
            <TableRow>{children}</TableRow>
        </TableBody>
    );
};

export const CustomTableRow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <TableRow>{children}</TableRow>;
};

export const CustomTableCell: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void }> = ({ children, style, onClick }) => {
    return (
        <TableCell style={style} onClick={onClick}>
            {children}
        </TableCell>
    );
};

export default CustomTable;
