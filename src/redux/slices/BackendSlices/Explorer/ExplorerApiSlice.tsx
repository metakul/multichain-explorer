/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError,  ApiSuccess, ExplorerResult } from '../../../../interfaces/interface';
import { ApiEndpoint } from '../../../../DataTypes/enums';
import { ErrorType } from '../../../../DataTypes/errors';
import { addNewSearchResult } from './ExplorerResultSlice';
import Request from '../../../../Backend/axiosCall/apiCall';

// Async thunk to fetch searchResult by name
export const fetchSearchResult = createAsyncThunk(
    'searchResult/fetchByTrxHash',
    async ({ searchInput, rpcUrl }: any, { rejectWithValue, dispatch }) => {

        try {
            const response = await Request({
                url: "explorerSearch",
                slug: `/${searchInput}`,
                method: ApiEndpoint.explorerSearch.method,
                data:{
                    providerUrl: rpcUrl
                },
                headers: ApiEndpoint.explorerSearch.headers,
            });
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