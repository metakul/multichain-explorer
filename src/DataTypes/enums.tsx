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

}
export enum PROJECTS {
  CONTRACTS_HOME = '/web3/contracts',
  SINGLE_CONTRACT = '/web3/contract/:contractName',
  WEB3_PROFILE = '/web3/profile/',
  DEPLOYED_CONTRACT = '/web3/profile/contract/:contractName/:deployedAddress',
}

export enum EXPLORER_PAGE {
  EXPLORER_HOME = "/explorer",
  Transaction = "/Transaction",
  SINGLE_BLOCK = "/block",
  SINGLE_ADDRESS = "/address",
}
export enum ProfileTab {
  tabTitle1 = "OverView",
  tabTitle2 = "Profile",
  tabTitle3 = "Activity",
}

export enum ContractType {
  Deploy = "deploy",
  Interact = "interact",
}

// define endpoints here
export const ApiEndpoint: Record<string, RequestOptions> = {
  LOGIN: { url: '/authApi/auth/user/login', method: 'POST', headers: { 'Content-Type': 'application/json' } },
  LOGINVERIFY: { url: '/authApi/auth/user/login/verify', method: 'POST', headers: { 'Content-Type': 'application/json' } },
  RESENDLOGINOTP: { url: '/authApi/login/otp/resend', method: 'POST', headers: { 'Content-Type': 'application/json' } },

  getContractByName: { url: '/backendApi/getContractByName', method: 'GET', headers: { 'Content-Type': 'application/json' } },
  getAllContracts: { url: '/backendApi/getContracts', method: 'GET', headers: { 'Content-Type': 'application/json' } },
  getMyContracts: { url: '/backendApi/getMyContracts', method: 'GET', headers: { 'Content-Type': 'application/json' } },
  saveContract: { url: '/backendApi/saveDeployedContract', method: 'POST', headers: { 'Content-Type': 'application/json' } },

  //explorer
  explorerSearch: { url: '/backendApi/transaction', method: 'POST', headers: { 'Content-Type': 'application/json' } },
  getLatestBlock: { url: '/backendApi/block/latest', method: 'POST', headers: { 'Content-Type': 'application/json' } },
  fetchRecentBlocks: { url: '/backendApi/blocks/previous', method: 'POST', headers: { 'Content-Type': 'application/json' } },

  // New endpoint for fetching transactions by block number
  getTransactionsInBlock: { url: '/backendApi/block/transactions/:blockNumber', method: 'POST', headers: { 'Content-Type': 'application/json' } },
  fetchAllTransactions: { url: '/backendApi/block/allTransactions', method: 'POST', headers: { 'Content-Type': 'application/json' } },
};

export enum Network {
  Polygon = "Polygon",
  Bsc = "Bsc",
  Localhost = "Localhost"
}

export type NetworkType = keyof typeof Network;

export const networks: Record<Network, NetworkConfig> = {
  Polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
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