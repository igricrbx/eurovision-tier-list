// This is a comprehensive set of workarounds for react-beautiful-dnd and @hello-pangea/dnd
// to fix drag and drop issues, especially with cursor following during drag operations

import { useLayoutEffect, useEffect } from 'react';

// Export a useEffect function that will use useLayoutEffect when rendering in a browser
// and useEffect when rendering on the server
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Core fix for drag and drop - this uses a more aggressive approach to ensure the drag image follows the cursor
export const applyDragImageFix = () => {
  if (typeof window !== 'undefined') {
    // Define the patch function that will be called when library functions are executed
    const patchHellopangeaDnd = () => {
      // Add very specific CSS to fix the drag image following cursor issues
      const styleElement = document.createElement('style');
      styleElement.id = 'dnd-style-fixes';
      styleElement.innerHTML = `
        /* Critical fixes for drag image following cursor */
        .hello-pangea-dnd-drag-wrapper,
        [data-rbd-drag-handle-draggable-id] {
          cursor: grabbing !important;
        }
        
        /* This is the most critical fix - it forces hardware acceleration and proper positioning */
        [data-rbd-draggable-id][data-rbd-dragging="true"] {
          position: relative !important;
          z-index: 9999 !important;
          pointer-events: none !important;
          transform: translate(var(--x, 0), var(--y, 0)) !important;
          will-change: transform !important;
          transition: none !important;
        }

        /* Force drag handle with grabbing cursor */
        [data-rbd-drag-handle-context-id] {
          cursor: grab !important;
        }
        
        /* Ensure smooth movement of non-dragged items during drag operation */
        [data-rbd-draggable-id]:not([data-rbd-dragging="true"]) {
          transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1) !important;
        }
        
        /* Remove all user select during drag operations */
        body.dnd-dragging * {
          user-select: none !important;
          -webkit-user-select: none !important;
        }
        
        /* Apply grabbing cursor during drag */
        body.dnd-dragging {
          cursor: grabbing !important;
        }
        
        /* Ensure portal elements are visible and on top */
        [data-rbd-portal] {
          pointer-events: none !important;
          z-index: 9999 !important;
        }
      `;
      document.head.appendChild(styleElement);
      
      // Add additional script to directly patch DnD portal elements
      function enhanceDndElements() {
        // Target all elements that get created during drag operations
        const portalElements = document.querySelectorAll('[data-rbd-drag-handle-draggable-id]');
        portalElements.forEach(el => {
          // Force grabbing cursor and better transitions
          (el as HTMLElement).style.cursor = 'grabbing';
          (el as HTMLElement).style.willChange = 'transform';
          (el as HTMLElement).style.transition = 'none';
        });
      }

      // Poll for DnD elements and enhance them
      const enhanceInterval = setInterval(enhanceDndElements, 100);
      
      // Create a global flag to track first drag 
      window._dndFirstDragComplete = false;
      
      // Setup event listeners
      document.addEventListener('mousedown', function(e) {
        // Check if we're clicking on a drag handle
        const dragHandle = (e.target as HTMLElement).closest('[data-rbd-drag-handle-context-id]');
        if (dragHandle) {
          // Flag the drag is starting
          document.body.classList.add('dnd-drag-starting');
          
          // If we haven't had first drag yet, apply more aggressive fixes
          if (!window._dndFirstDragComplete) {
            enhanceDndElements();
          }
        }
      }, true);
      
      document.addEventListener('dragstart', function() {
        document.body.classList.add('dnd-dragging');
      }, true);
      
      document.addEventListener('dragend', function() {
        document.body.classList.remove('dnd-dragging');
        document.body.classList.remove('dnd-drag-starting');
        window._dndFirstDragComplete = true;
      }, true);
      
      // Prevent default drag behaviors
      document.addEventListener('dragover', function(e) {
        e.preventDefault();
      }, true);
      
      document.addEventListener('drop', function(e) {
        e.preventDefault();
      }, true);
      
      // Cleanup function
      return () => {
        clearInterval(enhanceInterval);
      };
    };
    
    // Execute patch on next tick to ensure DOM is ready
    setTimeout(patchHellopangeaDnd, 0);
  }
};

// Monitor DOM for drag elements and apply fixes in real-time
export const monitorDndElements = () => {
  if (typeof window !== 'undefined') {
    // Create an observer to detect DnD elements being added
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Element node
              const el = node as HTMLElement;
              
              // Check for DnD drag elements
              if (el.hasAttribute('data-rbd-draggable-id') || 
                  el.hasAttribute('data-rbd-drag-handle-draggable-id')) {
                
                // Apply direct style fixes
                el.style.willChange = 'transform';
                el.style.transition = 'none';
                
                // If it's a drag handle, make it grabbable
                if (el.hasAttribute('data-rbd-drag-handle-draggable-id')) {
                  el.style.cursor = 'grab';
                }
                
                // Fix for drag image
                if (el.hasAttribute('data-rbd-dragging')) {
                  el.style.pointerEvents = 'none';
                  el.style.zIndex = '9999';
                }
              }
              
              // Check for other DnD elements
              if (el.hasAttribute('data-rbd-droppable-id')) {
                el.style.transition = 'background-color 0.2s ease';
              }
            }
          });
        }
      });
    });
    
    // Start observing the entire document
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-rbd-draggable-id', 'data-rbd-dragging']
    });
    
    return () => observer.disconnect();
  }
  
  return () => {};
};

// Define global interface to allow our custom flag
declare global {
  interface Window {
    _dndFirstDragComplete?: boolean;
  }
}

// Apply all DnD fixes
export const applyAllDndFixes = () => {
  applyDragImageFix();
  monitorDndElements();
};