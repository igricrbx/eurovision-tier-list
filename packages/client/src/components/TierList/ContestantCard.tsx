import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardMedia, 
  Typography, 
  useTheme, 
  Chip, 
  Dialog, 
  DialogContent, 
  IconButton, 
  Button, 
  Stack, 
  Avatar, 
  Link
} from '@mui/material';
import { TierEntry } from '../../types';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FlagIcon from '@mui/icons-material/Flag';

interface ContestantCardProps {
  entry: TierEntry;
  className?: string;
  elevation?: number;
  sx?: import('@mui/system').SxProps<import('@mui/material').Theme>;
  cardRef?: React.Ref<HTMLDivElement>;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
}

const ContestantCard: React.FC<ContestantCardProps> = ({ 
  entry,
  className = '',
  elevation = 2,
  sx = {},
  cardRef,
  onMouseDown,
  onMouseUp
}) => {
  const { contestant } = entry;
  const theme = useTheme();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [showFullLyrics, setShowFullLyrics] = useState(false);

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setShowFullLyrics(false);
  };

  return (
    <>
      {/* Card UI */}
      <Card
        ref={cardRef}
        className={className}
        elevation={elevation}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onClick={() => setDetailsOpen(true)}
        sx={{
          width: 140,
          overflow: 'hidden',
          borderRadius: 2,
          position: 'relative',
          willChange: 'transform',
          transition: 'box-shadow 0.2s',
          border: `1px solid rgba(255,255,255,0.1)`,
          '&:hover': {
            boxShadow: `0 8px 20px rgba(0,0,0,0.4), 0 0 0 1px ${theme.palette.primary.main}`,
            cursor: 'pointer'
          },
          userSelect: 'none',
          ...sx
        }}
      >
        {/* Card content */}
        <Box
          sx={{
            position: 'relative',
            height: 90,
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            height="90"
            image={contestant.imageUrl || `https://via.placeholder.com/130x90?text=${contestant.country}`}
            alt={contestant.country}
            sx={{
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              pointerEvents: 'none' // Prevent image drag
            }}
          />
          {/* Dark overlay gradient */}
          <Box 
            sx={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0,
              height: '50%', 
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              pointerEvents: 'none' // Allow clicks to pass through
            }}
          />
        </Box>
        
        <Box 
          sx={{ 
            position: 'absolute',
            top: 5,
            left: 5,
            pointerEvents: 'none' // Allow clicks to pass through
          }}
        >
          <Chip 
            label={contestant.country} 
            size="small"
            sx={{ 
              backgroundColor: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(3px)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.65rem',
              height: 20,
              '.MuiChip-label': {
                px: 1
              }
            }}
          />
        </Box>
        
        <Box 
          sx={{ 
            p: 1,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            pointerEvents: 'none' // Allow clicks to pass through
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <MusicNoteIcon sx={{ fontSize: 14, mr: 0.5, opacity: 0.7, color: theme.palette.primary.main }} />
            <Typography 
              variant="caption" 
              component="div" 
              noWrap 
              sx={{ 
                fontWeight: 600,
                color: '#fff',
                textShadow: '0 1px 3px rgba(0,0,0,0.7)'
              }}
            >
              {contestant.songTitle}
            </Typography>
          </Box>
        </Box>
      </Card>
      
      {/* Details Dialog */}
      <Dialog 
        open={detailsOpen} 
        onClose={handleCloseDetails}
        maxWidth="sm"
        fullWidth
        scroll="paper"
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            overflow: 'hidden',
            maxHeight: 'calc(100% - 64px)',
            margin: '32px'
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          {/* Large Image Header */}
          <Box sx={{ position: 'relative', width: '100%', height: 200 }}>
            <Box
              component="img"
              src={contestant.imageUrl || `https://via.placeholder.com/800x400?text=${contestant.country}`}
              alt={contestant.country}
              sx={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                filter: 'brightness(0.8)'
              }}
            />
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0,
                height: '70%', 
                background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
              }}
            />
            
            <IconButton 
              onClick={handleCloseDetails}
              sx={{ 
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(0,0,0,0.4)',
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.6)',
                }
              }}
            >
              <CloseIcon />
            </IconButton>
            
            {/* Country Badge */}
            <Box 
              sx={{ 
                position: 'absolute',
                top: 16,
                left: 16,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.6)',
                borderRadius: 2,
                backdropFilter: 'blur(10px)',
                px: 1.5,
                py: 0.7,
              }}
            >
              <FlagIcon sx={{ mr: 1, fontSize: 16, color: theme.palette.secondary.main }} />
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                {contestant.country}
              </Typography>
            </Box>
            
            {/* Title Overlay */}
            <Box 
              sx={{ 
                position: 'absolute',
                bottom: 0,
                left: 0,
                p: 3,
                width: '100%',
                zIndex: 2,
              }}
            >
              <Typography 
                variant="h4" 
                component="h2" 
                sx={{ 
                  fontWeight: 800,
                  color: '#fff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  mb: 1
                }}
              >
                {contestant.artist}
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  color: theme.palette.secondary.main,
                  fontStyle: 'italic',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                "{contestant.songTitle}"
              </Typography>
            </Box>
          </Box>
          
          <DialogContent 
            sx={{ 
              pt: 3, 
              pb: 4,
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 300px)',
              '&::-webkit-scrollbar': {
                width: 0,
                display: 'none'
              },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}
          >
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    src={contestant.imageUrl} 
                    alt={contestant.artist}
                    sx={{ 
                      width: 56, 
                      height: 56,
                      mr: 2,
                      border: `2px solid ${theme.palette.primary.main}`
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {contestant.artist}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Representing {contestant.country} in {contestant.year || '2025'}
                    </Typography>
                  </Box>
                </Box>
                
                {(contestant.songUrl) && (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PlayArrowIcon />}
                    href={contestant.songUrl}
                    target="_blank"
                    rel="noopener"
                    sx={{ 
                      borderRadius: 6, 
                      px: 2,
                      boxShadow: `0 4px 12px ${theme.palette.primary.main}40`
                    }}
                  >
                    Listen
                  </Button>
                )}
              </Box>
              
              <Box>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  About The Song
                </Typography>
                <Typography variant="body1" paragraph>
                  "{contestant.songTitle}" is {contestant.country}'s entry for the Eurovision Song Contest {contestant.year || '2025'}, performed by {contestant.artist}.
                </Typography>
                
                {contestant.lyrics && (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Lyrics
                      </Typography>
                      <Button
                        color="primary"
                        variant="text"
                        size="small"
                        onClick={() => setShowFullLyrics(!showFullLyrics)}
                        sx={{ 
                          textTransform: 'none',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          opacity: 0.8
                        }}
                      >
                        {showFullLyrics ? "Show Less" : "Show More"}
                      </Button>
                    </Box>
                    
                    <Box
                      sx={{ 
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: 'rgba(0,0,0,0.15)',
                        maxHeight: showFullLyrics ? '100%' : '100px',
                        overflow: 'auto',
                        transition: 'max-height 0.3s ease',
                        fontSize: '0.9rem',
                        mb: 1,
                        '&::-webkit-scrollbar': { display: 'none' },
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none'
                      }}
                    >
                      <Typography variant="body2" whiteSpace="pre-line" sx={{ lineHeight: 1.6 }}>
                        {contestant.lyrics}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            </Stack>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
};

export default ContestantCard;
