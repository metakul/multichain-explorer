/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeployedContract } from "../../../../interfaces/interface";

// Initial state of the contracts slice
interface ContractsState {
    contracts: DeployedContract[];
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
        setMyContractsLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        addNewDeployedContract: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.contracts.push(action.payload);
            state.error = null;
        },
    },
});

export const { setMyContract, addNewDeployedContract, setMyContractsLoading } = contractsSlice.actions;

export default contractsSlice.reducer;

// Selectors
export const selectMyContracts = (state: { deployedContracts: { contracts: DeployedContract[] } }) => state.deployedContracts.contracts;
export const selectContractsLoading = (state: { deployedContracts: { loading: boolean } }) => state.deployedContracts.loading;
export const selectContractsError = (state: { deployedContracts: { error: string } }) => state.deployedContracts.error;