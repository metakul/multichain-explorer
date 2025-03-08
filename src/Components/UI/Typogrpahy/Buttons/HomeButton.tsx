import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { HomeButtonProps } from '../../../../interfaces/CompInterfaces';

const HomeButton: React.FC<HomeButtonProps> = ({ onClick, children, sx, ...props }) => {
  return (
    <MuiButton onClick={onClick} sx={sx} {...props}>
      {children}
    </MuiButton>
  );
};

export default HomeButton;
