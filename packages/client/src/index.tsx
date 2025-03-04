import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { applyAllDndFixes } from './utils/dndFix';

// Apply react-beautiful-dnd patch for React 18
// This ensures the library works with React 18's StrictMode
// @ts-expect-error - Overriding external library type definition
window.process = { env: { NODE_ENV: process.env.NODE_ENV } };

// Apply all drag and drop fixes to ensure proper functionality
// This fixes issues with drag images not following the cursor
applyAllDndFixes();

// We're switching to a direct approach by forcing use of @hello-pangea/dnd
// which is a maintained fork of react-beautiful-dnd with proper React 18 support
document.addEventListener('DOMContentLoaded', () => {
  // Apply critical fixes for drag and drop
  // This is the most direct approach to fixing drag issues
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    /* CRITICAL DIRECT FIX - This forces the drag preview to stay visible */
    /* You must disable pointer-events on inner elements to prevent interference */
    [data-rbd-draggable-id] {
      user-select: none !important;
    }
    
    /* This is the most important fix - targets actual drag preview */
    body > div > div[data-rbd-drag-handle-draggable-id] {
      transform: none !important;
      transition: none !important;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4) !important;
      opacity: 1 !important;
      pointer-events: none !important;
    }
    
    /* Ensure drag elements get hardware acceleration */
    [data-rbd-drag-handle-draggable-id] {
      will-change: transform !important;
      transform: translate3d(0, 0, 0) !important;
      backface-visibility: hidden !important;
    }
    
    /* Apply grabbing cursor everywhere during drag */
    body.dragging, 
    body.dragging * {
      cursor: grabbing !important;
    }
    
    /* Set base cursor for drag handles */
    [data-rbd-drag-handle-context-id] {
      cursor: grab !important;
    }
    
    /* Prevent accidental image drags */
    * {
      -webkit-user-drag: none !important;
    }
  `;
  document.head.appendChild(styleEl);
  
  // Monitor for drag operations to apply body class
  document.addEventListener('mousedown', (e) => {
    const target = e.target as HTMLElement;
    if (target.hasAttribute('data-rbd-drag-handle-draggable-id') || 
        target.closest('[data-rbd-drag-handle-draggable-id]')) {
      document.body.classList.add('dragging-initiated');
      
      // Temporarily disable transitions to prevent drag lag
      const style = document.createElement('style');
      style.id = 'temp-drag-style';
      style.innerHTML = `
        [data-rbd-draggable-id] {
          transition: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, true);
  
  document.addEventListener('mouseup', () => {
    document.body.classList.remove('dragging-initiated');
    const tempStyle = document.getElementById('temp-drag-style');
    if (tempStyle) {
      tempStyle.remove();
    }
  }, true);
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);