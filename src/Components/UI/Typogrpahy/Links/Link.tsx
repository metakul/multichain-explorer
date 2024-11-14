import React from 'react';
import { Link as MuiLink } from '@mui/material';
import { CustomLinkProps } from '../../../../interfaces/CompInterfaces';

const CustomLink: React.FC<CustomLinkProps> = ({ href, children, target, rel, style }) => {
  return (
    <MuiLink href={href} target={target} rel={rel} style={style}>
      {children}
    </MuiLink>
  );
};

export default CustomLink;
