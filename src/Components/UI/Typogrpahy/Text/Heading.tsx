import React from 'react';
import { Typography } from '@mui/material';
import { CustomHeadingProps } from '../../../../interfaces/CompInterfaces';

const CustomHeading: React.FC<CustomHeadingProps> = ({
  placeholder,
  children,
  style
}) => {
  return (
    <Typography variant="h5" style={style}>
      {placeholder && <label>{placeholder}</label>}
      {children}
    </Typography>
  );
};

export default CustomHeading;
