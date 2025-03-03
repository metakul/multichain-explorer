/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError, ContractData, ApiSuccess } from '../../../../interfaces/interface';
import { ApiEndpoint } from '../../../../DataTypes/enums';
import { ErrorType } from '../../../../DataTypes/errors';
import { setCurrentContract } from './ContractSlice';
import { setAllContracts, setContractsLoading } from './AllContractsSlice';
import { addNewDeployedContract, setMyContract } from './MyContractSlice';
import Request from '../../../../Backend/axiosCall/apiCall';

// Async thunk to fetch contract by name
export const fetchContractByName = createAsyncThunk(
    'contract/getContractByName',
    async (contractName: string, { rejectWithValue, dispatch }) => {
        try {
            const response = await Request({
                url: `getContractByName`,
                method: ApiEndpoint.getContractByName.method,
                slug:`?contractName=${contractName}`,
                headers: ApiEndpoint.getContractByName.headers,
                data:{}
            });

            const contractData: ContractData = response.contract;

            const apiSuccess: ApiSuccess = {
                statusCode: response.status,
                message: 'Contract fetched successfully',
                data: contractData,
            };
            dispatch(setCurrentContract(contractData))

            return apiSuccess.data; // Returning contract data to be handled by the slice
        } catch (error) {
            const castedError = error as ApiError;
            return rejectWithValue(castedError?.error === "string" ? castedError?.error : ErrorType.UNKNOWN_ERROR);
        }
    }
);

// Async thunk to fetch all contracts
export const fetchAllContracts = createAsyncThunk(
    "contracts/getAllContracts",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setContractsLoading());
            
            const response = await Request({
                url: "getAllContracts",
                method: ApiEndpoint.getAllContracts.method,
                headers: ApiEndpoint.getAllContracts.headers,
            });

            // Ensure the response is structured correctly
            const contractsByCategory: Record<string, ContractData[]> = response.contracts || {};

            const apiSuccess: ApiSuccess = {
                statusCode: response.status,
                message: "Contracts fetched successfully",
                data: contractsByCategory, // This should now be an object with categories
            };

            dispatch(setAllContracts(contractsByCategory));

            return apiSuccess.data; // Returning categorized contract data
        } catch (error) {
            const castedError = error as ApiError;
            return rejectWithValue(
                typeof castedError?.error === "string" ? castedError?.error : ErrorType.UNKNOWN_ERROR
            );
        }
    }
);

export const getMyContracts = createAsyncThunk(
    'contracts/getMyContracts',
    async ({walletAddress,networkName}:any, { rejectWithValue, dispatch }) => {
        try {
          
            const response = await Request({
                url: `getMyContracts`,
                slug: `?walletAddress=${walletAddress}&networkName=${networkName}`,
                method: ApiEndpoint.getMyContracts.method,
                headers: ApiEndpoint.getMyContracts.headers,
                data: {walletAddress},
            });

            const contractList: ContractData[] = response.contracts;

            const apiSuccess: ApiSuccess = {
                statusCode: response.status,
                message: 'Contracts fetched successfully',
                data: contractList,
            };

            dispatch(setMyContract(contractList))
            

            return apiSuccess.data; // Returning contract list data
        } catch (error) {
            const castedError = error as ApiError;
            return rejectWithValue(castedError?.error === "string" ? castedError?.error : ErrorType.UNKNOWN_ERROR);
        }
    }
);


export const saveNewContract = createAsyncThunk(
    'contracts/saveNew',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async ({ contractName, deployedAddress, walletAddress,networkName }:any, { rejectWithValue, dispatch }) => {
        try {

            console.log(contractName, deployedAddress, walletAddress);
            
            const response = await Request({
                url: "saveContract",
                method: ApiEndpoint.saveContract.method,
                slug:"",
                data:{
                    contractName,
                    deployedAddress,
                    walletAddress,
                    networkName
                },
                headers: ApiEndpoint.saveContract.headers,
            });

            const savedContractInfo: ContractData = response.contracts;

            const apiSuccess: ApiSuccess = {
                statusCode: response.status,
                message: 'Contract saved successfully',
                data: savedContractInfo,
            };

            dispatch(addNewDeployedContract(savedContractInfo))
            

            return apiSuccess.data; // Returning contract list data
        } catch (error) {
            const castedError = error as ApiError;
            return rejectWithValue(castedError?.error === "string" ? castedError?.error : ErrorType.UNKNOWN_ERROR);
        }
    }
);