import React from 'react';
import { Container as RadixContainer, ContainerProps } from '@radix-ui/themes';

const Container: React.FC<ContainerProps> = (props) => {
    return <RadixContainer {...props} />;
};

export default Container;