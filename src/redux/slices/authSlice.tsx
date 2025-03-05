// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../interfaces/interface';
import { UserType } from '../../DataTypes/enums';

const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');
const storedUserType = localStorage.getItem('userType');
const storedLoginTrxId = localStorage.getItem('loginTrxId');

const initialState: AuthState = {
  isAuthenticated: false,
  loginTrxId: storedLoginTrxId ? storedLoginTrxId : "",
  user: storedUser ? storedUser : null,
  token: storedToken ? storedToken : null,
  userType: storedUserType ? (storedUserType as UserType) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginTrxId:(state, action: PayloadAction<{ loginTrxId: string;userType:UserType} > )=>{
      state.loginTrxId=action.payload.loginTrxId
      state.userType = action.payload.userType;

      localStorage.setItem('loginTrxId', action.payload.loginTrxId);
      localStorage.setItem('userType', action.payload.userType);
    },
    setCredentials: (state, action: PayloadAction<{ user: string; token: string; }>) => {

      // TODO: Update the user authentication logic
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem('user', action.payload.user);
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.userType = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
    },
  },
});

export const { setCredentials, logout,setLoginTrxId } = authSlice.actions;

export default authSlice.reducer;

// Selectors remain the same
export const selectUser = (state: { auth: { user: string } }) => state.auth.user;
export const selectToken = (state: { auth: { token: string } }) => state.auth.token;
export const isAuthenticated = (state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated;
export const selectUserType = (state: { auth: { userType: string } }) => state.auth.userType;
export const selectTrxId = (state: { auth: { loginTrxId: string } }) => state.auth.loginTrxId;
