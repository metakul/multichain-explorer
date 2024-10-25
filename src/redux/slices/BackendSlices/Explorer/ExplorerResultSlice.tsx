/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExplorerResult } from "../../../../interfaces/interface";

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
            state.loading = false;
            state.searchResult = action.payload;
            state.error = null;
        },
        addNewSearchResult: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.searchResult.push(action.payload);
            state.error = null;
        },
    },
});

export const { setMySearchResult, addNewSearchResult } = searchResultSlice.actions;

export default searchResultSlice.reducer;

// Selectors
export const selectMySearchResult = (state: { searchResult: {searchResult: ExplorerResult[] } }) => state.searchResult;
export const selectSearchResultLoading = (state: {  loading: boolean }) => state.loading;
export const selectSearchResultError = (state: {  error: string }) => state.error;