import { Box, Alert, AlertTitle } from '@mui/material';
import { FC } from 'react';

interface ErrorStateProps {
  error?: string | null;
  title?: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
}

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  textAlign: 'center',
  padding: 2,
};

const alertStyles = {
  maxWidth: 400,
};

export const ErrorState: FC<ErrorStateProps> = ({
  error = 'Failed to load form sections. Please try again later.',
  title = 'Error',
  severity = 'error',
}) => (
  <Box sx={containerStyles}>
    <Alert severity={severity} sx={alertStyles}>
      <AlertTitle>{title}</AlertTitle>
      {error}
    </Alert>
  </Box>
);
