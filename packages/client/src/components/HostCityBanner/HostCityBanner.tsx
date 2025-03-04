import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Stack, useTheme, IconButton, Collapse } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

const LOCAL_STORAGE_KEY = 'eurovision_banner_dismissed';

// Function to get initial visibility state from localStorage
const getInitialVisibility = (): boolean => {
  // Check if we're in a browser environment to avoid SSR issues
  if (typeof window !== 'undefined') {
    return localStorage.getItem(LOCAL_STORAGE_KEY) !== 'true';
  }
  return true;
};

const HostCityBanner: React.FC = () => {
  const theme = useTheme();
  // Set initial state directly from localStorage
  const [isVisible, setIsVisible] = useState<boolean>(getInitialVisibility());

  const handleDismiss = () => {
    setIsVisible(false);
    // Save dismissal state to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
  };

  // Swiss flag design with thinner cross
  const SwissFlag = () => (
    <Box
      sx={{
        width: 40,
        height: 40,
        backgroundColor: '#FF0000',
        position: 'relative',
        flexShrink: 0,
        borderRadius: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Horizontal line of the cross */}
      <Box
        sx={{
          width: '60%',
          height: '20%',
          backgroundColor: '#FFFFFF',
          position: 'absolute',
        }}
      />
      {/* Vertical line of the cross */}
      <Box
        sx={{
          width: '20%',
          height: '60%',
          backgroundColor: '#FFFFFF',
          position: 'absolute',
        }}
      />
    </Box>
  );

  return (
    <Collapse in={isVisible}>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          background: `linear-gradient(to right, ${theme.palette.background.paper}, ${theme.palette.mode === 'dark' ? '#272727' : '#f5f5f5'})`,
          border: '1px solid',
          borderColor: 'divider',
          position: 'relative',
        }}
      >
        <IconButton 
          aria-label="dismiss" 
          size="small"
          onClick={handleDismiss}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'text.secondary',
            '&:hover': {
              color: 'text.primary',
            }
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <SwissFlag />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Eurovision 2025 in Basel, Switzerland
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              The 69th Eurovision Song Contest is taking place in Basel, Switzerland following Nemo's victory 
              in Malmö with "The Code". This marks Switzerland's first victory since 1988.
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<InfoIcon />}
              href="https://en.wikipedia.org/wiki/Basel"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more about Basel
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Collapse>
  );
};

export default HostCityBanner;
