import React from 'react';
import { Table } from '@radix-ui/themes';
interface TableData {
  [key: string]: string | number | undefined; // Use a generic key-value pair for flexibility
}

interface CustomTableProps {
  columns: string[]; // Array of column headers
  data: TableData[]; // Array of data objects
}

const CustomTable: React.FC<CustomTableProps> = ({ columns, data }) => {
  console.log(columns,data);
  
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column, index) => (
            <Table.ColumnHeaderCell style={{ padding: "10px" }} key={index}>{column}</Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((row, rowIndex) => (
          <Table.Row key={rowIndex} >
            {columns.map((column, columnIndex) => (
              <Table.Cell key={columnIndex} style={{ padding: "10px 25px" }}>{row[column]}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default CustomTable;
