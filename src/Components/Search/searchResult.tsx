
import { useSelector } from "react-redux";
import { Container, Heading, Table } from "@radix-ui/themes";
import { selectTransactionBySearchInput } from "../../redux/slices/BackendSlices/Explorer/ExplorerResultSlice";
import "./styles.css";
import { ExplorerResult } from "../../interfaces/interface";

interface SearchResultsProps {
    searchInput: string;
}

export default function SearchResults({ searchInput }: SearchResultsProps) {
    const transaction: ExplorerResult | undefined = useSelector(selectTransactionBySearchInput(searchInput));

    if (!transaction) {
        return <Container>No transaction found with the given trxId.</Container>;
    }

    return (
        <Container>
            <Heading>Transaction Details</Heading>
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Transaction Hash |</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Block |</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>From |</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>To |</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Value |</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Txn Fee</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row key={transaction.hash}>
                        <Table.Cell>{transaction.hash.slice(0, 16)}...</Table.Cell>
                        <Table.Cell>{transaction.blockNumber}</Table.Cell>
                        <Table.Cell>
                            {transaction.from.slice(0, 8)}...{transaction.from.slice(-8)}
                        </Table.Cell>
                        <Table.Cell>
                            {transaction.to.slice(0, 8)}...{transaction.to.slice(-8)}
                        </Table.Cell>
                        <Table.Cell>{(transaction.value / 10 ** 18).toFixed(5)} ETH</Table.Cell>
                        <Table.Cell>{(parseFloat(transaction.gasPrice) / 10 ** 18).toFixed(12)}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>
        </Container>
    );
}
