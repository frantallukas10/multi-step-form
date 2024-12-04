import { FC } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

const textStyles = {
  marginTop: 2,
};

interface LoadingStateProps {
  message?: string;
  spinnerSize?: number;
}

export const LoadingState: FC<LoadingStateProps> = ({
  message = 'Loading...',
  spinnerSize = 40,
}) => (
  <Box sx={containerStyles}>
    <CircularProgress size={spinnerSize} />
    <Typography variant="h6" sx={textStyles}>
      {message}
    </Typography>
  </Box>
);
