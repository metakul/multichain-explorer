import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentBlockError, setCurrentBlockLoading } from '../../redux/slices/BackendSlices/Explorer/Blocks/CurrentBlock/CurrentBlockSlice';
import { fetchBlocksInFrame, getBlockWithTrx } from '../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksApi';
import { useRpc } from '../../contexts/RpcProviderContext';
import { AppDispatch } from '../../redux/store';
import Box from '../UI/Box';
import Text from '../UI/Text';
import Button from '../UI/Button';
import SingleBlockInfo from './SingleBlockCard';
import { navigateToAllBlock } from '../../helpers/navigationHelpers';
import { useNavigate } from 'react-router-dom';
import "./SingleBlock.css"
import { addNewBlock, selectBlocksForCurrentPage, selectBlocksLoadingInFrames, selectBlocksPerPage, selectCurrentPage, setCurrentPage, setNewTrxCount } from '../../redux/slices/BackendSlices/Explorer/Blocks/RecentsBlocks/BlocksWithFrameSlice';
import { Block } from '../../interfaces/interface';

const AllBlock: React.FC = () => {
    const blocks = useSelector(selectBlocksForCurrentPage);
    const allBlocksLoading = useSelector(selectBlocksLoadingInFrames);
    const dispatch = useDispatch<AppDispatch>();
    const { rpcUrl, networkName } = useRpc();
    const navigate = useNavigate();

    const [latestBlockHash, setLatestBlockHash] = useState<string | null>(null);
    const [latestBlock, setLatestBlock] = useState<Block | null>(null);
    const [totalBlocks, setTotalBlocks] = useState<number>(1000);  // Track total blocks count
    const [wsActive, setWsActive] = useState<boolean>(true);    // Track WebSocket state
    const wsRef = useRef<WebSocket | null>(null);

    const blocksPerPage = useSelector(selectBlocksPerPage)
    const currentPage = useSelector(selectCurrentPage);
    useEffect(() => {
        startWebSocket()
        if(blocks[0]?.number){
            const startBlock = Number(blocks[0]) - (currentPage - 1) * blocksPerPage;
        }
    }, []);

    // Start or stop WebSocket based on page
    useEffect(() => {
        if (currentPage === 1 && !wsActive) {
            startWebSocket();
        }
    }, [currentPage, rpcUrl]);

    const startWebSocket = () => {
        const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
        wsRef.current = ws;
        setWsActive(true);

        dispatch(setCurrentBlockLoading(true));

        ws.onopen = () => {
            console.log('WebSocket connection established');
            ws.send(JSON.stringify({ type: 'INIT', rpcUrl }));
        };

        ws.onmessage = (event) => {
            try {
                const newBlock = JSON.parse(event.data);
                if (newBlock?.transactionsCount) {
                    dispatch(setNewTrxCount(newBlock?.transactionsCount));
                }
            
                setLatestBlockHash(newBlock.hash);
                setLatestBlock(newBlock);
                dispatch(addNewBlock(newBlock));
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
            setWsActive(false);
            console.log('WebSocket connection closed');
        };
    };

    const stopWebSocket = () => {
        wsRef.current?.close();
        setWsActive(false);
    };

    const handlePageChange = (newPage: number) => {
        dispatch(setCurrentPage(newPage));

        let startBlock: number;

        if (newPage === 1) {
            // Page 1, rely on the latest known block
            startBlock = totalBlocks;
            startWebSocket();
        } else {
            // Stop websocket during pagination (page > 1)
            stopWebSocket();

            if (blocks.length > 0) {
                // Use the latest block on current page as reference
                startBlock = Number(blocks[0]?.number) - ((newPage - 1) * blocksPerPage);
            } else {
                // Fallback if no blocks in state, use totalBlocks
                startBlock = totalBlocks - ((newPage - 1) * blocksPerPage);
            }
        }

        dispatch(fetchBlocksInFrame({
            rpcUrl,
            startBlock: startBlock.toString(),
            blocksPerPage: blocksPerPage.toString()
        }));
    };

    const totalPages = Math.ceil(totalBlocks / blocksPerPage);
    
    const renderPageNumbers = () => {
        const visiblePages = 3; // How many "surrounding" pages to show (can be dynamic if you want)
    
        if (totalPages <= visiblePages + 2) {
            // Small number of pages - show all pages
            return Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return renderPageButton(pageNumber);
            });
        }
    
        const pageNumbers = [];
        const addPageNumber = (pageNumber: number) => {
            pageNumbers.push(renderPageButton(pageNumber));
        };
    
        addPageNumber(1); // Always show first page
    
        if (currentPage > visiblePages + 1) {
            pageNumbers.push(<span key="start-ellipsis">...</span>);
        }
    
        // Logic: Always show 50, 100, 150, etc. if current page is 200+
        if (currentPage > 100) {
            for (let marker = 50; marker < currentPage; marker += 50) {
                if (marker > 1) {
                    addPageNumber(marker);
                }
            }
        }
    
        // Show 2 pages before and after current page
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
    
        for (let i = start; i <= end; i++) {
            addPageNumber(i);
        }
    
        if (currentPage < totalPages - visiblePages) {
            pageNumbers.push(<span key="end-ellipsis">...</span>);
        }
    
        if (totalPages > 1) {
            addPageNumber(totalPages); // Always show last page
        }
    
        return pageNumbers;
    };
    
    const renderPageButton = (pageNumber:number) => (
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
            <Box sx={{ display: "flex" }}>
                <Text style={{ fontSize: "24px", fontWeight: "bold" }}>Blocks Info</Text>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", overflowX: "scroll", mb: 1, pl: 2 }}>
                {blocks.map((block) => (
                    <SingleBlockInfo
                        key={block.hash}
                        block={block}
                        loading={allBlocksLoading}
                        isNew={block.hash === latestBlockHash}
                    />
                ))}
            </Box>

            <Button onClick={() => navigateToAllBlock(navigate, networkName)}>
                View All Blocks
            </Button>

            {/* Pagination */}
            <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
                {renderPageNumbers()}
            </Box>
        </Box>
    );
};

export default AllBlock;
