import React from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button, Paper, Typography, useTheme } from '@mui/material';
import { useTierList } from '../../context/TierListContext';
import { Stage } from '../../types';
import SaveIcon from '@mui/icons-material/Save';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';

interface TierListFormProps {
  isEditing: boolean;
}

const STAGE_CONFIG = {
  [Stage.FIRST_SEMI]: {
    label: "First Semi-Final",
    icon: <Filter1Icon />,
    description: "Create a tier list for the first semi-final contestants"
  },
  [Stage.SECOND_SEMI]: {
    label: "Second Semi-Final",
    icon: <Filter2Icon />,
    description: "Create a tier list for the second semi-final contestants"
  },
  [Stage.GRAND_FINAL]: {
    label: "Grand Final",
    icon: <EmojiEventsIcon />,
    description: "Create a tier list for all grand final contestants"
  }
};

const TierListForm: React.FC<TierListFormProps> = ({ isEditing }) => {
  const { 
    tierListName, 
    setTierListName, 
    isPublic,
    setIsPublic,
    stage, 
    handleStageChange, 
    loading, 
    handleSave
  } = useTierList();
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, 
        mb: 5,
        borderRadius: 3,
        background: 'linear-gradient(rgba(255,255,255,0.04), rgba(255,255,255,0))',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: {xs: 'column', md: 'row'}, gap: 2, mb: 4 }}>
        {/* Tier List Name */}
        <TextField
          label="Tier List Name"
          variant="outlined"
          value={tierListName}
          onChange={(e) => setTierListName(e.target.value)}
          fullWidth
          inputProps={{ maxLength: 100 }}
          sx={{ 
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderWidth: 2,
                borderColor: theme.palette.primary.main,
              }
            }
          }}
        />
        
        {/* Stage Selector */}
        <FormControl 
          sx={{ 
            minWidth: 200,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
          disabled={isEditing} // Disable if editing an existing tierlist
        >
          <InputLabel id="stage-select-label">Eurovision Stage</InputLabel>
          <Select
            labelId="stage-select-label"
            id="stage-select"
            value={stage}
            label="Eurovision Stage"
            onChange={(e) => handleStageChange(e.target.value as Stage)}
          >
            <MenuItem value={Stage.FIRST_SEMI}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Filter1Icon sx={{ mr: 1 }} />
                First Semi-Final
              </Box>
            </MenuItem>
            <MenuItem value={Stage.SECOND_SEMI}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Filter2Icon sx={{ mr: 1 }} />
                Second Semi-Final
              </Box>
            </MenuItem>
            <MenuItem value={Stage.GRAND_FINAL}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmojiEventsIcon sx={{ mr: 1 }} />
                Grand Final
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {/* Stage description */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          mb: 3,
          p: 2,
          borderRadius: 2,
          bgcolor: `${theme.palette.primary.main}15`,
          border: `1px solid ${theme.palette.primary.main}30`,
        }}
      >
        {STAGE_CONFIG[stage].icon}
        <Typography variant="body2" sx={{ ml: 1 }}>
          {STAGE_CONFIG[stage].description}
        </Typography>
      </Box>
      
      {/* Privacy toggle */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: {xs: 'column', sm: 'row'}, 
          alignItems: {xs: 'flex-start', sm: 'center'},
          p: 2,
          borderRadius: 2,
          bgcolor: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: {xs: 2, sm: 0} }}>
          {isPublic ? (
            <PublicIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          ) : (
            <LockIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
          )}
          <Typography sx={{ mr: 2, color: theme.palette.text.secondary }}>
            {isPublic ? 'Your tier list will be publicly shareable' : 'Your tier list will be private'}
          </Typography>
        </Box>
        
        <Button
          variant={isPublic ? "outlined" : "contained"}
          color={isPublic ? "secondary" : "primary"}
          size="medium"
          onClick={() => setIsPublic(!isPublic)}
          startIcon={isPublic ? <LockIcon /> : <PublicIcon />}
          sx={{ 
            ml: {xs: 0, sm: 'auto'},
            borderRadius: 6,
            px: 2
          }}
        >
          {isPublic ? 'Make Private' : 'Make Public'}
        </Button>
      </Box>
      
      {/* Save button */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={loading}
          startIcon={loading ? null : <SaveIcon />}
          sx={{
            minWidth: 120,
            height: 50,
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(94, 114, 235, 0.25)',
          }}
        >
          {loading ? 'Saving...' : 'Save Tier List'}
        </Button>
      </Box>
    </Paper>
  );
};

export default TierListForm;
