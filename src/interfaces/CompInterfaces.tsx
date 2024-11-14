import { ReactNode } from 'react';
import { ContractType, UserType } from '../DataTypes/enums';


export interface Layoutprops {
}

export interface HomePageProps {
  pageTitle: string;
  pageDescription:string
}

export interface ProtectedPageProps {
  pageTitle: string;
  pageDescription:string;
  userType?:UserType
}


export interface CustomDialogProps {
  triggerButtonText: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  userType?: React.ReactNode;
  children: React.ReactNode;
  className:string | undefined;
}

export interface HomeButtonProps {
  onClick?: () => void; 
  children?: ReactNode;
}


export interface LoginFormProps {
  loginTitle: string;
  userType: UserType;
  
}

export interface CustomTextFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: any
  children?: ReactNode;
  id?: string;
}

export interface CustomHeadingProps {
  placeholder?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
}

export interface CustomLinkProps {
  href: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
}

export interface CustomTabProps {
  value: string;
  children: ReactNode;
}

export interface VerificationProps {
  pageTitle: string | undefined;
  userType:string
}

export interface OverViewProps {
  value?: string;
  children?: ReactNode;
}
export interface UserActivityProps {
  value?: string;
  children?: ReactNode;
}
export interface UserProfileProps {
  value?: string;
  children?: ReactNode;
}

export interface SingleContractProps {
  contractType: ContractType;
}
