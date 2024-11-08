/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError,  ApiSuccess,  ITrx, NetworkStats } from '../../../../interfaces/interface';
import { ApiEndpoint } from '../../../../DataTypes/enums';
import { ErrorType } from '../../../../DataTypes/errors';
import { addNewSearchResult, setSearchResultLoading } from './ExplorerResultSlice';
import Request from '../../../../Backend/axiosCall/apiCall';
import { setExplorerStats, setExplorerStatsLoading } from './ExplorerStatsSlice';

// Async thunk to fetch searchResult by name
export const fetchSearchResult = createAsyncThunk(
    'searchResult/fetchByTrxHash',
    async ({ searchInput, rpcUrl }: any, { rejectWithValue, dispatch }) => {

        try {
            dispatch(setSearchResultLoading(true))

            const response = await Request({
                url: "explorerSearch",
                slug: `/${searchInput}`,
                method: ApiEndpoint.explorerSearch.method,
                data:{
                    providerUrl: rpcUrl
                },
                headers: ApiEndpoint.explorerSearch.headers,
            });
            const searchResultData: ITrx = response;
            
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
        finally {
            dispatch(setSearchResultLoading(false))
        }
    }
);

export const fetchExplorerStats = createAsyncThunk(
    'explorerStats/fetch',
    async ({ rpcUrl }: any, { rejectWithValue,dispatch }) => {
        try {
            dispatch(setExplorerStatsLoading(true))
            const response = await Request({
                url: "fetchChainStats",
                method: ApiEndpoint.fetchChainStats.method,
                data: {
                    providerUrl: rpcUrl
                },
                headers: ApiEndpoint.fetchChainStats.headers,
            });
            const explorerStatsData: NetworkStats = response;
            dispatch(setExplorerStats(explorerStatsData))
            const apiSuccess: ApiSuccess = {
                statusCode: 200,
                message: 'Explorer Stats fetched successfully',
                data: explorerStatsData,
            };

            return apiSuccess.data;
        } catch (error) {
            const castedError = error as ApiError;
            return rejectWithValue(castedError?.error === "string" ? castedError?.error : ErrorType.UNKNOWN_ERROR);
        }
        finally {
            dispatch(setExplorerStatsLoading(false))
        }
    }
);