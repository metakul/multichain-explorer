import React, { ButtonHTMLAttributes } from 'react';
import { Button as MuiButton } from '@mui/material';

interface LoginButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ children, onClick, color, ...props }) => {
  return (
    <MuiButton
      {...props}
      onClick={onClick}
      style={{ color }} // Applying the custom color as inline style
    >
      {children}
    </MuiButton>
  );
};

export default LoginButton;
