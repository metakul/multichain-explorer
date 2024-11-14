import React from 'react';
import { Box as MUIBox, BoxProps } from '@mui/material';

const Box: React.FC<BoxProps> = (props) => {
    return <MUIBox {...props} />;
};

export default Box;
