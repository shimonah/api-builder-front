'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, Typography, Button, Paper, Divider, Chip, 
  Grid, List, ListItem, ListItemText, CircularProgress,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { fetchIntegrationById } from '../../services/integrationService';

export default function IntegrationDetailsPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [integration, setIntegration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadIntegration = async () => {
      try {
        const data = await fetchIntegrationById(id);
        
        if (!data || Object.keys(data).length === 0) {
          setError('Integration not found');
          return;
        }
        
        setIntegration(data);
      } catch (err) {
        console.error('Error fetching integration:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadIntegration();
    }
  }, [id]);

  const handleBack = () => {
    router.push('/integrations');
  };

  const handleEdit = () => {
    router.push(`/integrations/${id}/edit`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 2 }}>
          Back to Integrations
        </Button>
        <Alert severity="error" sx={{ mt: 2 }}>
          Error: {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mr: 2 }}>
            Back
          </Button>
          <Typography variant="h4">{integration.name}</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<EditIcon />} 
          onClick={handleEdit}
        >
          Edit Integration
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="text.secondary">Integration Code</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{integration.integrationCode}</Typography>
            
            <Typography variant="subtitle1" color="text.secondary">Type</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{integration.type}</Typography>
            
            <Typography variant="subtitle1" color="text.secondary">Version</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{integration.version}</Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="text.secondary">Status</Typography>
            <Chip 
              label={integration.active ? 'Active' : 'Inactive'} 
              color={integration.active ? 'success' : 'default'} 
              sx={{ mb: 2 }}
            />
            
            <Typography variant="subtitle1" color="text.secondary">Last Updated</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {integration.updatedAt ? new Date(integration.updatedAt).toLocaleString() : 'N/A'}
            </Typography>
            
            <Typography variant="subtitle1" color="text.secondary">Created At</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {integration.createdAt ? new Date(integration.createdAt).toLocaleString() : 'N/A'}
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="text.secondary">Description</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {integration.description || 'No description provided'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Request Configuration</Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="text.secondary">Method</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {integration.request?.method || 'GET'}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="text.secondary">Base URL</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {integration.request?.baseUrl || 'N/A'}
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="text.secondary">Path</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {integration.request?.path || '/'}
            </Typography>
          </Grid>
          
          {integration.request?.method === 'POST' && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="text.secondary">Request Body</Typography>
              <Paper sx={{ p: 2, bgcolor: 'background.paper', overflowX: 'auto' }}>
                <pre style={{ margin: 0 }}>
                  {integration.request?.body || 'No body specified'}
                </pre>
              </Paper>
            </Grid>
          )}
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="text.secondary">Headers</Typography>
            {integration.request?.headers && integration.request.headers.length > 0 ? (
              <List dense>
                {integration.request.headers.map((header, index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={`${header.key}: ${header.value}`} 
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">No headers configured</Typography>
            )}
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="text.secondary">Path Parameters</Typography>
            {integration.request?.pathParams && integration.request.pathParams.length > 0 ? (
              <List dense>
                {integration.request.pathParams.map((param, index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={`${param.key}: ${param.value}`} 
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">No path parameters configured</Typography>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Response Configuration</Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="text.secondary">Expected Status Codes</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {integration.response?.expectedStatus && integration.response.expectedStatus.length > 0 ? (
                integration.response.expectedStatus.map((status, index) => (
                  <Chip key={index} label={status} size="small" />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">No status codes specified</Typography>
              )}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="text.secondary">Validation Mode</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {integration.response?.validation?.mode || 'all'}
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="text.secondary">Validation Conditions</Typography>
            {integration.response?.validation?.conditions && integration.response.validation.conditions.length > 0 ? (
              <List dense>
                {integration.response.validation.conditions.map((condition, index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={`Path: ${condition.path}`}
                      secondary={`${condition.operator} ${condition.value}`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">No validation conditions configured</Typography>
            )}
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="text.secondary">On Validation Success</Typography>
            <Typography variant="body1">
              Action: {integration.response?.onValidationSuccess?.action || 'return'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Data: {integration.response?.onValidationSuccess?.data || 'transformed'}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="text.secondary">On Validation Failure</Typography>
            <Typography variant="body1">
              Action: {integration.response?.onValidationFailure?.action || 'error'}
            </Typography>
            <Typography variant="body1">
              Error Code: {integration.response?.onValidationFailure?.errorCode || 'VALIDATION_FAILED'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Error Message: {integration.response?.onValidationFailure?.errorMessage || 'Response validation failed'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
} 