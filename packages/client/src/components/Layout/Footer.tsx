import React from 'react';
import { Box, Typography, Link, useTheme, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: 'center',
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Stack spacing={1} alignItems="center">
        <Link
          href="https://github.com/igricrbx/eurovision-tier-list"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            color: 'text.secondary',
            textDecoration: 'none',
            transition: 'color 0.2s',
            '&:hover': {
              color: theme.palette.primary.main,
            },
          }}
        >
          <GitHubIcon fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="body2">GitHub Repository</Typography>
        </Link>
        
        <Typography variant="caption" color="text.secondary">
          © {currentYear} Eurovision Tier List. All rights reserved.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
