import React from "react";
import { Table } from "@radix-ui/themes";

interface CustomTableProps {
    children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTable: React.FC<CustomTableProps & any> = ({ children, ...props }) => {
    return (
        <Table.Root {...props}>
            {children}
        </Table.Root>
    );
};

export const CustomTableHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Table.Header>
            <Table.Row>{children}</Table.Row>
        </Table.Header>
    );
};

// CustomTableRow.tsx
export const CustomTableRow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Table.Row>
            {children}
        </Table.Row>
    );
};

// CustomTableCell.tsx
export const CustomTableCell: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void }> = ({ children, style, onClick }) => {
    return (
        <Table.Cell style={style} onClick={onClick}>
            {children}
        </Table.Cell>
    );
};


export default CustomTable;
