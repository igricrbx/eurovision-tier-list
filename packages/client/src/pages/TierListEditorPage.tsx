import React from 'react';
import { Container, Typography, Box, Alert, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import { TierListProvider, useTierList } from '../context/TierListContext';
import TierListForm from '../components/TierList/TierListForm';
import TierListEditor from '../components/TierList/TierListEditor';
import SaveDialog from '../components/TierList/SaveDialog';
import ErrorSnackbar from '../components/TierList/ErrorSnackbar';

// The inner component that uses the context
const TierListEditorContent: React.FC = () => {
  const { loading, error } = useTierList();
  const { id } = useParams();
  const theme = useTheme();
  
  if (loading) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5">Loading...</Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 800,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: -0.5,
          }}
        >
          {id ? 'Edit Your Tier List' : 'Create New Tier List'}
        </Typography>
      </Box>
      
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3, 
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(255, 145, 144, 0.15)',
          }}
        >
          {error}
        </Alert>
      )}
      
      <TierListForm isEditing={!!id} />
      <TierListEditor />
      <SaveDialog />
      <ErrorSnackbar />
    </Box>
  );
};

// The wrapper component that provides the context
const TierListEditorPage: React.FC = () => {
  const { id } = useParams();
  
  return (
    <Container maxWidth="lg">
      <TierListProvider listId={id}>
        <TierListEditorContent />
      </TierListProvider>
    </Container>
  );
};

export default TierListEditorPage;