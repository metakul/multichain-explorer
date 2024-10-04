/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContractData } from "../../../../interfaces/interface";

// Initial state of the contract slice

const initialState: ContractData = {
    contractName: "",
    abi: [],
    bytecode: "",
    constructor: [],
    loading: false,
    error: "",
};

// Contract slice
const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        clearContractState: (state) => {
            state.contractName = "null";
            state.abi = [];
            state.bytecode = "";
            state.constructor = [];
            state.loading = false;
            state.error = "";
        },
        setCurrentContract: (state, action: PayloadAction<ContractData>) => {
            state.loading = false;
            state.contractName = action.payload.contractName;
            state.abi = action.payload.abi;
            state.bytecode = action.payload.bytecode;
            state.constructor = action.payload.constructor;
        },
    },
 
});

export const { clearContractState, setCurrentContract } = contractSlice.actions;

export default contractSlice.reducer;

// Selectors
export const selectContractName = (state: { contract: ContractData }) => state.contract.contractName;
export const selectAbi = (state: { contract: ContractData }) => state.contract.abi;
export const selectBytecode = (state: { contract: ContractData }) => state.contract.bytecode;
export const selectConstructorParams = (state: { contract: ContractData }) => state.contract.constructor;
export const selectLoading = (state: { contract: ContractData }) => state.contract.loading;
export const selectError = (state: { contract: ContractData }) => state.contract.error;
