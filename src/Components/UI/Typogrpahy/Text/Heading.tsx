import React from 'react';
import { Heading } from '@radix-ui/themes';
import { CustomHeadingProps } from '../../../interfaces/CompInterfaces';

const CustomHeading: React.FC<CustomHeadingProps> = ({
  placeholder,
  children,
  style
}) => {
  return (
    <Heading style={style} >
      {placeholder && <label>{placeholder}</label>}
      {children}
    </Heading>
  );
};

export default CustomHeading;
