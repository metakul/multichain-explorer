import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBlock, selectBlocks, selectBlocksLoading, setNewTrxCount } from '../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksSlice';
import { setCurrentBlockError, setCurrentBlockLoading } from '../../redux/slices/BackendSlices/Explorer/Blocks/CurrentBlock/CurrentBlockSlice';
import { getPreviousBlocks } from '../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksApi';
import { useRpc } from '../../contexts/RpcProviderContext';
import { AppDispatch } from '../../redux/store';
import Box from '../UI/Box';
import Text from '../UI/Text';
import Button from '../UI/Button';
import SingleBlockInfo from './SingleBlockCard';
import { navigateToAllBlock } from '../../helpers/navigationHelpers';
import { useNavigate } from 'react-router-dom';
import "./SingleBlock.css"
const AllBlock: React.FC = () => {
    const blocks = useSelector(selectBlocks);
    const allBlocksLoading = useSelector(selectBlocksLoading);
    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl, networkName } = useRpc();
    const navigate = useNavigate()
    const [latestBlockHash, setLatestBlockHash] = useState<string | null>(null);

    useEffect(() => {
        dispatch(getPreviousBlocks(rpcUrl));
    }, [dispatch, rpcUrl]);

    useEffect(() => {
        dispatch(setCurrentBlockLoading(true));

        const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL)

        ws.onopen = () => {
            console.log('WebSocket connection established');
            // Send the rpcUrl to the server
            ws.send(JSON.stringify({ type: 'INIT', rpcUrl }));
        };

        ws.onmessage = (event) => {
            try {
                const newBlock = JSON.parse(event.data);
                if (newBlock?.transactionsCount) {
                    dispatch(setNewTrxCount(newBlock?.transactionsCount)); // Update Redux state
                }// Update Redux state
                // Set the latest block hash to trigger animation
                setLatestBlockHash(newBlock.hash);

                dispatch(addNewBlock(newBlock)); // Update Redux state
                setTimeout(() => setLatestBlockHash(null), 300);
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
        <Box >
            <Box sx={{
                display: "flex"
            }}>
                <Text style={{ fontSize: "24px", fontWeight: "bold" }}>Blocks Info</Text>
            </Box>

            {/* Render recent blocks */}
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                overflowX: "scroll",
                mb: 1,
                pl:2
            }}>
                {blocks.map((block) => (
                    <SingleBlockInfo
                        key={block.hash}
                        block={block}
                        loading={allBlocksLoading}
                        isNew={block.hash === latestBlockHash} // Pass isNew prop
                    />
                ))}
            </Box>
            <Button onClick={() => navigateToAllBlock(navigate, networkName)}>
                View All Blocks
            </Button>
        </Box>
    );
};

export default AllBlock;
