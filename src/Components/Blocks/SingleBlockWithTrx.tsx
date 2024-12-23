import React, { useEffect, useState } from 'react';
import { navigateToAddress, navigateToBlock, navigateToTransaction } from '../../helpers/navigationHelpers';
import { useNavigate } from 'react-router-dom';
import { Block } from '../../interfaces/interface';
import {
    selectTransactionsErrorForBlock,
    selectTransactionsForBlock,
    selectTransactionsLoadingForBlock
} from '../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/BlocksWithFrameSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getBlockWithTrx } from '../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksApi';
import { AppDispatch } from '../../redux/store';
import { useRpc } from '../../contexts/RpcProviderContext';
import { Skeleton } from '@mui/material'; // Importing Skeleton from Material-UI
import Box from '../UI/Box';
import Text from '../UI/Text';
import Container from '../UI/Container';

interface BlockInfoProps {
    block: Block;
}

const BlockInfo: React.FC<BlockInfoProps> = ({ block }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const transactions = useSelector(selectTransactionsForBlock(block.number));
    const loading = useSelector(selectTransactionsLoadingForBlock(block.number));
    const error = useSelector(selectTransactionsErrorForBlock(block.number));
    const { rpcUrl } = useRpc();

    const [visibleTransactions, setVisibleTransactions] = useState(3);

    useEffect(() => {
        if (!transactions.length) {
            dispatch(getBlockWithTrx({ blockNo: block.number, rpcUrl }));
        }
    }, [block.number, dispatch, transactions.length, rpcUrl]);

    const loadMoreTransactions = () => {
        setVisibleTransactions((prev) => prev + 5);
    };

    return (
        <Container style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Box
                key={block.number}
                style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '16px',
                }}
            >
                <Text
                    style={{
                        color: 'blue',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        cursor: 'pointer',
                    }}
                    onClick={() => navigateToBlock(navigate, Number(block?.number))}
                >
                    Block #{block?.number ?? 'N/A'}
                </Text>
                <p><strong>Gas Limit:</strong> {block?.gasLimit ?? 'N/A'}</p>
                <p><strong>Size:</strong> {block?.size ? `${block.size} bytes` : 'N/A'}</p>
                <p><strong>Difficulty:</strong> {block?.difficulty ?? 'N/A'}</p>
                <p><strong>Timestamp:</strong> {block?.timestamp ? new Date(parseInt(block.timestamp) * 1000).toLocaleString() : 'N/A'}</p>
            </Box>

            <div style={{ background: 'black', width: '40px', height: '2px' }}></div>
            <Box style={{ borderLeft: '1px solid black', maxWidth: "600px" }}>
                <div style={{ padding: '16px', marginLeft: '16px' }}>
                    {loading ? (
                        Array.from({ length: visibleTransactions }).map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="rectangular"
                                height={80}
                                style={{
                                    marginBottom: '12px',
                                    borderRadius: '4px',
                                }}
                            />
                        ))
                    ) : error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                        transactions.slice(0, visibleTransactions).map((trx) => (
                            <div
                                key={trx.hash}
                                style={{
                                    marginBottom: '12px',
                                    padding: '8px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                }}
                            >
                                <p>
                                    <strong>Trx Hash:</strong>{' '}
                                    <Text
                                        style={{
                                            color: 'blue',
                                            fontSize: '18px',
                                            fontWeight: 'bold',
                                            marginBottom: '8px',
                                        }}
                                        onClick={() => navigateToTransaction(navigate, String(trx?.hash))}
                                    >
                                        {trx?.hash?.slice(0, 4)}...{trx?.hash?.slice(-4)}
                                    </Text>
                                </p>
                                <p onClick={() => navigateToAddress(navigate, String(trx?.from))}>
                                    <strong>From:</strong> {trx?.from?.slice(0, 4)}...{trx?.from?.slice(-4)}
                                </p>
                                <p onClick={() => navigateToAddress(navigate, String(trx?.to))}>
                                    <strong>To:</strong> {trx?.to?.slice(0, 4)}...{trx?.to?.slice(-4)}
                                </p>
                                <p><strong>Value:</strong> {trx.value}</p>
                                <p><strong>Gas Price:</strong> {trx.gasPrice}</p>
                            </div>
                        ))
                    )}
                    {visibleTransactions < transactions.length && (
                        <button onClick={loadMoreTransactions} style={{ marginTop: '8px', padding: '8px 16px', cursor: 'pointer' }}>
                            Load More
                        </button>
                    )}
                    {transactions.length === 0 && !loading && (
                        <Text>No Transaction in the Block</Text>
                    )}
                </div>
            </Box>
        </Container>
    );
};

export default BlockInfo;
