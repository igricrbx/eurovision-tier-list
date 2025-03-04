import React, { useState, useRef, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { Draggable, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { TierEntry } from '../../types';
import ContestantCard from './ContestantCard';

// Inner component to handle the draggable content
// This allows us to use hooks at the top level of a component
interface DraggableContentProps {
  entry: TierEntry;
  provided: any;
  snapshot: DraggableStateSnapshot;
}

const DraggableContent: React.FC<DraggableContentProps> = ({ entry, provided, snapshot }) => {
  const theme = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const dragStartTime = useRef<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Now this useEffect is at the top level of a component
  useEffect(() => {
    if (snapshot.isDragging !== isDragging) {
      setIsDragging(snapshot.isDragging);
    }
  }, [snapshot.isDragging, isDragging]);
  
  // Track mousedown to distinguish drag from click
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartTime.current = Date.now();
  };
  
  // Track mouseup to determine if it was a click
  const handleMouseUp = (e: React.MouseEvent) => {
    dragStartTime.current = null;
  };
  
  return (
    <Box
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      sx={{ m: 0.5 }}
    >
      <ContestantCard
        entry={entry}
        cardRef={cardRef}
        className={snapshot.isDragging ? 'dragging' : ''}
        elevation={snapshot.isDragging ? 8 : 2}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        sx={{
          border: snapshot.isDragging 
            ? `2px solid ${theme.palette.primary.main}` 
            : `1px solid rgba(255,255,255,0.1)`,
          zIndex: snapshot.isDragging ? 9999 : 1,
          transition: snapshot.isDragging ? 'none' : 'box-shadow 0.2s',
          '&:hover': {
            cursor: 'grab',
            boxShadow: `0 8px 20px rgba(0,0,0,0.4), 0 0 0 1px ${theme.palette.primary.main}`
          },
          '&.dragging': {
            cursor: 'grabbing !important',
            boxShadow: `0 14px 28px rgba(0,0,0,0.5), 0 0 0 2px ${theme.palette.primary.main}`
          }
        }}
      />
    </Box>
  );
};

interface DraggableContestantCardProps {
  entry: TierEntry;
  index: number;
}

const DraggableContestantCard: React.FC<DraggableContestantCardProps> = ({ entry, index }) => {
  return (
    <Draggable draggableId={entry.contestant.id} index={index}>
      {(provided, snapshot) => (
        <DraggableContent 
          entry={entry} 
          provided={provided} 
          snapshot={snapshot} 
        />
      )}
    </Draggable>
  );
};

export default DraggableContestantCard;