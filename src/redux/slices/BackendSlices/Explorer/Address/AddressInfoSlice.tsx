/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddress } from "../../../../../interfaces/interface";


// Initial state of the current Address slice
interface CurrentAddressState {
    addressInfo: IAddress | null;
    loading: boolean;
    error: string | null;
}

const initialState: CurrentAddressState = {
    addressInfo: null,
    loading: false,
    error: null,
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
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },

    },
});

export const { setAddressInfo, setLoading, setError } = addressInfoSlice.actions;

export default addressInfoSlice.reducer;

// Selectors
export const selectedAddressInfo = (state: { addressInfo: CurrentAddressState }) => state.addressInfo.addressInfo;
export const selectAddressInfoLoading = (state: { addressInfo: CurrentAddressState }) => state.addressInfo.loading;
export const selectAddressInfoError = (state: { addressInfo: CurrentAddressState }) => state.addressInfo.error;
