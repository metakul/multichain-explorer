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

            if (
                action.payload &&
                typeof action.payload === "object" &&
                "hash" in action.payload &&
                "number" in action.payload
            ) {
                state.currentBlock = action.payload;
                state.loading = false;

                state.error = null;
            } else {
                console.warn("Invalid block received:", action.payload);
            }
        },
        setCurrentBlockLoading: (state,action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setCurrentBlockError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { setCurrentBlock , setCurrentBlockLoading, setCurrentBlockError} = currentblockSlice.actions;

export default currentblockSlice.reducer;

// Selectors
export const currentBlockInfo = (state: { currentBlockState: CurrentBlockState }) => state.currentBlockState.currentBlock;
export const selectCurrentBlockLoading = (state: { currentBlockState: CurrentBlockState }) => state.currentBlockState.loading;
export const selectCurrentBlockError = (state: { currentBlockState: CurrentBlockState }) => state.currentBlockState.error;
