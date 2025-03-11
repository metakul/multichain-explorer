import { NetworkConfig, RequestOptions } from "../interfaces/interface";
// enums.ts
export enum UserType {
  ADMIN = 'ROOT_ADMIN',
  Org_Admin = 'ORG_ADMIN',
  PATIENT = 'Patient',
  DOCTOR = 'Doctor',
  STAFF = 'STAFF',
  RANDOM = 'Random',
}

export enum Pages {
  HOME = '/',
  DASHBOARD = '/dashboard/app',
  PROFILE = '/dashboard/profile',
  TRANSACTIONS='/transactions',
  BLOCKS='/blocks',
  API ='/API',

}
export enum PROJECTS {
  CONTRACTS_HOME = '/web3/contracts',
  SINGLE_CONTRACT = '/web3/contract/:contractName',
  WEB3_PROFILE = '/web3/profile',
  DEPLOYED_CONTRACT = '/web3/contract/:deployedAddress/:contractName',
}

export enum EXPLORER_PAGE {
  EXPLORER_HOME = "/explorer",
  SINGLE_TRANSACTIONS = "/Transaction",
  SINGLE_BLOCK = "/block",
  SINGLE_ADDRESS = "/address",
}

export enum ProfileTab {
  tabTitle1 = "OverView",
  tabTitle2 = "Profile",
  tabTitle3 = "Activity",
}

export enum BlockDetailsTab {
  tabTitle1 = "Overview",
  tabTitle2 = "Blocks Trx",
  tabTitle3 = "MEVInfo",
}

export enum ContractType {
  Deploy = "deploy",
  Interact = "interact",
}

const backendUrl =import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5003";

// define endpoints here
export const ApiEndpoint: Record<string, RequestOptions> = {
  LOGIN: { url: '/authApi/auth/user/login', method: 'POST', headers: { 'Content-Type': 'application/json' } },
  LOGINVERIFY: { url: '/authApi/auth/user/login/verify', method: 'POST', headers: { 'Content-Type': 'application/json' } },
  RESENDLOGINOTP: { url: '/authApi/login/otp/resend', method: 'POST', headers: { 'Content-Type': 'application/json' } },

  getContractByName: { url: `${backendUrl}/getContractByName`, method: 'GET', headers: { 'Content-Type': 'application/json' } },
  getAllContracts: { url: `${backendUrl}/getContracts`, method: 'GET', headers: { 'Content-Type': 'application/json' } },
  getMyContracts: { url: `${backendUrl}/getMyContracts`, method: 'GET', headers: { 'Content-Type': 'application/json' } },
  saveDeployedContract: { url: `${backendUrl}/saveDeployedContract`, method: 'POST', headers: { 'Content-Type': 'application/json' } },

  // New endpoint for fetching transactions by block number
  getTransactionCountInBlock: { url: `${backendUrl}/block/getTransactionCountInBlock`, method: 'POST', headers: { 'Content-Type': 'application/json' } },
 
  fetchAllTransactions: { url: `${backendUrl}/block/allTransactions`, method: 'POST', headers: { 'Content-Type': 'application/json' } },
 
  fetchSingleTrx: { url: `${backendUrl}/transaction`, method: 'POST', headers: { 'Content-Type': 'application/json' } },
  
  getAddressInfo: { url: `${backendUrl}/address`, method: 'POST', headers: { 'Content-Type': 'application/json' } },
  getAddressTransactions: { url: `${backendUrl}/getAddressTransactions`, method: 'POST', headers: { 'Content-Type': 'application/json' } },
  
  fetchBlockInfo: { url: `${backendUrl}/block`, method: 'POST', headers: { 'Content-Type': 'application/json' } },
  
  fetchChainStats: { url: `${backendUrl}/stats`, method: 'POST', headers: { 'Content-Type': 'application/json' } },
  
  fetchBlocksInFrame: { url: `${backendUrl}/blocksInFrame`, method: 'POST', headers: { 'Content-Type': 'application/json' } },
  
  getBlockWithTrx: { url: `${backendUrl}/getBlockWithTrx`, method: 'POST', headers: { 'Content-Type': 'application/json' } },
};

export enum Network {
  Polygon = "Polygon",
  Amoy = "Amoy",
  Bsc = "Bsc",
  BASE = "BASE",
  Localhost = "Localhost",
  SONEIUM = "SONEIUM",
  HOLESKY = "HOLESKY",
}

export type NetworkType = keyof typeof Network;

export const networks: Record<Network, NetworkConfig> = {
  Polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18
    },
    rpcUrls: ["https://polygon-mainnet.g.alchemy.com/v2/PXBhpQURgmwMghvNtc__XWxwc1NGmFHD"],
    blockExplorerUrls: ["https://polygonscan.com/"]
  },
  SONEIUM : {
    chainId: `0x${Number(1946).toString(16)}`,
    chainName: "Sonium Minato Testnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://rpc.minato.soneium.org"],
    blockExplorerUrls: []
  },
  HOLESKY : {
    chainId: `0x${Number(17000).toString(16)}`,
    chainName: "Holesky Minato Testnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://1rpc.io/holesky"],
    blockExplorerUrls: ["https://holesky.etherscan.io/"]
  },
  BASE : {
    chainId: `0x${Number(8453).toString(16)}`,
    chainName: "Base Mainnnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://mainnet.base.org"],
    blockExplorerUrls: ["https://basescan.org"]
  },
  Amoy: {
    chainId: `0x${Number(0x13882).toString(16)}`,
    chainName: "Amoy Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18
    },
    rpcUrls: ["https://polygon-amoy.g.alchemy.com/v2/roMKSSyXWVrSgFgBLhXoRW_-Y1zIciII"],
    blockExplorerUrls: ["https://polygonscan.com/"]
  },
  Localhost: {
    chainId: `0x${Number(31337).toString(16)}`, // Hardhat's default local network chain ID
    chainName: "Hardhat Localhost",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["http://127.0.0.1:8545"], // Hardhat's default RPC URL
    blockExplorerUrls: ["http://localhost:8545"]
  },
  Bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18
    },
    rpcUrls: [
      "https://bsc-dataseed1.binance.org",
      "https://bsc-dataseed2.binance.org",
      "https://bsc-dataseed3.binance.org",
      "https://bsc-dataseed4.binance.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed2.defibit.io",
      "https://bsc-dataseed3.defibit.io",
      "https://bsc-dataseed4.defibit.io",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed2.ninicoin.io",
      "https://bsc-dataseed3.ninicoin.io",
      "https://bsc-dataseed4.ninicoin.io",
      "wss://bsc-ws-node.nariox.org"
    ],
    blockExplorerUrls: ["https://bscscan.com"]
  }
};