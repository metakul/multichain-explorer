/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError,  ApiSuccess, ExplorerResult } from '../../../../interfaces/interface';
import { ApiEndpoint } from '../../../../DataTypes/enums';
import request from '../../../../Backend/axiosCall/apiCall';
import { ErrorType } from '../../../../DataTypes/errors';
import { setMySearchResult } from './ExplorerResultSlice';

// Async thunk to fetch searchResult by name
export const fetchSearchResult = createAsyncThunk(
    'searchResult/fetchByTrxHash',
    async ({ searchInput, setShowResult }: any, { rejectWithValue, dispatch }) => {

        try {
            const response = await request({
                url: `${ApiEndpoint.explorerSearch.url}/${searchInput}`,
                method: ApiEndpoint.explorerSearch.method,
                headers: ApiEndpoint.explorerSearch.headers,
            });

            const searchResultData: ExplorerResult[] = response.searchResult;

            const apiSuccess: ApiSuccess = {
                statusCode: response.status,
                message: 'Search Result fetched successfully',
                data: searchResultData,
            };
            dispatch(setMySearchResult(searchResultData))
            setShowResult(true)

            return apiSuccess.data; 
        } catch (error) {
            const castedError = error as ApiError;
            return rejectWithValue(castedError?.error === "string" ? castedError?.error : ErrorType.UNKNOWN_ERROR);
        }
    }
);