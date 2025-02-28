import { createAsyncThunk } from "@reduxjs/toolkit";
import Request from "../../../../../../Backend/axiosCall/apiCall";
import { ApiError, Block } from "../../../../../../interfaces/interface";
import { ApiEndpoint } from "../../../../../../DataTypes/enums";
import { addNewBlock, setBlocksInFrames, setBlocksInFramesLoading, setTransactionsError, setTransactionsLoading, setTransactionsSuccess } from "./BlocksWithFrameSlice";


export const fetchBlockInfo = createAsyncThunk(
    'blocks/fetchBlockInfo',
    async ({ rpcUrl, blockNo }: { rpcUrl: string, blockNo: string }, { dispatch, rejectWithValue }) => {
        try {
            const response = await Request({
                url: "fetchBlockInfo",
                method: ApiEndpoint.fetchBlockInfo.method,
                data: {
                    providerUrl: rpcUrl
                },
                slug: `/${blockNo}`
            });
            const blockInfo: Block = response;
            dispatch(addNewBlock(blockInfo));
        } catch (error) {
            const castedError = error as ApiError
            return rejectWithValue(castedError.error || "Failed to fetch recent Blocks");
        }
    }
);

export const fetchBlocksInFrame = createAsyncThunk(
    'blocks/fetchBlocksInFrame',
    async({ rpcUrl, startBlock, blocksPerPage }: { rpcUrl: string, startBlock:string, blocksPerPage:string }, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setBlocksInFramesLoading(true));

            const response = await Request({
                url: "fetchBlocksInFrame",
                method: ApiEndpoint.fetchBlocksInFrame.method,
                data: {
                    providerUrl: rpcUrl,
                    startBlock: startBlock,
                    blocksPerPage: blocksPerPage
                },
            });
            const blocks: Block[] = response;
            dispatch(setBlocksInFrames(blocks));
            dispatch(setBlocksInFramesLoading(false));
        } catch (error) {
            dispatch(setBlocksInFramesLoading(false));
            const castedError = error as ApiError
            return rejectWithValue(castedError.error || "Failed to fetch blocks with pagination");
        }
    }
);

// Thunk for fetching transactions within a block
export const getBlockWithTrx = createAsyncThunk(
    'blocks/getBlockWithTrx',
    async ({ blockNo, rpcUrl }: { blockNo: string; rpcUrl: string }, { dispatch, rejectWithValue }) => {
        try {
            // Dispatch loading state for the specific block
            dispatch(setTransactionsLoading(blockNo));

            // Make the API call to fetch transactions
            const response = await Request({
                url: "getBlockWithTrx",
                method: ApiEndpoint.getBlockWithTrx.method,
                data: {
                    providerUrl: rpcUrl
                },
                slug: `/${blockNo}`
            });

            const transactions = Object.values(response);
            // Dispatch success action with the fetched transactions
            dispatch(setTransactionsSuccess({ blockNo, transactions }));
        } catch (error) {
            const castedError = error as ApiError;
            // Dispatch error state for the specific block
            dispatch(setTransactionsError({ blockNo, error: castedError.error || "Failed to fetch transactions" }));
            return rejectWithValue(castedError.error || "Failed to fetch transactions");
        }
    }
);
