/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Block } from "../../../../../../interfaces/interface";


// Initial state of the currentblock slice
interface CurrentBlockState {
    currentBlock: Block | null;
    loading: boolean;
    error: string | null;
}

const initialState: CurrentBlockState = {
    currentBlock: null,
    loading: false,
    error: null,
};

// CurrentBlock slice
const currentblockSlice = createSlice({
    name: 'currentblock',
    initialState,
    reducers: {
        setCurrentBlock: (state, action: PayloadAction<Block>) => {
            state.loading = false;
            state.currentBlock = action.payload;
            state.error = null;
        },
        addNewBlock: (state, action: PayloadAction<Block>) => {
            state.loading = false;
            state.currentBlock=action.payload
            state.error = null;
        },
    },
});

export const { setCurrentBlock, addNewBlock } = currentblockSlice.actions;

export default currentblockSlice.reducer;

// Selectors
export const curretnBlockInfo = (state: { currentBlockState: CurrentBlockState }) => state.currentBlockState.currentBlock;
export const selectCurrentBlockLoading = (state: { currentBlockState: CurrentBlockState }) => state.currentBlockState.loading;
export const selectCurrentBlockError = (state: { currentBlockState: CurrentBlockState }) => state.currentBlockState.error;
