/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError, ContractData, ApiSuccess } from '../../../../interfaces/interface';
import { ApiEndpoint } from '../../../../DataTypes/enums';
import request from '../../../../Backend/axiosCall/apiCall';
import { ErrorType } from '../../../../DataTypes/errors';
import { setCurrentContract } from './ContractSlice';
import { setAllContract } from './AllContractsSlice';
import { addNewDeployedContract, setMyContract } from './MyContractSlice';

// Async thunk to fetch contract by name
export const fetchContractByName = createAsyncThunk(
    'contract/fetchByName',
    async (contractName: string, { rejectWithValue, dispatch }) => {
        try {
            const response = await request({
                url: `${ApiEndpoint.getContractByName.url}?contractName=${contractName}`,
                method: ApiEndpoint.getContractByName.method,
                headers: ApiEndpoint.getContractByName.headers,
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
    'contracts/fetchAll',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            
            const response = await request({
                url: ApiEndpoint.getAllContracts.url,
                method: ApiEndpoint.getAllContracts.method,
                headers: ApiEndpoint.getAllContracts.headers,
            });

            const contractList: ContractData[] = response.contracts;

            const apiSuccess: ApiSuccess = {
                statusCode: response.status,
                message: 'Contracts fetched successfully',
                data: contractList,
            };

            dispatch(setAllContract(contractList))
            

            return apiSuccess.data; // Returning contract list data
        } catch (error) {
            const castedError = error as ApiError;
            return rejectWithValue(castedError?.error === "string" ? castedError?.error : ErrorType.UNKNOWN_ERROR);
        }
    }
);
export const getMyContracts = createAsyncThunk(
    'contracts/fetchAll',
    async (walletAddress:any, { rejectWithValue, dispatch }) => {
        try {
          
            const response = await request({
                url: `${ApiEndpoint.getMyContracts.url}/?walletAddress=${walletAddress}`,
                method: ApiEndpoint.getMyContracts.method,
                headers: ApiEndpoint.getMyContracts.headers,
                data: {walletAddress}
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
    'contracts/fetchAll',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async ({ contractName, deployedAddress, walletAddress }:any, { rejectWithValue, dispatch }) => {
        try {
            const response = await request({
                url: ApiEndpoint.saveContract.url,
                method: ApiEndpoint.saveContract.method,
                headers: ApiEndpoint.saveContract.headers,
                data:{
                    contractName,
                    deployedAddress,
                    walletAddress
                }
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