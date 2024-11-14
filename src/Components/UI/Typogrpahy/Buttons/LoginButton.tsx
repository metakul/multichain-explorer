// LoginButton.tsx
import React, { ButtonHTMLAttributes } from 'react';
import { Button } from '@radix-ui/themes'

interface LoginButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ children, onClick, color, ...props }) => {
  return (
    <Button {...props} onClick={onClick} style={{ color }}>
      {children}
    </Button>
  );
};

export default LoginButton;
