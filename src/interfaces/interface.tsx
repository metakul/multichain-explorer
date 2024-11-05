/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserType } from "../DataTypes/enums";
//pages interface

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
  url:any;
  method:any;
  slug?: string;
  data?: object;
  headers?: any;
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
  hash: string;
  blockHash: string;
  blockNumber: string;
  chainId: string;
  from:string,
  to:string,
  gas:string,
  gasPrice: string,
  input: string
  value: number; // Value of the transaction in ETH
}

export interface SearchResultsProps {
  result: {
    result: ExplorerResult[]; 
    searchInput: string;
  };
}


// network interface

export interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}
export interface NetworkConfig {
  chainId: string;
  chainName: string;
  nativeCurrency: NativeCurrency;
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

// Block interface based on the data structure provided
export interface Block {
  baseFeePerGas: string;
  difficulty: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  hash: string;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: string;
  number: string;
  parentHash: string;
  receiptsRoot: string;
  sha3Uncles: string;
  size: string;
  stateRoot: string;
  timestamp: string;
  totalDifficulty: string;
  transactionsRoot: string;
  uncles: string[];
  transactions: string[];
}

export interface ITrx {
  hash: string;            // Transaction hash
  blockNumber: number;    // Block number containing the transaction
  from: string;           // Address sending the transaction
  to: string;             // Address receiving the transaction
  value: any;          // Value transferred (in Wei as a string)
  gasPrice: string;       // Gas price for the transaction (in Wei as a string)
}