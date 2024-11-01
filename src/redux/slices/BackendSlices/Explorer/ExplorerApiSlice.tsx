/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError,  ApiSuccess, ExplorerResult } from '../../../../interfaces/interface';
import { ApiEndpoint } from '../../../../DataTypes/enums';
import request from '../../../../Backend/axiosCall/apiCall';
import { ErrorType } from '../../../../DataTypes/errors';
import { addNewSearchResult } from './ExplorerResultSlice';

// Async thunk to fetch searchResult by name
export const fetchSearchResult = createAsyncThunk(
    'searchResult/fetchByTrxHash',
    async ({ searchInput, rpcUrl }: any, { rejectWithValue, dispatch }) => {

        try {
            console.log(rpcUrl);
            const response = await request({
                url: "explorerSearch",
                slug: `/${searchInput}`,
                method: ApiEndpoint.explorerSearch.method,
                data:{
                    providerUrl: rpcUrl
                },
                headers: ApiEndpoint.explorerSearch.headers,
            });
            
            console.log("response", response);

            const searchResultData: ExplorerResult = response;
            
            dispatch(addNewSearchResult(searchResultData))
            const apiSuccess: ApiSuccess = {
                statusCode: 200,
                message: 'Search Result fetched successfully',
                data: searchResultData,
            };

            return apiSuccess.data; 
        } catch (error) {
            const castedError = error as ApiError;
            return rejectWithValue(castedError?.error === "string" ? castedError?.error : ErrorType.UNKNOWN_ERROR);
        }
    }
);