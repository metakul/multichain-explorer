import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '../UI/Box';
import Text from '../UI/Text';
import Skeleton from '@mui/material/Skeleton';
import { Typography } from '@mui/material';
import { navigateToBlock } from '../../helpers/navigationHelpers';
import { Block } from '../../interfaces/interface';
import { BlockDetailsTab, EXPLORER_PAGE } from '../../DataTypes/enums';
import { useRpc } from '../../contexts/RpcProviderContext';

interface SinglBlockInfoProps {
    block: Block;
    loading?: boolean;
}

const SingleBlockInfo: React.FC<SinglBlockInfoProps> = ({ block, loading }) => {
    const navigate = useNavigate();
    const renderContent = (value: string | number | undefined, loadingWidth: number) => {
        if (loading) return <Skeleton width={loadingWidth} />;
        return value !== undefined ? value : "N/A";
    };
    const {networkName} = useRpc()

    return (
        <Box
            key={block?.hash ?? Math.random()}
            style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '16px',
            }}
        >
            <Text
                style={{ color: "blue", fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}
                onClick={() => !loading && block?.number && navigateToBlock(navigate, Number(block.number), networkName)}
            >
                {loading
                    ? <Skeleton width={120} />
                    : block?.number !== undefined
                        ? `Block #${block.number}`
                        : "Block #N/A"}
            </Text>
            <Typography variant="body2">
                <strong>Gas Used:</strong> {renderContent(block?.gasUsed, 100)}
            </Typography>
            <Typography variant="body2" display="flex" >
                <strong>Total Transaction :   </strong> {loading ? <Skeleton width={80} /> : block?.transactionsCount ? <Typography
                    style={{
                        color: 'blue',
                        fontWeight: '1000',
                        cursor: 'pointer',
                    }}
                    onClick={() => navigate(
                        `${EXPLORER_PAGE.SINGLE_BLOCK}/${block.number}/${networkName}?tab=${BlockDetailsTab.tabTitle2}`
                    )}
                >
                    {block.transactionsCount} Trx
                </Typography> : "N/a"}
            </Typography>
            <Typography variant="body2">
                <strong>Difficulty:</strong> {renderContent(block?.difficulty, 100)}
            </Typography>
            <Typography variant="body2">
                <strong>Timestamp:</strong>
                {loading
                    ? <Skeleton width={150} />
                    : block?.timestamp
                        ? new Date(parseInt(block.timestamp) * 1000).toLocaleString()
                        : "N/A"}
            </Typography>
        </Box>
    );
};

export default SingleBlockInfo;
