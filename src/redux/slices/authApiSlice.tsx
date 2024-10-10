// authActions.tsx
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCredentials, setLoginTrxId } from './authSlice';
import { ApiError,  VerifyLoginData, ResendOtpData, UserData } from '../../interfaces/interface';
import { ApiEndpoint } from '../../DataTypes/enums';
import request from '../../Backend/axiosCall/apiCall';
import { ApiSuccess } from '../../interfaces/interface';
import { ErrorType } from '../../DataTypes/errors';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ userId, password, userType }: UserData, { rejectWithValue,dispatch }) => {
    try {
      const response = await request({
        url: `${ApiEndpoint.LOGIN.url}`,
        method: ApiEndpoint.LOGIN.method,
        data: { userId, password, userType },
        headers: ApiEndpoint.LOGIN.headers
      })
      
        const { trxId:loginTrxId, } = response.data;

        dispatch(setLoginTrxId({loginTrxId,userType}))
        const apiSuccess: ApiSuccess = {
          statusCode: response.status,
          message: 'OTP Sent Successfully',
          data: response.data,
        };

        return apiSuccess;
    } catch (error) {
      const castedError = error as ApiError
      throw rejectWithValue(castedError?.error === "string" ? castedError?.error : ErrorType.UNKNOWN_ERROR);
    }
  }
);

// * @param otp
export const loginVerifyUser = createAsyncThunk(
  'auth/login/verifyOtp',
  async ({ trxId, otp }: VerifyLoginData, { rejectWithValue, dispatch }) => {
    try {
      const response = await request({
        url: `${ApiEndpoint.LOGINVERIFY.url}?trxId=${trxId}`,
        method: ApiEndpoint.LOGINVERIFY.method,
        data: { otp },
        headers: ApiEndpoint.LOGINVERIFY.headers
      })
        const { accessToken:token,refreshToken:user } = response.data;

        // TODO: save access and refresh in cookies and apply the refresh logic

        // * Dispatch the setCredentials action to update the authentication state
        dispatch(setCredentials({ user, token }));

        const apiSuccess: ApiSuccess = {
          statusCode: response.status,
          message: 'Login Request successful',
          data: response.data,
        };

        return apiSuccess;
    
    } catch (error) {
      const castedError = error as ApiError
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : ErrorType.UNKNOWN_ERROR);
    }
  }
);

// * @param otp
export const resendOtpLogin = createAsyncThunk(
  'auth/login/resentOtp',
  async ({ trxId }: ResendOtpData, { rejectWithValue }) => {
    try {
      const response = await request({
        url: `${ApiEndpoint.RESENDLOGINOTP.url}?trxId=${trxId}`,
        method: ApiEndpoint.RESENDLOGINOTP.method,
        headers: ApiEndpoint.RESENDLOGINOTP.headers
      })
      if (response.data.status === 200) {
        const apiSuccess: ApiSuccess = {
          statusCode: response.status,
          message: 'Login Request successful',
          data: response.data,
        };
        return apiSuccess;
      }
      else {
        return rejectWithValue(ErrorType.RESEND_OTP_ERROR);
      }
    } catch (error) {
      const castedError = error as ApiError
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : ErrorType.UNKNOWN_ERROR);
    }
  }
);