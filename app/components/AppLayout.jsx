'use client';

import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import ClientOnly from './ClientOnly';

export default function AppLayout({ children }) {
  return (
    <ClientOnly fallback={<div style={{ display: 'flex' }}>
      <div style={{ width: '240px' }}></div>
      <div style={{ flexGrow: 1 }}>{children}</div>
    </div>}>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 0,
            transition: 'margin-left 0.3s ease'
          }}
        >
          {children}
        </Box>
      </Box>
    </ClientOnly>
  );
} 