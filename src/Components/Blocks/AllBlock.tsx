import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBlocks, selectBlocksLoading } from '../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksSlice';
import { curretnBlockInfo } from '../../redux/slices/BackendSlices/Explorer/Blocks/CurrentBlock/CurrentBlockSlice';
import { fetchRecentBlocks } from '../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksApi';
import { useRpc } from '../../contexts/RpcProviderContext';
import { AppDispatch } from '../../redux/store';
import { fetchCurrentBlock } from '../../redux/slices/BackendSlices/Explorer/Blocks/CurrentBlock/CurrentBlockApi';
import { navigateToBlock } from '../../helpers/navigationHelpers';
import { useNavigate } from 'react-router-dom';
import Box from '../UI/Box';
import Text from '../UI/Text';
import Button from '../UI/Button';
import Grid from '../UI/Grid';
import Skeleton from '@mui/material/Skeleton';

const AllBlock: React.FC = () => {
    const blocks = useSelector(selectBlocks);
    const allBlocksLoading = useSelector(selectBlocksLoading);
    const currentBlock = useSelector(curretnBlockInfo);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { rpcUrl } = useRpc();

    useEffect(() => {
        dispatch(fetchRecentBlocks(rpcUrl));
        dispatch(fetchCurrentBlock(rpcUrl));
    }, [dispatch, rpcUrl]);

    const handleReload = () => {
        dispatch(fetchRecentBlocks(rpcUrl));
        dispatch(fetchCurrentBlock(rpcUrl));
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderBlockInfo = (block: any) => (
        <Box key={block.hash} style={{
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '16px',
            height: "200px"
        }}>
            <Text style={{ color: "blue", fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }} onClick={() => navigateToBlock(navigate, Number(block?.number))}>
                Block #{block?.number ?? "N/A"}
            </Text>
            <p><strong>Gas Limit:</strong> {block?.gasLimit ?? "N/A"}</p>
            <p><strong>Size:</strong> {block?.size ? `${block.size} bytes` : "N/A"}</p>
            <p><strong>Difficulty:</strong> {block?.difficulty ?? "N/A"}</p>
            <p><strong>Timestamp:</strong> {block?.timestamp ? new Date(parseInt(block.timestamp) * 1000).toLocaleString() : "N/A"}</p>
        </Box>
    );

    return (
        <div>
            <Text style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Blocks Info</Text>
            <Button onClick={handleReload} disabled={allBlocksLoading}>
                {allBlocksLoading ? "Loading Blocks" : "Reload"}
            </Button>
            <Grid gap={3} width="auto">

                {/* Render current block info */}
                {currentBlock && renderBlockInfo(currentBlock)}

                {/* Render recent blocks */}
                {blocks && blocks.length > 0 ? (
                    blocks.map((block) => renderBlockInfo(block))
                ) : (
                    <p>No blocks found</p>
                )}

                {/* Loading state with MUI Skeletons */}
                {allBlocksLoading && blocks.length === 0 && (
                    Array.from({ length: 3 }).map((_, index) => (
                        <Box key={index} style={{
                            backgroundColor: '#f5f5f5',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            height: "200px"
                        }}>
                            <Skeleton variant="text" height={28} width="60%" />
                            <Skeleton variant="text" height={20} width="80%" />
                            <Skeleton variant="text" height={20} width="70%" />
                            <Skeleton variant="text" height={20} width="50%" />
                            <Skeleton variant="text" height={20} width="90%" />
                        </Box>
                    ))
                )}
            </Grid>
        </div>
    );
};

export default AllBlock;
