/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Block } from "../../../../../../interfaces/interface";



// Initial state of the blocks slice
export interface BlocksState {
    blocks: Block[];
    loading: boolean;
    error: string | null;
}

const initialState: BlocksState = {
    blocks: [{
        number:"",
        baseFeePerGas:""
    },{
        number:"",
        baseFeePerGas:""
    },{
        number:"",
        baseFeePerGas:""
    },{
        number:"",
        baseFeePerGas:""
    },{
        number:"",
        baseFeePerGas:""
    },
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
            const newBlock = action.payload;
            // Check if a block with the same hash or number already exists
            const blockExists = state.blocks.some(
                (block) => block.hash === newBlock.hash || block.number === newBlock.number
            );

            if (!blockExists) {
                state.blocks.push(newBlock);
                state.error = null;
            } else {
                state.error = "Block already exists";
            }

            state.loading = false;
        },
        setRecentBlocksLoading: (state, action: PayloadAction<boolean>) => {
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

// New selector to fetch a block by its number or hash
export const selectBlockByNumberOrHash = (state: { recentBlocksState: BlocksState }, identifier: string) =>
    state.recentBlocksState.blocks.find(
        (block) => block.number === identifier || block.hash === identifier
    );
