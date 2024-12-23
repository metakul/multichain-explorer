import { createAsyncThunk } from "@reduxjs/toolkit";
import Request from "../../../../../../Backend/axiosCall/apiCall";
import { ApiError, Block } from "../../../../../../interfaces/interface";
import { setCurrentBlock } from "./CurrentBlockSlice";
import { ApiEndpoint } from "../../../../../../DataTypes/enums";
import { setBlocks } from "../RecentsBlocks/RecentBlocksSlice";

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

            // Generate mock blocks for previous 5 blocks
            const currentBlockNumber = parseInt(currentBlock.number, 10);
            const mockBlocks: Block[] = Array.from({ length: 5 }, (_, index) => {
                const blockNo = (currentBlockNumber - index).toString();
                return {
                    number: blockNo,
                    transactions: [], // Empty transactions for mock
                    uncles: [], // Empty uncles for mock
                    transactionsCount: 0, // Empty transactions count for mock
                };
            });

            // Dispatch actions
            dispatch(setCurrentBlock(currentBlock));
            dispatch(setBlocks(mockBlocks));
        } catch (error) {
            const castedError = error as ApiError
            return rejectWithValue(castedError.error || "Failed to fetch current Block");
        }
    }
);