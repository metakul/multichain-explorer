/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContractData } from "../../../../interfaces/interface";

// Initial state of the contract slice

const initialState: ContractData = {
    contractName: "",
    abi:[] as string[],
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
export const selectContractName = (state: { singleContract: ContractData }) => state.singleContract.contractName;
export const selectContractDetails = (state: { singleContract: ContractData }) => state.singleContract;
export const selectAbi = (state: { singleContract: ContractData }) => state.singleContract.abi;
export const selectBytecode = (state: { singleContract: ContractData }) => state.singleContract.bytecode;
export const selectConstructorParams = (state: { singleContract: ContractData }) => state.singleContract.constructor;
export const selectLoading = (state: { singleContract: ContractData }) => state.singleContract.loading;
export const selectError = (state: { singleContract: ContractData }) => state.singleContract.error;
