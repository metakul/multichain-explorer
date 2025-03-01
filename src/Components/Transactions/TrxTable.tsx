import React from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ITrx } from "../../interfaces/interface";
import { useNavigate } from "react-router-dom";
import { navigateToAddress, navigateToBlock, navigateToTransaction } from "../../helpers/navigationHelpers";
import Container from "../UI/Container";
import CustomTable, { CustomTableHeader, CustomTableRow, CustomTableCell } from "../UI/Table";
import Skeleton from "@mui/material/Skeleton";
import { useRpc } from "../../contexts/RpcProviderContext";
import { getColors } from "../../layout/Theme/themes";

interface TrxInfoProps {
    transaction: ITrx[] | undefined;
    loading: boolean;
    error: string | null;
}

const TransactionInfo: React.FC<TrxInfoProps> = ({ transaction, loading, error }) => {
    // Move all hooks to the top
    const navigate = useNavigate();
    const { networkName } = useRpc();

    // Render loading skeleton
    if (error || loading) {
        return (
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
                <tbody>
                    {[...Array(10)].map((_, index) => (
                        <CustomTableRow key={index}>
                            <CustomTableCell><Skeleton variant="text" width={120} /></CustomTableCell>
                            <CustomTableCell><Skeleton variant="text" width={80} /></CustomTableCell>
                            <CustomTableCell><Skeleton variant="text" width={140} /></CustomTableCell>
                            <CustomTableCell><Skeleton variant="text" width={140} /></CustomTableCell>
                            <CustomTableCell><Skeleton variant="text" width={80} /></CustomTableCell>
                            <CustomTableCell><Skeleton variant="text" width={100} /></CustomTableCell>
                            <CustomTableCell><Skeleton variant="circular" width={24} height={24} /></CustomTableCell>
                        </CustomTableRow>
                    ))}
                </tbody>
            </CustomTable>
        );
    }

    // Render actual transactions
    return (
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
            <tbody>
                {transaction && transaction.map((trx: ITrx) => (
                    <CustomTableRow key={trx?.hash}>
                        <CustomTableCell
                            style={{ color: getColors().blueAccent[500], cursor: "pointer" }}
                            onClick={() => navigateToTransaction(navigate, trx?.hash, networkName)}
                        >
                            {trx?.hash?.slice(0, 16)}...
                        </CustomTableCell>
                        <CustomTableCell
                            style={{ color: getColors().blueAccent[500], cursor: "pointer" }}
                            onClick={() => navigateToBlock(navigate, trx?.blockNumber, networkName)}
                        >
                            {trx?.blockNumber}
                        </CustomTableCell>
                        <CustomTableCell
                            style={{ color: getColors().blueAccent[500], cursor: "pointer" }}
                            onClick={() => navigateToAddress(navigate, trx?.from, networkName)}
                        >
                            {trx?.from?.slice(0, 8)}...{trx?.from?.slice(-8)}
                        </CustomTableCell>
                        <CustomTableCell
                            style={{ color: getColors().blueAccent[500], cursor: "pointer" }}
                            onClick={() => navigateToAddress(navigate, trx?.to, networkName)}
                        >
                            {trx?.to?.slice(0, 8)}...{trx?.to?.slice(-8)}
                        </CustomTableCell>
                        <CustomTableCell>{(trx?.value / 10 ** 18).toFixed(5)} ETH</CustomTableCell>
                        <CustomTableCell>{(parseFloat(trx?.gasPrice) / 10 ** 18).toFixed(12)}</CustomTableCell>
                        <CustomTableCell>
                            <VisibilityIcon
                                onClick={() => navigateToTransaction(navigate, trx?.hash, networkName)}
                                style={{ cursor: "pointer" }}
                            />
                        </CustomTableCell>
                    </CustomTableRow>
                ))}
            </tbody>
              
    {transaction && transaction.length === 0 &&
        <Container>No Transactions Found</Container>
    }
        </CustomTable>
    );
};

export default TransactionInfo;