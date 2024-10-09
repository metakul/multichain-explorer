import React from 'react';
import { Dialog, Button, Inset } from '@radix-ui/themes';
import "./Dailog.css"
import { CustomDialogProps } from '../../interfaces/CompInterfaces';

const CustomDialog: React.FC<CustomDialogProps> = ({ className,triggerButtonText, title, description,userType, children }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
      <Button >{userType} {triggerButtonText}</Button>
      </Dialog.Trigger>

      <Dialog.Content className={className} >
        <Dialog.Title>{title}</Dialog.Title>
        {description && <Dialog.Description>{description}: {userType}</Dialog.Description>}
        <Inset side="x" my="5">
        {children}
        </Inset>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CustomDialog;
