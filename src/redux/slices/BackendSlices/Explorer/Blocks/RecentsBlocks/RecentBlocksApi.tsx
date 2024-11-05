import { createAsyncThunk } from "@reduxjs/toolkit";
import Request from "../../../../../../Backend/axiosCall/apiCall";
import { ApiError, Block } from "../../../../../../interfaces/interface";
import { setBlocks, setRecentBlocksLoading } from "./RecentBlocksSlice";
import { ApiEndpoint } from "../../../../../../DataTypes/enums";

export const fetchRecentBlocks = createAsyncThunk(
    'blocks/fetchRecentBlocks',
    async (rpcUrl: string, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setRecentBlocksLoading(true));
           
            const response = await Request({
                url: "fetchRecentBlocks",
                method: ApiEndpoint.fetchRecentBlocks.method,
                // todo
                data: {
                    providerUrl: rpcUrl
                },
                slug:"/4",
            });
            const blocks: Block[] = response; 

            console.log("responseresponseresponseresponse", response);
            
            dispatch(setBlocks(blocks));
            dispatch(setRecentBlocksLoading(false));
        } catch (error) {
            dispatch(setRecentBlocksLoading(false));
            const castedError = error as ApiError
            return rejectWithValue(castedError.error || "Failed to fetch blocks");
        }
    }
);