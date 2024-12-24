import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBlocks, selectBlocksLoading } from '../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksSlice';
import { currentBlockInfo } from '../../redux/slices/BackendSlices/Explorer/Blocks/CurrentBlock/CurrentBlockSlice';
import { getPreviousBlocks } from '../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksApi';
import { useRpc } from '../../contexts/RpcProviderContext';
import { AppDispatch } from '../../redux/store';
import { fetchCurrentBlock } from '../../redux/slices/BackendSlices/Explorer/Blocks/CurrentBlock/CurrentBlockApi';
import Box from '../UI/Box';
import Text from '../UI/Text';
import Button from '../UI/Button';
import Grid from '../UI/Grid';
import SingleBlockInfo from './SingleBlockCard';
import { navigateToAllBlock } from '../../helpers/navigationHelpers';
import { useNavigate } from 'react-router-dom';

const AllBlock: React.FC = () => {
    const blocks = useSelector(selectBlocks);
    const allBlocksLoading = useSelector(selectBlocksLoading);
    const currentBlock = useSelector(currentBlockInfo);
    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl,networkName } = useRpc();
    const navigate=useNavigate()

    useEffect(() => {
        dispatch(fetchCurrentBlock(rpcUrl));
        dispatch(getPreviousBlocks(rpcUrl));
    }, [dispatch, rpcUrl]);

    const handleReload = () => {
        dispatch(getPreviousBlocks(rpcUrl));
        dispatch(fetchCurrentBlock(rpcUrl));
    };

    return (
        <div>
            <Box sx={{
                display: "flex"
            }}>
                <Text style={{ fontSize: "24px", fontWeight: "bold" }}>Blocks Info</Text>
                <Button onClick={handleReload} disabled={allBlocksLoading}>
                    {allBlocksLoading ? "Loading Blocks" : "Reload"}
                </Button>
            </Box>
            <Grid gap={3} width="auto">

                {/* Render current block info */}
                {currentBlock && <SingleBlockInfo block={currentBlock}  />}

                {/* Render recent blocks */}
                {blocks && !allBlocksLoading && blocks.length > 0 ? (
                    blocks.map((block) => <SingleBlockInfo key={block.hash} block={block} loading={allBlocksLoading} />)
                ) : (
                    <p>No blocks found</p>
                )}
         
            </Grid>
            <Button onClick={() => navigateToAllBlock(navigate, networkName)}>
                View All Blocks
            </Button>
        </div>
    );
};

export default AllBlock;
