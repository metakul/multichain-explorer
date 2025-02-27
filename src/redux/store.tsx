import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import contractsSlice from "./slices/BackendSlices/Blockchain/AllContractsSlice"
import explorerStatsInfo from "./slices/BackendSlices/Explorer/ExplorerStatsSlice"
import singleContract from "./slices/BackendSlices/Blockchain/ContractSlice"
import deployedContracts from "./slices/BackendSlices/Blockchain/MyContractSlice"
import explorerSlice from "./slices/BackendSlices/Explorer/ExplorerResultSlice"
import recentBlocksState from "./slices/BackendSlices/Explorer/Blocks/RecentsBlocks/RecentBlocksSlice"
import recentBlocksStateInFrames from "./slices/BackendSlices/Explorer/Blocks/RecentsBlocks/BlocksWithFrameSlice"
import currentBlockState from "./slices/BackendSlices/Explorer/Blocks/CurrentBlock/CurrentBlockSlice"
import transactionsState from "./slices/BackendSlices/Explorer/Transactions/AllTrxSlice"
import addressInfoState from "./slices/BackendSlices/Explorer/Address/AddressInfoSlice"
import { useDispatch } from 'react-redux'
import logger from 'redux-logger'
const store = configureStore({
  reducer: {
    auth:authReducer,
    contracts:contractsSlice,
    explorerStatsInfo: explorerStatsInfo,
    singleContract:singleContract,
    deployedContracts: deployedContracts,
    explorerSearchResult:explorerSlice,
    recentBlocksState: recentBlocksState,
    currentBlockState: currentBlockState,
    transactionsState: transactionsState,
    addressInfo: addressInfoState,
    recentBlocksStateInFrames: recentBlocksStateInFrames
  },
  // middleware:getDefaultMiddlerware =>
  //   getDefaultMiddlerware().concat(logger),
  //   devTools:true
});
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types

export default store;
