import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import contractsReducer from "./slices/BackendSlices/Blockchain/AllContractsSlice"
import singleContractReducer from "./slices/BackendSlices/Blockchain/ContractSlice"
import { useDispatch } from 'react-redux'
import logger from 'redux-logger'
const store = configureStore({
  reducer: {
    auth:authReducer,
    contracts:contractsReducer,
    singleContract:singleContractReducer,
  },
  middleware:getDefaultMiddlerware =>
    getDefaultMiddlerware().concat(logger),
    devTools:true
});
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types

export default store;
