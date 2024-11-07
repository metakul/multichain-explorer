/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container,  Table } from "@radix-ui/themes";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { ITrx } from "../../interfaces/interface";
import { navigateToAddress, navigateToBlock, navigateToTransaction } from "../../helpers/navigationHelpers";
import { useNavigate } from "react-router-dom";

interface TrxInfoProps {
    transaction: any;
    loading: boolean;
    error: any
}

export default function TransactionInfo({ transaction, loading, error }: TrxInfoProps) {

    const navigate=useNavigate()
    // Render a skeleton table if loading
    if (loading) {
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
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Table.Row key={index}>
                                <Table.Cell><div style={{ backgroundColor: '#e0e0e0', height: '16px', width: '100px', borderRadius: '4px' }} /></Table.Cell>
                                <Table.Cell><div style={{ backgroundColor: '#e0e0e0', height: '16px', width: '40px', borderRadius: '4px' }} /></Table.Cell>
                                <Table.Cell><div style={{ backgroundColor: '#e0e0e0', height: '16px', width: '80px', borderRadius: '4px' }} /></Table.Cell>
                                <Table.Cell><div style={{ backgroundColor: '#e0e0e0', height: '16px', width: '80px', borderRadius: '4px' }} /></Table.Cell>
                                <Table.Cell><div style={{ backgroundColor: '#e0e0e0', height: '16px', width: '60px', borderRadius: '4px' }} /></Table.Cell>
                                <Table.Cell><div style={{ backgroundColor: '#e0e0e0', height: '16px', width: '60px', borderRadius: '4px' }} /></Table.Cell>
                                <Table.Cell style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
                                    <div style={{ backgroundColor: '#e0e0e0', height: '24px', width: '24px', borderRadius: '50%' }} />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Container>
        );
    }

    if (transaction.length == 0 && !loading && !error) {
        return <Container>No Transaction Founds</Container>;
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
                        {transaction.map((singleTrx: ITrx) => (
                            <Table.Row key={singleTrx?.hash}>
                                <Table.Cell style={{ color: "blue", }} onClick={() => navigateToTransaction(navigate,singleTrx?.hash)}>
                                    {singleTrx?.hash.slice(0, 16)}...
                                </Table.Cell>
                                <Table.Cell style={{ color: "blue", }} onClick={() => navigateToBlock(navigate,singleTrx?.blockNumber)}>
                                    {singleTrx?.blockNumber}
                                </Table.Cell>
                                <Table.Cell style={{ color: "blue", }} onClick={() => navigateToAddress(navigate,singleTrx?.from)}>
                                    {singleTrx?.from?.slice(0, 8)}...{singleTrx?.from?.slice(-8)}
                                </Table.Cell>
                                <Table.Cell style={{ color: "blue", }} onClick={() => navigateToAddress(navigate,singleTrx?.to)}>
                                    {singleTrx?.to?.slice(0, 8)}...{singleTrx?.to?.slice(-8)}
                                </Table.Cell>
                                <Table.Cell >
                                    {(singleTrx?.value / 10 ** 18)?.toFixed(5)} ETH
                                </Table.Cell>
                                <Table.Cell>
                                    {(parseFloat(singleTrx?.gasPrice) / 10 ** 18)?.toFixed(12)}
                                </Table.Cell>
                                <Table.Cell style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: 16
                                }}>
                                    <EyeOpenIcon onClick={() => navigateToTransaction(navigate,singleTrx?.hash)} />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Container>
        );
    }

}
