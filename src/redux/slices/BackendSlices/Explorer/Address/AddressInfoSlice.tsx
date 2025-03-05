/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddress } from "../../../../../interfaces/interface";


// Initial state of the current Address slice
interface CurrentAddressState {
    addressInfo: IAddress | null;
    loading: boolean;
    transactionsLoading: boolean;
    error: string | null;
    transactionsError: string | null;
}

const initialState: CurrentAddressState = {
    addressInfo: null,
    loading: false,
    transactionsLoading: false,
    error: null,
    transactionsError: null,
};

// addressInfo slice
const addressInfoSlice = createSlice({
    name: 'addressInfo',
    initialState,
    reducers: {
        setAddressInfo: (state, action: PayloadAction<IAddress>) => {
            state.loading = false;
            state.addressInfo = action.payload;
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setTransactionLoading: (state, action: PayloadAction<boolean>) => {
            state.transactionsLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setTransactionsError: (state, action: PayloadAction<string | null>) => {
            state.transactionsError = action.payload;
        },

    },
});

export const { setAddressInfo, setLoading,setTransactionLoading, setError, setTransactionsError } = addressInfoSlice.actions;

export default addressInfoSlice.reducer;

// Selectors
export const selectedAddressInfo = (state: { addressInfo: CurrentAddressState }) => state.addressInfo.addressInfo;
export const selectAddressInfoLoading = (state: { addressInfo: CurrentAddressState }) => state.addressInfo.loading;
export const selectAddressTransactionsLoading = (state: { addressInfo: CurrentAddressState }) => state.addressInfo.transactionsLoading;
export const selectAddressTransactionsError = (state: { addressInfo: CurrentAddressState }) => state.addressInfo.transactionsError;
export const selectAddressInfoError = (state: { addressInfo: CurrentAddressState }) => state.addressInfo.error;
