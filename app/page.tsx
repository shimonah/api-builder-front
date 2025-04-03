'use client';

import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import ApiIcon from '@mui/icons-material/Api';

export default function Home() {
  const router = useRouter();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Welcome to Integration Hub</Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6} component="div">
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IntegrationInstructionsIcon sx={{ mr: 1 }} fontSize="large" color="primary" />
              <Typography variant="h6">Integrations</Typography>
            </Box>
            <Typography variant="body1" paragraph>
              Manage your system integrations with external services and APIs.
              Configure connections, test endpoints, and monitor integration health.
            </Typography>
            <Box sx={{ mt: 'auto' }}>
              <Button 
                variant="contained" 
                onClick={() => router.push('/integrations')}
              >
                View Integrations
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6} component="div">
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ApiIcon sx={{ mr: 1 }} fontSize="large" color="primary" />
              <Typography variant="h6">Endpoints</Typography>
            </Box>
            <Typography variant="body1" paragraph>
              Manage your API endpoints that other systems can connect to.
              Configure authentication, rate limits, and monitor usage.
            </Typography>
            <Box sx={{ mt: 'auto' }}>
              <Button 
                variant="contained" 
                onClick={() => router.push('/endpoints')}
              >
                View Endpoints
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
