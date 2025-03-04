import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, TextField, Alert, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTierList } from '../../context/TierListContext';
import SaveIcon from '@mui/icons-material/Save';
import PublicIcon from '@mui/icons-material/Public';

const SaveDialog: React.FC = () => {
  const { saveDialogOpen, setSaveDialogOpen, shareCode } = useTierList();
  const [displayCode, setDisplayCode] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Update the display code whenever shareCode or dialog state changes
  useEffect(() => {
    if (saveDialogOpen) {
      console.log('SaveDialog opened with shareCode:', shareCode);
      setDisplayCode(shareCode || 'Loading...');
      
      // If shareCode is empty, check again after a short delay
      if (!shareCode) {
        const timer = setTimeout(() => {
          if (saveDialogOpen && shareCode) {
            console.log('ShareCode updated after delay:', shareCode);
            setDisplayCode(shareCode);
          } else {
            console.log('ShareCode still empty after delay');
            setDisplayCode('No share code available');
          }
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [saveDialogOpen, shareCode]);
  
  // Generate the share link
  const shareLink = shareCode 
    ? `${window.location.origin}/tierlists/${shareCode}` 
    : 'Loading...';
  
  return (
    <Dialog 
      open={saveDialogOpen} 
      onClose={() => setSaveDialogOpen(false)}
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          px: 1,
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          pt: 3,
          pb: 1
        }}
      >
        <SaveIcon sx={{ color: theme.palette.primary.main, mr: 1.5 }} />
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            fontWeight: 700,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Tier List Saved
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 1, pb: 3 }}>
        <Alert 
          severity="success" 
          variant="outlined"
          sx={{ 
            mb: 3, 
            borderRadius: 2,
            border: `1px solid ${theme.palette.primary.main}`,
            '& .MuiAlert-icon': {
              color: theme.palette.primary.main
            }
          }}
        >
          Your tier list has been saved successfully!
        </Alert>
        
        <Box sx={{ mt: 3 }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mb: 2, 
              display: 'flex', 
              alignItems: 'center',
              fontWeight: 600,
            }}
          >
            <PublicIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            Share your tier list
          </Typography>
          
          <Box 
            sx={{ 
              p: 2, 
              backgroundColor: 'rgba(0,0,0,0.2)', 
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.05)',
              mb: 3
            }}
          >
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.7 }}>
              Share code:
            </Typography>
            <TextField
              fullWidth
              value={displayCode}
              InputProps={{
                readOnly: true,
                sx: {
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  borderRadius: 1.5,
                }
              }}
              size="small"
              sx={{ mb: 2 }}
            />
            
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.7 }}>
              Share link:
            </Typography>
            <TextField
              fullWidth
              value={shareLink}
              InputProps={{
                readOnly: true,
                sx: {
                  fontSize: '0.9rem',
                  borderRadius: 1.5,
                }
              }}
              size="small"
            />
            
            {/* Add copy button */}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined" 
                size="small"
                onClick={() => {
                  navigator.clipboard.writeText(shareLink)
                    .then(() => alert('Link copied to clipboard!'))
                    .catch(err => console.error('Failed to copy:', err));
                }}
              >
                Copy Link
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={() => setSaveDialogOpen(false)}
          color="inherit"
          sx={{ borderRadius: 2 }}
        >
          Close
        </Button>
        <Button 
          onClick={() => {
            setSaveDialogOpen(false);
            navigate('/tierlists');
          }}
          variant="contained"
          color="primary"
          sx={{ 
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(94, 114, 235, 0.25)',
          }}
        >
          View My Tier Lists
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveDialog;
