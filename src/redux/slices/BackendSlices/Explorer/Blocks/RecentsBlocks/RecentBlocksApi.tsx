import { createAsyncThunk } from "@reduxjs/toolkit";
import Request from "../../../../../../Backend/axiosCall/apiCall";
import { ApiError, Block } from "../../../../../../interfaces/interface";
import { addNewBlock, setBlocks, setRecentBlocksLoading } from "./RecentBlocksSlice";
import { ApiEndpoint } from "../../../../../../DataTypes/enums";
import { setBlocksInFrames, setBlocksInFramesLoading } from "./BlocksWithFrameSlice";

export const fetchRecentBlocks = createAsyncThunk(
    'blocks/fetchRecentBlocks',
    async (rpcUrl: string, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setRecentBlocksLoading(true));
           
            const response = await Request({
                url: "fetchRecentBlocks",
                method: ApiEndpoint.fetchRecentBlocks.method,
                data: {
                    providerUrl: rpcUrl
                },
                slug:"/5",
            });
            const blocks: Block[] = response; 
            dispatch(setBlocks(blocks));
            dispatch(setRecentBlocksLoading(false));
        } catch (error) {
            dispatch(setRecentBlocksLoading(false));
            const castedError = error as ApiError
            return rejectWithValue(castedError.error || "Failed to fetch blocks");
        }
    }
);

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