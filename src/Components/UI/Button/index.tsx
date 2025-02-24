import React from 'react';
import { Button as MUIButton, ButtonProps } from '@mui/material';

const Button: React.FC<ButtonProps> = (props) => {
    return <MUIButton sx={{
        borderRadius: 2,
        padding: '10px 20px',
        textTransform: 'capitalize',
        color:"white",
            backgroundColor: '#0d47a1'
    }} {...props} />;
};

export default Button;
