/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Block } from "../../../../../../interfaces/interface";

// Initial state of the blocks slice
export interface BlocksState {
    blocks: Block[];
    transactionsByBlock: { [blockNo: string]: BlockTransactionsState };
    loading: boolean;
    error: string | null;
    currentPage: number; // Pagination state
    blocksPerPage: number; // Blocks per page
    totalNewTrxCount:number;
}

interface BlockTransactionsState {
    transactions: any[];
    loading: boolean;
    error: string | null;
}

const initialState: BlocksState = {
    blocks: [
        { number: "", baseFeePerGas: "" },
        { number: "", baseFeePerGas: "" },
        { number: "", baseFeePerGas: "" },
        { number: "", baseFeePerGas: "" },
        { number: "", baseFeePerGas: "" },
    ],
    transactionsByBlock: {
        "": {
            transactions: [],
            loading: false,
            error: null
        },
    },
    loading: false,
    error: null,
    currentPage: 1,
    blocksPerPage: 10,
    totalNewTrxCount: 0
};


// Blocks slice
const blocksSlice = createSlice({
    name: 'blocks',
    initialState,
    reducers: {
  
        addNewBlock: (state, action: PayloadAction<Block>) => {
            const newBlock = action.payload;
            // Check if a block with the same hash or number already exists
            const blockExists = state.blocks.some(
                (block) => block.hash === newBlock.hash || block.number === newBlock.number
            );
        
            if (!blockExists) {
                state.blocks.unshift(newBlock); // Add at index 0
                state.error = null;
            } else {
                state.error = "Block already exists";
            }
        
            state.loading = false;
        },
        setBlocksInFrames: (state, action: PayloadAction<Block[]>) => {
            const newBlocks = action.payload;

            // Filter out blocks that already exist in state
            const uniqueBlocks = newBlocks.filter(
                (newBlock) =>
                    !state.blocks.some(
                        (existingBlock) =>
                            existingBlock.number === newBlock.number || existingBlock.number === newBlock.number
                    )
            );

            // Add unique new blocks to the beginning of the list
            state.blocks = [...uniqueBlocks, ...state.blocks];
            state.error = null;
            state.loading = false;
        },
        setBlockTrxCount: (state, action: PayloadAction<{ blockNo: string; transactionsCount: number }>) => {
            const { blockNo, transactionsCount } = action.payload;

            // Find the block and update its transactionsCount
            const block = state.blocks.find(block => block.number === blockNo);
            if (block) {
                block.transactionsCount = transactionsCount;
            }
        },
        setBlocksInFramesLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setBlocksPerPage: (state, action: PayloadAction<number>) => {
            state.blocksPerPage = action.payload;
        },
        setNewTrxCount: (state, action: PayloadAction<number>) => {
            state.totalNewTrxCount += action.payload;
        },
        clearTrxCount: (state, ) => {
            state.totalNewTrxCount =0
        },
        setTransactionsLoading: (state, action: PayloadAction<string>) => {
            const blockNo = action.payload;
            state.transactionsByBlock[blockNo] = {
                ...state.transactionsByBlock[blockNo],
                loading: true,
                error: null,
            };
        },
        setTransactionsSuccess: (
            state,
            action: PayloadAction<{ blockNo: string; transactions: any[] }>
        ) => {
            const { blockNo, transactions } = action.payload;
            state.transactionsByBlock[blockNo] = {
                transactions,
                loading: false,
                error: null,
            };
        },
        setTransactionsError: (
            state,
            action: PayloadAction<{ blockNo: string; error: string }>
        ) => {
            const { blockNo, error } = action.payload;
            state.transactionsByBlock[blockNo] = {
                ...state.transactionsByBlock[blockNo],
                loading: false,
                error,
            };
        },
        resetState: (state) => {
            state.blocks = initialState.blocks;
            state.currentPage = initialState.currentPage;
            state.totalNewTrxCount = initialState.totalNewTrxCount;
            state.loading = initialState.loading;
            state.error = initialState.error;
        },
    },
});

export const { addNewBlock,setNewTrxCount, clearTrxCount,setBlocksInFrames, setBlocksInFramesLoading, setCurrentPage, setBlocksPerPage, setTransactionsLoading,
    setTransactionsSuccess,
    setTransactionsError,resetState,setBlockTrxCount } = blocksSlice.actions;

export default blocksSlice.reducer;

// Selectors
export const selectBlocksInFrames = (state: { recentBlocksStateInFrames: BlocksState }) => state.recentBlocksStateInFrames.blocks;
export const selectBlocksLoadingInFrames = (state: { recentBlocksStateInFrames: BlocksState }) => state.recentBlocksStateInFrames.loading;
export const selectBlocksErrorInFrames = (state: { recentBlocksStateInFrames: BlocksState }) => state.recentBlocksStateInFrames.error;
export const selectCurrentPage = (state: { recentBlocksStateInFrames: BlocksState }) => state.recentBlocksStateInFrames.currentPage;
export const selectBlocksPerPage = (state: { recentBlocksStateInFrames: BlocksState }) => state.recentBlocksStateInFrames.blocksPerPage;
export const selectNewTrxCount = (state: { recentBlocksStateInFrames: BlocksState }) => state.recentBlocksStateInFrames.totalNewTrxCount;

// New selector to fetch blocks for the current page
export const selectBlocksForCurrentPage = (state: { recentBlocksStateInFrames: BlocksState }) => {
    const { blocks, currentPage, blocksPerPage } = state.recentBlocksStateInFrames;
    const startIndex = (currentPage - 1) * blocksPerPage;
    return blocks.slice(startIndex, startIndex + blocksPerPage);
};
export const selectHomePageBlocks = (state: { recentBlocksStateInFrames: BlocksState }) => {
    const { blocks} = state.recentBlocksStateInFrames;
    return blocks
};

// Redux slice - selectors
export const selectTransactionsForBlock = (blockNo: string) => (state: { recentBlocksStateInFrames: BlocksState }) =>
    state.recentBlocksStateInFrames.transactionsByBlock[blockNo]?.transactions || [];

export const selectTransactionsLoadingForBlock = (blockNo: string) => (state: { recentBlocksStateInFrames: BlocksState }) =>
    state.recentBlocksStateInFrames.transactionsByBlock[blockNo]?.loading || false;

export const selectTransactionsErrorForBlock = (blockNo: string) => (state: { recentBlocksStateInFrames: BlocksState }) =>
    state.recentBlocksStateInFrames.transactionsByBlock[blockNo]?.error || null;
// Selector to fetch a specific block by its number
export const selectBlockByNumber = (blockNo: string) => (state: { recentBlocksStateInFrames: BlocksState }) =>
    state.recentBlocksStateInFrames.blocks.find(block => block.number === blockNo);


// Selector to fetch trxCount for a specific block by block number
export const selectTrxCountForBlock = (blockNo: string) => (state: { recentBlocksStateInFrames: BlocksState }) => {
    const block = state.recentBlocksStateInFrames.blocks.find(block => block.number === blockNo);
    return block?.transactionsCount ?? 0; // Default to 0 if not found
};
