import { Box, Button } from '@radix-ui/themes';
import TransactionInfo from './TrxTable';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllTransactions } from '../../redux/slices/BackendSlices/Explorer/Transactions/AllTrxApiSlice';
import { useRpc } from '../../contexts/RpcProviderContext';
import { AppDispatch } from '../../redux/store';
import { selectTransactions, selectTransactionsError, selectTransactionsLoading } from '../../redux/slices/BackendSlices/Explorer/Transactions/AllTrxSlice';

function Transactions() {
    const dispatch = useDispatch <AppDispatch>();
    const { rpcUrl } =useRpc()
    const transactions = useSelector(selectTransactions);
    const loading = useSelector(selectTransactionsLoading);
    const error = useSelector(selectTransactionsError);

    useEffect(() => {
        dispatch(fetchAllTransactions(rpcUrl));
    }, [dispatch, rpcUrl]);

    const handleReload = () => {
        dispatch(fetchAllTransactions(rpcUrl)); // Dispatch the fetch action on button click
    };

    return (
        <Box p="4">
            <h3>Recent Transactions</h3>
            <Button onClick={handleReload} disabled={loading}>
                Reload
            </Button>
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
