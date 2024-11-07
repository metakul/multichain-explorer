import { createAsyncThunk } from "@reduxjs/toolkit";
import Request from "../../../../../../Backend/axiosCall/apiCall";
import { ApiError, Block } from "../../../../../../interfaces/interface";
import { addNewBlock, setBlocks, setRecentBlocksLoading } from "./RecentBlocksSlice";
import { ApiEndpoint } from "../../../../../../DataTypes/enums";

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
                slug:"/3",
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
