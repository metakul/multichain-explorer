import TransactionInfo from './TrxTable';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllTransactions } from '../../redux/slices/BackendSlices/Explorer/Transactions/AllTrxApiSlice';
import { useRpc } from '../../contexts/RpcProviderContext';
import { AppDispatch } from '../../redux/store';
import { selectTransactions, selectTransactionsError, selectTransactionsLoading } from '../../redux/slices/BackendSlices/Explorer/Transactions/AllTrxSlice';
import Box from '../UI/Box';
import Text from '../UI/Text';
import { ReplayCircleFilledOutlined } from '@mui/icons-material';
import { clearTrxCount, selectNewTrxCount } from '../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/BlocksWithFrameSlice';

function Transactions() {
    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl } = useRpc()
    const transactions = useSelector(selectTransactions);
    const loading = useSelector(selectTransactionsLoading);
    const newTrxCount = useSelector(selectNewTrxCount);
    const error = useSelector(selectTransactionsError);

    useEffect(() => {
        dispatch(fetchAllTransactions(rpcUrl));
        dispatch(clearTrxCount()); // Dispatch the fetch action on button click
    }, [dispatch, rpcUrl]);

    const handleReload = () => {
        dispatch(fetchAllTransactions(rpcUrl)); // Dispatch the fetch action on button click
        dispatch(clearTrxCount()); // Dispatch the fetch action on button click
    };

    return (
        <Box >
            <Box style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "space-between",
            }}>
                <Box>
                    <Text sx={{ fontSize: { xs: "16px",sm:"20px", md: "24px" }, fontWeight: "bold" }}>Recent Transactions </Text>
                </Box>
                <Box style={{
                    display: "flex",
                    alignContent: "center",
                }}>
                    <Text style={{ fontSize: "12px" }}>
                        {newTrxCount} New Trx
                    </Text>
                    {loading ? "" : <ReplayCircleFilledOutlined onClick={handleReload} />}
                </Box>
            </Box>
            {transactions &&
                <TransactionInfo transaction={transactions} loading={loading} error={error} />
            }
        </Box>
    );
}

export default Transactions;
