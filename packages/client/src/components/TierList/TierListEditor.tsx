import React from 'react';
import { Box, Typography } from '@mui/material';
import { DragDropContext } from '@hello-pangea/dnd';
import { useTierList } from '../../context/TierListContext';
import TierRow from './TierRow';
import ContestantPool from './ContestantPool';
import { STAGE_CONFIG } from '../../constants/tierList';

const TierListEditor: React.FC = () => {
  const { handleDragEnd, tierData, stage, TIERS } = useTierList();
  
  return (
    <>
      {/* Stage title and info */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {STAGE_CONFIG[stage].icon}
          <Typography variant="h4" sx={{ ml: 1, fontWeight: 700 }}>
            {STAGE_CONFIG[stage].label}
          </Typography>
        </Box>
      </Box>
      
      {/* Tier rows and contestant pool */}
      <Box 
        sx={{ 
          "& [data-rbd-draggable-id][data-rbd-dragging='true']": {
            zIndex: 9999,
            opacity: 1,
            position: "relative",
            pointerEvents: "none",
          },
          "& .hello-pangea-dnd-drag-wrapper": {
            transform: "translate3d(0, 0, 0) !important"
          }
        }}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <Box sx={{ mb: 4 }}>
            {TIERS.map((tier) => (
              <TierRow 
                key={tier} 
                tier={tier} 
                entries={tierData[tier] || []}
              />
            ))}
          </Box>
          
          <ContestantPool entries={tierData.pool || []} />
        </DragDropContext>
      </Box>
    </>
  );
};

export default TierListEditor;
