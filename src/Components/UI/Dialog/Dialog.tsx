import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import "./Dialog.css";
import { CustomDialogProps } from '../../../interfaces/CompInterfaces';

const CustomDialog: React.FC<CustomDialogProps> = ({ className, triggerButtonText, title, description, userType, children }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Button onClick={handleOpen}>{userType} {triggerButtonText}</Button>

      <Dialog open={open} onClose={handleClose} className={className}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {description && <Box mb={2}>{description}: {userType}</Box>}
          <Box sx={{ paddingX: 2, marginY: 2 }}>
            {children}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomDialog;
