'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Box, Typography, Paper, CircularProgress, Button, 
  Card, CardContent, Grid, Chip, Divider
} from '@mui/material';
import { fetchIntegrations, getMockIntegrations } from '../../services/integrationService';

export default function IntegrationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [integration, setIntegration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadIntegration = async () => {
      try {
        // In a real app, you would fetch a single integration by ID
        // For now, we'll fetch all and find the one we need
        const allIntegrations = await fetchIntegrations();
        const found = allIntegrations.find(i => i.id.toString() === params.id);
        
        if (found) {
          setIntegration(found);
        } else {
          throw new Error('Integration not found');
        }
      } catch (err) {
        // Try to find in mock data if API fails
        const mockData = getMockIntegrations();
        const mockFound = mockData.find(i => i.id.toString() === params.id);
        
        if (mockFound) {
          setIntegration(mockFound);
        } else {
          setError('Integration not found');
        }
      } finally {
        setLoading(false);
      }
    };

    loadIntegration();
  }, [params.id]);

  const handleBack = () => {
    router.push('/integrations');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !integration) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error" variant="h6">Error: {error || 'Integration not found'}</Typography>
        <Button variant="contained" onClick={handleBack} sx={{ mt: 2 }}>
          Back to Integrations
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Integration Details</Typography>
        <Box>
          <Button variant="outlined" onClick={handleBack}>
            Back to List
          </Button>
        </Box>
      </Box>

      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">Integration Code</Typography>
              <Typography variant="body1">{integration.integrationCode}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">Name</Typography>
              <Typography variant="body1">{integration.name}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">Status</Typography>
              <Chip 
                label={integration.active ? 'Active' : 'Inactive'} 
                color={integration.active ? 'success' : 'default'} 
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">Type</Typography>
              <Typography variant="body1">{integration.type}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">Last Updated</Typography>
              <Typography variant="body1">
                {new Date(integration.updatedAt).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">Created</Typography>
              <Typography variant="body1">
                {integration.createdAt ? new Date(integration.createdAt).toLocaleDateString() : 'N/A'}
              </Typography>
            </Grid>
          </Grid>

          {integration.description && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" color="text.secondary">Description</Typography>
              <Typography variant="body1">{integration.description}</Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
} 