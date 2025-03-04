import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Card, CardContent, CardActions, Grid, Alert, Chip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tierListService } from '../services/api';
import { TierList, Stage } from '../types';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';

// Stage display configuration
const STAGE_CONFIG = {
  [Stage.FIRST_SEMI]: {
    label: "First Semi-Final",
    icon: <Filter1Icon sx={{ fontSize: 'inherit', mr: 0.5 }} />,
    color: "#ff9800" // Orange
  },
  [Stage.SECOND_SEMI]: {
    label: "Second Semi-Final",
    icon: <Filter2Icon sx={{ fontSize: 'inherit', mr: 0.5 }} />,
    color: "#2196f3" // Blue
  },
  [Stage.GRAND_FINAL]: {
    label: "Grand Final",
    icon: <EmojiEventsIcon sx={{ fontSize: 'inherit', mr: 0.5 }} />,
    color: "#f44336" // Red
  }
};

const TierListsPage: React.FC = () => {
  const [tierLists, setTierLists] = useState<TierList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { state } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadTierLists = async () => {
      if (!state.isAuthenticated) {
        navigate('/login');
        return;
      }
      
      try {
        const data = await tierListService.getUserTierLists();
        setTierLists(data);
      } catch (err) {
        setError('Failed to load tier lists. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadTierLists();
  }, [state.isAuthenticated, navigate]);
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this tier list?')) {
      try {
        await tierListService.deleteTierList(id);
        setTierLists(tierLists.filter(list => list.id !== id));
      } catch (err) {
        setError('Failed to delete tier list. Please try again.');
        console.error(err);
      }
    }
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h5">Loading...</Typography>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            My Tier Lists
          </Typography>
          
          <Button
            component={Link}
            to="/create"
            variant="contained"
            color="primary"
          >
            Create New Tier List
          </Button>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {tierLists.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" color="text.secondary" paragraph>
              You haven't created any tier lists yet.
            </Typography>
            <Button
              component={Link}
              to="/create"
              variant="contained"
              color="primary"
            >
              Create Your First Tier List
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {tierLists.map((tierList) => (
              <Grid item xs={12} sm={6} md={4} key={tierList.id}>
                <Card elevation={2} sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%' 
                }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography 
                      variant="h6" 
                      component="h2" 
                      gutterBottom
                      sx={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                      }}
                    >
                      {tierList.name}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      <Chip 
                        label={tierList.isPublic ? 'Public' : 'Private'} 
                        color={tierList.isPublic ? 'success' : 'default'}
                        size="small"
                      />
                      <Chip 
                        icon={STAGE_CONFIG[tierList.stage].icon}
                        label={STAGE_CONFIG[tierList.stage].label}
                        size="small"
                        sx={{ 
                          backgroundColor: STAGE_CONFIG[tierList.stage].color,
                          color: 'white'
                        }}
                      />
                      <Chip 
                        label={`Created: ${new Date(tierList.createdAt).toLocaleDateString()}`}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary">
                      Share Code: {tierList.shareCode}
                    </Typography>
                  </CardContent>
                  
                  <CardActions>
                    <Button 
                      size="small" 
                      component={Link}
                      to={`/tierlists/${tierList.shareCode}`}
                    >
                      View
                    </Button>
                    <Button 
                      size="small"
                      component={Link}
                      to={`/edit/${tierList.id}`}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="small" 
                      color="error"
                      onClick={() => handleDelete(tierList.id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default TierListsPage;