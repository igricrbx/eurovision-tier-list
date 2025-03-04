import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Paper, Alert, Chip, Button, useTheme,
  IconButton, Drawer, Tooltip
} from '@mui/material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { tierListService } from '../services/api';
import { TierList, TierData, Stage } from '../types';
import { useAuth } from '../context/AuthContext';
import { TIERS, STAGE_CONFIG } from '../constants/tierList';
import TierRow from '../components/TierList/TierRow';
import EditIcon from '@mui/icons-material/Edit';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';

const TierListViewPage: React.FC = () => {
  const [tierList, setTierList] = useState<TierList | null>(null);
  const [tierData, setTierData] = useState<TierData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);
  
  const { state: authState } = useAuth();
  const { idOrCode } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  useEffect(() => {
    const loadTierList = async () => {
      if (!idOrCode) return;
      
      try {
        const data = await tierListService.getTierList(idOrCode);
        setTierList(data);
        
        // Organize entries by tier
        const organizedTiers: TierData = {};
        
        data.entries.forEach((entry: any) => {
          if (!organizedTiers[entry.tier]) {
            organizedTiers[entry.tier] = [];
          }
          
          organizedTiers[entry.tier].push(entry);
        });

        const ownerId = data.user?.id;
        setIsOwner(ownerId === authState.user?.id);
        
        setTierData(organizedTiers);
      } catch (err) {
        setError('Failed to load tier list. It may not exist or you may not have permission to view it.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadTierList();
  }, [idOrCode, authState]);
  
  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h5">Loading...</Typography>
        </Box>
      </Container>
    );
  }
  
  if (error || !tierList) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || 'Tier list not found'}
          </Alert>
          <Button component={Link} to="/" variant="contained">
            Return to Home
          </Button>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 8 }}>
        {/* Header with title */}
        <Box sx={{ 
          mb: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 800,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: -0.5,
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {tierList.name}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              color="inherit"
              component={Link}
              to="/tierlists"
              sx={{ borderRadius: 2 }}
            >
              Back
            </Button>
            
            <Button
              variant="outlined"
              color="primary"
              startIcon={<InfoIcon />}
              onClick={() => setInfoDrawerOpen(true)}
              sx={{ borderRadius: 2 }}
            >
              Info
            </Button>
            
            {isOwner && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => navigate(`/edit/${tierList.id}`)}
                sx={{ 
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(94, 114, 235, 0.25)',
                }}
              >
                Edit
              </Button>
            )}
          </Box>
        </Box>
        
        {/* Compact info bar */}
        <Paper 
          elevation={1}
          sx={{ 
            p: 1.5,
            mb: 3,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {STAGE_CONFIG[tierList.stage].icon}
            <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: 500 }}>
              {STAGE_CONFIG[tierList.stage].label}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip 
              size="small"
              icon={<PersonIcon fontSize="small" />}
              label={tierList.user ? tierList.user.username : 'Unknown'}
              variant="outlined"
            />
            
            <Chip
              size="small"
              icon={<CalendarTodayIcon fontSize="small" />}
              label={new Date(tierList.createdAt).toLocaleDateString()}
              variant="outlined"
            />
            
            <Tooltip title={tierList.isPublic ? "Public tier list" : "Private tier list"}>
              <Chip 
                size="small"
                icon={tierList.isPublic ? <PublicIcon fontSize="small" /> : <LockIcon fontSize="small" />}
                label={tierList.isPublic ? "Public" : "Private"}
                color={tierList.isPublic ? "success" : "default"}
                variant="outlined"
              />
            </Tooltip>
          </Box>
        </Paper>
        
        {/* Tier rows using the new TierRow component */}
        {TIERS.map((tier) => (
          <TierRow 
            key={tier} 
            tier={tier} 
            entries={tierData[tier] || []} 
            draggable={false}
          />
        ))}
        
        {/* Info drawer */}
        <Drawer
          anchor="right"
          open={infoDrawerOpen}
          onClose={() => setInfoDrawerOpen(false)}
          sx={{ '& .MuiDrawer-paper': { borderRadius: '12px 0 0 12px', } }}
        >
          <Box sx={{ width: 300, p: 3, }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Tier List Details
              </Typography>
              <IconButton onClick={() => setInfoDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            
            <Typography variant="subtitle2" color="text.secondary">
              Name
            </Typography>
            <Typography variant="body1" paragraph fontWeight="medium" >
              {tierList.name}
            </Typography>
            
            <Typography variant="subtitle2" color="text.secondary" >
              Created By
            </Typography>
            <Typography variant="body1" paragraph>
              {tierList.user ? tierList.user.username : 'Unknown User'}
            </Typography>
            
            <Typography variant="subtitle2" color="text.secondary" >
              Created On
            </Typography>
            <Typography variant="body1" paragraph>
              {new Date(tierList.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
              })}
            </Typography>
            
            <Typography variant="subtitle2" color="text.secondary" >
              Eurovision Stage
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {STAGE_CONFIG[tierList.stage].icon}
              <Typography variant="body1" sx={{ ml: 1 }}>
                {STAGE_CONFIG[tierList.stage].label}
              </Typography>
            </Box>
            
            <Box 
              sx={{ 
                p: 2,
                mt: 3,
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,0.03)',
                border: `1px solid rgba(255,255,255,0.1)`,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {tierList.isPublic ? (
                <PublicIcon sx={{ mr: 1, color: theme.palette.success.main }} />
              ) : (
                <LockIcon sx={{ mr: 1 }} />
              )}
              <Typography variant="body2">
                {tierList.isPublic 
                  ? 'This tier list is publicly viewable' 
                  : 'This tier list is private'}
              </Typography>
            </Box>
            
            {isOwner && (
              <Button
                variant="contained"
                color='primary'
                startIcon={<EditIcon />}
                fullWidth
                onClick={() => navigate(`/edit/${tierList.id}`)}
                sx={{ 
                  mt: 4,
                  borderRadius: 2,
                  boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                }}
              >
                Edit Tier List
              </Button>
            )}
          </Box>
        </Drawer>
      </Box>
    </Container>
  );
};

export default TierListViewPage;