import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBlocks, selectBlocksLoading } from '../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksSlice';
import { currentBlockInfo, selectCurrentBlockLoading, setCurrentBlock, setCurrentBlockError, setCurrentBlockLoading } from '../../redux/slices/BackendSlices/Explorer/Blocks/CurrentBlock/CurrentBlockSlice';
import { getPreviousBlocks } from '../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksApi';
import { useRpc } from '../../contexts/RpcProviderContext';
import { AppDispatch } from '../../redux/store';
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
    const currentBlock = useSelector(currentBlockInfo) || undefined;
    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl, networkName } = useRpc();
    const navigate = useNavigate()

    const currentBlockLoading = useSelector(selectCurrentBlockLoading);

    useEffect(() => {
        dispatch(getPreviousBlocks(rpcUrl));
      }, [dispatch, rpcUrl]);

    const handleReload = () => {
        dispatch(getPreviousBlocks(rpcUrl));
    };

    useEffect(() => {
        dispatch(setCurrentBlockLoading(true));
        console.log("step1",currentBlockLoading);
        
        const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL)

        ws.onopen = () => {
            console.log('WebSocket connection established');
            // Send the rpcUrl to the server
            ws.send(JSON.stringify({ type: 'INIT', rpcUrl }));
        };

        ws.onmessage = (event) => {
            try {
                const newBlock = JSON.parse(event.data);
                console.log('New block received:', newBlock);
                dispatch(setCurrentBlock(newBlock)); // Update Redux state
            } catch (error) {
                dispatch(setCurrentBlockError("Failed to parse new block"));
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            dispatch(setCurrentBlockError("WebSocket error"));
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => ws.close(); // Cleanup on unmount
    }, [dispatch, rpcUrl]); // Add rpcUrl to the dependency array


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
                <SingleBlockInfo block={currentBlock} loading={currentBlockLoading} />

                {/* Render recent blocks */}
                {blocks.map((block) => <SingleBlockInfo key={block.hash} block={block} loading={allBlocksLoading} />)
                }
            </Grid>
            <Button onClick={() => navigateToAllBlock(navigate, networkName)}>
                View All Blocks
            </Button>
        </div>
    );
};

export default AllBlock;
