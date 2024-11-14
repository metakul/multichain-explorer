import React from 'react';
import { Box, BoxProps } from '@mui/material';

const Flex: React.FC<BoxProps> = (props) => {
    return <Box display="flex" {...props} />;
};

export default Flex;
