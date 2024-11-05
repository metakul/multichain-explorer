/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExplorerResult } from "../../../../interfaces/interface";
import { fetchSearchResult } from "./ExplorerApiSlice";

// Initial state of the searchResult slice
interface SearchResultState {
    searchResult: ExplorerResult[];
    loading: boolean;
    error: string | null;
}

const initialState: SearchResultState = {
    searchResult: [],
    loading: false,
    error: null,
};

// SearchResult slice
const searchResultSlice = createSlice({
    name: 'searchResult',
    initialState,
    reducers: {
        setMySearchResult: (state, action: PayloadAction<any[]>) => {
            console.log(action.payload);
            
            state.loading = false;
            state.searchResult = action.payload;
            state.error = null;
        },
        addNewSearchResult: (state, action: PayloadAction<any>) => {
            console.log(action.payload);
            
            state.loading = false;
            state.searchResult.push(action.payload);
            state.error = null;
        },
        filterSearchResultByHash: (state, action: PayloadAction<string>) => {
            const hashToFilter = action.payload;
            state.searchResult = state.searchResult.filter(result => result.hash === hashToFilter);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResult.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchResult.fulfilled, (state, ) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchSearchResult.rejected, (state, ) => {
                state.loading = false;
                state.error = "Something Went Wrong"
            });
    }
});

export const { setMySearchResult, addNewSearchResult, filterSearchResultByHash } = searchResultSlice.actions;

export default searchResultSlice.reducer;

// Selectors
export const selectMySearchResult = (state: { explorerSearchResult: SearchResultState }) => state.explorerSearchResult.searchResult;
export const selectSearchResultLoading = (state: { explorerSearchResult: SearchResultState }) => state.explorerSearchResult.loading;
export const selectSearchResultError = (state: { explorerSearchResult: SearchResultState }) => state.explorerSearchResult.error;
export const selectTransactionBySearchInput = (trxId: string) =>
    createSelector(
        (state: { explorerSearchResult: { searchResult: ExplorerResult[] } }) => state.explorerSearchResult.searchResult,
        (searchResult) => searchResult.find(txn => txn.hash === trxId)
    );