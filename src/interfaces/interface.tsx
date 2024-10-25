/* eslint-disable @typescript-eslint/no-explicit-any */
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
  abi?:any;
  bytecode?: string;
  constructor:any;
  loading:boolean,
  error:string
}

export interface DeployedContract {
  deployedAddress:string;
  contractName: string;
  walletAddress:string
  loading: boolean,
  error: string;
}

export interface ExplorerResult {
  hash: string; // Transaction hash
  decoded_call: {
    label: string | number | boolean | React.ReactElement | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; // Decoded method or label
  };
  block_number: string | number | boolean | React.ReactElement | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; // Block number of the transaction
  block_timestamp: string; // Timestamp of the block in which the transaction occurred
  from_address: string; // Address from which the transaction originated
  to_address: string; // Address to which the transaction was sent
  value: number; // Value of the transaction in ETH
  gas_price: number; // Gas price for the transaction
}

export interface SearchResultsProps {
  result: {
    result: ExplorerResult[]; 
    searchInput: string;
  };
}
