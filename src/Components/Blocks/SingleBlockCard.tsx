import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '../UI/Box';
import { navigateToAddress, navigateToBlock, navigateToTransaction } from '../../helpers/navigationHelpers';
import { Block } from '../../interfaces/interface';
import { useRpc } from '../../contexts/RpcProviderContext';
import { getColors } from '../../layout/Theme/themes';
import { getRelativeTime } from '../../helpers/getRelativeTime';
import InfoCard from '../Cards/InfoCard';
import { ContentPasteGoSharp, ImportContacts, MinorCrashRounded, PunchClock, TableRestaurantSharp } from '@mui/icons-material';
import { BlockDetailsTab, EXPLORER_PAGE } from '../../DataTypes/enums';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransactionsErrorForBlock, selectTransactionsForBlock, selectTransactionsLoadingForBlock } from '../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/BlocksWithFrameSlice';
import Text from '../UI/Text';
import { getBlockWithTrx } from '../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksApi';
import { AppDispatch } from '../../redux/store';

interface SingleBlockInfoProps {
    block?: Block;
    loading?: boolean;
    isNew?: boolean; // New prop for animation
    showTrx?: boolean
}

const SingleBlockInfo: React.FC<SingleBlockInfoProps> = ({ block, showTrx, loading }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { networkName, rpcUrl } = useRpc();
    const [isVisible, setIsVisible] = useState(false);
    const [visibleTransactions, setVisibleTransactions] = useState(3);
    const loadMoreTransactions = () => {
        setVisibleTransactions((prev) => prev + 5);
    };
    const error = block && useSelector(selectTransactionsErrorForBlock(block.number));

    const transactions = block && useSelector(selectTransactionsForBlock(block.number));
    const selectLoadingForBlock = block && useSelector(selectTransactionsLoadingForBlock(block.number));

    // Trigger animation when the block is new
    useEffect(() => {
        setIsVisible(true);
        if (showTrx && block?.number) {
            dispatch(getBlockWithTrx({ blockNo: block.number, rpcUrl }));
        }
    }, []);

    /**
     * Calculates the gas usage percentage.
     * @param gasUsed - The gas used.
     * @param gasLimit - The gas limit.
     * @returns number
     */
    const calculateGasUsagePercentage = (gasUsed?: string, gasLimit?: string) => {
        if (!gasUsed || !gasLimit) return 0;
        return (Number(gasUsed) / Number(gasLimit)) * 100;
    };

    const naviagteToBlock = () => {
        block?.number && navigateToBlock(navigate, Number(block.number), networkName)
    }
    const naviagteToBlockWithTrx = () => {
        block?.number && navigate(
            `${EXPLORER_PAGE.SINGLE_BLOCK}/${block.number}/${networkName}?tab=${BlockDetailsTab.tabTitle2}`
        )
    }
    const navigateToMiner = () => {
        block?.miner && navigateToAddress(navigate, block.miner, networkName)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                pb: 2,
                position: 'relative',
                transition: 'transform 0.5s ease-in-out, opacity 0.3s ease-in-out',
                transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(-50px) scale(0.8)',
                opacity: isVisible ? 1 : 0,
            }}
        >
            <Box style={{
                    display: 'flex', marginTop: '16px',
                    flexDirection: "column",
                }}>
                {/* Block Card */}
                <Box
                    key={block?.hash ?? Math.random()}
                    sx={{
                        backgroundColor: getColors().primary[900],
                        boxShadow: '8px 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        padding: '8px',
                        border: '1px solid',
                        transition: 'background-color 0.5s ease-in-out',
                        width: '100%',
                        position: 'sticky',
                        top: '5px',
                        zIndex: 1000,
                    }}
                >
                    {/* Block Number */}
                    <InfoCard
                        label="Block"
                        value={`#${block?.number}`}
                        loading={loading}
                        icon={<ImportContacts width={20} height={20} fill={getColors().blueAccent[400]} />}
                        fontSize="16px"
                        fontWeight="bold"
                        navigateTo={naviagteToBlock}
                        error={error}
                    />

                    {/* Gas Used with Progress Bar */}
                    <InfoCard
                        label="Gas Used"
                        value={block?.gasUsed}
                        loading={loading}
                        icon={<ContentPasteGoSharp width={16} height={16} fill={getColors().blueAccent[400]} />}
                        progressValue={calculateGasUsagePercentage(block?.gasUsed, block?.gasLimit)}
                        showProgressBar
                        error={error}
                    />

                    {/* Total Transactions */}
                    <InfoCard
                        label="Total Trx"
                        value={block?.transactionsCount}
                        loading={loading}
                        navigateTo={naviagteToBlockWithTrx}
                        icon={<TableRestaurantSharp width={16} height={16} fill={getColors().blueAccent[400]} />}
                        error={error}
                    />

                    {/* Miner */}
                    <InfoCard
                        label="Miner"
                        value={block?.miner}
                        loading={loading}
                        navigateTo={navigateToMiner}
                        icon={<MinorCrashRounded width={16} height={16} fill={getColors().blueAccent[400]} />}
                        error={error}
                    />

                    {/* Timestamp */}
                    <InfoCard
                        label="Timestamp"
                        value={block?.timestamp ? getRelativeTime(block.timestamp) : 'N/A'}
                        loading={loading}
                        icon={<PunchClock width={16} height={16} fill={getColors().blueAccent[400]} />}
                        error={error}

                    />
                </Box>
                {showTrx &&
                    <>
                        <Box
                            sx={{
                                width: '20px',
                                height: '80px',
                                background: getColors().yellowAccent[900],
                                position: 'relative',
                                left: "45%"
                            }}
                        />
                        <Box style={{ borderLeft: '1px solid black' }}>
                            {transactions && transactions.slice(0, visibleTransactions).map((trx) => (
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
                                        label="Trx Hash:"
                                        value={trx.hash}
                                        loading={selectLoadingForBlock}
                                        icon={<ImportContacts width={20} height={20} fill={getColors().blueAccent[400]} />}
                                        fontSize="12px"
                                        fontWeight="bold"
                                        navigateTo={() => navigateToTransaction(navigate, String(trx.hash), networkName)}

                                    />
                                    <InfoCard
                                        label="From"
                                        value={trx.from}
                                        loading={selectLoadingForBlock}
                                        icon={<ImportContacts width={20} height={20} fill={getColors().blueAccent[400]} />}
                                        fontSize="12px"
                                        fontWeight="bold"
                                        navigateTo={() => navigateToAddress(navigate, String(trx.from), networkName)}

                                    />
                                    <InfoCard
                                        label="To"
                                        value={trx.to}
                                        loading={selectLoadingForBlock}
                                        icon={<ImportContacts width={20} height={20} fill={getColors().blueAccent[400]} />}
                                        fontSize="12px"
                                        fontWeight="bold"
                                        navigateTo={() => navigateToAddress(navigate, String(trx.to), networkName)}
                                    />
                                    <InfoCard
                                        label="Value"
                                        value={trx.value}
                                        loading={selectLoadingForBlock}
                                        icon={<ImportContacts width={20} height={20} fill={getColors().blueAccent[400]} />}
                                        fontSize="12px"
                                        fontWeight="bold"
                                    />

                                    <p><strong>Gas Price:</strong> {trx.gasPrice}</p>
                                </div>
                            ))
                            }

                            {transactions && visibleTransactions < transactions?.length && (
                                <button onClick={loadMoreTransactions} style={{ marginTop: '8px', padding: '8px 16px', cursor: 'pointer' }}>
                                    Load More
                                </button>
                            )}
                            {!selectLoadingForBlock && transactions?.length === 0 && !loading && (
                                <Text>No Transaction in the Block</Text>
                            )}
                        </Box>
                    </>
                }
            </Box>
            {/* Decorative Line */}
            <Box
                sx={{
                    width: '40px',
                    height: '8px',
                    background: getColors().yellowAccent[900],
                    position: 'relative',
                    top: 80,
                }}
            />
        </Box>
    );
};

export default SingleBlockInfo;