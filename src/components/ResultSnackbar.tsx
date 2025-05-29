import { SyntheticEvent } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Snackbar, Alert, Typography } from '@mui/material';

interface ResultSnackbarProps {
  open: boolean;
  severity?: 'success' | 'error' | undefined;
  message: string;
  onClose: (event?: SyntheticEvent | Event, reason?: string) => void;
  keyProp: number;
}

export default function ResultSnackbar({
  open,
  severity,
  message,
  onClose,
  keyProp,
}: ResultSnackbarProps) {
  return (
    <Snackbar
      key={keyProp}
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{
        '& .MuiPaper-root': {
          width: 600,
        },
      }}
    >
      <Alert
        severity={severity}
        icon={
          severity === 'success' ? (
            <CheckCircleOutlineIcon />
          ) : (
            <ErrorOutlineIcon />
          )
        }
        sx={{
          width: '100%',
          backgroundColor: severity === 'success' ? '#2E7D32' : '#D32F2F',
          color: '#ffffff',
          '& .MuiAlert-icon': {
            color: '#ffffff',
          },
          paddingX: '16px',
          paddingY: '6px',
        }}
      >
        {severity === 'success' ? (
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            You won
          </Typography>
        ) : (
          <>
            <Typography variant="body1" sx={{ fontWeight: 500, mb: '4px' }}>
              You lost
            </Typography>
            <Typography variant="body2">{message}</Typography>
          </>
        )}
      </Alert>
    </Snackbar>
  );
}
