/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { Container, Heading, Table, Text } from "@radix-ui/themes";
import "./styles.css";

export default function SearchResults(props: { result: { hash: string | any[]; decoded_call: { label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }; block_number: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; block_timestamp: any; from_address: string; to_address: string | any[]; value: number; gas_price: number; }[]; searchInput: string; }) {
    return (
        <Container>
            <Heading >
                Latest 25 from a total of{" "}
                <span>{props.result.length}</span>
                transactions
            </Heading>
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row >
                        <Table.ColumnHeaderCell>Transaction Hash |</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Method |</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Block |</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Age |</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>From |</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>To |</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Value |</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Txn Fee</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.result.map((txn: { hash: string | any[]; decoded_call: { label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }; block_number: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; block_timestamp: any; from_address: string; to_address: string | any[]; value: number; gas_price: number; }) => {
                        return (
                            <Table.Row >
                                <Table.Cell>{txn.hash.slice(0, 16)}...</Table.Cell>
                                <Table.Cell>
                                    <Text>
                                        {txn.decoded_call ? txn.decoded_call.label : "Unknown"}
                                    </Text>
                                </Table.Cell>
                                <Table.Cell>{txn.block_number}</Table.Cell>
                                <Table.Cell>{moment(txn.block_timestamp, "YYYYMMDD").fromNow()}</Table.Cell>
                                <Table.Cell>{txn.from_address.slice(0, 8)}...{txn.from_address.slice(34)}</Table.Cell>
                                <Table.Cell>
                                    <Text
                                        className={txn.from_address.toLowerCase() !==
                                            props.searchInput.toLowerCase()
                                            ? "inTxn" // Updated to use class names
                                            : "outTxn"
                                        }
                                    >
                                        {txn.from_address.toLowerCase() !==
                                            props.searchInput.toLowerCase()
                                            ? "IN"
                                            : "OUT"}
                                    </Text>
                                </Table.Cell>
                                <Table.Cell>
                                    {txn.to_address.slice(0, 8)}...{txn.to_address.slice(34)}
                                </Table.Cell>
                                <Table.Cell>{(txn.value / 10 ** 18).toFixed(5)} ETH</Table.Cell>
                                <Table.Cell>{(txn.gas_price / 10 ** 18).toFixed(12)}</Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table.Root>
        </Container>
    );
}
