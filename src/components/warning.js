import React, { Component }  from 'react';

export default function useUnsavedChangesWarning() 
   {
  
        window.addEventListener('beforeunload', (event) => {
            event.preventDefault();
            event.returnValue = '';
          })
    
    
    };

