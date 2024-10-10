import { RequestOptions } from "../interfaces/interface";
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
  DEPLOYED_CONTRACT = '/web3/profile/contract/:contractName',
}

export enum ProfileTab {
  tabTitle1="OverView",
  tabTitle2="Profile",
  tabTitle3="Activity",
}

export enum ContractType {
  Deploy = "deploy",
  Interact = "interact",
}

// define endpoints here
export const ApiEndpoint: Record<string, RequestOptions> = {
  LOGIN: { url: '/authApi/auth/user/login', method: 'POST', headers: { 'Content-Type': 'application/json'}},
  LOGINVERIFY: { url: '/authApi/auth/user/login/verify', method: 'POST', headers: { 'Content-Type': 'application/json'}},
  RESENDLOGINOTP: { url: '/authApi/login/otp/resend', method: 'POST', headers: { 'Content-Type': 'application/json'}},
 
  getContractByName: { url: '/backendApi/getContractByName', method: 'GET', headers: { 'Content-Type': 'application/json'}},
  getAllContracts: { url: '/backendApi/getContracts', method: 'GET', headers: { 'Content-Type': 'application/json'}},
  getMyContracts: { url: '/backendApi/getMyContracts', method: 'GET', headers: { 'Content-Type': 'application/json'}},
  saveContract: { url: '/backendApi/saveDeployedContract', method: 'POST', headers: { 'Content-Type': 'application/json'}},
};