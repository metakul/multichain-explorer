/* eslint-disable @typescript-eslint/no-explicit-any */
import {   createAsyncThunk } from "@reduxjs/toolkit";
import { ITrx, ApiError } from "../../../../../interfaces/interface";
import Request from "../../../../../Backend/axiosCall/apiCall";
import { ApiEndpoint } from "../../../../../DataTypes/enums";
import { setTransactions, setTransactionsLoading } from "./AllTrxSlice";



// Async thunk to fetch all transactions
export const fetchAllTransactions = createAsyncThunk(
    'transactions/fetchAllTransactions',
    async (rpcUrl: string, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setTransactionsLoading(true));
            console.log(rpcUrl);
            
            const response = await Request({
                url: "fetchAllTransactions",
                method: ApiEndpoint.fetchAllTransactions.method,
                data: {
                    providerUrl: rpcUrl
                },
                slug:"?requiredTransactions=2"
            });
            const transactions: ITrx[] = response;  // Assuming response contains an array of transactions
            dispatch(setTransactions(transactions));
            dispatch(setTransactionsLoading(false));
        } catch (error) {
            dispatch(setTransactionsLoading(false));
            const castedError = error as ApiError;
            return rejectWithValue(castedError.error || "Failed to fetch transactions");
        }
    }
);
