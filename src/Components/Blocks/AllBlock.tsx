import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentBlockInfo, setCurrentBlockError, setCurrentBlockLoading } from '../../redux/slices/BackendSlices/Explorer/Blocks/CurrentBlock/CurrentBlockSlice';
import { fetchBlocksInFrame } from '../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksApi';
import { useRpc } from '../../contexts/RpcProviderContext';
import { AppDispatch } from '../../redux/store';
import Box from '../UI/Box';
import Text from '../UI/Text';
import Button from '../UI/Button';
import SingleBlockInfo from './SingleBlockCard';
import { navigateToAllBlock } from '../../helpers/navigationHelpers';
import { useNavigate } from 'react-router-dom';
import "./SingleBlock.css";
import { addNewBlock, selectBlocksForCurrentPage, selectBlocksLoadingInFrames, selectBlocksPerPage, selectCurrentPage, selectHomePageBlocks, setBlocksInFramesLoading, setCurrentPage, setNewTrxCount } from '../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/BlocksWithFrameSlice';
import { Block } from '../../interfaces/interface';
import { fetchCurrentBlock } from '../../redux/slices/BackendSlices/Explorer/Blocks/CurrentBlock/CurrentBlockApi';

interface AllBlockProps {
    showTrx: boolean;
}

const AllBlock: React.FC<AllBlockProps> = ({ showTrx }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl, networkName } = useRpc();
    const navigate = useNavigate();

    const blocks = useSelector(selectBlocksForCurrentPage);
    const homePageBlocks = useSelector(selectHomePageBlocks);
    
    const allBlocksLoading = useSelector(selectBlocksLoadingInFrames);
    const blocksPerPage = useSelector(selectBlocksPerPage);
    const currentPage = useSelector(selectCurrentPage);
    const currentBlock = useSelector(currentBlockInfo);

    const [latestBlockHash, setLatestBlockHash] = useState<string | null>(null);
    const [totalBlocks] = useState<number>(1000);  // Consider replacing with actual fetched total if available

    const wsRef = useRef<WebSocket | null>(null);

    // --- Fetch blocks for first page if `showTrx` is true (for transactions view) ---
    useEffect(() => {
        if (showTrx) {
            dispatch(fetchCurrentBlock(rpcUrl))
            fetchLatestFrame();
        }
    }, [showTrx, blocks.length]);
    useEffect(() => {
        if (showTrx) {
            fetchLatestFrame();
        }
    }, [currentBlock]);

    // --- WebSocket setup (only if not showing transactions view) ---
    useEffect(() => {
        if (!showTrx && currentPage === 1) {
            startWebSocket();
        }
        return () => {
            stopWebSocket();
        };
    }, [showTrx,rpcUrl, currentPage]);

    const fetchLatestFrame = () => {
        const startBlock =  Number(currentBlock?.number) - (currentPage - 1) * blocksPerPage
        dispatch(fetchBlocksInFrame({
            rpcUrl,
            startBlock: startBlock.toString(),
            blocksPerPage: blocksPerPage.toString()
        }));
    };
    
    const startWebSocket = () => {
        stopWebSocket();  // Ensure no duplicate connections

        const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
        wsRef.current = ws;
        dispatch(setCurrentBlockLoading(true));
        ws.onopen = () => {
            console.log('WebSocket connected');
            ws.send(JSON.stringify({ type: 'INIT', rpcUrl }));
        };

        ws.onmessage = (event) => {
            try {
                dispatch(setBlocksInFramesLoading(true));

                const newBlock: Block = JSON.parse(event.data);
                if (newBlock?.transactionsCount) {
                    dispatch(setNewTrxCount(newBlock.transactionsCount));
                }
                if (newBlock.hash) {
                    setLatestBlockHash(newBlock.hash);
                }
                dispatch(addNewBlock(newBlock));
                dispatch(setBlocksInFramesLoading(false));
                setTimeout(() => setLatestBlockHash(null), 300);
            } catch (error) {
                dispatch(setCurrentBlockError('Failed to parse new block data'));
            }
        };

        ws.onerror = () => {
            dispatch(setCurrentBlockError('WebSocket encountered an error'));
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };
    };

    const stopWebSocket = () => {
        wsRef.current?.close();
        wsRef.current = null;
    };

    const handlePageChange = (newPage: number) => {
        dispatch(setCurrentPage(newPage));
    
        if (newPage === 1 && !showTrx) {
            startWebSocket();  // Only for latest page
        } else {
            stopWebSocket();
        }
    
        if (!currentBlock?.number) {
            console.warn("Current block not available yet.");
            return;
        }
    
        const latestBlockNumber = Number(currentBlock.number);
    
        const startBlock = latestBlockNumber - ((newPage - 1) * blocksPerPage);
    
        dispatch(fetchBlocksInFrame({
            rpcUrl,
            startBlock: startBlock.toString(),
            blocksPerPage: blocksPerPage.toString()
        }));
    };
    

    const renderPageNumbers = () => {
        const totalPages = Math.ceil(totalBlocks / blocksPerPage);
        const visiblePages = 3;

        if (totalPages <= visiblePages + 2) {
            return Array.from({ length: totalPages }, (_, index) => (
                renderPageButton(index + 1)
            ));
        }

        const pageNumbers = [];
        pageNumbers.push(renderPageButton(1));

        if (currentPage > visiblePages + 1) {
            pageNumbers.push(<span key="start-ellipsis">...</span>);
        }

        if (currentPage > 100) {
            for (let marker = 50; marker < currentPage; marker += 50) {
                pageNumbers.push(renderPageButton(marker));
            }
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pageNumbers.push(renderPageButton(i));
        }

        if (currentPage < totalPages - visiblePages) {
            pageNumbers.push(<span key="end-ellipsis">...</span>);
        }

        pageNumbers.push(renderPageButton(totalPages));

        return pageNumbers;
    };

    const renderPageButton = (pageNumber: number) => (
        <Button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            style={{
                margin: '0 4px',
                backgroundColor: pageNumber === currentPage ? '#007bff' : '#f0f0f0',
                color: pageNumber === currentPage ? '#fff' : '#000',
                border: pageNumber === currentPage ? '1px solid #007bff' : '1px solid #ccc'
            }}
        >
            {pageNumber}
        </Button>
    );

    return (
        <Box>
            <Box sx={{ display: 'flex',justifyContent:"space-between", alignItems:"center" }}>
                <Text sx={{fontSize: { xs: "16px",sm:"20px", md: "24px" }, fontWeight: 'bold' }}>Blocks Info</Text>
              {!showTrx &&  <Button onClick={() => navigateToAllBlock(navigate, networkName)}>
                View All Blocks
            </Button>
              }
            {showTrx && (
                <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
                    {renderPageNumbers()}
                </Box>
            )}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', overflowX: 'scroll', marginBottom: 2, paddingLeft: 0 }}>
                {showTrx && blocks.map((block) => (
                    <SingleBlockInfo
                        key={block.hash}
                        block={block}
                        loading={allBlocksLoading}
                        isNew={block.hash === latestBlockHash}
                        showTrx={showTrx}
                    />
                ))}
                {homePageBlocks.map((block) => (
                    <SingleBlockInfo
                        key={block.hash}
                        block={block}
                        loading={allBlocksLoading}
                        isNew={block.hash === latestBlockHash}
                        showTrx={showTrx}
                    />
                ))}
            </Box>

        </Box>
    );
};

export default AllBlock;
