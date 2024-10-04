/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContractData } from "../../../../interfaces/interface";

// Initial state of the contracts slice
interface ContractsState {
    contracts: ContractData[];
    loading: boolean;
    error: string | null;
}

const initialState: ContractsState = {
    contracts: [],
    loading: false,
    error: null,
};

// Contracts slice
const contractsSlice = createSlice({
    name: 'contracts',
    initialState,
    reducers: {
        setAllContract: (state, action: PayloadAction<ContractData[]>) => {
            state.loading = false;
            state.contracts = action.payload;
            state.error = null;
        },
    },
});

export const {  setAllContract } = contractsSlice.actions;

export default contractsSlice.reducer;

// Selectors
export const selectAllContracts = (state: { contracts: { contracts: ContractData[] } }) => state.contracts.contracts;
export const selectContractsLoading = (state: { contracts: { loading: boolean } }) => state.contracts.loading;
export const selectContractsError = (state: { contracts: { error: string } }) => state.contracts.error;