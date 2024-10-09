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
        setMyContract: (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.contracts = action.payload;
            state.error = null;
        },
        addNewDeployedContract: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.contracts.push(action.payload);
            state.error = null;
        },
    },
});

export const { setMyContract, addNewDeployedContract } = contractsSlice.actions;

export default contractsSlice.reducer;

// Selectors
export const selectMyContracts = (state: { contracts: { contracts: ContractData[] } }) => state.contracts.contracts;
export const selectContractsLoading = (state: { contracts: { loading: boolean } }) => state.contracts.loading;
export const selectContractsError = (state: { contracts: { error: string } }) => state.contracts.error;