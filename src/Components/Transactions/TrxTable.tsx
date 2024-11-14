import React from "react";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { ITrx } from "../../interfaces/interface";
import { useNavigate } from "react-router-dom";
import { navigateToAddress, navigateToBlock, navigateToTransaction } from "../../helpers/navigationHelpers";
import Container from "../UI/Container";
import CustomTable, { CustomTableHeader, CustomTableRow, CustomTableCell } from "../UI/Table";
interface TrxInfoProps {
    transaction: ITrx[] | undefined;
    loading: boolean;
    error: string | null;
}

const TransactionInfo: React.FC<TrxInfoProps> = ({ transaction, loading, error }) => {
    const navigate = useNavigate();

    // Render loading skeleton
    if (loading) {
        return (
            <Container>
                <CustomTable>
                    <CustomTableHeader>
                        <CustomTableCell>Transaction Hash</CustomTableCell>
                        <CustomTableCell>Block</CustomTableCell>
                        <CustomTableCell>From</CustomTableCell>
                        <CustomTableCell>To</CustomTableCell>
                        <CustomTableCell>Value</CustomTableCell>
                        <CustomTableCell>Txn Fee</CustomTableCell>
                        <CustomTableCell>View Txn</CustomTableCell>
                    </CustomTableHeader>
                    <CustomTableRow>
                        <CustomTableCell><div className="skeleton" /></CustomTableCell>
                        <CustomTableCell><div className="skeleton" /></CustomTableCell>
                        <CustomTableCell><div className="skeleton" /></CustomTableCell>
                        <CustomTableCell><div className="skeleton" /></CustomTableCell>
                        <CustomTableCell><div className="skeleton" /></CustomTableCell>
                        <CustomTableCell><div className="skeleton" /></CustomTableCell>
                        <CustomTableCell><div className="skeleton" /></CustomTableCell>
                    </CustomTableRow>
                </CustomTable>
            </Container>
        );
    }

    // Render error message if there's an error
    if (error) {
        return <Container>{error}</Container>;
    }

    // Render no transaction message if no data
    if (transaction && transaction.length === 0) {
        return <Container>No Transactions Found</Container>;
    }

    // Render actual transactions
    return (
        <Container>
            <CustomTable>
                <CustomTableHeader>
                    <CustomTableCell>Transaction Hash</CustomTableCell>
                    <CustomTableCell>Block</CustomTableCell>
                    <CustomTableCell>From</CustomTableCell>
                    <CustomTableCell>To</CustomTableCell>
                    <CustomTableCell>Value</CustomTableCell>
                    <CustomTableCell>Txn Fee</CustomTableCell>
                    <CustomTableCell>View Txn</CustomTableCell>
                </CustomTableHeader>
                {transaction && transaction.map((trx: ITrx) => (
                    <CustomTableRow key={trx.hash}>
                        <CustomTableCell
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() => navigateToTransaction(navigate, trx.hash)}
                        >
                            {trx.hash.slice(0, 16)}...
                        </CustomTableCell>
                        <CustomTableCell
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() => navigateToBlock(navigate, trx?.blockNumber)}
                        >
                            {trx?.blockNumber}
                        </CustomTableCell>
                        <CustomTableCell
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() => navigateToAddress(navigate, trx?.from)}
                        >
                            {trx.from.slice(0, 8)}...{trx.from.slice(-8)}
                        </CustomTableCell>
                        <CustomTableCell
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() => navigateToAddress(navigate, trx?.to)}
                        >
                            {trx?.to?.slice(0, 8)}...{trx?.to?.slice(-8)}
                        </CustomTableCell>
                        <CustomTableCell>{(trx?.value / 10 ** 18).toFixed(5)} ETH</CustomTableCell>
                        <CustomTableCell>{(parseFloat(trx?.gasPrice) / 10 ** 18).toFixed(12)}</CustomTableCell>
                        <CustomTableCell style={{ display: "flex", justifyContent: "center" }}>
                            <EyeOpenIcon
                                onClick={() => navigateToTransaction(navigate, trx.hash)}
                                style={{ cursor: "pointer" }}
                            />
                        </CustomTableCell>
                    </CustomTableRow>
                ))}
            </CustomTable>
        </Container>
    );
};

export default TransactionInfo;
