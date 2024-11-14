import React from 'react';
import { Flex as RadixFlex, FlexProps } from '@radix-ui/themes';

const Flex: React.FC<FlexProps> = (props) => {
    return <RadixFlex {...props} />;
};

export default Flex;