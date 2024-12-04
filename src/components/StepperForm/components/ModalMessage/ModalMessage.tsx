import React from 'react';
import { Modal, Box, Alert } from '@mui/material';

interface ModalMessageProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
  onClose: () => void;
}

const modalBoxStyles = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
  textAlign: 'center',
};

export const ModalMessage: React.FC<ModalMessageProps> = ({
  open,
  message,
  severity,
  onClose,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-message-title"
      aria-describedby="modal-message-description"
    >
      <Box sx={modalBoxStyles}>
        <Alert severity={severity} onClose={onClose}>
          {message}
        </Alert>
      </Box>
    </Modal>
  );
};
