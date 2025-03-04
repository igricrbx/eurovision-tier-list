import React from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import { Stage } from '../types';

export const TIERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// Enhanced tier colors with better saturation for dark theme
export const TIER_COLORS: Record<string, { main: string, text: string, gradient: string }> = {
  A: { 
    main: '#ff2d55', // Vibrant red
    text: '#ffffff',
    gradient: 'linear-gradient(135deg, #ff2d55, #ff375f)'
  },
  B: { 
    main: '#ff9500', // Vibrant orange
    text: '#ffffff',
    gradient: 'linear-gradient(135deg, #ff9500, #ffaa33)'
  },
  C: { 
    main: '#ffcc00', // Vibrant yellow
    text: '#ffffff',
    gradient: 'linear-gradient(135deg, #ffcc00, #ffdd33)'
  },
  D: { 
    main: '#34c759', // Vibrant green
    text: '#ffffff',
    gradient: 'linear-gradient(135deg, #34c759, #4cd964)'
  },
  E: { 
    main: '#5ac8fa', // Vibrant blue
    text: '#ffffff',
    gradient: 'linear-gradient(135deg, #5ac8fa, #6edbff)'
  },
  F: { 
    main: '#af52de', // Vibrant purple
    text: '#ffffff',
    gradient: 'linear-gradient(135deg, #af52de, #c969e6)'
  },
};

// Stage display configuration
export const STAGE_CONFIG = {
  [Stage.FIRST_SEMI]: {
    label: "First Semi-Final",
    icon: <Filter1Icon />,
    description: "First semi-final contestants"
  },
  [Stage.SECOND_SEMI]: {
    label: "Second Semi-Final",
    icon: <Filter2Icon />,
    description: "Second semi-final contestants"
  },
  [Stage.GRAND_FINAL]: {
    label: "Grand Final",
    icon: <EmojiEventsIcon />,
    description: "All grand final contestants"
  }
};
