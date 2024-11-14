//buttons

import React from 'react';
import { Button } from '@radix-ui/themes';
import { HomeButtonProps } from '../../../interfaces/CompInterfaces';

const HomeButton: React.FC<HomeButtonProps> = ({ onClick, children }) => {
  return (
    <Button onClick={onClick}>
      {children}
    </Button>
  );
};

export default HomeButton;
