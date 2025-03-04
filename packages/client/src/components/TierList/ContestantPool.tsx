import React from 'react';
import { Box, Typography, Paper, useTheme, Divider } from '@mui/material';
import { Droppable } from '@hello-pangea/dnd';
import { TierEntry } from '../../types';
import DraggableContestantCard from './DraggableContestantCard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

interface ContestantPoolProps {
  entries: TierEntry[];
}

const ContestantPool: React.FC<ContestantPoolProps> = ({ entries }) => {
  const theme = useTheme();
  
  // Sort entries by order
  const sortedEntries = [...entries].sort((a, b) => {
    // Use order if available, fallback to index order if not
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    return 0;
  });
  
  return (
    <Box sx={{ mt: 6, mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <PeopleAltIcon 
          sx={{ 
            mr: 1.5, 
            color: theme.palette.primary.main,
            fontSize: 24
          }} 
        />
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 700,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: 0.5,
          }}
        >
          Unranked Contestants
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 3, opacity: 0.2 }} />
      
      <Droppable droppableId="pool" direction='horizontal'>
        {(provided, snapshot) => (
          <Paper
            ref={provided.innerRef}
            {...provided.droppableProps}
            elevation={3}
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'nowrap',
              p: 3,
              gap: 0.5,
              minHeight: 140,
              backgroundColor: snapshot.isDraggingOver 
                ? `${theme.palette.primary.main}10` 
                : theme.palette.background.paper,
              backgroundImage: snapshot.isDraggingOver
                ? 'none'
                : 'linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0))',
              borderRadius: 3,
              border: `1px dashed ${snapshot.isDraggingOver 
                ? theme.palette.primary.main 
                : 'rgba(255,255,255,0.1)'}`,
              transition: 'all 0.2s ease',
              overflow: 'auto',
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
            }}
          >
            {sortedEntries.length === 0 && (
              <Box 
                sx={{ 
                  width: '100%', 
                  textAlign: 'center', 
                  py: 3 
                }}
              >
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary', 
                    fontStyle: 'italic',
                    opacity: 0.6,
                  }}
                >
                  All contestants have been ranked!
                </Typography>
              </Box>
            )}
            
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
    </Box>
  );
};

export default ContestantPool;