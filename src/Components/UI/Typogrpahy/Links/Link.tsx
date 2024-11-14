import React from 'react';
import { Link as RadixLink } from '@radix-ui/themes'
import { CustomLinkProps } from '../../../interfaces/CompInterfaces';

const CustomLink: React.FC<CustomLinkProps> = ({ href, children, target, rel, style }) => {
  return (
    <RadixLink href={href} target={target} rel={rel} style={style}>
      {children}
    </RadixLink>
  );
};

export default CustomLink;
