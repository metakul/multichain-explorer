
import React from 'react';
import { Box as RadixBox, BoxProps } from '@radix-ui/themes';

const Box: React.FC<BoxProps> = (props) => {
    return <RadixBox {...props} />;
};

export default Box;
