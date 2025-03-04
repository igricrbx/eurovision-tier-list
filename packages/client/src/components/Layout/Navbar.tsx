import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, useTheme, useMediaQuery, IconButton, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar: React.FC = () => {
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = state;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  // Check if a route is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '0 0 8px 8px',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ py: 1 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <MusicNoteIcon 
              sx={{ 
                mr: 1.5, 
                color: theme.palette.secondary.main,
                fontSize: 28
              }} 
            />
            <Typography 
              variant="h6" 
              component={RouterLink} 
              to="/" 
              sx={{ 
                textDecoration: 'none', 
                color: 'inherit',
                fontWeight: 800,
                letterSpacing: 1,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              EUROVISION TIER LIST
            </Typography>
          </Box>
          
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: 2,
                    mt: 1,
                  }
                }}
              >
                {isAuthenticated ? (
                  <>
                    <MenuItem onClick={() => handleNavClick('/tierlists')}>My Tier Lists</MenuItem>
                    <MenuItem onClick={() => handleNavClick('/create')}>Create New</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={() => handleNavClick('/login')}>Login</MenuItem>
                    <MenuItem onClick={() => handleNavClick('/register')}>Register</MenuItem>
                  </>
                )}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {isAuthenticated ? (
                <>
                  <Button 
                    color="primary" 
                    component={RouterLink} 
                    to="/tierlists"
                    variant={isActive('/tierlists') ? "contained" : "text"}
                    sx={{ 
                      borderRadius: '20px',
                      px: 2,
                    }}
                  >
                    My Tier Lists
                  </Button>
                  <Button 
                    color="primary" 
                    component={RouterLink} 
                    to="/create"
                    variant={isActive('/create') ? "contained" : "text"}
                    sx={{ 
                      borderRadius: '20px',
                      px: 2,
                    }}
                  >
                    Create New
                  </Button>
                  <Button 
                    color="secondary" 
                    variant="contained" 
                    onClick={handleLogout}
                    sx={{ 
                      ml: 2,
                      borderRadius: '20px',
                      px: 2,
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    color="primary" 
                    component={RouterLink} 
                    to="/login"
                    variant={isActive('/login') ? "contained" : "text"}
                    sx={{ 
                      borderRadius: '20px',
                      px: 2,
                    }}
                  >
                    Login
                  </Button>
                  <Button 
                    color="secondary"
                    variant="contained"
                    component={RouterLink} 
                    to="/register"
                    sx={{ 
                      ml: 2,
                      borderRadius: '20px',
                      px: 2,
                    }}
                  >
                    Register
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;