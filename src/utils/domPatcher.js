// src/utils/domPatcher.js

/**
 * Patch for React's removeChild error
 * This handles the error: "Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node"
 */

export function applyDOMPatches() {
    if (typeof window === 'undefined' || typeof Node === 'undefined') {
      return; // Not in browser environment
    }
  
    // Check if patch is already applied
    if (window.__domPatchApplied) {
      return;
    }
  
    try {
      // Save original removeChild method
      const originalRemoveChild = Node.prototype.removeChild;
  
      // Replace with safer version
      Node.prototype.removeChild = function(child) {
        // If child is not a child of this node
        if (child && !this.contains(child)) {
          console.warn('Prevented removeChild error for node:', child);
          // Just return the child without doing anything
          return child;
        }
        
        // Normal operation - child is actually a child of this node
        try {
          return originalRemoveChild.call(this, child);
        } catch (e) {
          // If error still occurs, log it but don't crash
          console.warn('Error in patched removeChild:', e);
          return child;
        }
      };
  
      // Mark as patched
      window.__domPatchApplied = true;
      console.log('DOM removeChild patch applied successfully');
    } catch (error) {
      console.error('Failed to apply DOM patch:', error);
    }
  }
  
  export function patchReactDOM() {
    if (typeof window === 'undefined') return;
  
    setTimeout(() => {
      // Find React instance
      const reactInstances = Object.keys(window).filter(key => 
        key.startsWith('__REACT_DEVTOOLS_GLOBAL_HOOK') || 
        key.startsWith('__REACT')
      );
      
      if (reactInstances.length > 0) {
        console.log('React detected, applying DOM patches');
      }
      
      // Apply patches
      applyDOMPatches();
    }, 1000);
  }
  
  // Auto-apply patch when imported
  patchReactDOM();
  
  export default { applyDOMPatches, patchReactDOM };