import React from 'react';
import { Text as RadixText, TextProps } from '@radix-ui/themes';

const Text: React.FC<TextProps> = (props) => {
    return <RadixText {...props} />;
};

export default Text;