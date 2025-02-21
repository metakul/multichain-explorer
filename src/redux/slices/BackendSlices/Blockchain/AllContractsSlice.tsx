/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContractData } from "../../../../interfaces/interface";

// Define categorized contracts state
interface ContractsState {
    contractsByCategory: Record<string, ContractData[]>; // Store contracts in categories
    loading: boolean;
    error: string | null;
}

const initialState: ContractsState = {
    contractsByCategory: {}, // Now an object with categories
    loading: false,
    error: null,
};

// Contracts slice
const contractsSlice = createSlice({
    name: "contracts",
    initialState,
    reducers: {
        setAllContracts: (state, action: PayloadAction<Record<string, ContractData[]>>) => {
            state.loading = false;
            state.contractsByCategory = action.payload; // Store categorized contracts
            state.error = null;
        },
        setContractsLoading: (state) => {
            state.loading = true;
        },
        setContractsError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { setAllContracts, setContractsLoading, setContractsError } = contractsSlice.actions;

export default contractsSlice.reducer;

// Selectors
export const selectAllContracts = (state: { contracts: ContractsState }) => state.contracts.contractsByCategory;
export const selectContractsLoading = (state: { contracts: ContractsState }) => state.contracts.loading;
export const selectContractsError = (state: { contracts: ContractsState }) => state.contracts.error;
