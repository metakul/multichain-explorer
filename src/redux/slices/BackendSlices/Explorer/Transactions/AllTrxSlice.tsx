/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITrx } from "../../../../../interfaces/interface";
import { fetchAllTransactions } from "./AllTrxApiSlice";

// Initial state of the transactions slice
export interface TransactionsState {
    transactions: ITrx[];
    loading: boolean;
    error: string | null;
}

const initialState: TransactionsState = {
    transactions: [],
    loading: false,
    error: null,
};

// Transactions slice
const trxSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setTransactions: (state, action: PayloadAction<ITrx[]>) => {
            state.transactions = action.payload;
            state.error = null;
        },
        setTransactionsLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        addTransaction: (state, action: PayloadAction<ITrx>) => {
            state.transactions.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllTransactions.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });
    },
});

export const { setTransactions, setTransactionsLoading, addTransaction } = trxSlice.actions;

export default trxSlice.reducer;

// Selectors
export const selectTransactions = (state: { transactionsState: TransactionsState }) => state.transactionsState.transactions;
export const selectTransactionsLoading = (state: { transactionsState: TransactionsState }) => state.transactionsState.loading;
export const selectTransactionsError = (state: { transactionsState: TransactionsState }) => state.transactionsState.error;
// Selector to get a single transaction by hash
export const selectTransactionByHash = (state: { transactionsState: TransactionsState }, hash: string) =>
    state.transactionsState.transactions.find(transaction => transaction.hash === hash);
