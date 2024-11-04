import { createAsyncThunk } from "@reduxjs/toolkit";
import Request from "../../../../../../Backend/axiosCall/apiCall";
import { ApiError, Block } from "../../../../../../interfaces/interface";
import { setBlocks } from "./RecentBlocksSlice";
import { ApiEndpoint } from "../../../../../../DataTypes/enums";

export const fetchBlocks = createAsyncThunk(
    'blocks/fetchBlocks',
    async (rpcUrl: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await Request({
                url: "getLatestBlock",
                method: ApiEndpoint.getLatestBlock.method,
                data: {
                    providerUrl: rpcUrl
                },
            });
            const blocks: Block = response; 
            dispatch(setBlocks([blocks]));
        } catch (error) {
            const castedError = error as ApiError
            return rejectWithValue(castedError.error || "Failed to fetch blocks");
        }
    }
);