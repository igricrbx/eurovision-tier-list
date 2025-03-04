import React from 'react';
import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HostCityBanner from '../components/HostCityBanner/HostCityBanner';

const HomePage: React.FC = () => {
  const { state } = useAuth();
  const { isAuthenticated } = state;

  return (
    <Container maxWidth="lg">
      <HostCityBanner />
      <Box
        sx={{
          mt: 8,
          mb: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, letterSpacing: 1 }}
        >
          Eurovision 2025 Tier List Maker
        </Typography>
        
        <Typography variant="h5" color="text.secondary" paragraph sx={{ maxWidth: 700, mb: 4 }}>
          Create, share and compare your personal Eurovision Song Contest rankings!
          Drag and drop contestants to build your perfect tier list.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
          {isAuthenticated ? (
            <Button
              component={Link}
              to="/create"
              variant="contained"
              color="primary"
              size="large"
            >
              Create Your Tier List
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                color="primary"
                size="large"
              >
                Get Started
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                color="primary"
                size="large"
              >
                Log In
              </Button>
            </>
          )}
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                Create
              </Typography>
              <Typography color="text.secondary">
                Drag and drop contestants to create your personal Eurovision 2025 tier list.
                Rank all participants from A (best) to F (worst) tiers.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                Share
              </Typography>
              <Typography color="text.secondary">
                Get a unique link to share your tier list with friends and on social media.
                Show the world your Eurovision taste!
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                Compare
              </Typography>
              <Typography color="text.secondary">
                See how your rankings compare to others. Discover which contestants are fan favorites
                and which ones are more divisive.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;