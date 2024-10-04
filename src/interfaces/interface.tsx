import { UserType } from "../DataTypes/enums";
//pages interface
import { AxiosRequestConfig } from "axios"


export interface UserData {
  userId: string;
  password: string;
  userType: UserType;
}

//login form state
export interface LoginData extends UserData {
  onClick?: (userData: UserData) => Promise<ApiSuccess>;
}

//verify login data
export interface VerifyLoginData {
  trxId: string;
  otp: string;
}

//resend login OTP
export interface ResendOtpData{
  trxId:string,
}

//logged in state
export interface AuthState {
  loginTrxId:string;
  isAuthenticated: boolean;
  user: string | null;
  token: string | null;
  userType: UserType | null;
}

// api request
export interface RequestOptions {
  method: AxiosRequestConfig['method'];
  url: string;
  data?: unknown; // todo Allow any data type initially  // $MAJOR
  headers?: AxiosRequestConfig['headers'];
}

// api response success
export interface ApiSuccess {
  statusCode?: number;
  message: string;
  data:object
}

// api response error
export interface ApiError {
  statusCode?: number;
  error: string;
}

//custom error
export interface CustomError {
  error: string;
}



// Blockchain

export interface ContractData {
  contractName: string;
  abi: unknown[]; 
  bytecode: string;
  constructor: {
    internalType: string;
    name: string;
    type: string;
  }[];
  loading:boolean,
  error:string
}