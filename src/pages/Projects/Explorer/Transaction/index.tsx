import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
    selectTransactionsLoading,
    selectTransactionByHash,
    TransactionsState
} from "../../../../redux/slices/BackendSlices/Explorer/Transactions/AllTrxSlice";
import { fetchSingleTrx } from "../../../../redux/slices/BackendSlices/Explorer/Transactions/AllTrxApiSlice";
import { useRpc } from "../../../../contexts/RpcProviderContext";
import { AppDispatch } from "../../../../redux/store";
import Box from "../../../../Components/UI/Box";
import Text from "../../../../Components/UI/Text";
import { truncateValue } from "../../../../helpers/scripts";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { EXPLORER_PAGE } from "../../../../DataTypes/enums";

function Transaction() {
    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl, networkName } = useRpc();
    const { hash } = useParams<{ hash: string }>();

    const transaction = useSelector((state: { transactionsState: TransactionsState }) => selectTransactionByHash(state, hash || ""));
    const loading = useSelector(selectTransactionsLoading);

    useEffect(() => {
        if (hash) {
            dispatch(fetchSingleTrx({ rpcUrl, hash }));
        }
    }, [dispatch, hash, rpcUrl,  networkName]);


    return (
        <Box style={{ marginTop: "120px" }}>
            <Text>Transaction Details:</Text>
            <Box style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginTop: '16px' }}>
                <TrxDetailRow label="Trx Hash" value={loading ? "" : transaction?.hash} loading={loading} />
                <TrxDetailRow label="Block Hash" value={transaction?.blockHash} loading={loading} />
                <TrxDetailRow label="Block Number" value={transaction?.blockNumber?.toString()} loading={loading} navigateTo={`${EXPLORER_PAGE.SINGLE_BLOCK}/${transaction?.blockNumber}/${networkName}`} />
                <TrxDetailRow label="Transaction Index" value={transaction?.transactionIndex} loading={loading} />
                <TrxDetailRow label="Type" value={transaction?.type} loading={loading} />
                <TrxDetailRow label="Nonce" value={transaction?.nonce} loading={loading} />
                <TrxDetailRow label="From" value={transaction?.from} loading={loading} navigateTo={`${EXPLORER_PAGE.SINGLE_ADDRESS}/${transaction?.from}/${networkName}`} />
                <TrxDetailRow label="To" value={transaction?.to} loading={loading} navigateTo={`${EXPLORER_PAGE.SINGLE_ADDRESS}/${transaction?.to}/${networkName}`} />
                <TrxDetailRow label="Value" value={transaction?.value?.toString()} loading={loading} />
                <TrxDetailRow label="Gas" value={transaction?.gas} loading={loading} />
                <TrxDetailRow label="Gas Price" value={transaction?.gasPrice} loading={loading} />
                <TrxDetailRow label="Max Fee Per Gas" value={transaction?.maxFeePerGas || "N/A"} loading={loading} />
                <TrxDetailRow label="Max Priority Fee Per Gas" value={transaction?.maxPriorityFeePerGas || "N/A"} loading={loading} />
                <TrxDetailRow label="Chain ID" value={transaction?.chainId} loading={loading} />
                <TrxDetailRow label="Input Data" value={transaction?.input} loading={loading} />
                <TrxDetailRow label="Access List" value={JSON.stringify(transaction?.accessList)} loading={loading} />
                <TrxDetailRow label="R" value={transaction?.r} loading={loading} />
                <TrxDetailRow label="S" value={transaction?.s} loading={loading} />
                <TrxDetailRow label="V" value={transaction?.v} loading={loading} />
            </Box>
        </Box>
    );
}

// TrxDetailRow component to display a label-value pair with optional loading skeleton
const TrxDetailRow = ({ label, value, loading, navigateTo }: { label: string; value?: string; loading: boolean; navigateTo?: string }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (navigateTo) {
            navigate(navigateTo);
        }
    };

    return (
        <Box
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: '1px solid #eaeaea',
                cursor: navigateTo ? 'pointer' : 'default'
            }}
            onClick={navigateTo ? handleClick : undefined}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HelpOutlineIcon />
                <Text style={{ fontWeight: 'bold' }}>{label}</Text>
            </Box>
            <Text style={{ color: navigateTo ? "blue" : "inherit" }}>
                {loading ? <Skeleton /> : truncateValue(value)}
            </Text>
        </Box>
    );
};

// Skeleton component for displaying a loading placeholder
const Skeleton = () => (
    <Box style={{ width: '100px', height: '16px', backgroundColor: '#eaeaea', borderRadius: '4px' }} />
);

export default Transaction;
