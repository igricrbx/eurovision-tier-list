import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, Typography } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';

// Layout Components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TierListsPage from './pages/TierListsPage';
import TierListEditorPage from './pages/TierListEditorPage';
import TierListViewPage from './pages/TierListViewPage';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF9190',//'#5E72EB', // Rich purple-blue
    },
    secondary: {
      main: '#FF9190', // Soft coral
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1E1E1E',   // Slightly lighter dark for cards/papers
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      'Segoe UI',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.0125em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.0125em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.025em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
          },
        },
        containedPrimary: {
          boxShadow: '0 4px 10px rgba(255, 145, 144, 0.3)',//rgba(94, 114, 235, 0.3)',
        },
        containedSecondary: {
          boxShadow: '0 4px 10px rgba(255, 145, 144, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(90deg, #121212, #1E1E1E)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#2b2b2b',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#6b6b6b',
            borderRadius: '20px',
          },
        },
      },
    },
  },
});

const AppContent: React.FC = () => {
  const { state, isLoading } = useAuth();
  
  if (isLoading || state.loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Navbar />
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0) 50%)',
              pt: 4,
              pb: 6,
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/tierlists" element={<TierListsPage />} />
              <Route path="/create" element={<TierListEditorPage />} />
              <Route path="/edit/:id" element={<TierListEditorPage />} />
              <Route path="/tierlists/:idOrCode" element={<TierListViewPage />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;