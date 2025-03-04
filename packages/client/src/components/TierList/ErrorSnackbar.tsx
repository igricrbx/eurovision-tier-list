import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useTierList } from '../../context/TierListContext';

const ErrorSnackbar: React.FC = () => {
  const { error, setError } = useTierList();
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);
  
  const handleClose = () => {
    setOpen(false);
    // Clear the error after the snackbar closes
    setTimeout(() => setError(null), 300);
  };
  
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={6000} 
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert 
        onClose={handleClose} 
        severity="error" 
        variant="filled"
        sx={{ width: '100%', maxWidth: 500 }}
      >
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
