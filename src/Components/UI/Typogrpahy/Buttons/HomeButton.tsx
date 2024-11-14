import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { HomeButtonProps } from '../../../../interfaces/CompInterfaces';

const HomeButton: React.FC<HomeButtonProps> = ({ onClick, children }) => {
  return (
    <MuiButton onClick={onClick}>
      {children}
    </MuiButton>
  );
};

export default HomeButton;
