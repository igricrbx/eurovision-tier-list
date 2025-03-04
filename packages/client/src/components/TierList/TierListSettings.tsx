import React from 'react';
import { Box, TextField, Typography, Button, useTheme } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';

interface TierListSettingsProps {
  tierListName: string;
  onTierListNameChange: (name: string) => void;
  isPublic: boolean;
  onIsPublicChange: (isPublic: boolean) => void;
}

const TierListSettings: React.FC<TierListSettingsProps> = ({
  tierListName,
  onTierListNameChange,
  isPublic,
  onIsPublicChange
}) => {
  const theme = useTheme();

  return (
    <>
      <TextField
        label="Tier List Name"
        variant="outlined"
        value={tierListName}
        onChange={(e) => onTierListNameChange(e.target.value)}
        fullWidth
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
      
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: {xs: 'column', sm: 'row'}, 
          alignItems: {xs: 'flex-start', sm: 'center'},
          p: 2,
          mt: 2,
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
          onClick={() => onIsPublicChange(!isPublic)}
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
    </>
  );
};

export default TierListSettings;
