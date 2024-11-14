import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useTransition, animated, config } from 'react-spring';

interface AnimatedDialogProps {
  onSubmit?: (event: React.FormEvent) => Promise<void> | undefined;
  children: React.ReactNode;
  isOpen?: boolean;
}

const AnimatedDialog: React.FC<AnimatedDialogProps> = ({ isOpen, children }) => {
  const [open, setOpen] = React.useState(isOpen || false);

  const transitions = useTransition(open, {
    from: { opacity: 0, transform: 'translateX(-200px)' },
    enter: { opacity: 1, transform: 'translateX(0)' },
    leave: { opacity: 0, transform: 'translateY(10px)' },
    config: config.stiff,
  });

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      {transitions((styles, item) =>
        item ? (
          <animated.div style={styles}>
            <DialogTitle>Dialog</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </animated.div>
        ) : null
      )}
    </Dialog>
  );
};

export default AnimatedDialog;
