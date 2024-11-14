import React from 'react';
import { Button as MUIButton, ButtonProps } from '@mui/material';

const Button: React.FC<ButtonProps> = (props) => {
    return <MUIButton {...props} />;
};

export default Button;
