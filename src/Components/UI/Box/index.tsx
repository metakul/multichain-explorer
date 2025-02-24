import React from 'react';
import { Box as MUIBox, BoxProps } from '@mui/material';

const Box: React.FC<BoxProps> = (props) => {
    return <MUIBox sx={{
        backgroundColor: "rgba(255, 255, 255, 0.45)",
        backdropFilter: "blur(15px)"
    }} {...props} />;
};

export default Box;
