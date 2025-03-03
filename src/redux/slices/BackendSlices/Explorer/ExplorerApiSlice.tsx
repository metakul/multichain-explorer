/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError,  ApiSuccess,  NetworkStats } from '../../../../interfaces/interface';
import { ApiEndpoint } from '../../../../DataTypes/enums';
import { ErrorType } from '../../../../DataTypes/errors';
import Request from '../../../../Backend/axiosCall/apiCall';
import { setExplorerStats, setExplorerStatsLoading } from './ExplorerStatsSlice';


export const fetchExplorerStats = createAsyncThunk(
    'explorerStats/fetch',
    async ({ rpcUrl }: any, { rejectWithValue,dispatch }) => {
        try {
            dispatch(setExplorerStatsLoading(true))
            const response = await Request({
                url: "fetchChainStats",
                method: ApiEndpoint.fetchChainStats.method,
                data: {
                    rpcUrl: rpcUrl
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