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
  PROFILE = '/dashboard/profile'
}

export enum ProfileTab {
  tabTitle1="OverView",
  tabTitle2="Profile",
  tabTitle3="Activity",
}

// define endpoints here
export const ApiEndpoint: Record<string, RequestOptions> = {
  LOGIN: { url: '/authApi/auth/user/login', method: 'POST', headers: { 'Content-Type': 'application/json'}},
  LOGINVERIFY: { url: '/authApi/auth/user/login/verify', method: 'POST', headers: { 'Content-Type': 'application/json'}},
  RESENDLOGINOTP: { url: '/authApi/login/otp/resend', method: 'POST', headers: { 'Content-Type': 'application/json'}},
  getContractByName: { url: '/backendApi/getContractByName', method: 'GET', headers: { 'Content-Type': 'application/json'}},
  getAllContracts: { url: '/backendApi/getContracts', method: 'GET', headers: { 'Content-Type': 'application/json'}},
};