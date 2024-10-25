import React from 'react';
import { TextField } from '@radix-ui/themes';
import { CustomTextFieldProps } from '../../../interfaces/CompInterfaces';

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  placeholder,
  value,
  // type,
  onChange,
  className,
  children,
}) => {
  return (
    <>
      <TextField.Root>
        {label && <label>{label}</label>}
        <TextField.Root
          className={className}
          // type={type}
          placeholder={placeholder}
          value={value}
          onInput={(e) => onChange && onChange((e.target as HTMLInputElement).value)}
        />
      </TextField.Root>
      {children}
    </>
  );
};

export default CustomTextField;
