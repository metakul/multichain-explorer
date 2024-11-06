import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
    selectTransactionsLoading,
    selectTransactionsError,
    selectTransactionByHash,
    TransactionsState
} from "../../../../redux/slices/BackendSlices/Explorer/Transactions/AllTrxSlice";
import { fetchSingleTrx } from "../../../../redux/slices/BackendSlices/Explorer/Transactions/AllTrxApiSlice";
import { useRpc } from "../../../../contexts/RpcProviderContext";
import { AppDispatch } from "../../../../redux/store";
import { Box, Text } from "@radix-ui/themes";

function Transaction() {
    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl } = useRpc();
    const { hash } = useParams<{ hash: string }>();

    const transaction = useSelector((state: { transactionsState: TransactionsState }) => selectTransactionByHash(state, hash || ""));
    const loading = useSelector(selectTransactionsLoading);
    const error = useSelector(selectTransactionsError);

    useEffect(() => {
        if (!transaction && hash) {
            dispatch(fetchSingleTrx({ rpcUrl, hash }));
        }
    }, [dispatch, hash, rpcUrl, transaction]);

    if (error) return <Text>Error: {error}</Text>;

    return (
        <Box style={{ marginTop: "120px" }}>
            <Text>Transaction Details:</Text>
            <Box style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginTop: '16px' }}>
                <DetailRow label="Transaction Hash" value={loading ? "" : transaction?.hash} loading={loading} />
                <DetailRow label="Block Hash" value={transaction?.blockHash} loading={loading} />
                <DetailRow label="Block Number" value={transaction?.blockNumber?.toString()} loading={loading} />
                <DetailRow label="Transaction Index" value={transaction?.transactionIndex} loading={loading} />
                <DetailRow label="Type" value={transaction?.type} loading={loading} />
                <DetailRow label="Nonce" value={transaction?.nonce} loading={loading} />
                <DetailRow label="From" value={transaction?.from} loading={loading} />
                <DetailRow label="To" value={transaction?.to} loading={loading} />
                <DetailRow label="Value" value={transaction?.value?.toString()} loading={loading} />
                <DetailRow label="Gas" value={transaction?.gas} loading={loading} />
                <DetailRow label="Gas Price" value={transaction?.gasPrice} loading={loading} />
                <DetailRow label="Max Fee Per Gas" value={transaction?.maxFeePerGas || "N/A"} loading={loading} />
                <DetailRow label="Max Priority Fee Per Gas" value={transaction?.maxPriorityFeePerGas || "N/A"} loading={loading} />
                <DetailRow label="Chain ID" value={transaction?.chainId} loading={loading} />
                <DetailRow label="Input Data" value={transaction?.input} loading={loading} />
                <DetailRow label="Access List" value={JSON.stringify(transaction?.accessList)} loading={loading} />
                <DetailRow label="R" value={transaction?.r} loading={loading} />
                <DetailRow label="S" value={transaction?.s} loading={loading} />
                <DetailRow label="V" value={transaction?.v} loading={loading} />
            </Box>
        </Box>
    );
}

// DetailRow component to display a label-value pair with optional loading skeleton
const DetailRow = ({ label, value, loading }: { label: string; value?: string; loading: boolean }) => (
    <Box style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eaeaea' }}>
        <Text style={{ fontWeight: 'bold' }}>{label}</Text>
        <Text>{loading ? <Skeleton /> : value}</Text>
    </Box>
);

// Skeleton component for displaying a loading placeholder
const Skeleton = () => (
    <Box style={{ width: '100px', height: '16px', backgroundColor: '#eaeaea', borderRadius: '4px' }} />
);

export default Transaction;
