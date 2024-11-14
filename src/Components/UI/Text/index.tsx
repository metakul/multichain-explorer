import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

const Text: React.FC<TypographyProps> = (props) => {
    return <Typography {...props} />;
};

export default Text;
