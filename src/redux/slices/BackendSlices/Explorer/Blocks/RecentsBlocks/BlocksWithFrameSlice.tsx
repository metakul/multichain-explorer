/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Block } from "../../../../../../interfaces/interface";

// Initial state of the blocks slice
export interface BlocksState {
    blocks: Block[];
    loading: boolean;
    error: string | null;
    currentPage: number; // Pagination state
    blocksPerPage: number; // Blocks per page
}

const initialState: BlocksState = {
    blocks: [],
    loading: false,
    error: null,
    currentPage: 1, // Initial page
    blocksPerPage: 5, // Default blocks per page
};

// Blocks slice
const blocksSlice = createSlice({
    name: 'blocks',
    initialState,
    reducers: {
        setBlocks: (state, action: PayloadAction<Block[]>) => {
            state.loading = false;
            state.blocks = action.payload;
            state.error = null;
        },
        setBlocksInFrames: (state, action: PayloadAction<Block[]>) => {
            const newBlocks = action.payload;

            // Filter out blocks that already exist in state
            const uniqueBlocks = newBlocks.filter(
                (newBlock) =>
                    !state.blocks.some(
                        (existingBlock) =>
                            existingBlock.hash === newBlock.hash || existingBlock.number === newBlock.number
                    )
            );

            // Add unique new blocks to the beginning of the list
            state.blocks = [...uniqueBlocks, ...state.blocks];
            state.error = null;
            state.loading = false;
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
    },
});

export const { setBlocks, setBlocksInFrames, setBlocksInFramesLoading, setCurrentPage, setBlocksPerPage } = blocksSlice.actions;

export default blocksSlice.reducer;

// Selectors
export const selectBlocksInFrames = (state: { recentBlocksStateInFrames: BlocksState }) => state.recentBlocksStateInFrames.blocks;
export const selectBlocksLoadingInFrames = (state: { recentBlocksStateInFrames: BlocksState }) => state.recentBlocksStateInFrames.loading;
export const selectBlocksErrorInFrames = (state: { recentBlocksStateInFrames: BlocksState }) => state.recentBlocksStateInFrames.error;
export const selectCurrentPage = (state: { recentBlocksStateInFrames: BlocksState }) => state.recentBlocksStateInFrames.currentPage;
export const selectBlocksPerPage = (state: { recentBlocksStateInFrames: BlocksState }) => state.recentBlocksStateInFrames.blocksPerPage;

// New selector to fetch blocks for the current page
export const selectBlocksForCurrentPage = (state: { recentBlocksStateInFrames: BlocksState }) => {
    const { blocks, currentPage, blocksPerPage } = state.recentBlocksStateInFrames;
    const startIndex = (currentPage - 1) * blocksPerPage;
    return blocks.slice(startIndex, startIndex + blocksPerPage);
};
