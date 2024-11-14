import React from 'react';
import { Button as RadixButton, ButtonProps } from '@radix-ui/themes';

const Button: React.FC<ButtonProps> = (props) => {
    return <RadixButton {...props} />;
};

export default Button;