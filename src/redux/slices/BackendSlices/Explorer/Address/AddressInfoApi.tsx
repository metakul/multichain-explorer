import { createAsyncThunk } from "@reduxjs/toolkit";
import Request from "../../../../../Backend/axiosCall/apiCall";
import { ApiError, IAddress } from "../../../../../interfaces/interface";
import { setAddressInfo, setLoading, setError } from "./AddressInfoSlice";
import { ApiEndpoint } from "../../../../../DataTypes/enums";

export const getAddressInfo = createAsyncThunk(
    'blocks/getAddressInfo',
    async ({ rpcUrl, address }: { rpcUrl: string; address: string }, { dispatch, rejectWithValue }) => {
        // Set loading to true at the beginning of the API call
        dispatch(setLoading(true));

        try {
            const response = await Request({
                url: "getAddressInfo",
                method: ApiEndpoint.getAddressInfo.method,
                data: {
                    rpcUrl: rpcUrl
                },
                slug: `/${address}`
            });

            // Assuming response is formatted as expected with `balance` and `transactions` fields
            const addressInfo: IAddress = {
                address: address,
                balance: response.balance,
                transactions: response.transactions || []
            };

            dispatch(setAddressInfo(addressInfo));
            dispatch(setLoading(false)); // Set loading to false once data is fetched
        } catch (error) {
            const castedError = error as ApiError;
            dispatch(setError(castedError.error || "Failed to fetch Address Info"));
            dispatch(setLoading(false)); // Set loading to false in case of an error
            return rejectWithValue(castedError.error || "Failed to fetch Address Info");
        }
    }
);
