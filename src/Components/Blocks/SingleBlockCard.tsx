import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '../UI/Box';
import { navigateToAddress, navigateToBlock } from '../../helpers/navigationHelpers';
import { Block } from '../../interfaces/interface';
import { useRpc } from '../../contexts/RpcProviderContext';
import { getColors } from '../../layout/Theme/themes';
import { getRelativeTime } from '../../helpers/getRelativeTime';
import BlockCardInfo from '../Cards/BlockCard'; // Import the reusable component
import { ContentPasteGoSharp, ImportContacts, MinorCrashRounded, PunchClock, TableRestaurantSharp } from '@mui/icons-material';
import { BlockDetailsTab, EXPLORER_PAGE } from '../../DataTypes/enums';

interface SingleBlockInfoProps {
    block?: Block;
    loading?: boolean;
    isNew?: boolean; // New prop for animation
}

const SingleBlockInfo: React.FC<SingleBlockInfoProps> = ({ block, isNew, loading }) => {
    const navigate = useNavigate();
    const { networkName } = useRpc();
    const [isVisible, setIsVisible] = useState(false);

    // Trigger animation when the block is new
    useEffect(() => {
        if (isNew) {
            setIsVisible(true);
            const timer = setTimeout(() => setIsVisible(false), 1000); // Reset after 1 second
            return () => clearTimeout(timer);
        }
    }, [isNew]);

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

    const naviagteToBlock=()=>{
        block?.number && navigateToBlock(navigate, Number(block.number), networkName)
    }
    const naviagteToBlockWithTrx=()=>{
        block?.number && navigate(
            `${EXPLORER_PAGE.SINGLE_BLOCK}/${block.number}/${networkName}?tab=${BlockDetailsTab.tabTitle2}`
        )
    }
    const navigateToMiner=()=>{
        block?.miner && navigateToAddress(navigate, block.miner, networkName)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                py: 2,
                position: 'relative',
                transition: 'transform 0.3s ease-in-out',
                transform: isVisible ? 'scale(1.05)' : 'scale(1)',
            }}
        >
            {/* Block Card */}
            <Box
                key={block?.hash ?? Math.random()}
                sx={{
                    backgroundColor: getColors().primary[900],
                    boxShadow: '8px 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    padding: '16px',
                    border: '1px solid',
                    transition: 'background-color 0.5s ease-in-out',
                    width: '100%',
                }}
            >
                {/* Block Number */}
                <BlockCardInfo
                    label="Block"
                    value={`#${block?.number}`}
                    loading={loading}
                    icon={<ImportContacts width={20} height={20} fill={getColors().blueAccent[400]} />}
                    fontSize="16px"
                    fontWeight="bold"
                    navigateTo={naviagteToBlock}
                />

                {/* Gas Used with Progress Bar */}
                <BlockCardInfo
                    label="Gas Used"
                    value={block?.gasUsed}
                    loading={loading}
                    icon={<ContentPasteGoSharp width={16} height={16} fill={getColors().blueAccent[400]} />}
                    progressValue={calculateGasUsagePercentage(block?.gasUsed, block?.gasLimit)}
                    showProgressBar
                />

                {/* Total Transactions */}
                <BlockCardInfo
                    label="Total Trx"
                    value={block?.transactionsCount}
                    loading={loading}
                    navigateTo={naviagteToBlockWithTrx}
                    icon={<TableRestaurantSharp width={16} height={16} fill={getColors().blueAccent[400]} />}

                />

                {/* Miner */}
                <BlockCardInfo
                    label="Miner"
                    value={block?.miner}
                    loading={loading}
                    navigateTo={navigateToMiner}
                    icon={<MinorCrashRounded width={16} height={16} fill={getColors().blueAccent[400]} />}
                />

                {/* Timestamp */}
                <BlockCardInfo
                    label="Timestamp"
                    value={block?.timestamp ? getRelativeTime(block.timestamp) : 'N/A'}
                    loading={loading}
                    icon={<PunchClock width={16} height={16} fill={getColors().blueAccent[400]} />}
                />
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