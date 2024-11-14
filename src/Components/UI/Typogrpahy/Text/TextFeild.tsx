import React from 'react';
import { TextField as MuiTextField } from '@mui/material';
import { CustomTextFieldProps } from '../../../../interfaces/CompInterfaces';

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  className,
  children,
  type = 'text',  // Default type is 'text'
  id,             // Accept id prop
  ...props        // Spread remaining props
}) => {
  return (
    <>
      <MuiTextField
        id={id}          // Pass the id prop to MuiTextField
        className={className}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        fullWidth
        variant="outlined"
        type={type}      // Pass type prop
        {...props}       // Spread remaining props like error, helperText, etc.
      />
      {children}
    </>
  );
};

export default CustomTextField;
