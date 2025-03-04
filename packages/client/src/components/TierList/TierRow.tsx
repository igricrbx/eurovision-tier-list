import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { Droppable } from '@hello-pangea/dnd';
import { TierEntry } from '../../types';
import DraggableContestantCard from './DraggableContestantCard';
import ContestantCard from './ContestantCard';
import { TIER_COLORS } from '../../constants/tierList';

interface TierRowProps {
  tier: string;
  entries: TierEntry[];
  draggable?: boolean; // New prop to toggle between draggable and view-only modes
}

const TierRow: React.FC<TierRowProps> = ({ tier, entries, draggable = true }) => {
  const theme = useTheme();
  const tierColor = TIER_COLORS[tier] || { 
    main: '#777777',
    text: '#ffffff',
    gradient: 'linear-gradient(135deg, #777777, #999999)'
  };

  // Sort entries by order
  const sortedEntries = [...entries].sort((a, b) => {
    // Use order if available, fallback to index order if not
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    return 0;
  });

  // Common tier label box styling
  const tierLabelBox = (
    <Box 
      sx={{ 
        width: 70, 
        // height: 110, 
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
  );

  // Common styles for the paper container
  const paperStyles = {
    flex: 1,
    display: 'flex',
    flexWrap: 'nowrap', // Enable wrapping for multiple rows
    alignItems: 'center',
    alignContent: 'flex-start',
    px: 1,
    minHeight: 110,
    backgroundColor: theme.palette.background.paper,
    borderLeft: `4px solid ${tierColor.main}`,
    
    // New scrollbar approach - horizontal scrolling only
    overflowX: 'auto',
    overflowY: 'hidden',
    
    // Custom scrollbar styling
    '&::-webkit-scrollbar': {
      height: '8px',  // Only define height for horizontal scrollbar
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
      borderRadius: '4px',
      '&:hover': {
        backgroundColor: `${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}`,
      }
    },
    
    // Prevent the scrollbar buttons from showing
    WebkitAppearance: 'none',  // Use non-standard scrollbars
    
    // Firefox styling
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2) transparent' : 'rgba(0,0,0,0.2) transparent'}`,
  };

  // Empty tier message
  const emptyTierMessage = (
    <Typography 
      variant="body2" 
      sx={{ 
        color: 'text.secondary', 
        fontStyle: 'italic',
        opacity: 0.6,
        p: 2
      }}
    >
      {draggable ? 'Drag contestants here' : 'No contestants in this tier'}
    </Typography>
  );

  return (
    <Box sx={{ display: 'flex', width: '100%', my: 3 }}>
      {/* Tier label - same in both modes */}
      {tierLabelBox}
      
      {draggable ? (
        // Draggable mode with Droppable container
        <Droppable droppableId={tier} direction="horizontal">
          {(provided, snapshot) => (
            <Paper
              ref={provided.innerRef}
              {...provided.droppableProps}
              elevation={2}
              sx={{
                ...paperStyles,
                backgroundColor: snapshot.isDraggingOver 
                  ? `${tierColor.main}15` // Very subtle tier color when dragging over
                  : theme.palette.background.paper,
                transition: 'all 0.2s ease',
                py: snapshot.isDraggingOver ? 1.5 : 1,
              }}
            >
              {sortedEntries.length === 0 && emptyTierMessage}
              
              {sortedEntries.map((entry, index) => (
                <DraggableContestantCard
                  key={entry.contestant.id}
                  entry={entry}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </Paper>
          )}
        </Droppable>
      ) : (
        // View-only mode
        <Paper
          elevation={2}
          sx={paperStyles}
        >
          {sortedEntries.length === 0 ? (
            emptyTierMessage
          ) : (
            sortedEntries.map((entry) => (
              <Box key={entry.id || entry.contestant.id} sx={{ m: 0.5 }}>
                <ContestantCard
                  entry={entry}
                />
              </Box>
            ))
          )}
        </Paper>
      )}
    </Box>
  );
};

export default TierRow;