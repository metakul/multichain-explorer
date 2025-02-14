import TransactionInfo from './TrxTable';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllTransactions } from '../../redux/slices/BackendSlices/Explorer/Transactions/AllTrxApiSlice';
import { useRpc } from '../../contexts/RpcProviderContext';
import { AppDispatch } from '../../redux/store';
import { selectTransactions, selectTransactionsError, selectTransactionsLoading } from '../../redux/slices/BackendSlices/Explorer/Transactions/AllTrxSlice';
import Box from '../UI/Box';
import Text from '../UI/Text';
import Button from '../UI/Button';

function Transactions() {
    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl } = useRpc()
    const transactions = useSelector(selectTransactions);
    const loading = useSelector(selectTransactionsLoading);
    const error = useSelector(selectTransactionsError);

    useEffect(() => {
        dispatch(fetchAllTransactions(rpcUrl));
    }, [dispatch, rpcUrl, transactions.length]);

    const handleReload = () => {
        dispatch(fetchAllTransactions(rpcUrl)); // Dispatch the fetch action on button click
    };

    return (
        <Box >
            <Box style={{
                display: "flex",
            }}>
                <Text style={{ fontSize: "24px", fontWeight: "bold" }}>Recent Transactions </Text>
                <Button onClick={handleReload} disabled={loading}>
                    {loading ? "Loading Trx" : "Reload"}
                </Button>
            </Box>
            <Box style={{
                display: "flex", flexDirection: "column", gap: "3"
            }}
            >
                {transactions && <TransactionInfo transaction={transactions} loading={loading} error={error} />}
            </Box>
        </Box>
    );
}

export default Transactions;
