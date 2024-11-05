/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Block } from "../../../../../../interfaces/interface";



// Initial state of the blocks slice
interface BlocksState {
    blocks: Block[];
    loading: boolean;
    error: string | null;
}

const initialState: BlocksState = {
    blocks: [
    ],
    loading: false,
    error: null,
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
        addNewBlock: (state, action: PayloadAction<Block>) => {
            state.loading = false;
            state.blocks.push(action.payload);
            state.error = null;
        },
        setRecentBlocksLoading: (state, action: PayloadAction<boolean>) => {
           console.log(action.payload);
           
            state.loading = action.payload;
        },
    },
});

export const { setBlocks, addNewBlock, setRecentBlocksLoading } = blocksSlice.actions;

export default blocksSlice.reducer;

// Selectors
export const selectBlocks = (state: { recentBlocksState: BlocksState }) => state.recentBlocksState.blocks;
export const selectBlocksLoading = (state: { recentBlocksState: BlocksState }) => state.recentBlocksState.loading;
export const selectBlocksError = (state: { recentBlocksState: BlocksState }) => state.recentBlocksState.error;
