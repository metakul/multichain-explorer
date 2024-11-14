import React from 'react';
import { Container as MUIContainer, ContainerProps } from '@mui/material';

const Container: React.FC<ContainerProps> = (props) => {
    return <MUIContainer {...props} />;
};

export default Container;
