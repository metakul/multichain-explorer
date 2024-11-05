/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container,  Table } from "@radix-ui/themes";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { ITrx } from "../../interfaces/interface";

interface TrxInfoProps {
    transaction: any;
    loading: boolean;
    error: any
}

export default function TransactionInfo({ transaction, loading, error }: TrxInfoProps) {

    const navigate = useNavigate()
    if (loading) {
        return <Container>Loading Transaction Info</Container>;
    }

    if (error) {
        return <Container>{error}</Container>;
    }
    if (transaction && transaction.length > 0) {
        return (
            <Container>
                <Table.Root variant="surface">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Transaction Hash |</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Block |</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>From |</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>To |</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Value |</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Txn Fee</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>View Txn </Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {transaction.map((transaction: ITrx) => (
                            <Table.Row key={transaction.hash}>
                                <Table.Cell>{transaction.hash.slice(0, 16)}...</Table.Cell>
                                <Table.Cell>{transaction.blockNumber}</Table.Cell>
                                <Table.Cell>{transaction.from.slice(0, 8)}...{transaction.from.slice(-8)}</Table.Cell>
                                <Table.Cell>{transaction.to.slice(0, 8)}...{transaction.to.slice(-8)}</Table.Cell>
                                <Table.Cell>{(transaction.value / 10 ** 18).toFixed(5)} ETH</Table.Cell>
                                <Table.Cell>{(parseFloat(transaction.gasPrice) / 10 ** 18).toFixed(12)}</Table.Cell>
                                <Table.Cell>
                                    <EyeOpenIcon onClick={() => { navigate(transaction.hash) }} />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Container>
        );
    }

}
