import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { TierEntry } from '../../types';
import ContestantCard from './ContestantCard';
import { TIER_COLORS } from '../../constants/tierList';

interface ViewTierRowProps {
  tier: string;
  entries: TierEntry[];
}

const ViewTierRow: React.FC<ViewTierRowProps> = ({ tier, entries }) => {
  const theme = useTheme();
  const tierColor = TIER_COLORS[tier] || { 
    main: '#777777',
    text: '#ffffff',
    gradient: 'linear-gradient(135deg, #777777, #999999)'
  };

  return (
    <Box sx={{ display: 'flex', mb: 3, width: '100%' }}>
      {/* Tier label */}
      <Box 
        sx={{ 
          width: 70, 
          height: 110, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: tierColor.gradient,
          boxShadow: `0 4px 12px ${tierColor.main}40`,
          mr: 2,
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0))',
            zIndex: 1,
          }
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 900,
            color: tierColor.text,
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 2,
          }}
        >
          {tier}
        </Typography>
      </Box>
      
      {/* Contestants container with regular ContestantCards */}
      <Paper
        elevation={2}
        sx={{
          flex: 1,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          p: 1.5,
          minHeight: 110,
          backgroundColor: theme.palette.background.paper,
          borderLeft: `4px solid ${tierColor.main}`,
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            background: theme.palette.background.default,
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.mode === 'dark' ? '#555' : '#ccc',
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.mode === 'dark' ? '#777' : '#aaa',
          },
        }}
      >
        {entries.length === 0 ? (
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary', 
              fontStyle: 'italic',
              opacity: 0.6,
              p: 2
            }}
          >
            No contestants in this tier
          </Typography>
        ) : (
          entries.map((entry) => (
            <Box key={entry.id || entry.contestant.id} sx={{ m: 0.5 }}>
              <ContestantCard
                entry={entry}
              />
            </Box>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default null;
