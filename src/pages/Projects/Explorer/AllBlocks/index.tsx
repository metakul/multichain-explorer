// src/components/AllBlocks.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { curretnBlockInfo, setCurrentBlock } from '../../../../redux/slices/BackendSlices/Explorer/Blocks/CurrentBlock/CurrentBlockSlice';
import { fetchBlocksInFrame } from '../../../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksApi';
import { useRpc } from '../../../../contexts/RpcProviderContext';
import { AppDispatch } from '../../../../redux/store';
import { selectBlocksForCurrentPage, selectBlocksLoadingInFrames, selectCurrentPage, setCurrentPage } from '../../../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/BlocksWithFrameSlice';
import { Block } from '../../../../interfaces/interface';
import Request from '../../../../Backend/axiosCall/apiCall';
import { ApiEndpoint } from '../../../../DataTypes/enums';
import BlockInfo from '../../../../Components/Blocks/BlockInfo';
import Text from '../../../../Components/UI/Text';
import Box from '../../../../Components/UI/Box';
import Button from '../../../../Components/UI/Button';

const AllBlocks: React.FC = () => {
    const blocksPerPage=5
    const currentPage = useSelector(selectCurrentPage);
    const blocks = useSelector(selectBlocksForCurrentPage);
    const allBlocksLoading = useSelector(selectBlocksLoadingInFrames);
    const currentBlock = useSelector(curretnBlockInfo);
    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl } = useRpc();

    useEffect(() => {
        const fetchBlockData = async () => {
            try {
                const response = await Request({
                    url: 'getLatestBlock',
                    method: ApiEndpoint.getLatestBlock.method,
                    data: {
                        providerUrl: rpcUrl,
                    },
                });
                const blocks: Block = response;
                setCurrentBlock(blocks);

                if (blocks?.number) {
                    const startBlock = Number(blocks.number) - (currentPage - 1) * blocksPerPage;
                    dispatch(fetchBlocksInFrame({ rpcUrl, startBlock: startBlock.toString(), blocksPerPage: blocksPerPage.toString() }));
                }
            } catch (error) {
                console.error('Error fetching block data:', error);
            }
        };
        fetchBlockData();
    }, [rpcUrl, dispatch, currentPage]);

    const handlePageChange = (newPage: number) => {
        dispatch(setCurrentPage(newPage));
        const startBlock = Number(currentBlock?.number) - (newPage - 1) * blocksPerPage;
        dispatch(fetchBlocksInFrame({ rpcUrl, startBlock: startBlock.toString(), blocksPerPage: blocksPerPage.toString() }));
    };

    return (
        <div style={{
            display:"flex",
            justifyContent:"center",
            flexDirection:"column",
        }}>
            <Text style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>All Blocks Info</Text>
            <Box>
                {!allBlocksLoading && blocks && blocks.length > 0 ? (
                    blocks.map((block) => <BlockInfo key={block.hash} block={block} />)
                ) : (
                    <p>No blocks found</p>
                )}
                <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                    <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    <Text style={{ margin: '0 16px' }}>Page {currentPage}</Text>
                    <Button onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
          
                </Box>
                
            </Box>
        </div>
    );
};

export default AllBlocks;
