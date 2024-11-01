import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import contractsSlice from "./slices/BackendSlices/Blockchain/AllContractsSlice"
import singleContract from "./slices/BackendSlices/Blockchain/ContractSlice"
import deployedContracts from "./slices/BackendSlices/Blockchain/MyContractSlice"
import explorerSlice from "./slices/BackendSlices/Explorer/ExplorerResultSlice"
import { useDispatch } from 'react-redux'
import logger from 'redux-logger'
const store = configureStore({
  reducer: {
    auth:authReducer,
    contracts:contractsSlice,
    singleContract:singleContract,
    deployedContracts: deployedContracts,
    explorerSearchResult:explorerSlice
  },
  middleware:getDefaultMiddlerware =>
    getDefaultMiddlerware().concat(logger),
    devTools:true
});
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types

export default store;
