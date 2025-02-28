import React, { useEffect, useState } from 'react';
import { navigateToAddress, navigateToTransaction } from '../../helpers/navigationHelpers';
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
import SingleBlockInfo from './SingleBlockCard';
import InfoCard from '../Cards/InfoCard';
import { ImportContacts } from '@mui/icons-material';
import { getColors } from '../../layout/Theme/themes';

interface BlockInfoProps {
    block: Block;
}

const BlockInfo: React.FC<BlockInfoProps> = ({ block }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const transactions = useSelector(selectTransactionsForBlock(block.number));
    const loading = useSelector(selectTransactionsLoadingForBlock(block.number));
    const error = useSelector(selectTransactionsErrorForBlock(block.number));
    const { rpcUrl, networkName } = useRpc();

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
        <Box style={{ display: 'flex', alignItems: 'center', marginBottom: '16px',flexDirection:"column" }}>

            <SingleBlockInfo block={block} />
            <Box style={{ borderLeft: '1px solid black' }}>
                    {error ? (
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
                                <InfoCard
                                    label="Block"
                                    value={` #${block?.number}`}
                                    loading={loading}
                                    icon={<ImportContacts width={20} height={20} fill={getColors().blueAccent[400]} />}
                                    fontSize="20px"
                                    fontWeight="bold"
                                    navigateTo={() => navigateToTransaction(navigate, String(trx?.hash), networkName)}
                                />
                                <InfoCard
                                    label="Trx Hash:"
                                    value={trx.hash}
                                    loading={loading}
                                    icon={<ImportContacts width={20} height={20} fill={getColors().blueAccent[400]} />}
                                    fontSize="12px"
                                    fontWeight="bold"
                                    navigateTo={() => navigateToAddress(navigate, String(trx.from), networkName)}

                                />
                                <InfoCard
                                    label="From"
                                    value={trx.from}
                                    loading={loading}
                                    icon={<ImportContacts width={20} height={20} fill={getColors().blueAccent[400]} />}
                                    fontSize="12px"
                                    fontWeight="bold"
                                    navigateTo={() => navigateToAddress(navigate, String(trx.from), networkName)}

                                />
                                <InfoCard
                                    label="To"
                                    value={trx.to}
                                    loading={loading}
                                    icon={<ImportContacts width={20} height={20} fill={getColors().blueAccent[400]} />}
                                    fontSize="12px"
                                    fontWeight="bold"
                                    navigateTo={() => navigateToAddress(navigate, String(trx.to), networkName)}
                                />
                                <InfoCard
                                    label="Value"
                                    value={trx.value}
                                    loading={loading}
                                    icon={<ImportContacts width={20} height={20} fill={getColors().blueAccent[400]} />}
                                    fontSize="12px"
                                    fontWeight="bold"
                                />

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
            </Box>
        </Box>
    );
};

export default BlockInfo;
