import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NetworkStats } from '../../../../interfaces/interface';
import { fetchExplorerStats } from './ExplorerApiSlice';

// Initial state for explorerStats slice
interface ExplorerStatsState {
    stats: NetworkStats | null;
    loading: boolean;
    error: string | null;
}

const initialExplorerStatsState: ExplorerStatsState = {
    stats: null,
    loading: false,
    error: null,
};

const explorerStatsSlice = createSlice({
    name: 'explorerStats',
    initialState: initialExplorerStatsState,
    reducers: {
        setExplorerStats: (state, action: PayloadAction<NetworkStats>) => {
            state.loading = false;
            state.stats = {
                ...state.stats,
                ...action.payload, // Only update the provided fields, keep old values
            };
            state.error = null;
        },
        setExplorerStatsLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchExplorerStats.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });
    },
  
});

export const { setExplorerStats, setExplorerStatsLoading } = explorerStatsSlice.actions;

export default explorerStatsSlice.reducer;

export const selectStatsInfo = (state: { explorerStatsInfo: ExplorerStatsState }) => state.explorerStatsInfo.stats;
export const selectStatsLoading = (state: { explorerStatsInfo: ExplorerStatsState }) => state.explorerStatsInfo.loading;
export const selectStatsError = (state: { explorerStatsInfo: ExplorerStatsState }) => state.explorerStatsInfo.error;