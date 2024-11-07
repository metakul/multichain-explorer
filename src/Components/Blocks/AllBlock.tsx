import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBlocks, selectBlocksLoading } from '../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksSlice';
import { Box, Text } from '@radix-ui/themes';
import Grid from '../Grid';
import { curretnBlockInfo } from '../../redux/slices/BackendSlices/Explorer/Blocks/CurrentBlock/CurrentBlockSlice';
import { fetchRecentBlocks } from '../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksApi';
import { useRpc } from '../../contexts/RpcProviderContext';
import { AppDispatch } from '../../redux/store';
import { fetchCurrentBlock } from '../../redux/slices/BackendSlices/Explorer/Blocks/CurrentBlock/CurrentBlockApi';
import { navigateToBlock } from '../../helpers/navigationHelpers';
import { useNavigate } from 'react-router-dom';

const BlockCards: React.FC = () => {
    const blocks = useSelector(selectBlocks);
    const allBlocksLoading = useSelector(selectBlocksLoading);
    const currentBlock = useSelector(curretnBlockInfo);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const { rpcUrl } = useRpc()
    useEffect(() => {
        dispatch(fetchRecentBlocks(rpcUrl))
        dispatch(fetchCurrentBlock(rpcUrl))
    }, [dispatch, rpcUrl])
    
    return (
        <div >
            <Grid
                gap="3" width="auto"
            >
                {currentBlock && (
                    <Box key={currentBlock.hash} style={{
                        backgroundColor: '#ffffff',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        padding: '16px',
                        height: "200px"
                    }}>
                        <Text style={{ color: "blue", fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }} onClick={() => navigateToBlock(navigate, Number(currentBlock?.number))}>
                            Current Block Info #{currentBlock.number}
                        </Text>
                        {/* <p><strong>Hash:</strong> {currentBlock.hash}</p> */}
                        {/* <p><strong>Miner:</strong> {currentBlock.miner}</p> */}
                        <p><strong>Gas Limit:</strong> {currentBlock.gasLimit}</p>
                        <p><strong>Size:</strong> {currentBlock.size} bytes</p>
                        <p><strong>Difficulty:</strong> {currentBlock.difficulty}</p>
                        <p>
                            <strong>Timestamp:</strong> {new Date(parseInt(currentBlock.timestamp) * 1000).toLocaleString()}
                        </p>
                    </Box>
                )}

                {blocks && blocks.map((block, index) => (
                    <Box key={block.hash || index} style={{
                        backgroundColor: '#ffffff',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        padding: '16px',
                        height:"200px"
                    }}>
                        <Text style={{color:"blue", fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }} onClick={() => navigateToBlock(navigate, Number(block.number))}>
                            Block #{block.number}
                        </Text>
                        {/* <p><strong>Hash:</strong> {block.hash}</p> */}
                        {/* <p><strong>Miner:</strong> {block.miner}</p> */}
                        <p><strong>Gas Limit:</strong> {block.gasLimit}</p>
                        <p><strong>Size:</strong> {block.size} bytes</p>
                        <p><strong>Difficulty:</strong> {block.difficulty}</p>
                        <p>
                            <strong>Timestamp:</strong> {new Date(parseInt(block.timestamp) * 1000).toLocaleString()}
                        </p>
                    </Box>
                ))}

                {allBlocksLoading &&  blocks.length==0  && (
                    Array.from({ length: 3 }).map((_, index) => (
                        <Box key={index} style={{
                            backgroundColor: '#e0e0e0',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            height: "200px"
                        }}>
                            <div style={{ height: '20px', backgroundColor: '#ccc', borderRadius: '4px' }}></div>
                            <div style={{ height: '16px', backgroundColor: '#ddd', borderRadius: '4px' }}></div>
                            <div style={{ height: '16px', backgroundColor: '#ddd', borderRadius: '4px' }}></div>
                            <div style={{ height: '16px', backgroundColor: '#ddd', borderRadius: '4px' }}></div>
                            <div style={{ height: '16px', backgroundColor: '#ddd', borderRadius: '4px' }}></div>
                        </Box>
                    ))
                )}
            </Grid>
        </div>
    );
};

export default BlockCards;
