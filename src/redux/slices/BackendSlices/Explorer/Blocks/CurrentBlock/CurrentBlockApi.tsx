import { createAsyncThunk } from "@reduxjs/toolkit";
import Request from "../../../../../../Backend/axiosCall/apiCall";
import { ApiError, Block } from "../../../../../../interfaces/interface";
import { setCurrentBlock } from "./CurrentBlockSlice";
import { ApiEndpoint } from "../../../../../../DataTypes/enums";

export const fetchCurrentBlock = createAsyncThunk(
    'blocks/fetchCurrentBlock',
    async (rpcUrl: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await Request({
                url: "getLatestBlock",
                method: ApiEndpoint.getLatestBlock.method,
                data: {
                    providerUrl: rpcUrl
                },
            });
            const getTransactionCountInBlock = await Request({
                url: "getTransactionCountInBlock",
                method: ApiEndpoint.getTransactionCountInBlock.method,
                data: {
                    providerUrl: rpcUrl
                },
                slug:`/${response.number}`
            });

            console.log(getTransactionCountInBlock.transactionCount,);
            
            
            const currentBlock: Block = {
                ...response,
                transactionsCount: getTransactionCountInBlock.transactionCount,
            };

            // Dispatch actions
            dispatch(setCurrentBlock(currentBlock));
        } catch (error) {
            const castedError = error as ApiError
            return rejectWithValue(castedError.error || "Failed to fetch current Block");
        }
    }
);